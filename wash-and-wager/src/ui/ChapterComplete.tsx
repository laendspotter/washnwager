interface ChapterCompleteProps {
  chapter: number
  customersServed: number
  totalEarned: number
  goal: { customersServed: number; revenueEarned: number }
  onDismiss: () => void
}

export default function ChapterComplete({
  chapter, customersServed, totalEarned, goal, onDismiss,
}: ChapterCompleteProps) {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1E140A] border-2 border-[#F0A020] rounded-xl w-full max-w-xs p-6 font-mono text-center shadow-2xl">
        <div className="text-4xl mb-2">🧺</div>
        <div className="text-[#F4C842] text-xl font-bold mb-1">Chapter {chapter} Complete!</div>
        <div className="text-[#F0D080] text-sm mb-4 italic">Well, look at you, sugar.</div>

        <div className="flex flex-col gap-1 mb-4 text-xs text-[#C0A080] bg-[#2A1808] rounded p-3">
          <div className="flex justify-between">
            <span>Customers served</span>
            <span className="text-[#40C060] font-bold">{customersServed} / {goal.customersServed}</span>
          </div>
          <div className="flex justify-between">
            <span>Revenue earned</span>
            <span className="text-[#40C060] font-bold">${totalEarned.toFixed(2)} / ${goal.revenueEarned}</span>
          </div>
        </div>

        <div className="text-[#A0C0E0] text-xs italic mb-4">
          That storage room door looks mighty interesting...
        </div>

        <button
          onClick={onDismiss}
          className="px-6 py-2 rounded bg-[#F0A020] text-black font-bold text-sm hover:bg-[#F4C842] transition"
        >
          Keep Going →
        </button>
      </div>
    </div>
  )
}
