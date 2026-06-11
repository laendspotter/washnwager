import type { StaffRole } from '../game/types'

interface StaffMenuProps {
  staffHired: Record<StaffRole, boolean>
  coins: number
  onHire: (role: StaffRole) => void
  onClose: () => void
}

const STAFF_INFO: { role: StaffRole; name: string; cost: number; wage: number; desc: string; color: string }[] = [
  {
    role: 'wanda',
    name: 'Wanda Pickle',
    cost: 150,
    wage: 80,
    desc: 'Auto-mops spills so you don\'t have to. Very particular about baseboards.',
    color: '#70A860',
  },
  {
    role: 'denny',
    name: 'Denny Briggs',
    cost: 200,
    wage: 100,
    desc: 'Auto-repairs broken machines. Slow as molasses, but he gets there.',
    color: '#A08030',
  },
]

export default function StaffMenu({ staffHired, coins, onHire, onClose }: StaffMenuProps) {
  return (
    <div className="absolute bottom-12 left-0 right-0 bg-[#1A100A] border-t-2 border-[#5A3020] p-3 font-mono z-40">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#F0A020] font-bold text-sm">Staff</span>
        <button onClick={onClose} className="text-[#C0A080] hover:text-white text-xs px-2 py-1">✕</button>
      </div>
      {STAFF_INFO.map(({ role, name, cost, wage, desc, color }) => {
        const hired = staffHired[role]
        const canAfford = coins >= cost
        return (
          <div
            key={role}
            className="flex items-start gap-3 mb-2 p-2 rounded bg-[#2A1808] border border-[#4A2810]"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
              style={{ backgroundColor: color, color: '#fff' }}
            >
              {name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#F0D080] font-bold text-xs">{name}</div>
              <div className="text-[#A0A080] text-[10px] mt-0.5 leading-snug">{desc}</div>
              {hired && (
                <div className="text-[#40C060] text-[10px] mt-0.5">
                  On staff · ${wage}/wk
                </div>
              )}
            </div>
            {hired ? (
              <span className="text-[#40C060] text-lg shrink-0">✓</span>
            ) : (
              <button
                onClick={() => onHire(role)}
                disabled={!canAfford}
                className="text-xs px-3 py-1 rounded bg-[#4A2810] border border-[#8B5E3C] text-[#F4C842] disabled:opacity-40 hover:enabled:bg-[#6A3820] transition shrink-0 whitespace-nowrap"
              >
                Hire ${cost}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
