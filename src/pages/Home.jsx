import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { tmdb, IMG } from "../api/tmdb.js"
import Reel from "../components/Reel.jsx"
import { Loading, ErrorState } from "../components/Status.jsx"

const GENRE_LINKS = [
  { id: 28, label: "Action" },
  { id: 35, label: "Comedy" },
  { id: 18, label: "Drama" },
  { id: 27, label: "Horror" },
  { id: 10749, label: "Romance" },
  { id: 878, label: "Sci-Fi" },
  { id: 16, label: "Animation" },
  { id: 53, label: "Thriller" },
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
    <div className="animate-fade-in pb-12">
      {/* Hero Featured Title */}
      {hero && (
        <section
          className="relative bg-cover bg-center pt-24 sm:pt-36 md:pt-48 pb-12 sm:pb-16 md:pb-20 border-b border-brand-hairline/30"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(14,13,11,0.2) 0%, rgba(14,13,11,0.85) 70%, rgba(14,13,11,1) 100%), url(${IMG.backdrop(
              hero.backdrop_path
            )})`,
          }}
        >
          <div className="shell">
            <div className="max-w-2xl">
              <span className="inline-block text-xs sm:text-sm font-medium tracking-wider text-brand-gold uppercase mb-2">
                Trending this week
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-3 sm:mb-4 leading-tight">
                {hero.title || hero.name}
              </h1>
              <p className="text-sm sm:text-base text-brand-ink/80 line-clamp-3 mb-6 leading-relaxed">
                {hero.overview}
              </p>
              <Link
                to={`/${hero.media_type || (hero.first_air_date ? "tv" : "movie")}/${
                  hero.id
                }`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md border border-brand-gold text-brand-gold font-medium text-xs sm:text-sm hover:bg-brand-gold hover:text-brand-bg transition-colors shadow-lg"
              >
                <span>See details</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Genre Pills Strip */}
      <section className="shell py-6 sm:py-8">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 custom-scrollbar flex-nowrap sm:flex-wrap">
          {GENRE_LINKS.map((g) => (
            <Link
              key={g.id}
              to={`/genre/${g.id}`}
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm bg-brand-surface border border-brand-hairline text-brand-ink-muted hover:text-brand-ink hover:border-brand-gold transition-colors shrink-0"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Content Reels */}
      <div className="space-y-4">
        <Reel title="Trending now" items={state.data?.trending?.slice(0, 16)} />
        <Reel title="In theaters" items={state.data?.nowPlaying?.slice(0, 16)} />
        <Reel title="Top rated TV" items={state.data?.topRatedTv?.slice(0, 16)} />
      </div>
    </div>
  )
}
