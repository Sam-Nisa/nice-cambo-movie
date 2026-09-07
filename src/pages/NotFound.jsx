import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="shell min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4 animate-fade-in">
      <span className="text-4xl sm:text-5xl mb-3">🎬</span>
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-brand-ink mb-2">
        Scene missing
      </h1>
      <p className="text-sm sm:text-base text-brand-ink-muted mb-8 max-w-md">
        This page didn't make the final cut. The title or reel you were looking for could not be found.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-brand-surface border border-brand-gold text-brand-gold font-medium text-xs sm:text-sm hover:bg-brand-gold hover:text-brand-bg transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
