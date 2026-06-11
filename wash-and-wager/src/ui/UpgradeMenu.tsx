import type { UpgradeState } from '../game/types'

interface UpgradeMenuProps {
  upgrades: UpgradeState
  coins: number
  onBuy: (kind: string) => void
  onClose: () => void
}

const UPGRADE_INFO: {
  key: keyof UpgradeState
  label: string
  costs: Record<number, number>
  levelNames: string[]
}[] = [
  {
    key: 'washerLevel', label: 'Washers',
    costs: { 2: 500, 3: 1250, 4: 3125, 5: 7813 },
    levelNames: ['Rusty Drum', 'Fixed Up', 'Clean Machine', 'Speed Cycle', 'Pristine Pro'],
  },
  {
    key: 'dryerLevel', label: 'Dryers',
    costs: { 2: 600, 3: 1500, 4: 3750, 5: 9375 },
    levelNames: ['Old Tumbler', 'Working Good', 'Lint-Free', 'Fast Dry', 'Air & Style'],
  },
  {
    key: 'vendingLevel', label: 'Vending',
    costs: { 2: 400, 3: 1000, 4: 2500, 5: 6250 },
    levelNames: ['Dusty Box', 'Stocked Up', 'Premium Snacks', 'Gourmet', 'VIP Bar'],
  },
  {
    key: 'seatingLevel', label: 'Seating',
    costs: { 2: 300, 3: 750, 4: 1875, 5: 4688 },
    levelNames: ['Plastic Chairs', 'Padded Bench', 'Cozy Corner', 'Lounge Set', 'VIP Sofa'],
  },
  {
    key: 'floorLevel', label: 'Floors',
    costs: { 2: 350, 3: 875, 4: 2188, 5: 5469 },
    levelNames: ['Cracked Tile', 'Patched Up', 'Checkered', 'Garden Fresh', 'Marble Shine'],
  },
]

const KIND_MAP: Partial<Record<keyof UpgradeState, string>> = {
  washerLevel: 'washer',
  dryerLevel: 'dryer',
  vendingLevel: 'vending',
  seatingLevel: 'seating',
  floorLevel: 'floor',
}

export default function UpgradeMenu({ upgrades, coins, onBuy, onClose }: UpgradeMenuProps) {
  return (
    <div className="absolute bottom-12 left-0 right-0 bg-[#1A100A] border-t-2 border-[#5A3020] p-3 font-mono z-40 max-h-72 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#F0A020] font-bold text-sm">Upgrades</span>
        <button onClick={onClose} className="text-[#C0A080] hover:text-white text-xs px-2 py-1">✕</button>
      </div>
      {UPGRADE_INFO.map(({ key, label, costs, levelNames }) => {
        const cur = upgrades[key] as number
        const maxed = cur >= 5
        const nextCost = costs[cur + 1]
        const canAfford = !maxed && nextCost !== undefined && coins >= nextCost
        const kind = KIND_MAP[key]!
        return (
          <div key={key} className="flex items-center gap-2 mb-2 min-w-0">
            <span className="w-14 text-[#C0A080] text-xs shrink-0">{label}</span>
            <div className="flex gap-0.5 shrink-0">
              {[1, 2, 3, 4, 5].map(lv => (
                <div
                  key={lv}
                  className={`w-3.5 h-3.5 rounded-sm text-[7px] flex items-center justify-center font-bold
                    ${lv <= cur ? 'bg-[#F0A020] text-black' : 'bg-[#3A2010] text-[#5A4020]'}`}
                >
                  {lv}
                </div>
              ))}
            </div>
            <span className="text-[#90C890] text-[10px] flex-1 truncate">{levelNames[cur - 1]}</span>
            {!maxed ? (
              <button
                onClick={() => onBuy(kind)}
                disabled={!canAfford}
                className="text-[10px] px-2 py-0.5 rounded bg-[#4A2810] border border-[#8B5E3C] text-[#F4C842] disabled:opacity-40 hover:enabled:bg-[#6A3820] transition shrink-0"
              >
                ${nextCost}
              </button>
            ) : (
              <span className="text-[#40C060] text-[10px] shrink-0 font-bold">MAX</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
