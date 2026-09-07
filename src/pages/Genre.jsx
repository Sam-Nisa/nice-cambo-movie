import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tmdb } from "../api/tmdb.js"
import PosterCard from "../components/PosterCard.jsx"
import { Loading, ErrorState, EmptyState } from "../components/Status.jsx"
import "./Grid.css"

export default function Genre() {
  const { id } = useParams()
  const [state, setState] = useState({ loading: true, error: null, results: [] })
  const [genreName, setGenreName] = useState("")
  const [page, setPage] = useState(1)

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
    tmdb.discoverByGenre(id, "movie", nextPage).then((data) => {
      setState((s) => ({ ...s, results: [...s.results, ...data.results] }))
      setPage(nextPage)
    })
  }

  return (
    <div className="shell grid-page">
      <h1 className="grid-page__title">{genreName || "Loading genre…"}</h1>

      {state.loading && <Loading label="Gathering titles" />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && state.results.length === 0 && (
        <EmptyState message="Nothing found for this genre right now." />
      )}

      {state.results.length > 0 && (
        <>
          <div className="grid-page__grid">
            {state.results.map((item) => (
              <PosterCard key={item.id} item={{ ...item, media_type: "movie" }} />
            ))}
          </div>
          <button className="grid-page__load-more" onClick={loadMore}>
            Load more
          </button>
        </>
      )}
    </div>
  )
}
