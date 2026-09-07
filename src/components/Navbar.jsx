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
      <div className="flex justify-between items-center px-4 sm:px-8 py-1.5 bg-brand-surface border-b border-brand-hairline/40 overflow-hidden select-none" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[1px] bg-brand-bg shrink-0 mx-1 opacity-70"
          />
        ))}
      </div>

      <div className="shell">
        <div className="flex items-center justify-between gap-4 sm:gap-8 py-4 sm:py-5">
          {/* Brand Logo */}
          <div className="flex items-center gap-8 lg:gap-12">
            <NavLink
              to="/"
              className="font-display font-bold text-2xl sm:text-3xl text-brand-ink hover:text-brand-gold transition-colors flex items-center gap-2.5 shrink-0 tracking-tight"
            >
              <span className="text-brand-gold text-2xl sm:text-3xl">🎞</span>
              <span>Nice Cambo Movie</span>
            </NavLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden sm:flex items-center gap-8" aria-label="Primary">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-base font-medium pb-1.5 border-b-2 transition-all ${isActive
                      ? "text-brand-ink border-brand-gold font-semibold"
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
            className="flex items-center rounded-lg px-3.5 py-2 sm:py-2.5 focus-within:border-brand-gold focus-within:ring-1 focus-within:ring-brand-gold transition-all w-full max-w-[220px] sm:max-w-xs md:max-w-sm lg:max-w-md shadow-sm"
          >
            <label htmlFor="site-search" className="sr-only">
              Search movies and TV shows
            </label>
            <input
              id="site-search"
              type="text"
              placeholder="Search movies, TV shows, actors…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-brand-ink placeholder-brand-ink-muted/70 border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 w-full"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-brand-ink-muted hover:text-brand-gold transition-colors pl-2.5 flex items-center justify-center cursor-pointer border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>

        {/* Mobile Navigation Tabs */}
        <nav className="flex sm:hidden items-center justify-around py-2.5 border-t border-brand-hairline/50 text-xs font-medium" aria-label="Mobile Primary">
          {LINKS.map((link) => {
            const isActive = link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to)
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={`px-5 py-1.5 rounded-full transition-colors ${isActive
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
