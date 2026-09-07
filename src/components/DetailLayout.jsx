import { IMG } from "../api/tmdb.js"
import { useFavorites } from "../context/FavoritesContext.jsx"
import Reel from "./Reel.jsx"
import "./DetailLayout.css"

export default function DetailLayout({ data, mediaType }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const title = data.title || data.name
  const year = (data.release_date || data.first_air_date || "").slice(0, 4)
  const runtime = data.runtime
    ? `${data.runtime} min`
    : data.episode_run_time?.[0]
    ? `${data.episode_run_time[0]} min / ep`
    : null
  const trailer = data.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )
  const cast = data.credits?.cast?.slice(0, 8) || []
  const favorited = isFavorite(data.id, mediaType)

  function handleFavorite() {
    toggleFavorite({
      id: data.id,
      mediaType,
      title,
      posterPath: data.poster_path,
      year,
      rating: data.vote_average,
    })
  }

  return (
    <div>
      <section
        className="detail-hero"
        style={{
          backgroundImage: data.backdrop_path
            ? `linear-gradient(180deg, rgba(14,13,11,0.35) 0%, rgba(14,13,11,0.97) 95%), url(${IMG.backdrop(
                data.backdrop_path
              )})`
            : "none",
        }}
      >
        <div className="shell detail-hero__row">
          <div className="detail-hero__poster">
            {data.poster_path ? (
              <img src={IMG.poster(data.poster_path)} alt={title} />
            ) : (
              <div className="detail-hero__poster-placeholder">{title}</div>
            )}
          </div>

          <div className="detail-hero__info">
            <h1>{title}</h1>
            <p className="detail-hero__meta">
              {[year, runtime, data.vote_average ? `★ ${data.vote_average.toFixed(1)}` : null]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
            <p className="detail-hero__genres">
              {data.genres?.map((g) => g.name).join(", ")}
            </p>
            <p className="detail-hero__overview">{data.overview}</p>

            <div className="detail-hero__actions">
              <button
                className={
                  favorited
                    ? "detail-hero__fav detail-hero__fav--active"
                    : "detail-hero__fav"
                }
                onClick={handleFavorite}
              >
                {favorited ? "★ Saved" : "☆ Save to favorites"}
              </button>
              {trailer && (
                <a
                  className="detail-hero__trailer"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {cast.length > 0 && (
        <section className="shell cast">
          <h2>Cast</h2>
          <div className="cast__row">
            {cast.map((person) => (
              <div className="cast__person" key={person.id}>
                <div className="cast__photo">
                  {person.profile_path ? (
                    <img src={IMG.profile(person.profile_path)} alt={person.name} />
                  ) : (
                    <div className="cast__photo-placeholder" />
                  )}
                </div>
                <p className="cast__name">{person.name}</p>
                <p className="cast__character">{person.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.similar?.results?.length > 0 && (
        <Reel
          title={mediaType === "movie" ? "Similar movies" : "Similar shows"}
          items={data.similar.results
            .slice(0, 12)
            .map((item) => ({ ...item, media_type: mediaType }))}
        />
      )}
    </div>
  )
}
