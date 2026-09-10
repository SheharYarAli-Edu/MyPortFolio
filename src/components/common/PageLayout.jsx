/**
 * PageLayout — shared wrapper for all 6 detail pages.
 * Renders a compact "← Back to Home" bar above the section content.
 */
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function PageLayout({ title, accent = "#00E5CC", children }) {
  return (
    <div style={{ background: "#0A0F1E", minHeight: "100vh" }}>

      {/* ── Compact back bar ───────────────────────────────────
          Sits sticky just below the fixed navbar (top: 66px).
          paddingTop / paddingBottom are kept tight — 16px each —
          so the bar itself is only ~52px tall with no empty void.
      ─────────────────────────────────────────────────────────── */}
      <div style={{
        /* Push bar below the fixed 66px navbar */
        marginTop: "66px",
        paddingTop: "16px",
        paddingBottom: "16px",
        background: "rgba(4,14,24,0.92)",
        borderBottom: `1px solid ${accent}22`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        position: "sticky",
        top: "66px",
        zIndex: 40,
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem,5vw,4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}>

          {/* Back link */}
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#A0AEC0",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = accent
              e.currentTarget.style.borderColor = accent + "45"
              e.currentTarget.style.background = accent + "0D"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#A0AEC0"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
              e.currentTarget.style.background = "rgba(255,255,255,0.03)"
            }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Home
          </Link>

          {/* Page title */}
          <motion.h1
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${accent}, #A78BFA)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
              textAlign: "right",
            }}
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* ── Page content ──────────────────────────────────────── */}
      {children}
    </div>
  )
}
