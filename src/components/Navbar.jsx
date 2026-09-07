import { useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/favorites", label: "Favorites" },
]

export default function Navbar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(e) {
    e.preventDefault()
    const q = query.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-hairline transition-colors">
      {/* Decorative film sprockets strip */}
      <div className="flex justify-between items-center px-3 sm:px-6 py-1 bg-brand-surface border-b border-brand-hairline/40 overflow-hidden select-none" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[1px] bg-brand-bg shrink-0 mx-1 opacity-70"
          />
        ))}
      </div>

      <div className="shell">
        <div className="flex items-center justify-between gap-3 sm:gap-6 py-3 sm:py-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <NavLink
              to="/"
              className="font-display font-bold text-xl sm:text-2xl text-brand-ink hover:text-brand-gold transition-colors flex items-center gap-2 shrink-0 tracking-tight"
            >
              <span className="text-brand-gold text-lg">🎞</span>
              Reel
            </NavLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden sm:flex items-center gap-6" aria-label="Primary">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-sm font-medium pb-1 border-b-2 transition-all ${
                      isActive
                        ? "text-brand-ink border-brand-gold"
                        : "text-brand-ink-muted border-transparent hover:text-brand-ink hover:border-brand-hairline"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSubmit}
            role="search"
            className="flex items-center bg-brand-surface border border-brand-hairline rounded-md px-3 py-1.5 focus-within:border-brand-gold focus-within:ring-1 focus-within:ring-brand-gold transition-all w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px]"
          >
            <label htmlFor="site-search" className="sr-only">
              Search movies and TV shows
            </label>
            <input
              id="site-search"
              type="text"
              placeholder="Search titles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-brand-ink placeholder-brand-ink-muted/70 outline-none w-full"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-brand-ink-muted hover:text-brand-gold transition-colors pl-2 flex items-center justify-center text-sm sm:text-base cursor-pointer"
            >
              ⌕
            </button>
          </form>
        </div>

        {/* Mobile Navigation Tabs */}
        <nav className="flex sm:hidden items-center justify-around py-2 border-t border-brand-hairline/50 text-xs font-medium" aria-label="Mobile Primary">
          {LINKS.map((link) => {
            const isActive = link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to)
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={`px-4 py-1 rounded-full transition-colors ${
                  isActive
                    ? "bg-brand-surface-raised text-brand-gold font-semibold border border-brand-hairline"
                    : "text-brand-ink-muted hover:text-brand-ink"
                }`}
              >
                {link.label}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
