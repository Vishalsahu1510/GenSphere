import { DownloadIcon, Eraser, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import ToolWorkspace from '../components/ToolWorkspace'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveBackground = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', input)

      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
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
      eyebrow="Photo"
      title="Remove background"
      subtitle="Upload an image and get a clean cutout — great for product shots and portraits."
    >
      <form onSubmit={onSubmitHandler} className="gs-card gs-card-pad">
        <div className="gs-panel-title">
          <div className="gs-panel-icon bg-gradient-to-br from-rose-500/25 to-amber-500/15 text-rose-100">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="gs-h1">Upload</h2>
            <p className="text-xs text-slate-500">JPG, PNG…</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Image</label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            required
            className="gs-file"
          />
          <p className="text-xs text-slate-500">Supports common image formats.</p>

          <button
            disabled={loading}
            type="submit"
            className="gs-btn gs-btn-pop w-full rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 font-heading text-[15px] font-semibold shadow-lg shadow-rose-900/20"
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" />
            ) : (
              <Eraser className="h-5 w-5" />
            )}
            Remove background
          </button>
        </div>
      </form>

      <div className="gs-card gs-card-pad flex min-h-[28rem] flex-col">
        <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="gs-panel-icon bg-gradient-to-br from-rose-500/25 to-amber-500/15 text-rose-100">
              <Eraser className="h-5 w-5" />
            </div>
            <div>
              <h2 className="gs-h1">Result</h2>
              <p className="text-xs text-slate-500">Preview</p>
            </div>
          </div>
          {content ? (
            <button
              type="button"
              disabled={loading}
              onClick={() => downloadImage(content)}
              className="rounded-xl bg-rose-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-95 disabled:opacity-60"
            >
              Download
            </button>
          ) : (
            <DownloadIcon className="h-5 w-5 text-rose-500/40" />
          )}
        </div>

        {!content ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <Eraser className="h-7 w-7 text-slate-600" />
            </div>
            <p className="max-w-xs text-sm text-slate-500">Upload and process to preview here.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[repeating-conic-gradient(#0f172a_0%_25%,#1e293b_0%_50%)] bg-[length:16px_16px] p-2">
            <img src={content} alt="Processed" className="mx-auto max-h-[420px] w-full object-contain" />
          </div>
        )}
      </div>
    </ToolWorkspace>
  )
}

export default RemoveBackground
