export default function Header() {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-1">
        <h1 className="font-mono text-2xl font-bold tracking-tight">
          Influence<span className="text-[#E24B4A]">Score</span>
        </h1>
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
          psychological influence detector
        </span>
      </div>
      <p className="text-sm text-neutral-500 max-w-xl">
        Paste any text — news, ads, political speech, social media. 
        We show you exactly which manipulation tactics are being used and how hard.
      </p>
      <div className="mt-4 h-px bg-neutral-800" />
    </div>
  )
}
