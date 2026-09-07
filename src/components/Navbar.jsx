import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/favorites", label: "Favorites" },
]

export default function Navbar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const q = query.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="nav">
      <div className="nav__sprockets" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="shell nav__row">
        <NavLink to="/" className="nav__brand">
          Reel
        </NavLink>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form className="nav__search" onSubmit={handleSubmit} role="search">
          <label htmlFor="site-search" className="sr-only">
            Search movies and TV shows
          </label>
          <input
            id="site-search"
            type="text"
            placeholder="Search titles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            ⌕
          </button>
        </form>
      </div>
    </header>
  )
}
