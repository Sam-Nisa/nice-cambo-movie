import { Link } from "react-router-dom"
import PosterCard from "./PosterCard.jsx"
import "./Reel.css"

export default function Reel({ title, items, viewAllTo }) {
  if (!items || items.length === 0) return null

  return (
    <section className="reel">
      <div className="reel__head">
        <h2>{title}</h2>
        {viewAllTo && (
          <Link to={viewAllTo} className="reel__view-all">
            View all
          </Link>
        )}
      </div>
      <div className="reel__track">
        {items.map((item) => (
          <div className="reel__item" key={`${item.id}-${item.media_type || ""}`}>
            <PosterCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
