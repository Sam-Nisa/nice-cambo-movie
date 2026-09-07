import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="shell" style={{ padding: "100px 0", textAlign: "center" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>
        Scene missing
      </h1>
      <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>
        This page didn't make the final cut.
      </p>
      <Link to="/" style={{ color: "var(--gold)" }}>
        Back to Home
      </Link>
    </div>
  )
}
