import { IMG } from "../api/tmdb.js"
import { useFavorites } from "../context/FavoritesContext.jsx"
import Reel from "./Reel.jsx"

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
  const cast = data.credits?.cast?.slice(0, 10) || []
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

  const backdropStyle = data.backdrop_path
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(14,13,11,0.5) 0%, rgba(14,13,11,0.92) 80%, rgba(14,13,11,1) 100%), url(${IMG.backdrop(
          data.backdrop_path
        )})`,
      }
    : undefined

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center pt-6 sm:pt-10 md:pt-14 pb-10 sm:pb-14 border-b border-brand-hairline/40"
        style={backdropStyle}
      >
        <div className="shell">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 lg:gap-12">
            {/* Poster Card */}
            <div className="w-48 sm:w-56 md:w-64 lg:w-72 shrink-0 aspect-[2/3] rounded-lg overflow-hidden border border-brand-hairline shadow-2xl bg-brand-surface">
              {data.poster_path ? (
                <img
                  src={IMG.poster(data.poster_path)}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center font-display text-sm text-brand-ink-muted bg-brand-surface">
                  {title}
                </div>
              )}
            </div>

            {/* Movie / Show Details */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-ink mb-2 leading-tight">
                {title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-brand-gold font-medium mb-3">
                {year && <span>{year}</span>}
                {year && runtime && <span>·</span>}
                {runtime && <span>{runtime}</span>}
                {(year || runtime) && data.vote_average ? <span>·</span> : null}
                {data.vote_average ? (
                  <span className="flex items-center gap-1 bg-brand-surface-raised px-2 py-0.5 rounded border border-brand-hairline">
                    <span>★</span>
                    <span className="text-brand-ink">{data.vote_average.toFixed(1)}</span>
                  </span>
                ) : null}
              </div>

              {/* Genres */}
              {data.genres?.length > 0 && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mb-4">
                  {data.genres.map((g) => (
                    <span
                      key={g.id}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-brand-surface border border-brand-hairline text-brand-ink-muted"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {data.overview && (
                <p className="text-sm sm:text-base text-brand-ink/90 leading-relaxed max-w-3xl mb-6">
                  {data.overview}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleFavorite}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    favorited
                      ? "bg-brand-gold text-brand-bg font-semibold shadow-md hover:bg-brand-gold-hover"
                      : "bg-brand-surface border border-brand-hairline text-brand-ink hover:border-brand-gold hover:text-brand-gold"
                  }`}
                >
                  <span>{favorited ? "★" : "☆"}</span>
                  <span>{favorited ? "Saved in Favorites" : "Save to Favorites"}</span>
                </button>

                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium bg-brand-velvet/20 border border-brand-velvet text-brand-ink hover:bg-brand-velvet transition-colors"
                  >
                    <span>▶</span>
                    <span>Watch Trailer</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      {cast.length > 0 && (
        <section className="shell py-8 sm:py-10 border-b border-brand-hairline/30">
          <h2 className="font-display font-medium text-lg sm:text-xl md:text-2xl text-brand-ink mb-4 sm:mb-6">
            Top Cast
          </h2>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 custom-scrollbar">
            {cast.map((person) => (
              <div
                key={person.id}
                className="flex-none w-20 sm:w-24 text-center group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-brand-hairline mx-auto mb-2 bg-brand-surface shadow-sm group-hover:border-brand-gold/60 transition-colors">
                  {person.profile_path ? (
                    <img
                      src={IMG.profile(person.profile_path)}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-brand-ink-muted bg-brand-surface">
                      👤
                    </div>
                  )}
                </div>
                <p className="font-medium text-xs text-brand-ink truncate group-hover:text-brand-gold transition-colors">
                  {person.name}
                </p>
                <p className="text-[11px] text-brand-ink-muted truncate mt-0.5">
                  {person.character}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Titles Reel */}
      {data.similar?.results?.length > 0 && (
        <div className="pt-8 sm:pt-10">
          <Reel
            title={mediaType === "movie" ? "Similar Movies" : "Similar Shows"}
            items={data.similar.results
              .slice(0, 12)
              .map((item) => ({ ...item, media_type: mediaType }))}
          />
        </div>
      )}
    </div>
  )
}
