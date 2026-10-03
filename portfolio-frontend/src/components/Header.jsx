import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
{ name: 'Home', path: '/' },
{ name: 'About', path: '/about' },
{ name: 'Skills', path: '/skills' },
{ name: 'Projects', path: '/projects' },
{ name: 'Experience', path: '/experience' },
{ name: 'Resume', path: '/resume' },
{ name: 'Feedback', path: '/feedback' },
{ name: 'Contact', path: '/contact' },
]

function Header() {
const [menuOpen, setMenuOpen] = useState(false)

const linkClass = ({ isActive }) =>
`transition-colors duration-200 ${
      isActive
        ? 'text-violet-600 font-semibold'
        : 'text-slate-600 hover:text-violet-600'
    }`

return ( <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"> <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
<NavLink
to="/"
onClick={() => setMenuOpen(false)}
className="min-w-0"
> <span className="block text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
Karishma Shaik<span className="text-violet-600">.</span> </span> <span className="block text-xs text-slate-500">
CSE Graduate · KL University </span> </NavLink>


    <nav className="hidden items-center gap-5 xl:flex">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === '/'}
          className={linkClass}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>

    <button
      type="button"
      aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen(!menuOpen)}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-2xl text-slate-800 hover:bg-slate-100 xl:hidden"
    >
      {menuOpen ? '×' : '☰'}
    </button>
  </div>

  {menuOpen && (
    <nav className="border-t border-slate-200 bg-white px-5 py-4 xl:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-violet-50 font-semibold text-violet-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  )}
</header>


)
}

export default Header
