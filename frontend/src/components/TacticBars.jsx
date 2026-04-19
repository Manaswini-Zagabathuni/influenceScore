import { getScoreColor } from './ScoreBanner'

export default function TacticBars({ tactics }) {
  return (
    <div className="space-y-3">
      {tactics.map((tactic) => {
        const color = getScoreColor(tactic.score)
        return (
          <div key={tactic.name}>
            <div className="flex justify-between items-center mb-1">
              <span
                className="text-[11px] font-mono font-bold uppercase tracking-wider"
                style={{ color }}
              >
                {tactic.name}
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                {tactic.score}/100
              </span>
            </div>
            <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${tactic.score}%`, backgroundColor: color }}
              />
            </div>
            {tactic.note && (
              <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                {tactic.note}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
