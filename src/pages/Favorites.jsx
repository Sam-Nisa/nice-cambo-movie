import { useFavorites } from "../context/FavoritesContext.jsx"
import PosterCard from "../components/PosterCard.jsx"
import { EmptyState } from "../components/Status.jsx"
import "./Grid.css"

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="shell grid-page">
      <h1 className="grid-page__title">Your favorites</h1>

      {favorites.length === 0 ? (
        <EmptyState message="Nothing saved yet. Tap the star on any title to keep it here." />
      ) : (
        <div className="grid-page__grid">
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
