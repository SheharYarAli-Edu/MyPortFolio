import { motion, useReducedMotion } from "framer-motion"
import {
  MapPin, Mail, Phone, Download,
  ExternalLink, MessageCircle,
} from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { personalInfo } from "../../data/about"

/* ── Card fade-up helper ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.15 },
  transition:  { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ── Contact cards data ──────────────────────────────────────── */
const CONTACT_CARDS = [
  {
    id:    "email",
    icon:  Mail,
    label: "Email",
    value: personalInfo.email,
    sub:   "Reach me directly",
    href:  `mailto:${personalInfo.email}`,
    color: "#00E5CC",
    gradient: "linear-gradient(135deg,#00E5CC,#0284C7)",
  },
  {
    id:    "linkedin",
    icon:  FaLinkedin,
    label: "LinkedIn",
    value: "sheharyar-ali-a78877422",
    sub:   "Connect professionally",
    href:  personalInfo.linkedin,
    color: "#0A66C2",
    gradient: "linear-gradient(135deg,#0A66C2,#004182)",
  },
  {
    id:    "github",
    icon:  FaGithub,
    label: "GitHub",
    value: "SheharYarAli-Edu",
    sub:   "See my code & projects",
    href:  personalInfo.github,
    color: "#A78BFA",
    gradient: "linear-gradient(135deg,#A78BFA,#7C3AED)",
  },
  {
    id:    "location",
    icon:  MapPin,
    label: "Location",
    value: personalInfo.location,
    sub:   "Open to work",
    href:  null,
    color: "#FB7185",
    gradient: "linear-gradient(135deg,#FB7185,#E11D48)",
  },
]

