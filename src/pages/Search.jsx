import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { tmdb } from "../api/tmdb.js"
import PosterCard from "../components/PosterCard.jsx"
import { Loading, ErrorState, EmptyState } from "../components/Status.jsx"

export default function Search() {
  const [params] = useSearchParams()
  const query = params.get("q") || ""
  const [state, setState] = useState({ loading: false, error: null, results: [] })

  useEffect(() => {
    if (!query) {
      setState({ loading: false, error: null, results: [] })
      return
    }
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    tmdb
      .searchMulti(query)
      .then((data) => {
        if (!cancelled) {
          const results = data.results.filter(
            (r) => r.media_type === "movie" || r.media_type === "tv"
          )
          setState({ loading: false, error: null, results })
        }
      })
      .catch((err) => {
        if (!cancelled) setState({ loading: false, error: err.message, results: [] })
      })
    return () => {
      cancelled = true
    }
  }, [query])

  return (
    <div className="shell py-8 sm:py-12 animate-fade-in min-h-[70vh]">
      <div className="mb-6 sm:mb-8 pb-4 border-b border-brand-hairline/40">
        <h1 className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-brand-ink">
          {query ? (
            <span>
              Results for <span className="text-brand-gold italic">“{query}”</span>
            </span>
          ) : (
            "Search for something to watch"
          )}
        </h1>
        {query && state.results.length > 0 && !state.loading && (
          <p className="text-xs sm:text-sm text-brand-ink-muted mt-1">
            Found {state.results.length} matching {state.results.length === 1 ? "title" : "titles"}
          </p>
        )}
      </div>

      {state.loading && <Loading label="Searching the archives" />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && query && state.results.length === 0 && (
        <EmptyState message="No titles matched your search. Try a different spelling or a broader keyword." />
      )}

      {!state.loading && state.results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {state.results.map((item) => (
            <PosterCard key={`${item.id}-${item.media_type}`} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
