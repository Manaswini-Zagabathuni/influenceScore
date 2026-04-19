import RadarChart from './RadarChart'
import TacticBars from './TacticBars'
import ScoreBanner from './ScoreBanner'

export default function ResultsPanel({ result, loading }) {
  if (loading) {
    return (
      <div className="mt-10">
        <LoadingSkeleton />
      </div>
    )
  }

  if (!result) return null

  return (
    <div className="mt-10 space-y-4 animate-fade-in">
      <ScoreBanner overall={result.overall} verdict={result.verdict} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-4">
            tactic radar
          </p>
          <RadarChart tactics={result.tactics} />
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
          <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-4">
            tactic breakdown
          </p>
          <TacticBars tactics={result.tactics} />
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-3">
          plain-english breakdown
        </p>
        <p className="text-sm text-neutral-300 leading-relaxed">{result.analysis}</p>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  const msgs = [
    'scanning for fear language...',
    'detecting authority signals...',
    'checking for scarcity cues...',
    'computing influence score...',
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-neutral-500 text-sm font-mono">
        <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-300 rounded-full animate-spin" />
        <span className="animate-pulse">{msgs[Math.floor(Date.now() / 2000) % msgs.length]}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 h-64 animate-pulse" />
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 h-64 animate-pulse" />
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 h-24 animate-pulse" />
    </div>
  )
}
