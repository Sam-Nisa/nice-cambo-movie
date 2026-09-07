import { Link } from "react-router-dom"

const POPULAR_GENRES = [
  { id: 28, label: "Action" },
  { id: 35, label: "Comedy" },
  { id: 18, label: "Drama" },
  { id: 27, label: "Horror" },
  { id: 878, label: "Sci-Fi" },
  { id: 10749, label: "Romance" },
  { id: 16, label: "Animation" },
  { id: 53, label: "Thriller" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 sm:mt-24 bg-brand-surface border-t border-brand-hairline">
      {/* Decorative film sprocket holes */}
      <div className="flex justify-between items-center px-4 sm:px-8 py-1.5 bg-brand-surface-raised border-b border-brand-hairline/40 overflow-hidden select-none" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[1px] bg-brand-bg shrink-0 mx-1 opacity-70"
          />
        ))}
      </div>

      <div className="shell py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="sm:col-span-2">
            <Link
              to="/"
              className="font-display font-bold text-2xl sm:text-3xl text-brand-ink hover:text-brand-gold transition-colors flex items-center gap-2.5 mb-3"
            >
              <span className="text-brand-gold text-2xl sm:text-3xl">🎞</span>
              <span>Nice Cambo Movie</span>
            </Link>
            <p className="text-sm text-brand-ink-muted leading-relaxed max-w-md mb-6">
              Your premier cinema destination for exploring the latest movies, trending TV series,
              cast details, and curating your personal watchlist.
            </p>
            <div className="flex items-center gap-3 text-xs text-brand-ink-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live TMDB catalog connected</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-display font-semibold text-base sm:text-lg text-brand-ink mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-brand-ink-muted">
              <li>
                <Link to="/" className="hover:text-brand-gold transition-colors">
                  Home & Trending
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-brand-gold transition-colors">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-brand-gold transition-colors">
                  Search Titles
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Genres */}
          <div>
            <h3 className="font-display font-semibold text-base sm:text-lg text-brand-ink mb-4">
              Genres
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-brand-ink-muted">
              {POPULAR_GENRES.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className="hover:text-brand-gold transition-colors truncate"
                >
                  {genre.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar & TMDB Attribution */}
        <div className="mt-12 pt-8 border-t border-brand-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-ink-muted text-center sm:text-left">
          <p>
            © {currentYear} <span className="text-brand-ink font-medium">Nice Cambo Movie</span>. All rights reserved.
          </p>
          <p className="max-w-md">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  )
}
