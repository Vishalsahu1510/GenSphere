import { Protect } from '@clerk/clerk-react'
import { Gem, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` },
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

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className="gs-main-inner min-h-full">
      <header className="mb-10 max-w-2xl">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90">Overview</p>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Dashboard</h1>
        <p className="mt-2 text-slate-400">Your creations and plan at a glance.</p>
      </header>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="gs-card gs-card-pad flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total creations</p>
            <p className="font-heading mt-1 text-3xl font-bold tabular-nums text-white">{creations.length}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="gs-card gs-card-pad flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Plan</p>
            <p className="font-heading mt-1 text-3xl font-bold capitalize text-white">
              <Protect plan="premium" fallback="free">
                Premium
              </Protect>
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-600/25">
            <Gem className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="h-11 w-11 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      ) : (
        <section>
          <h2 className="font-heading mb-4 text-lg font-semibold text-white">Recent activity</h2>
          <div className="space-y-3">
            {creations.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.3) }}
              >
                <CreationItem item={item} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Dashboard
