import { FileText, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import ToolWorkspace from '../components/ToolWorkspace'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const ReviewResume = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('resume', input)

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

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
      eyebrow="Career"
      title="Resume review"
      subtitle="Upload a PDF and get structured feedback to stand out in applications."
    >
      <form onSubmit={onSubmitHandler} className="gs-card gs-card-pad">
        <div className="gs-panel-title">
          <div className="gs-panel-icon bg-gradient-to-br from-emerald-500/25 to-cyan-600/15 text-emerald-100">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="gs-h1">Upload</h2>
            <p className="text-xs text-slate-500">PDF only</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Resume (PDF)</label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            required
            className="gs-file"
          />
          <p className="text-xs text-slate-500">Max ~5MB, resume PDFs only.</p>

          <button
            disabled={loading}
            type="submit"
            className="gs-btn gs-btn-pop w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-heading text-[15px] font-semibold shadow-lg shadow-emerald-900/20"
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" />
            ) : (
              <FileText className="h-5 w-5" />
            )}
            Review resume
          </button>
        </div>
      </form>

      <div className="gs-card gs-card-pad flex min-h-[28rem] max-h-[min(70vh,640px)] flex-col">
        <div className="gs-panel-title">
          <div className="gs-panel-icon bg-gradient-to-br from-emerald-500/25 to-cyan-600/15 text-emerald-100">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="gs-h1">Analysis</h2>
            <p className="text-xs text-slate-500">Markdown report</p>
          </div>
        </div>

        {!content ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <FileText className="h-7 w-7 text-slate-600" />
            </div>
            <p className="max-w-xs text-sm text-slate-500">Feedback will appear here after upload.</p>
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

export default ReviewResume
