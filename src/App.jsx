import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import MovieDetails from "./pages/MovieDetails.jsx"
import TvDetails from "./pages/TvDetails.jsx"
import Genre from "./pages/Genre.jsx"
import Favorites from "./pages/Favorites.jsx"
import NotFound from "./pages/NotFound.jsx"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-ink">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          <Route path="/genre/:id" element={<Genre />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
