export function Loading({ label = "Loading" }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-brand-ink-muted text-sm sm:text-base py-16 px-4" role="status">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-brand-hairline border-t-brand-gold animate-spin" aria-hidden="true" />
      <p className="font-display italic text-brand-ink-muted tracking-wide">{label}…</p>
    </div>
  )
}

export function ErrorState({ message }) {
  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center text-center py-16 px-4" role="alert">
      <div className="w-12 h-12 rounded-full bg-brand-velvet/10 border border-brand-velvet/30 flex items-center justify-center text-brand-velvet mb-3 text-lg">
        ✕
      </div>
      <h3 className="font-display font-medium text-lg sm:text-xl text-brand-velvet mb-1">
        Something went wrong
      </h3>
      <p className="text-xs sm:text-sm text-brand-ink-muted max-w-md">{message}</p>
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center text-center py-16 px-4 text-brand-ink-muted">
      <div className="w-12 h-12 rounded-full bg-brand-surface border border-brand-hairline flex items-center justify-center text-brand-ink-muted mb-3 text-xl">
        🎬
      </div>
      <p className="text-sm sm:text-base max-w-md text-brand-ink-muted leading-relaxed">
        {message}
      </p>
    </div>
  )
}
