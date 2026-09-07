# Reel — a film & TV explorer

A frontend-only React app for browsing trending movies and TV shows, searching titles,
viewing details (cast, trailer, similar titles), browsing by genre, and saving favorites
locally in your browser. Built with Vite, React Router, and the free TMDB API.

## 1. Get a free TMDB API key

1. Create an account at https://www.themoviedb.org/signup
2. Go to Settings → API → request an API key (choose "Developer", it's free)
3. Copy the "API Key (v3 auth)" value

## 2. Set up the project

```bash
npm install
cp .env.example .env
```

Open `.env` and paste your key:

```
VITE_TMDB_API_KEY=your_actual_key_here
```

## 3. Run it

```bash
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## 4. Build for production

```bash
npm run build
npm run preview   # to check the production build locally
```

The `dist/` folder is a static site you can deploy anywhere (Vercel, Netlify, GitHub Pages,
Cloudflare Pages, etc.) — just remember to set `VITE_TMDB_API_KEY` as an environment
variable in your host's dashboard, since `.env` is not committed to git.

## Project structure

```
src/
  api/tmdb.js              All TMDB API calls in one place
  context/FavoritesContext.jsx   Favorites state, persisted to localStorage
  components/              Reusable UI: Navbar, PosterCard, Reel, DetailLayout, Status
  pages/                   One file per route
  styles/index.css         Design tokens (colors, type, layout)
```

## Routes

| Route          | What it shows                                  |
|----------------|-------------------------------------------------|
| `/`            | Hero + trending / in theaters / top-rated reels |
| `/search?q=`   | Search results across movies and TV             |
| `/movie/:id`   | Movie details, cast, trailer, similar movies    |
| `/tv/:id`      | TV details, cast, trailer, similar shows        |
| `/genre/:id`   | Movies filtered by genre, with "load more"      |
| `/favorites`   | Titles you've starred (saved in your browser)   |

## Notes

- Favorites are stored in `localStorage`, so they're per-browser, not synced anywhere.
- If you see "Missing TMDB API key", double check your `.env` file and restart `npm run dev`.
- TMDB's free tier is generous but does rate-limit; if requests start failing, wait a minute.

## Ideas to extend it

- Add a "watched" list alongside favorites
- Add pagination or infinite scroll to search results
- Add a person/actor detail page
- Add filters (year, rating) to the genre page
- Swap in TMDB's `/discover` sort options (top rated, upcoming, by date)
