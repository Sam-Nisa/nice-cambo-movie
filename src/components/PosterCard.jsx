import { Link } from "react-router-dom"
import { IMG } from "../api/tmdb.js"
import { useFavorites } from "../context/FavoritesContext.jsx"

export default function PosterCard({ item }) {
  const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie")
  const title = item.title || item.name
  const year = (item.release_date || item.first_air_date || "").slice(0, 4)
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(item.id, mediaType)

  function handleFavoriteClick(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      id: item.id,
      mediaType,
      title,
      posterPath: item.poster_path,
      year,
      rating: item.vote_average,
    })
  }

  return (
    <Link
      to={`/${mediaType}/${item.id}`}
      className="group block w-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg"
    >
      <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-brand-surface border border-brand-hairline group-hover:border-brand-gold/60 shadow-lg group-hover:shadow-2xl group-hover:shadow-brand-gold/10 transition-all duration-300">
        {item.poster_path ? (
          <img
            src={IMG.poster(item.poster_path)}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 text-center font-display text-sm text-brand-ink-muted bg-brand-surface">
            {title}
          </div>
        )}

        {/* Floating Favorite Star */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-pressed={favorited}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 z-10 ${
            favorited
              ? "bg-brand-bg/90 border border-brand-gold text-brand-gold shadow-lg"
              : "bg-brand-bg/75 border border-brand-hairline text-brand-ink-muted hover:text-brand-gold hover:border-brand-gold/70 hover:scale-110"
          }`}
        >
          <span className="text-sm sm:text-base leading-none">★</span>
        </button>
      </div>

      <div className="mt-3">
        <p className="font-semibold text-sm sm:text-base text-brand-ink truncate group-hover:text-brand-gold transition-colors">
          {title}
        </p>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-ink-muted mt-1 font-medium">
          <span>{year || "—"}</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-brand-gold">
            <span>★</span>
            <span className="text-brand-ink-muted">
              {item.vote_average ? item.vote_average.toFixed(1) : "n/a"}
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
