import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className="flex h-screen flex-col bg-[#030712] text-slate-100 md:flex-row">
      {/* Mobile top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#030712]/90 px-4 backdrop-blur-xl md:hidden">
        <img
          className="h-8 w-auto cursor-pointer"
          src={assets.logo}
          alt="GenSphere"
          onClick={() => navigate('/')}
        />
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200"
          onClick={() => setSidebarOpen((o) => !o)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar sidebar={sidebarOpen} setSidebar={setSidebarOpen} />

      <main className="gs-main flex-1">
        <Outlet />
      </main>
    </div>
  ) : (
    <div className="flex h-screen items-center justify-center bg-[#030712] text-slate-100">
      <SignIn />
    </div>
  )
}

export default Layout
