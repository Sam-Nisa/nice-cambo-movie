import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tmdb } from "../api/tmdb.js"
import PosterCard from "../components/PosterCard.jsx"
import { Loading, ErrorState, EmptyState } from "../components/Status.jsx"

export default function Genre() {
  const { id } = useParams()
  const [state, setState] = useState({ loading: true, error: null, results: [] })
  const [genreName, setGenreName] = useState("")
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    setPage(1)
    setState({ loading: true, error: null, results: [] })

    Promise.all([tmdb.movieGenres(), tmdb.discoverByGenre(id, "movie", 1)])
      .then(([genres, discover]) => {
        const match = genres.genres.find((g) => String(g.id) === String(id))
        setGenreName(match ? match.name : "Genre")
        setState({ loading: false, error: null, results: discover.results })
      })
      .catch((err) => setState({ loading: false, error: err.message, results: [] }))
  }, [id])

  function loadMore() {
    const nextPage = page + 1
    setLoadingMore(true)
    tmdb
      .discoverByGenre(id, "movie", nextPage)
      .then((data) => {
        setState((s) => ({ ...s, results: [...s.results, ...data.results] }))
        setPage(nextPage)
      })
      .finally(() => {
        setLoadingMore(false)
      })
  }

  return (
    <div className="shell py-8 sm:py-12 animate-fade-in min-h-[70vh]">
      <div className="mb-6 sm:mb-8 pb-4 border-b border-brand-hairline/40 flex items-center justify-between">
        <h1 className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-brand-ink">
          {genreName || "Loading genre…"}
        </h1>
        {state.results.length > 0 && (
          <span className="text-xs sm:text-sm text-brand-ink-muted">
            {state.results.length} titles
          </span>
        )}
      </div>

      {state.loading && <Loading label="Gathering titles" />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && state.results.length === 0 && (
        <EmptyState message="Nothing found for this genre right now." />
      )}

      {state.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {state.results.map((item) => (
              <PosterCard key={`${item.id}-${item.title}`} item={{ ...item, media_type: "movie" }} />
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-brand-surface border border-brand-hairline text-brand-ink text-xs sm:text-sm font-medium hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-brand-hairline border-t-brand-gold animate-spin" />
                  <span>Loading more…</span>
                </>
              ) : (
                "Load more titles"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
