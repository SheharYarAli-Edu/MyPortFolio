import { motion, useReducedMotion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Download, ArrowDown, MapPin, Phone } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Button from "../common/Button"
import { personalInfo } from "../../data/about"

/* ── SA Logo image ────────────────────────────────────────────── */
const saLogoModules = import.meta.glob("../../assets/sa-logo.*", { eager: true })
const saLogoKey     = Object.keys(saLogoModules)[0]
const saLogoSrc     = saLogoKey ? saLogoModules[saLogoKey].default : null

/* ── Try to load photo; show initials if file not placed yet ─────── */
let SheharYarPhoto = null
try {
  // Matches "SheharYar Ali.jpg" (filename contains a space)
  const modules = import.meta.glob("../../assets/SheharYar*.*", { eager: true })
  const key = Object.keys(modules)[0]
  if (key) SheharYarPhoto = modules[key].default
} catch {
  SheharYarPhoto = null
}

/* ── Skill chips shown under the photo ─────────────────────────── */
const SKILL_CHIPS = [
  { label: "Python",       bg: "rgba(0,229,204,0.1)",   border: "rgba(0,229,204,0.25)",   color: "#00E5CC" },
  { label: "TensorFlow",   bg: "rgba(124,111,234,0.1)", border: "rgba(124,111,234,0.25)", color: "#7C6FEA" },
  { label: "FastAPI",      bg: "rgba(124,111,234,0.1)", border: "rgba(124,111,234,0.25)", color: "#7C6FEA" },
  { label: "Scikit-Learn", bg: "rgba(0,229,204,0.1)",   border: "rgba(0,229,204,0.25)",   color: "#00E5CC" },
  { label: "Keras",        bg: "rgba(124,111,234,0.1)", border: "rgba(124,111,234,0.25)", color: "#7C6FEA" },
  { label: "Pandas",       bg: "rgba(0,229,204,0.1)",   border: "rgba(0,229,204,0.25)",   color: "#00E5CC" },
]

const STATS = [
  { value: "10+",   label: "AI Projects" },
  { value: "12+",  label: "Certificates" },
  { value: "2026", label: "CS Graduated" },
]

/* ── Framer variants ─────────────────────────────────────────────── */
const textContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}
const textItem = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.25,0.46,0.45,0.94] } },
}
const photoVariant = {
  hidden: { opacity: 0, scale: 0.9, x: 30 },
  show:   { opacity: 1, scale: 1,   x: 0, transition: { duration: 0.72, delay: 0.2, ease: [0.25,0.46,0.45,0.94] } },
}

