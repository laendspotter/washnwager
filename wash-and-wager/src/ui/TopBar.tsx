import type { GameState } from '../game/types'

interface TopBarProps {
  ui: {
    coins: number
    heat: number
    laundroRep: number
    customersServed: number
    chapter: number
    chapterGoal: GameState['chapterGoal']
  }
}

export default function TopBar({ ui }: TopBarProps) {
  const heatColor =
    ui.heat < 25 ? '#40C060' :
    ui.heat < 50 ? '#F0A020' :
    ui.heat < 75 ? '#E05020' : '#CC2020'

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-[#120C06] text-xs font-mono border-b border-[#3A2010]">
      <span className="text-[#F4C842] font-bold">${ui.coins.toFixed(2)}</span>
      <div className="flex-1 flex items-center gap-1 min-w-0">
        <span className="text-[#E08040] shrink-0">🌡</span>
        <div className="flex-1 h-2 bg-[#3A2010] rounded-full overflow-hidden min-w-0">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${ui.heat}%`, backgroundColor: heatColor }}
          />
        </div>
        <span className="shrink-0 w-6 text-right" style={{ color: heatColor }}>{Math.round(ui.heat)}</span>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[#90C890]">⭐</span>
        <div className="w-12 h-2 bg-[#3A2010] rounded-full overflow-hidden">
          <div className="h-full bg-[#40A060] rounded-full transition-all duration-300" style={{ width: `${ui.laundroRep}%` }} />
        </div>
      </div>
      <span className="text-[#A0C0E0] shrink-0">Ch.{ui.chapter}</span>
      <span className="text-[#C0A080] shrink-0">👥{ui.customersServed}/{ui.chapterGoal.customersServed}</span>
    </div>
  )
}
