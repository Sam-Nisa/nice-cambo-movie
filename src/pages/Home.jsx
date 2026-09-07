import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { tmdb, IMG } from "../api/tmdb.js"
import Reel from "../components/Reel.jsx"
import { Loading, ErrorState } from "../components/Status.jsx"
import "./Home.css"

const GENRE_LINKS = [
  { id: 28, label: "Action" },
  { id: 35, label: "Comedy" },
  { id: 18, label: "Drama" },
  { id: 27, label: "Horror" },
  { id: 10749, label: "Romance" },
  { id: 878, label: "Sci-Fi" },
]

export default function Home() {
  const [state, setState] = useState({ loading: true, error: null, data: null })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [trending, nowPlaying, topRatedTv] = await Promise.all([
          tmdb.trending("all", "week"),
          tmdb.nowPlaying(),
          tmdb.topRatedTv(),
        ])
        if (!cancelled) {
          setState({
            loading: false,
            error: null,
            data: {
              trending: trending.results,
              nowPlaying: nowPlaying.results,
              topRatedTv: topRatedTv.results,
            },
          })
        }
      } catch (err) {
        if (!cancelled) setState({ loading: false, error: err.message, data: null })
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const hero = useMemo(() => {
    const list = state.data?.trending || []
    return list.find((item) => item.backdrop_path) || list[0]
  }, [state.data])

  if (state.loading) return <Loading label="Rolling the reel" />
  if (state.error) return <ErrorState message={state.error} />

  return (
    <div>
      {hero && (
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(14,13,11,0.2) 0%, rgba(14,13,11,0.95) 92%), url(${IMG.backdrop(
              hero.backdrop_path
            )})`,
          }}
        >
          <div className="shell hero__content">
            <span className="hero__eyebrow">Trending this week</span>
            <h1>{hero.title || hero.name}</h1>
            <p>{hero.overview}</p>
            <Link
              to={`/${hero.media_type || (hero.first_air_date ? "tv" : "movie")}/${
                hero.id
              }`}
              className="hero__cta"
            >
              See details
            </Link>
          </div>
        </section>
      )}

      <div className="shell genre-strip">
        {GENRE_LINKS.map((g) => (
          <Link key={g.id} to={`/genre/${g.id}`} className="genre-strip__pill">
            {g.label}
          </Link>
        ))}
      </div>

      <Reel title="Trending now" items={state.data.trending.slice(0, 12)} />
      <Reel title="In theaters" items={state.data.nowPlaying.slice(0, 12)} />
      <Reel title="Top rated TV" items={state.data.topRatedTv.slice(0, 12)} />
    </div>
  )
}
