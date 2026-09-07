import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tmdb } from "../api/tmdb.js"
import DetailLayout from "../components/DetailLayout.jsx"
import { Loading, ErrorState } from "../components/Status.jsx"

export default function MovieDetails() {
  const { id } = useParams()
  const [state, setState] = useState({ loading: true, error: null, data: null })

  useEffect(() => {
    setState({ loading: true, error: null, data: null })
    tmdb
      .movieDetails(id)
      .then((data) => setState({ loading: false, error: null, data }))
      .catch((err) => setState({ loading: false, error: err.message, data: null }))
  }, [id])

  if (state.loading) return <Loading label="Fetching the reel" />
  if (state.error) return <ErrorState message={state.error} />
  return <DetailLayout data={state.data} mediaType="movie" />
}
