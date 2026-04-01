import { useState } from 'react'
import { Sparkles, Hash } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import ToolWorkspace from '../components/ToolWorkspace'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitles = () => {
  const blogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Travel',
    'Education',
    'Entertainment',
    'Sports',
    'Food',
  ]

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the ${selectedCategory}`

      const { data } = await axios.post(
        '/api/ai/generate-blog-title',
        { prompt },
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
      eyebrow="Content"
      title="Blog titles"
      subtitle="Drop a keyword, pick a vibe, and get scroll-stopping headline ideas in seconds."
    >
      <form onSubmit={onSubmitHandler} className="gs-card gs-card-pad">
        <div className="gs-panel-title">
          <div className="gs-panel-icon">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="gs-h1">Generator</h2>
            <p className="text-xs text-slate-500">Keyword & category</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Keyword</label>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="e.g. sustainable travel, AI coding, morning routines…"
              required
              className="gs-input mt-2"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Category</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {blogCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedCategory(item)}
                  className={`gs-chip rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                    selectedCategory === item
                      ? 'border-violet-500/40 bg-violet-500/20 text-violet-100'
                      : 'gs-chip-idle border-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="gs-btn gs-btn-pop mt-2 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 py-3 font-heading text-[15px] font-semibold shadow-lg shadow-violet-900/30"
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" />
            ) : (
              <Hash className="h-5 w-5" />
            )}
            Generate titles
          </button>
        </div>
      </form>

      <div className="gs-card gs-card-pad flex min-h-[28rem] flex-col">
        <div className="gs-panel-title">
          <div className="gs-panel-icon">
            <Hash className="h-5 w-5" />
          </div>
          <div>
            <h2 className="gs-h1">Output</h2>
            <p className="text-xs text-slate-500">Markdown preview</p>
          </div>
        </div>

        {!content ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <Hash className="h-7 w-7 text-slate-600" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Enter a keyword and tap <span className="text-slate-400">Generate titles</span> to see ideas here.
            </p>
          </div>
        ) : (
          <div className="mt-6 h-full min-h-0 flex-1 overflow-y-auto rounded-xl border border-white/[0.06] bg-black/20 p-4 text-sm leading-relaxed text-slate-200">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </ToolWorkspace>
  )
}

export default BlogTitles