/* ─────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const reduced = useReducedMotion()

  const TV = reduced ? {} : textContainer
  const TI = reduced ? {} : textItem
  const PV = reduced ? {} : photoVariant

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{ background: "#0A0F1E", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}
    >
      {/* ── Background layers ──────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(0,229,204,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />
        {/* Cyan top-right radial */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "55%", height: "70%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,229,204,0.06) 0%, transparent 65%)",
        }} />
        {/* Purple bottom-left radial */}
        <div style={{
          position: "absolute", bottom: "-15%", left: "-5%",
          width: "45%", height: "60%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 65%)",
        }} />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "7rem clamp(1.5rem,5vw,4rem) 5rem" }}>
        {/* Responsive: stack on mobile, side-by-side on lg */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }}
          className="lg:grid-cols-2-custom">
          <style>{`
            @media (min-width: 1024px) {
              .hero-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (min-width: 640px) {
              .hero-pad { padding-left: 2.5rem !important; padding-right: 2.5rem !important; }
            }
            @media (min-width: 1024px) {
              .hero-pad { padding-left: 4rem !important; padding-right: 4rem !important; }
            }
          `}</style>

          {/* Grid wrapper */}
          <div
            className="hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center", width: "100%" }}
          >
            {/* ── LEFT — text ────────────────────────────────── */}
            <motion.div
              variants={TV}
              initial="hidden"
              animate="show"
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem", order: 2 }}
              className="lg-order-1"
            >
              <style>{`@media(min-width:1024px){ .lg-order-1 { order: 1 !important; } .lg-order-2 { order: 2 !important; } }`}</style>

              {/* Status pill */}
              <motion.div variants={TI}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.375rem 1rem", borderRadius: "9999px",
                  fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  background: "rgba(0,229,204,0.07)", border: "1px solid rgba(0,229,204,0.25)", color: "#00E5CC",
                }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00E5CC", animation: "pulse 2s infinite" }} aria-hidden="true" />
                  Open to Internships &amp; Opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.div variants={TI}>
                <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#EEF0F8" }}>
                  <span style={{
                    display: "block",
                    background: "linear-gradient(135deg, #00E5CC 0%, #7C6FEA 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    Sheharyar Ali
                  </span>
                </h1>
              </motion.div>

              {/* Animated role */}
              <motion.div variants={TI} style={{ fontSize: "1.15rem", fontWeight: 600 }}>
                <span style={{ color: "#A8B2C8" }}>I'm a </span>
                <TypeAnimation
                  sequence={personalInfo.roles.flatMap(r => [r, 2000, "", 400]).slice(0, -1)}
                  wrapper="span"
                  cursor
                  repeat={Infinity}
                  style={{ color: "#00E5CC" }}
                />
              </motion.div>

              {/* Tagline */}
              <motion.p variants={TI} style={{ color: "#A8B2C8", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "500px" }}>
                {personalInfo.tagline}
              </motion.p>

              {/* Meta */}
              <motion.div variants={TI} style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: "#A8B2C8" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <MapPin size={13} style={{ color: "#00E5CC" }} aria-hidden="true" />
                  {personalInfo.location}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Phone size={13} style={{ color: "#00E5CC" }} aria-hidden="true" />
                  +92 309 0747079
                </span>
              </motion.div>

              {/* CTAs — Download full width, socials row below */}
              <motion.div variants={TI} style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingTop: "0.25rem", maxWidth: "420px" }}>
                {/* Primary — Download Resume (prominent, full width) */}
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    padding: "14px 36px", borderRadius: "10px",
                    background: "#00E5CC", color: "#0A0F1E",
                    fontWeight: 700, fontSize: "15px",
                    boxShadow: "0 0 28px rgba(0,229,204,0.35)",
                    transition: "filter 0.2s, box-shadow 0.2s",
                    width: "100%",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.filter = "brightness(1.1)"
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,204,0.5)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.filter = "brightness(1)"
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(0,229,204,0.35)"
                  }}
                >
                  <Download size={17} aria-hidden="true" />
                  Download Resume
                  <span aria-hidden="true" style={{ marginLeft: "4px", fontSize: "1.05rem" }}>→</span>
                </a>

                {/* Secondary row — GitHub + LinkedIn */}
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "11px 20px", borderRadius: "10px",
                      background: "transparent", color: "#FFFFFF",
                      fontWeight: 600, fontSize: "14px",
                      border: "1.5px solid rgba(255,255,255,0.22)",
                      transition: "border-color 0.2s, color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "#00E5CC"
                      e.currentTarget.style.color = "#00E5CC"
                      e.currentTarget.style.background = "rgba(0,229,204,0.06)"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"
                      e.currentTarget.style.color = "#FFFFFF"
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <FaGithub size={16} aria-hidden="true" />
                    GitHub
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "11px 20px", borderRadius: "10px",
                      background: "transparent", color: "#FFFFFF",
                      fontWeight: 600, fontSize: "14px",
                      border: "1.5px solid rgba(255,255,255,0.22)",
                      transition: "border-color 0.2s, color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "#7C6FEA"
                      e.currentTarget.style.color = "#7C6FEA"
                      e.currentTarget.style.background = "rgba(124,111,234,0.06)"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"
                      e.currentTarget.style.color = "#FFFFFF"
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <FaLinkedin size={16} aria-hidden="true" />
                    LinkedIn
                  </a>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={TI} style={{
                display: "flex", gap: "2rem", paddingTop: "1rem",
                borderTop: "1px solid #1F2840", marginTop: "0.5rem",
              }}>
                {STATS.map(({ value, label }) => (
                  <div key={label}>
                    <p style={{
                      fontSize: "1.5rem", fontWeight: 900,
                      background: "linear-gradient(135deg,#00E5CC,#7C6FEA)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>{value}</p>
                    <p style={{ fontSize: "0.72rem", color: "#5A6680", marginTop: "2px" }}>{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT — photo ──────────────────────────────── */}
            <motion.div
              variants={PV}
              initial="hidden"
              animate="show"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", order: 1 }}
              className="lg-order-2"
            >
              {/* Photo + ring */}
              <div style={{ position: "relative" }}>
                {/* Spinning conic ring */}
                {!reduced && (
                  <motion.div
                    style={{
                      position: "absolute", inset: "-10px", borderRadius: "50%",
                      background: "conic-gradient(from 0deg, #00E5CC, transparent 35%, #7C6FEA 60%, transparent 80%, #00E5CC)",
                      opacity: 0.5,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    aria-hidden="true"
                  />
                )}

                {/* Glow behind photo */}
                <div style={{
                  position: "absolute", inset: "-20px", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 65%)",
                  pointerEvents: "none",
                }} aria-hidden="true" />

                {/* Photo circle */}
                <div
                  className="photo-glow"
                  style={{
                    position: "relative",
                    width: "clamp(200px, 28vw, 280px)",
                    height: "clamp(200px, 28vw, 280px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid rgba(0,229,255,0.32)",
                    background: "#161C2D",
                  }}
                >
                  {SheharYarPhoto ? (
                    <img
                      src={SheharYarPhoto}
                      alt="SheharYar Ali — Aspiring Web Developer"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
                      loading="eager"
                    />
                  ) : (
                    /* Initials fallback */
                    <div style={{
                      width: "100%", height: "100%", display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: "8px",
                      background: "radial-gradient(circle at 35% 30%, rgba(0,229,255,0.12), #161C2D)",
                    }}>
                      <span style={{
                        fontSize: "3.5rem", fontWeight: 900, lineHeight: 1,
                        background: "linear-gradient(135deg,#00E5CC,#7C6FEA)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      }}>SA</span>
                      <span style={{ fontSize: "0.65rem", color: "#5A6680", letterSpacing: "0.1em", textAlign: "center", padding: "0 16px" }}>
                        Add photo:<br/>src/assets/SheharYar.jpg
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating label — Web Developer */}
                <motion.div
                  initial={reduced ? {} : { opacity: 0, x: -20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="hero-label-ml"
                  style={{
                    position: "absolute", top: "14%", left: "-18%",
                    padding: "0.4rem 0.75rem", borderRadius: "10px",
                    background: "rgba(22,28,45,0.95)", border: "1px solid rgba(0,229,255,0.22)",
                    color: "#EEF0F8", fontSize: "0.72rem", fontWeight: 700,
                    whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                  aria-hidden="true"
                >
                  🤖 Aspiring Web Developer
                </motion.div>

                {/* Floating label — CS Graduated */}
                <motion.div
                  initial={reduced ? {} : { opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="hero-label-cs"
                  style={{
                    position: "absolute", bottom: "14%", right: "-16%",
                    padding: "0.4rem 0.75rem", borderRadius: "10px",
                    background: "rgba(22,28,45,0.95)", border: "1px solid rgba(168,85,247,0.3)",
                    color: "#EEF0F8", fontSize: "0.72rem", fontWeight: 700,
                    whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                  aria-hidden="true"
                >
                  🎓 CS Graduated
                </motion.div>
              </div>

              {/* Skill chips */}
              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", maxWidth: "320px" }}
              >
                {SKILL_CHIPS.map(({ label, bg, border, color }) => (
                  <span
                    key={label}
                    style={{
                      padding: "0.3rem 0.75rem", borderRadius: "9999px",
                      fontSize: "0.72rem", fontWeight: 700,
                      background: bg, border: `1px solid ${border}`, color,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        {!reduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            style={{
              position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
              color: "#5A6680", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase",
            }}
            aria-hidden="true"
          >
            <span>Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ArrowDown size={13} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ── SA Logo — bottom-left corner ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute", bottom: "2rem", left: "clamp(1.5rem,5vw,4rem)",
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        {saLogoSrc ? (
          <img
            src={saLogoSrc}
            alt="SA Logo"
            style={{ width: 56, height: 56, objectFit: "contain", opacity: 0.85 }}
          />
        ) : (
          <span style={{
            fontSize: "1.6rem", fontWeight: 900, letterSpacing: "0.05em",
            background: "linear-gradient(135deg,#00E5CC,#7C6FEA)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>SA</span>
        )}
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
          .lg-order-1 { order: 1 !important; }
          .lg-order-2 { order: 2 !important; }
        }
        /* ── Mobile: move labels so they don't overlap the face ── */
        @media (max-width: 1023px) {
          .hero-label-ml {
            top: -10% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          .hero-label-cs {
            bottom: -10% !important;
            right: 50% !important;
            transform: translateX(50%) !important;
          }
        }
      `}</style>
    </section>
  )
}
