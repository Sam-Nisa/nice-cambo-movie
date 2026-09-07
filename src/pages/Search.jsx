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
    <div className="shell py-10 sm:py-14 animate-fade-in min-h-[70vh]">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-brand-hairline/40">
        <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-brand-ink">
          {query ? (
            <span>
              Results for <span className="text-brand-gold italic">“{query}”</span>
            </span>
          ) : (
            "Search for something to watch"
          )}
        </h1>
        {query && state.results.length > 0 && !state.loading && (
          <p className="text-sm sm:text-base text-brand-ink-muted mt-1.5 font-medium">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
          {state.results.map((item) => (
            <PosterCard key={`${item.id}-${item.media_type}`} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
