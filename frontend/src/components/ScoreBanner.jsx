export function getScoreColor(score) {
  if (score >= 70) return '#E24B4A'
  if (score >= 40) return '#EF9F27'
  return '#1D9E75'
}

export function getScoreLabel(score) {
  if (score >= 70) return 'badge-high'
  if (score >= 40) return 'badge-med'
  return 'badge-low'
}

export default function ScoreBanner({ overall, verdict }) {
  const color = getScoreColor(overall)

  return (
    <div className="flex items-center gap-5 bg-neutral-900 border border-neutral-800 rounded-xl p-5">
      <div
        className="font-mono text-5xl font-bold leading-none tabular-nums"
        style={{ color }}
      >
        {overall}
      </div>
      <div className="border-l border-neutral-800 pl-5">
        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-1">
          influence score
        </p>
        <p className="text-base font-semibold text-neutral-100">{verdict}</p>
        <div className="mt-2 h-1.5 w-40 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${overall}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  )
}
