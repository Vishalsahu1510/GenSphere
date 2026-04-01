import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Heart } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) => {
    if (!user) return
    try {
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchCreations()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex h-full min-h-[50vh] items-center justify-center">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--color-primary)] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="gs-main-inner min-h-full">
      <header className="mb-10">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90">Social</p>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Community</h1>
        <p className="mt-2 max-w-xl text-slate-400">
          Public gallery from the community — double-tap energy, save what inspires you.
        </p>
      </header>

      <div className="gs-card p-4 sm:p-6">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {creations.map((creation, index) => (
            <motion.div
              key={creation.id ?? index}
              className="mb-4 break-inside-avoid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.25) }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <img
                  src={creation.content}
                  alt=""
                  className="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className="line-clamp-3 text-sm text-white/95">{creation.prompt}</p>
                  <div className="mt-3 flex items-center justify-end gap-2 text-white">
                    <span className="text-xs font-medium">{creation.likes?.length ?? 0}</span>
                    <button
                      type="button"
                      onClick={() => imageLikeToggle(creation.id)}
                      className="rounded-full bg-white/10 p-2 backdrop-blur transition hover:bg-white/20"
                      aria-label="Like"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          user && creation.likes?.includes(user.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-white'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community
