import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import {
  Sparkles, Brain, FolderGit2, GitBranch,
  Briefcase, ShieldCheck, ArrowRight,
} from "lucide-react"
import Hero from "../components/sections/Hero"

/* ── Design tokens (mirrors the site's existing palette) ──────── */
const T = {
  bg:     "#0A0F1E",
  card:   "rgba(18,24,42,0.95)",
  border: "rgba(255,255,255,0.07)",
  head:   "#EEF0F8",
  body:   "#A0AEC0",
  muted:  "#718096",
}

/* ── Card data — text pulled verbatim from existing section intros */
const CARDS = [
  {
    id: "about",
    path: "/about",
    icon: Sparkles,
    label: "Who I Am",
    title: "About Me",
    preview: "CS Graduate passionate about AI & Data Entry — building intelligent systems with Python and Generative AI.",
    gradient: "linear-gradient(135deg,#00E5CC,#7C6FEA)",
    accent: "#00E5CC",
    glow: "rgba(0,229,204,0.18)",
  },
  {
    id: "skills",
    path: "/skills",
    icon: Brain,
    label: "Technical Expertise",
    title: "Skills & Technologies",
    preview: "6 skill categories across Data Entry, Python and developer tooling.",
    gradient: "linear-gradient(135deg,#A78BFA,#6366F1)",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.18)",
  },
  {
    id: "projects",
    path: "/projects",
    icon: FolderGit2,
    label: "Portfolio Highlights",
    title: "Featured Projects",
    preview: "AI and Data Entry solutions built from research to deployment — CV Builder, recommendations.",
    gradient: "linear-gradient(135deg,#38BDF8,#3B82F6)",
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.18)",
  },
  {
    id: "workflow",
    path: "/workflow",
    icon: GitBranch,
    label: "Data Entry Process",
    title: "Data Entry Workflow",
    preview: "Production-focused 6-step process: data acquisition → preparation → features → model → evaluation → deployment.",
    gradient: "linear-gradient(135deg,#34D399,#059669)",
    accent: "#34D399",
    glow: "rgba(52,211,153,0.18)",
  },
  {
    id: "experience",
    path: "/experience",
    icon: Briefcase,
    label: "Professional Journey",
    title: "Experience & Growth",
    preview: "BS CS Graduate, Data Entry Specialist.",
    gradient: "linear-gradient(135deg,#FBBF24,#F97316)",
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.18)",
  },
  {
    id: "certifications",
    path: "/certifications",
    icon: ShieldCheck,
    label: "Credentials",
    title: "Certifications",
    preview: "12 professional certificates spanning AI, Data Entry, Python, Google Prompting, and personal development.",
    gradient: "linear-gradient(135deg,#FB7185,#E11D48)",
    accent: "#FB7185",
    glow: "rgba(251,113,133,0.18)",
  },
]

/* ── Single preview card ─────────────────────────────────────── */
function PreviewCard({ card, index }) {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()
  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.52, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: "28px 26px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        overflow: "hidden",
        background: T.card,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? card.accent + "55" : T.border}`,
        boxShadow: hovered
          ? `0 20px 56px rgba(0,0,0,0.5), 0 0 0 1px ${card.accent}28, 0 0 40px ${card.glow}`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered && !reduced ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease",
        cursor: "default",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: "12%", right: "12%",
        height: "2px", borderRadius: "0 0 2px 2px",
        background: card.gradient,
        opacity: hovered ? 1 : 0.45,
        transition: "opacity 0.28s ease",
      }} aria-hidden="true" />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: "-20px", right: "-20px",
        width: "80px", height: "80px", borderRadius: "50%",
        background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0.35,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }} aria-hidden="true" />

      {/* Icon + eyebrow label */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(145deg, ${card.accent}22, ${card.accent}0A)`,
          border: `1px solid ${card.accent}35`,
          boxShadow: hovered ? `0 0 16px ${card.glow}` : "none",
          transition: "box-shadow 0.28s ease",
        }}>
          <motion.div
            animate={hovered && !reduced ? { rotate: [0, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Icon size={20} style={{ color: card.accent }} aria-hidden="true" />
          </motion.div>
        </div>
        <span style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: card.accent, opacity: 0.85,
        }}>
          {card.label}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "18px", fontWeight: 800, color: T.head,
        letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>
        {card.title}
      </h3>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: `linear-gradient(to right, ${card.accent}30, transparent)`,
      }} aria-hidden="true" />

      {/* Preview text */}
      <p style={{
        fontSize: "13.5px", color: T.body, lineHeight: 1.7, flex: 1,
      }}>
        {card.preview}
      </p>

      {/* View Details button */}
      <Link
        to={card.path}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          alignSelf: "flex-start",
          padding: "9px 20px",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.02em",
          textDecoration: "none",
          background: hovered
            ? `linear-gradient(135deg, ${card.accent}28, ${card.accent}14)`
            : `${card.accent}12`,
          border: `1px solid ${hovered ? card.accent + "55" : card.accent + "30"}`,
          color: card.accent,
          boxShadow: hovered ? `0 0 18px ${card.glow}` : "none",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = `linear-gradient(135deg, ${card.accent}35, ${card.accent}18)`
          e.currentTarget.style.boxShadow = `0 0 22px ${card.glow}`
          e.currentTarget.style.borderColor = card.accent + "70"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = hovered ? `linear-gradient(135deg, ${card.accent}28, ${card.accent}14)` : `${card.accent}12`
          e.currentTarget.style.boxShadow = hovered ? `0 0 18px ${card.glow}` : "none"
          e.currentTarget.style.borderColor = hovered ? card.accent + "55" : card.accent + "30"
        }}
      >
        View Details
        <motion.span
          animate={hovered && !reduced ? { x: [0, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
        >
          <ArrowRight size={13} aria-hidden="true" />
        </motion.span>
      </Link>
    </motion.div>
  )
}

/* ── Homepage ────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Section navigation cards ──────────────────────────── */}
      <section
        aria-label="Portfolio sections"
        style={{
          background: T.bg,
          paddingTop: "80px",
          paddingBottom: "100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(0,229,204,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} aria-hidden="true" />

        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: "35%", height: "40%", borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(0,229,204,0.04) 0%, transparent 70%)",
        }} aria-hidden="true" />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: "30%", height: "35%", borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(167,139,250,0.04) 0%, transparent 70%)",
        }} aria-hidden="true" />

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ textAlign: "center", marginBottom: "52px" }}
          >
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "#00E5CC", marginBottom: "12px",
            }}>
              Explore My Portfolio
            </p>
            <h2 style={{
              fontSize: "clamp(1.25rem, 4.5vw, 2.8rem)", fontWeight: 800,
              letterSpacing: "-0.03em", lineHeight: 1.15,
              background: "linear-gradient(135deg, #FFFFFF 20%, #94A3B8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              whiteSpace: "nowrap",
            }}>
              What I've Built &amp; Who I Am
            </h2>
            <div style={{
              width: "80px", height: "3px", borderRadius: "2px",
              background: "linear-gradient(to right, #00E5CC, #A78BFA, transparent)",
              margin: "16px auto 0",
              boxShadow: "0 0 12px rgba(0,229,204,0.4)",
            }} aria-hidden="true" />
          </motion.div>

          {/* 2-column card grid — 3 rows */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }} className="preview-cards-grid">
            <style>{`
              @media (max-width: 767px) {
                .preview-cards-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>

            {CARDS.map((card, i) => (
              <PreviewCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
