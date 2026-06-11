import { useRef, useState, useEffect, useCallback } from 'react'
import type { GameState, AbilityId } from './game/types'
import { makeInitialState } from './game/initialState'
import {
  tick, rettaTapMachine, rettaTapSpill, rettaTapCustomer,
  rettaTapFloor, useAbility, resolveEvent, hireSta, buyUpgrade, tapStorageDoor,
} from './game/gameLoop'
import {
  render, getMachineAtPixel, getSpillAtPixel, getCustomerAtPixel, isStorageDoorPixel,
} from './canvas/renderer'
import { CANVAS_W, CANVAS_H } from './data/constants'
import TopBar from './ui/TopBar'
import AbilityBar from './ui/AbilityBar'
import EventPopup from './ui/EventPopup'
import UpgradeMenu from './ui/UpgradeMenu'
import StaffMenu from './ui/StaffMenu'
import ChapterComplete from './ui/ChapterComplete'
import Notification from './ui/Notification'

// Shallow snapshot of game state for React UI (avoids re-rendering on every tick)
interface UIState {
  coins: number
  heat: number
  laundroRep: number
  customersServed: number
  chapter: GameState['chapter']
  chapterGoal: GameState['chapterGoal']
  chapterComplete: boolean
  activeEvent: GameState['activeEvent']
  notification: GameState['notification']
  abilities: GameState['abilities']
  staffHired: GameState['staffHired']
  upgrades: GameState['upgrades']
  totalEarned: number
}

function snapshot(gs: GameState): UIState {
  return {
    coins: gs.coins,
    heat: gs.heat,
    laundroRep: gs.laundroRep,
    customersServed: gs.customersServed,
    chapter: gs.chapter,
    chapterGoal: gs.chapterGoal,
    chapterComplete: gs.chapterComplete,
    activeEvent: gs.activeEvent,
    notification: gs.notification,
    abilities: gs.abilities,
    staffHired: gs.staffHired,
    upgrades: gs.upgrades,
    totalEarned: gs.totalEarned,
  }
}

type Panel = 'none' | 'upgrade' | 'staff'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gsRef = useRef<GameState>(makeInitialState())
  const lastTimeRef = useRef<number>(0)
  const frameRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)

  const [ui, setUI] = useState<UIState>(() => snapshot(gsRef.current))
  const [panel, setPanel] = useState<Panel>('none')
  const [chapterDismissed, setChapterDismissed] = useState(false)

  // Reset dismiss flag when chapter changes
  useEffect(() => {
    setChapterDismissed(false)
  }, [ui.chapter])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function loop(ts: number) {
      const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.1)
      lastTimeRef.current = ts

      tick(gsRef.current, dt)
      render(ctx!, gsRef.current)

      frameCountRef.current++
      // Sync React UI ~10Hz (every 6 frames at 60fps)
      if (frameCountRef.current % 6 === 0) {
        setUI(snapshot(gsRef.current))
      }

      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame((ts) => {
      lastTimeRef.current = ts
      frameRef.current = requestAnimationFrame(loop)
    })

    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  // Canvas tap / click
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const scaleX = CANVAS_W / rect.width
    const scaleY = CANVAS_H / rect.height
    const px = (e.clientX - rect.left) * scaleX
    const py = (e.clientY - rect.top) * scaleY

    const gs = gsRef.current
    if (gs.activeEvent) return // block canvas interaction during event popup

    // Hit priority: machine > spill > angry customer > storage door > floor
    const machineId = getMachineAtPixel(gs, px, py)
    if (machineId) { rettaTapMachine(gs, machineId); return }

    const spillId = getSpillAtPixel(gs, px, py)
    if (spillId) { rettaTapSpill(gs, spillId); return }

    const customerId = getCustomerAtPixel(gs, px, py)
    if (customerId) { rettaTapCustomer(gs, customerId); return }

    if (gs.storageRoomGlow && isStorageDoorPixel(gs, px, py)) {
      tapStorageDoor(gs); return
    }

    rettaTapFloor(gs, px, py)
  }, [])

  const handleAbility = useCallback((id: AbilityId) => {
    useAbility(gsRef.current, id)
  }, [])

  const handleResolveEvent = useCallback((idx: 0 | 1 | 2) => {
    resolveEvent(gsRef.current, idx)
    setUI(snapshot(gsRef.current))
  }, [])

  const handleHire = useCallback((role: 'wanda' | 'denny') => {
    hireSta(gsRef.current, role)
    setUI(snapshot(gsRef.current))
  }, [])

  const handleUpgrade = useCallback((kind: string) => {
    buyUpgrade(gsRef.current, kind)
    setUI(snapshot(gsRef.current))
  }, [])

  const showChapterComplete = ui.chapterComplete && !chapterDismissed

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0C0806]">
      <div className="relative w-full" style={{ maxWidth: CANVAS_W }}>
        {/* HUD top bar */}
        <TopBar ui={ui} />

        {/* Game canvas — scales to container width */}
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          onClick={handleClick}
          className="block w-full cursor-pointer select-none"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Ability bar */}
        <AbilityBar abilities={ui.abilities} onUse={handleAbility} />

        {/* Bottom nav */}
        <div className="flex gap-2 px-2 pb-2 bg-[#120C06]">
          <button
            onClick={() => setPanel(p => p === 'upgrade' ? 'none' : 'upgrade')}
            className={`flex-1 py-2 text-xs font-bold font-mono rounded border transition
              ${panel === 'upgrade'
                ? 'bg-[#5A3020] text-[#F4C842] border-[#F0A020]'
                : 'bg-[#2A1808] text-[#C0A060] border-[#4A2810] hover:bg-[#3A2010]'
              }`}
          >
            🔧 Upgrades
          </button>
          <button
            onClick={() => setPanel(p => p === 'staff' ? 'none' : 'staff')}
            className={`flex-1 py-2 text-xs font-bold font-mono rounded border transition
              ${panel === 'staff'
                ? 'bg-[#5A3020] text-[#F4C842] border-[#F0A020]'
                : 'bg-[#2A1808] text-[#C0A060] border-[#4A2810] hover:bg-[#3A2010]'
              }`}
          >
            👷 Staff
          </button>
        </div>

        {/* Slide-up panels */}
        {panel === 'upgrade' && (
          <UpgradeMenu
            upgrades={ui.upgrades}
            coins={ui.coins}
            onBuy={handleUpgrade}
            onClose={() => setPanel('none')}
          />
        )}
        {panel === 'staff' && (
          <StaffMenu
            staffHired={ui.staffHired}
            coins={ui.coins}
            onHire={handleHire}
            onClose={() => setPanel('none')}
          />
        )}

        {/* Dialogue event modal */}
        {ui.activeEvent && (
          <EventPopup event={ui.activeEvent} onChoose={handleResolveEvent} />
        )}

        {/* Chapter complete overlay */}
        {showChapterComplete && (
          <ChapterComplete
            chapter={ui.chapter}
            customersServed={ui.customersServed}
            totalEarned={ui.totalEarned}
            goal={ui.chapterGoal}
            onDismiss={() => setChapterDismissed(true)}
          />
        )}

        {/* Toast notification */}
        {ui.notification && <Notification text={ui.notification.text} />}
      </div>
    </div>
  )
}
