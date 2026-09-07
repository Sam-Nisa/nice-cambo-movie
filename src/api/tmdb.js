const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const IMG = {
  backdrop: (path, size = "w1280") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
  poster: (path, size = "w500") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
  profile: (path, size = "w300") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
}

async function request(path, params = {}) {
  if (!API_KEY) {
    throw new Error(
      "Missing TMDB API key. Copy .env.example to .env and add VITE_TMDB_API_KEY."
    )
  }
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set("api_key", API_KEY)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value)
    }
  })

  const res = await fetch(url.toString())
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.status_message || `TMDB request failed (${res.status})`)
  }
  return res.json()
}

export const tmdb = {
  trending: (mediaType = "all", window = "week") =>
    request(`/trending/${mediaType}/${window}`),

  searchMulti: (query, page = 1) =>
    request(`/search/multi`, { query, page, include_adult: false }),

  movieDetails: (id) =>
    request(`/movie/${id}`, { append_to_response: "credits,videos,similar" }),

  tvDetails: (id) =>
    request(`/tv/${id}`, { append_to_response: "credits,videos,similar" }),

  movieGenres: () => request(`/genre/movie/list`),

  tvGenres: () => request(`/genre/tv/list`),

  discoverByGenre: (genreId, mediaType = "movie", page = 1) =>
    request(`/discover/${mediaType}`, {
      with_genres: genreId,
      page,
      sort_by: "popularity.desc",
    }),

  nowPlaying: () => request(`/movie/now_playing`),

  topRatedTv: () => request(`/tv/top_rated`),
}
