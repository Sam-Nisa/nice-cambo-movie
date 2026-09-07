import { useRef } from "react"
import { Link } from "react-router-dom"
import PosterCard from "./PosterCard.jsx"

export default function Reel({ title, items, viewAllTo }) {
  const trackRef = useRef(null)

  if (!items || items.length === 0) return null

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="mb-8 sm:mb-12">
      <div className="shell flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="font-display font-medium text-lg sm:text-xl md:text-2xl text-brand-ink">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          {viewAllTo && (
            <Link
              to={viewAllTo}
              className="text-xs sm:text-sm text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors mr-2"
            >
              View all
            </Link>
          )}

          {/* Desktop scroll navigation arrows */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="w-7 h-7 rounded-full bg-brand-surface border border-brand-hairline text-brand-ink-muted hover:text-brand-gold hover:border-brand-gold/60 flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="w-7 h-7 rounded-full bg-brand-surface border border-brand-hairline text-brand-ink-muted hover:text-brand-gold hover:border-brand-gold/60 flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-4 pt-1 px-4 sm:px-6 lg:px-8 shell custom-scrollbar snap-x snap-mandatory"
      >
        {items.map((item) => (
          <div
            className="flex-none w-[130px] sm:w-[160px] md:w-[180px] snap-start"
            key={`${item.id}-${item.media_type || ""}`}
          >
            <PosterCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
