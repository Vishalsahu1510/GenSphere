import { useState } from 'react'
import { Sparkles, Hash, Image, DownloadIcon } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import ToolWorkspace from '../components/ToolWorkspace'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const imagestyle = [
  'Realistic',
  'Fantasy style',
  'Ghibli style',
  'Realistic style',
  '3D style',
  'Anime style',
  'Portrait style',
  'cartoon style',
]

const Generatelmages = () => {
  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the ${selectedStyle} style`

      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
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

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' })
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'image_By_GenSphere.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  }

  return (
    <ToolWorkspace
      eyebrow="Visual"
      title="Image generation"
      subtitle="Describe a scene, pick a style, and generate art-ready visuals."
    >
      <form onSubmit={onSubmitHandler} className="gs-card gs-card-pad">
        <div className="gs-panel-title">
          <div className="gs-panel-icon bg-gradient-to-br from-emerald-500/25 to-teal-500/15 text-emerald-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="gs-h1">Prompt</h2>
            <p className="text-xs text-slate-500">Style & visibility</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Description</label>
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={4}
              placeholder="Describe what you want to see…"
              required
              className="gs-input mt-2 min-h-[120px] resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Style</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {imagestyle.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedStyle(item)}
                  className={`gs-chip rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                    selectedStyle === item
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100'
                      : 'gs-chip-idle border-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full border border-white/10 bg-white/10 transition peer-checked:bg-emerald-500" />
              <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition peer-checked:translate-x-4" />
            </label>
            <span className="text-sm text-slate-300">Public in community gallery</span>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="gs-btn gs-btn-pop w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 font-heading text-[15px] font-semibold shadow-lg shadow-emerald-900/25"
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" />
            ) : (
              <Image className="h-5 w-5" />
            )}
            Generate image
          </button>
        </div>
      </form>

      <div className="gs-card gs-card-pad flex min-h-[28rem] flex-col">
        <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div className="gs-panel-title border-0 pb-0">
            <div className="gs-panel-icon bg-gradient-to-br from-emerald-500/25 to-teal-500/15 text-emerald-200">
              <Image className="h-5 w-5" />
            </div>
            <div>
              <h2 className="gs-h1">Result</h2>
              <p className="text-xs text-slate-500">Preview & download</p>
            </div>
          </div>
          {content ? (
            <button
              type="button"
              disabled={loading}
              onClick={() => downloadImage(content)}
              className="shrink-0 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-95 disabled:opacity-60"
            >
              Download
            </button>
          ) : (
            <DownloadIcon className="h-5 w-5 shrink-0 text-emerald-500/50" />
          )}
        </div>

        {!content ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <Hash className="h-7 w-7 text-slate-600" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Enter a prompt and generate to see your image here.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <img src={content} alt='Generated' className="h-full w-full object-contain" />
          </div>
        )}
      </div>
    </ToolWorkspace>
  )
}

export default Generatelmages
