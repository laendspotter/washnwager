interface NotificationProps {
  text: string
}

export default function Notification({ text }: NotificationProps) {
  return (
    <div
      className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#1E140A] border border-[#F0A020] rounded-lg px-4 py-2 text-xs font-mono text-[#F0E8C0] shadow-lg z-50 max-w-xs w-fit text-center pointer-events-none"
      style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
    >
      {text}
    </div>
  )
}
