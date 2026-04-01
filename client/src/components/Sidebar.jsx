import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import {
  Eraser,
  FileText,
  Hash,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  PenLine,
  Scissors,
  Users,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const navItems = [
  { to: '/ai', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ai/write-article', label: 'Write article', icon: PenLine },
  { to: '/ai/blog-titles', label: 'Blog titles', icon: Hash },
  { to: '/ai/generate-images', label: 'Images', icon: ImagePlus },
  { to: '/ai/remove-background', label: 'Remove background', icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove object', icon: Scissors },
  { to: '/ai/review-resume', label: 'Resume review', icon: FileText },
  { to: '/ai/community', label: 'Community', icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const navigate = useNavigate()

  return (
    <aside
      className={[
        'fixed z-50 flex w-[280px] flex-col border-r border-white/[0.06] bg-[#030712]/95 backdrop-blur-xl transition-transform duration-300 md:static md:h-screen',
        'max-md:top-14 max-md:h-[calc(100vh-3.5rem)]',
        sidebar ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
      ].join(' ')}
    >
      {/* Brand — desktop only in sidebar (mobile uses logo in header) */}
      <div className="hidden border-b border-white/[0.06] px-5 py-5 md:block">
        <button
          type="button"
          onClick={() => {
            setSidebar(false)
            navigate('/')
          }}
          className="block w-full text-left"
        >
          <img src={assets.logo} alt="GenSphere" className="h-9 w-auto max-w-[200px]" />
        </button>
        <p className="mt-3 font-heading text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
          Studio
        </p>
      </div>

      {/* Profile (single card: name + plan) */}
      <div className="border-b border-white/[0.06] px-5 py-5">
        <button
          type="button"
          onClick={openUserProfile}
          className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-left transition hover:bg-white/[0.05]"
        >
          <div className="flex items-center gap-3">
            <img
              src={user.imageUrl}
              alt=""
              className="h-11 w-11 rounded-2xl object-cover ring-2 ring-white/10"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-semibold text-white">{user.fullName}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>{' '}
                plan
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Nav */}
      <nav className="gs-scrollbar-hide flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Tools
        </p>
        <ul className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/ai'} onClick={() => setSidebar(false)}>
                {({ isActive }) => (
                  <div
                    className={[
                      'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-violet-600/25 to-fuchsia-600/10 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.35)]'
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                        isActive
                          ? 'bg-white/10 text-violet-200'
                          : 'bg-white/[0.03] text-slate-500',
                      ].join(' ')}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="font-heading text-[13px] tracking-tight">{label}</span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-4">
        <button
          type="button"
          onClick={() => signOut()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 text-xs font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-slate-200"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
