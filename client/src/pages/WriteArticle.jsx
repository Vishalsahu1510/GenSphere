import { Sparkles, PenLine } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import ToolWorkspace from '../components/ToolWorkspace'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <ToolWorkspace
      eyebrow="Writing"
      title="Articles"
      subtitle="Long-form drafts from a single prompt — pick a length and go."
    >
      <form onSubmit={onSubmitHandler} className="gs-card gs-card-pad">
        <div className="gs-panel-title">
          <div className="gs-panel-icon">
            <Sparkles className="h-5 w-5 text-sky-300" />
          </div>
          <div>
            <h2 className="gs-h1">Compose</h2>
            <p className="text-xs text-slate-500">Topic & length</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Topic</label>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="What should the article be about?"
              required
              className="gs-input mt-2"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Length</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {articleLength.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedLength(item)}
                  className={`gs-chip rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                    selectedLength.text === item.text
                      ? 'border-sky-500/40 bg-sky-500/15 text-sky-100'
                      : 'gs-chip-idle border-white/10'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="gs-btn gs-btn-pop w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 font-heading text-[15px] font-semibold shadow-lg shadow-cyan-900/20"
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" />
            ) : (
              <PenLine className="h-5 w-5" />
            )}
            Generate article
          </button>
        </div>
      </form>

      <div className="gs-card gs-card-pad flex min-h-[28rem] max-h-[min(70vh,640px)] flex-col">
        <div className="gs-panel-title">
          <div className="gs-panel-icon">
            <PenLine className="h-5 w-5 text-sky-300" />
          </div>
          <div>
            <h2 className="gs-h1">Draft</h2>
            <p className="text-xs text-slate-500">Markdown</p>
          </div>
        </div>

        {!content ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <PenLine className="h-7 w-7 text-slate-600" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Your article will appear here after generation.
            </p>
          </div>
        ) : (
          <div className="mt-6 min-h-0 flex-1 overflow-y-auto rounded-xl border border-white/[0.06] bg-black/20 p-4 text-sm leading-relaxed text-slate-200">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </ToolWorkspace>
  )
}

export default WriteArticle
