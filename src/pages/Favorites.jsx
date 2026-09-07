import { Link } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext.jsx"
import PosterCard from "../components/PosterCard.jsx"

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="shell py-10 sm:py-14 animate-fade-in min-h-[70vh]">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-brand-hairline/40 flex items-center justify-between">
        <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-brand-ink">
          Your Saved Favorites
        </h1>
        {favorites.length > 0 && (
          <span className="text-xs sm:text-sm text-brand-ink-muted bg-brand-surface px-4 py-1.5 rounded-full border border-brand-hairline font-medium">
            {favorites.length} {favorites.length === 1 ? "title" : "titles"}
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center py-16 px-4">
          <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-hairline flex items-center justify-center text-brand-gold mb-4 text-3xl shadow-inner">
            ★
          </div>
          <h3 className="font-display font-medium text-xl sm:text-2xl text-brand-ink mb-2">
            No favorites saved yet
          </h3>
          <p className="text-sm text-brand-ink-muted max-w-sm mb-6 leading-relaxed">
            Click the star icon on any movie or TV show poster to save it to your personal watchlist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-brand-surface border border-brand-gold text-brand-gold text-sm font-medium hover:bg-brand-gold hover:text-brand-bg transition-colors shadow-md"
          >
            Explore trending titles →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
          {favorites.map((item) => (
            <PosterCard
              key={`${item.id}-${item.mediaType}`}
              item={{
                id: item.id,
                media_type: item.mediaType,
                title: item.mediaType === "movie" ? item.title : undefined,
                name: item.mediaType === "tv" ? item.title : undefined,
                poster_path: item.posterPath,
                release_date: item.mediaType === "movie" ? item.year : undefined,
                first_air_date: item.mediaType === "tv" ? item.year : undefined,
                vote_average: item.rating,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
