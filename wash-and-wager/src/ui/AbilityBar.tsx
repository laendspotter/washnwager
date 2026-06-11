import type { Ability, AbilityId } from '../game/types'

interface AbilityBarProps {
  abilities: Record<AbilityId, Ability>
  onUse: (id: AbilityId) => void
}

export default function AbilityBar({ abilities, onUse }: AbilityBarProps) {
  const list = Object.values(abilities) as Ability[]
  return (
    <div className="flex justify-center gap-2 px-2 py-1 bg-[#120C06]">
      {list.map(ab => {
        const ready = ab.cooldownLeft <= 0
        const pct = ready ? 100 : Math.round((1 - ab.cooldownLeft / ab.cooldown) * 100)
        return (
          <button
            key={ab.id}
            onClick={() => onUse(ab.id)}
            disabled={!ready}
            title={`${ab.name} (${ab.cooldown}s cooldown)`}
            className="relative flex flex-col items-center justify-center w-14 h-12 rounded bg-[#2A1808] border border-[#5A3020] disabled:opacity-50 hover:enabled:bg-[#3A2010] transition overflow-hidden"
          >
            {!ready && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-[9px] font-mono text-white z-10">{Math.ceil(ab.cooldownLeft)}s</span>
              </div>
            )}
            {!ready && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-[#F0A020] transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            )}
            <span className="text-base leading-tight">{ab.icon}</span>
            <span
              className="font-mono text-[#F0D080] leading-tight px-0.5 text-center"
              style={{ fontSize: '6px' }}
            >
              {ab.name.split(' ').slice(0, 2).join(' ')}
            </span>
          </button>
        )
      })}
    </div>
  )
}
