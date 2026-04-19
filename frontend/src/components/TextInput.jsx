const EXAMPLES = {
  neutral: {
    label: 'neutral text',
    text: 'I made coffee this morning. It was warm and tasted good. I enjoyed it while reading the newspaper.',
  },
  ad: {
    label: 'ad copy',
    text: 'ACT NOW — LIMITED TIME ONLY! Industry experts and 2 million customers agree: this is the #1 breakthrough of the decade. Once it\'s gone, it\'s GONE FOREVER. Don\'t be the only one left behind.',
  },
  political: {
    label: 'political speech',
    text: 'Our great nation is under attack. Real Americans know what\'s at stake. The radical opposition will destroy everything our families have built. We are running out of time — only you can stop them. Join us before it\'s too late.',
  },
  news: {
    label: 'news headline',
    text: 'BREAKING: Renowned scientists WARN of imminent catastrophe as secret government data confirms worst fears. Sources close to the top say authorities are hiding the truth. Share this before it gets deleted.',
  },
}

export default function TextInput({ value, onChange, onAnalyze, loading }) {
  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') onAnalyze()
  }

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste any text — a news headline, WhatsApp forward, political speech, ad copy, or social media post..."
        rows={5}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-sm text-neutral-100 placeholder-neutral-600 resize-y focus:outline-none focus:border-neutral-600 transition-colors font-sans leading-relaxed"
      />

      <div className="flex flex-wrap gap-2 mt-3">
        {Object.entries(EXAMPLES).map(([key, ex]) => (
          <button
            key={key}
            onClick={() => onChange(ex.text)}
            className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-600 transition-all"
          >
            try: {ex.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onAnalyze}
          disabled={loading || !value.trim()}
          className="font-mono font-bold text-sm px-5 py-2.5 bg-neutral-100 text-neutral-900 rounded-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {loading ? 'analyzing...' : 'analyze text →'}
        </button>
        <span className="text-[11px] text-neutral-600 font-mono hidden sm:block">
          or press ⌘ + Enter
        </span>
      </div>
    </div>
  )
}