/* ── Single contact card ─────────────────────────────────────── */
function ContactCard({ card, index }) {
  const Icon    = card.icon
  const reduced = useReducedMotion()

  const inner = (
    <motion.div
      {...fadeUp(index * 0.08)}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.2 } }}
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        overflow: "hidden",
        background: "linear-gradient(145deg,rgba(18,24,42,0.96),rgba(10,14,28,0.92))",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.28s ease, box-shadow 0.28s ease",
        cursor: card.href ? "pointer" : "default",
        height: "100%",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${card.color}45`
        e.currentTarget.style.boxShadow   =
          `0 20px 56px rgba(0,0,0,0.45), 0 0 0 1px ${card.color}22, 0 0 40px ${card.color}18`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
        e.currentTarget.style.boxShadow   = "0 4px 24px rgba(0,0,0,0.3)"
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: "12%", right: "12%",
        height: "2px", borderRadius: "0 0 2px 2px",
        background: card.gradient, opacity: 0.55,
      }} aria-hidden="true" />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: "-20px", right: "-20px",
        width: "80px", height: "80px", borderRadius: "50%",
        background: `radial-gradient(circle,${card.color}22 0%,transparent 70%)`,
        pointerEvents: "none",
      }} aria-hidden="true" />

      {/* Icon */}
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(145deg,${card.color}20,${card.color}0A)`,
        border: `1px solid ${card.color}30`,
      }}>
        <Icon size={22} style={{ color: card.color }} aria-hidden="true" />
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: card.color, marginBottom: "6px", opacity: 0.85,
        }}>
          {card.label}
        </p>
        <p style={{
          fontSize: "15px", fontWeight: 600,
          color: "#EEF0F8", lineHeight: 1.3,
          wordBreak: "break-all",
        }}>
          {card.value}
        </p>
        <p style={{ fontSize: "12px", color: "#718096", marginTop: "4px" }}>
          {card.sub}
        </p>
      </div>

      {/* Link arrow — only on clickable cards */}
      {card.href && (
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", fontWeight: 600, color: card.color,
        }}>
          <ExternalLink size={13} aria-hidden="true" />
          {card.id === "email" ? "Send Email" : `Open ${card.label}`}
        </div>
      )}
    </motion.div>
  )

  return card.href ? (
    <a
      href={card.href}
      target={card.href.startsWith("mailto") ? undefined : "_blank"}
      rel={card.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      aria-label={`${card.label}: ${card.value}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Contact section — no form, just premium contact details
───────────────────────────────────────────────────────────── */
export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <section
      id="contact"
      style={{
        background: "#080C18",
        paddingTop: "100px",
        paddingBottom: "100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(0,229,204,0.03) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} aria-hidden="true" />
      {/* Glow blobs */}
      <div style={{
        position: "absolute", bottom: "-5%", right: "5%",
        width: "40%", height: "50%", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 70%)",
      }} aria-hidden="true" />
      <div style={{
        position: "absolute", top: "-5%", left: "5%",
        width: "35%", height: "45%", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse,rgba(167,139,250,0.04) 0%,transparent 70%)",
      }} aria-hidden="true" />

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 clamp(1.5rem,5vw,4rem)",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Section header ────────────────────────────────── */}
        <motion.div
          {...(reduced ? {} : {
            initial: { opacity: 0, y: 28 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.3 },
            transition: { duration: 0.52, ease: [0.25,0.46,0.45,0.94] },
          })}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          {/* Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 18px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              background: "linear-gradient(135deg,rgba(0,229,204,0.12),rgba(167,139,250,0.12))",
              border: "1px solid rgba(0,229,204,0.22)", color: "#00E5CC",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "linear-gradient(135deg,#00E5CC,#A78BFA)",
                display: "inline-block", boxShadow: "0 0 6px rgba(0,229,204,0.6)",
              }} aria-hidden="true" />
              Get In Touch
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(2.2rem,5vw,3.2rem)", fontWeight: 800,
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px",
            background: "linear-gradient(135deg,#FFFFFF 20%,#94A3B8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Contact Me
          </h2>

          <p style={{
            fontSize: "15px", color: "#718096",
            maxWidth: "520px", margin: "0 auto 28px", lineHeight: 1.7,
          }}>
            I'm open to web development internships, junior developer roles, and
            exciting web projects. Reach out through any channel below.
          </p>

          {/* Gradient divider */}
          <div style={{
            width: "120px", height: "3px", borderRadius: "2px",
            background: "linear-gradient(to right,#00E5CC,#A78BFA,transparent)",
            margin: "0 auto", boxShadow: "0 0 12px rgba(0,229,204,0.4)",
          }} aria-hidden="true" />
        </motion.div>

        {/* ── Intro card ──────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0)}
          style={{
            textAlign: "center",
            padding: "40px 32px",
            borderRadius: "24px",
            marginBottom: "32px",
            background: "linear-gradient(145deg,rgba(18,24,42,0.96),rgba(10,14,28,0.92))",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
          }}
        >
          {/* Avatar / name */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "linear-gradient(135deg,rgba(0,229,204,0.15),rgba(167,139,250,0.15))",
            border: "2px solid rgba(0,229,204,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "26px", fontWeight: 900,
            color: "#00E5CC",
            boxShadow: "0 0 24px rgba(0,229,204,0.15)",
          }}>
            SA
          </div>

          <h3 style={{
            fontSize: "22px", fontWeight: 800,
            color: "#FFFFFF", marginBottom: "6px",
          }}>
            {personalInfo.name}
          </h3>

          <p style={{ fontSize: "14px", color: "#00E5CC", fontWeight: 600, marginBottom: "12px" }}>
            Aspiring Web Developer · Data Entry Expert
          </p>

          <p style={{
            fontSize: "14px", color: "#718096",
            maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.7,
          }}>
            {personalInfo.tagline}
          </p>

          {/* Quick action buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px",
                        justifyContent: "center" }}>
            <a href={`mailto:${personalInfo.email}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "10px 22px", borderRadius: "10px",
                background: "linear-gradient(135deg,#00E5CC,#0284C7)",
                color: "#040E18", fontWeight: 700, fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(0,229,204,0.25)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 0 32px rgba(0,229,204,0.45)"
                e.currentTarget.style.transform = "translateY(-1px)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,204,0.25)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <MessageCircle size={15} aria-hidden="true" />
              Email Me
            </a>

            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "10px 22px", borderRadius: "10px",
                background: "transparent",
                border: "1.5px solid rgba(0,229,204,0.35)",
                color: "#00E5CC", fontWeight: 700, fontSize: "13px",
                textDecoration: "none", transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(0,229,204,0.08)"
                e.currentTarget.style.borderColor = "rgba(0,229,204,0.6)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.borderColor = "rgba(0,229,204,0.35)"
              }}
            >
              <Download size={15} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* ── 4-card contact grid ──────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: "16px" }}
          className="contact-cards">
          <style>{`
            @media(min-width:640px){ .contact-cards { grid-template-columns: repeat(2,1fr) !important; } }
            @media(min-width:1024px){ .contact-cards { grid-template-columns: repeat(4,1fr) !important; } }
          `}</style>

          {CONTACT_CARDS.map((card, i) => (
            <ContactCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* ── Availability badge ────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.4)}
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 20px", borderRadius: "999px",
            fontSize: "13px", fontWeight: 600,
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.22)",
            color: "#34D399",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#34D399", display: "inline-block",
              boxShadow: "0 0 6px rgba(52,211,153,0.7)",
              animation: "pulse 2s infinite",
            }} aria-hidden="true" />
            Available for Internships &amp; Junior Web Developer Roles
          </span>
        </motion.div>

      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  )
}
