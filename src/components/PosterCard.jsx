import { Link } from "react-router-dom"
import { IMG } from "../api/tmdb.js"
import { useFavorites } from "../context/FavoritesContext.jsx"
import "./PosterCard.css"

export default function PosterCard({ item }) {
  const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie")
  const title = item.title || item.name
  const year = (item.release_date || item.first_air_date || "").slice(0, 4)
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(item.id, mediaType)

  function handleFavoriteClick(e) {
    e.preventDefault()
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
    <Link to={`/${mediaType}/${item.id}`} className="poster-card">
      <div className="poster-card__frame">
        {item.poster_path ? (
          <img src={IMG.poster(item.poster_path)} alt={title} loading="lazy" />
        ) : (
          <div className="poster-card__placeholder">{title}</div>
        )}
        <button
          className={
            favorited
              ? "poster-card__fav poster-card__fav--active"
              : "poster-card__fav"
          }
          onClick={handleFavoriteClick}
          aria-pressed={favorited}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          ★
        </button>
      </div>
      <p className="poster-card__title">{title}</p>
      <p className="poster-card__meta">
        {year || "—"} · {item.vote_average ? item.vote_average.toFixed(1) : "n/a"}
      </p>
    </Link>
  )
}
