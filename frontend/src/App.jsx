import { useState } from 'react'
import Header from './components/Header'
import TextInput from './components/TextInput'
import ResultsPanel from './components/ResultsPanel'
import { analyzeText } from './api'

export default function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleAnalyze() {
    if (!text.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeText(text)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Header />

        <TextInput
          value={text}
          onChange={setText}
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-950 border border-red-800 rounded-xl text-red-300 text-sm font-mono">
            ⚠ {error}
          </div>
        )}

        {(loading || result) && (
          <ResultsPanel result={result} loading={loading} />
        )}
      </div>
    </div>
  )
}
