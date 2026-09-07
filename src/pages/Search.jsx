import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { tmdb } from "../api/tmdb.js"
import PosterCard from "../components/PosterCard.jsx"
import { Loading, ErrorState, EmptyState } from "../components/Status.jsx"
import "./Grid.css"

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
    <div className="shell grid-page">
      <h1 className="grid-page__title">
        {query ? `Results for “${query}”` : "Search for something to watch"}
      </h1>

      {state.loading && <Loading label="Searching" />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && query && state.results.length === 0 && (
        <EmptyState message="No titles matched. Try a different spelling or a broader term." />
      )}

      {!state.loading && state.results.length > 0 && (
        <div className="grid-page__grid">
          {state.results.map((item) => (
            <PosterCard key={`${item.id}-${item.media_type}`} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
