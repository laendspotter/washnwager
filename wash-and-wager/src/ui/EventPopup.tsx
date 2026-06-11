import type { DialogueEvent } from '../game/types'

interface EventPopupProps {
  event: DialogueEvent
  onChoose: (idx: 0 | 1 | 2) => void
}

export default function EventPopup({ event, onChoose }: EventPopupProps) {
  return (
    <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-3 z-50">
      <div className="bg-[#1E140A] border-2 border-[#8B5E3C] rounded-xl w-full max-w-sm p-4 font-mono shadow-2xl">
        <div className="text-[#F0A020] font-bold text-sm mb-1">{event.title}</div>
        <div className="text-[#A09070] text-xs mb-2 italic">{event.situation}</div>

        <div className="bg-[#2A1808] rounded-lg p-2 mb-3 border border-[#4A2810]">
          <span className="text-[#F4C842] text-xs font-bold">{event.npcName}: </span>
          <span className="text-[#F0E8C0] text-xs">"{event.npcLine}"</span>
        </div>

        <div className="text-[#D0C0A0] text-xs mb-3 leading-relaxed">{event.prompt}</div>

        <div className="flex flex-col gap-2">
          {event.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onChoose(i as 0 | 1 | 2)}
              className="text-left px-3 py-2 rounded bg-[#3A2010] border border-[#5A3020] hover:bg-[#5A3020] text-[#F0D080] text-xs transition leading-snug"
            >
              <span className="font-bold text-[#F4C842] mr-1">{String.fromCharCode(65 + i)}.</span>
              {opt.label}
              <span className="block text-[#A09070] text-[10px] mt-0.5 ml-3">{opt.shortText}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
