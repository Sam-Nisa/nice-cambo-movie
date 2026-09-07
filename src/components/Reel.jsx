import { useRef } from "react"
import { Link } from "react-router-dom"
import PosterCard from "./PosterCard.jsx"

export default function Reel({ title, items, viewAllTo }) {
  const trackRef = useRef(null)

  if (!items || items.length === 0) return null

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="mb-10 sm:mb-16">
      <div className="shell flex items-center justify-between mb-4 sm:mb-5">
        <h2 className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-brand-ink">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          {viewAllTo && (
            <Link
              to={viewAllTo}
              className="text-xs sm:text-sm font-medium text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors mr-2"
            >
              View all
            </Link>
          )}

          {/* Desktop scroll navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-brand-surface border border-brand-hairline text-brand-ink-muted hover:text-brand-gold hover:border-brand-gold/60 flex items-center justify-center text-sm transition-colors cursor-pointer shadow-sm"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-brand-surface border border-brand-hairline text-brand-ink-muted hover:text-brand-gold hover:border-brand-gold/60 flex items-center justify-center text-sm transition-colors cursor-pointer shadow-sm"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-5 pt-1 px-4 sm:px-6 lg:px-10 shell custom-scrollbar snap-x snap-mandatory"
      >
        {items.map((item) => (
          <div
            className="flex-none w-[170px] sm:w-[210px] md:w-[240px] lg:w-[260px] snap-start"
            key={`${item.id}-${item.media_type || ""}`}
          >
            <PosterCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
