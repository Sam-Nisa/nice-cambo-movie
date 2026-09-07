import "./Status.css"

export function Loading({ label = "Loading" }) {
  return (
    <div className="status status--loading" role="status">
      <span className="status__reel" aria-hidden="true" />
      {label}…
    </div>
  )
}

export function ErrorState({ message }) {
  return (
    <div className="status status--error" role="alert">
      <p>Something went wrong.</p>
      <p className="status__detail">{message}</p>
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div className="status">
      <p>{message}</p>
    </div>
  )
}
