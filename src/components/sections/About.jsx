import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  GraduationCap, Target, Lightbulb, Sparkles,
  MapPin, Calendar, Code2, CheckCircle2,
} from "lucide-react"
import { about } from "../../data/about"

/* ─── Design tokens ──────────────────────────────────────────── */
const T = {
  cyan:   "#00E5CC",
  purple: "#7C6FEA",
  green:  "#10B981",
  amber:  "#FBBF24",
  bg:     "#0A0F1E",
  card:   "rgba(18,24,42,0.92)",
  border: "rgba(255,255,255,0.07)",
  head:   "#EEF0F8",
  body:   "#A0AEC0",
  muted:  "#4A5568",
}

const fu = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.1 },
  transition:  { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function GradText({ children, from = T.cyan, to = T.purple }) {
  return (
    <span style={{
      background: `linear-gradient(135deg,${from},${to})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {children}
    </span>
  )
}

function StatCard({ value, label, index }) {
  const [hov, setHov] = useState(false)
  const reduced = useReducedMotion()
  const accents = [T.cyan, T.purple, T.green, T.amber]
  const color   = accents[index % 4]

  return (
    <motion.div
      {...fu(0.05 * index)}
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.18 } }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={()   => setHov(false)}
      style={{
        padding: "22px 16px", borderRadius: "16px", textAlign: "center",
        background: T.card, backdropFilter: "blur(12px)",
        border: `1px solid ${hov ? color + "45" : T.border}`,
        boxShadow: hov ? `0 16px 48px rgba(0,0,0,0.4),0 0 32px ${color}15` : "0 4px 20px rgba(0,0,0,0.25)",
        transition: "border-color 0.28s,box-shadow 0.28s",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%",
        height: "2px", borderRadius: "0 0 2px 2px",
        background: `linear-gradient(to right,${color},transparent)`,
        opacity: hov ? 1 : 0.4, transition: "opacity 0.28s",
      }} aria-hidden="true" />
      <p style={{
        fontSize: "2rem", fontWeight: 900, lineHeight: 1,
        background: `linear-gradient(135deg,${color},${T.purple})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", marginBottom: "8px",
      }}>{value}</p>
      <p style={{ fontSize: "11px", fontWeight: 600, color: T.muted, letterSpacing: "0.05em", lineHeight: 1.4 }}>
        {label}
      </p>
    </motion.div>
  )
}

function PillarCard({ icon: Icon, title, color, text, delay }) {
  const [hov, setHov] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.div
      {...fu(delay)}
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.18 } }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={()   => setHov(false)}
      style={{
        padding: "22px", borderRadius: "18px",
        display: "flex", alignItems: "flex-start", gap: "16px",
        background: T.card, backdropFilter: "blur(14px)",
        border: `1px solid ${hov ? color + "45" : T.border}`,
        boxShadow: hov ? `0 20px 56px rgba(0,0,0,0.45),0 0 40px ${color}12` : "0 4px 24px rgba(0,0,0,0.28)",
        transition: "border-color 0.28s,box-shadow 0.28s",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: "-18px", right: "-18px",
        width: "72px", height: "72px", borderRadius: "50%",
        background: `radial-gradient(circle,${color}22 0%,transparent 70%)`,
        opacity: hov ? 1 : 0.35, transition: "opacity 0.3s", pointerEvents: "none",
      }} aria-hidden="true" />
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(145deg,${color}22,${color}0A)`,
        border: `1px solid ${color}30`,
        boxShadow: hov ? `0 0 14px ${color}30` : "none", transition: "box-shadow 0.28s",
      }}>
        <motion.div animate={hov && !reduced ? { rotate: [0,-8,8,0] } : {}} transition={{ duration: 0.4 }}>
          <Icon size={20} style={{ color }} aria-hidden="true" />
        </motion.div>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: T.head, marginBottom: "7px", letterSpacing: "-0.01em" }}>{title}</p>
        <p style={{ fontSize: "13px", color: T.body, lineHeight: 1.7 }}>{text}</p>
      </div>
    </motion.div>
  )
}

function EducationCard({ edu }) {
  const [hov, setHov] = useState(false)
  const reduced = useReducedMotion()
  const tags = ["AI", "Machine Learning", "Data Structures", "Algorithms"]

  return (
    <motion.div
      {...fu(0.3)}
      whileHover={reduced ? {} : { y: -3, transition: { duration: 0.18 } }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={()   => setHov(false)}
      style={{
        padding: "22px", borderRadius: "18px",
        background: "linear-gradient(145deg,rgba(0,229,204,0.05),rgba(18,24,42,0.95))",
        border: `1px solid ${hov ? T.cyan + "45" : "rgba(0,229,204,0.18)"}`,
        boxShadow: hov ? "0 20px 56px rgba(0,0,0,0.4),0 0 40px rgba(0,229,204,0.08)" : "none",
        transition: "border-color 0.28s,box-shadow 0.28s",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: "16px", bottom: "16px", left: 0,
        width: "3px", borderRadius: "0 2px 2px 0",
        background: `linear-gradient(to bottom,${T.cyan},${T.purple})`,
        boxShadow: hov ? `0 0 12px ${T.cyan}60` : "none", transition: "box-shadow 0.28s",
      }} aria-hidden="true" />
      <div style={{ paddingLeft: "16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,229,204,0.10)", border: "1px solid rgba(0,229,204,0.25)",
            }}>
              <GraduationCap size={18} style={{ color: T.cyan }} aria-hidden="true" />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 800, color: T.head, letterSpacing: "-0.01em" }}>{edu.degree}</p>
              <p style={{ fontSize: "12px", color: T.body, marginTop: "2px", display: "flex", alignItems: "center", gap: "5px" }}>
                <MapPin size={10} style={{ color: T.cyan }} aria-hidden="true" />{edu.institution}
              </p>
            </div>
          </div>
          <span style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
            color: T.cyan, background: "rgba(0,229,204,0.10)",
            border: "1px solid rgba(0,229,204,0.25)",
            padding: "4px 12px", borderRadius: "999px",
            display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap",
          }}>
            <Calendar size={10} aria-hidden="true" />{edu.period}
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {tags.map(tag => (
            <span key={tag} style={{
              padding: "3px 10px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 500,
              background: "rgba(0,229,204,0.07)", border: "1px solid rgba(0,229,204,0.2)",
              color: `${T.cyan}BB`,
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const PILLARS = [
  { icon: GraduationCap, title: "Education",  color: T.cyan,   text: "BS Computer Science (2022–2026), University of Education Lahore. Focused on AI, Data Entry, algorithms, and software engineering." },
  { icon: Lightbulb,     title: "Projects",   color: T.purple, text: "Built CV Builder & ATS Score Checker." },
  { icon: Target,        title: "Goals",      color: T.green,  text: "Seeking an Web Development internship or junior role to contribute to real AI products alongside experienced engineers." },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: T.bg, paddingTop: "100px", paddingBottom: "100px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(0,229,204,0.025) 1px,transparent 1px)", backgroundSize: "40px 40px" }} aria-hidden="true" />
      <div style={{ position: "absolute", top: "-10%", left: "5%", width: "40%", height: "50%", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 65%)" }} aria-hidden="true" />
      <div style={{ position: "absolute", bottom: "-10%", right: "5%", width: "35%", height: "45%", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(ellipse,rgba(124,111,234,0.04) 0%,transparent 65%)" }} aria-hidden="true" />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.52, ease: [0.25,0.46,0.45,0.94] }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 18px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              background: "linear-gradient(135deg,rgba(0,229,204,0.12),rgba(124,111,234,0.12))",
              border: "1px solid rgba(0,229,204,0.22)", color: T.cyan,
            }}>
              <Sparkles size={11} aria-hidden="true" />
              Who I Am
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px", color: T.head }}>
            About <GradText from={T.cyan} to={T.purple}>Me</GradText>
          </h2>
          <p style={{ fontSize: "15px", color: T.muted, maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.7 }}>
            Building intelligent systems that bridge research and real-world impact.
          </p>
          <div style={{ width: "120px", height: "3px", borderRadius: "2px", background: `linear-gradient(to right,${T.cyan},${T.purple},transparent)`, margin: "0 auto", boxShadow: "0 0 12px rgba(0,229,204,0.4)" }} aria-hidden="true" />
        </motion.div>

        {/* Asymmetric 2-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }} className="about-main-grid">
          <style>{`@media(min-width:1024px){ .about-main-grid { grid-template-columns: 1.1fr 1fr !important; gap: 56px !important; } }`}</style>

          {/* LEFT — Bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <motion.div {...fu(0.05)}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.cyan }}>
                <Code2 size={13} aria-hidden="true" />
                Junior ML Engineer · AI Application Builder
              </span>
            </motion.div>
            <motion.h3 {...fu(0.1)} style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: T.head, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              Transforming data into intelligent systems that create real impact
            </motion.h3>
            {about.bio.map((para, i) => (
              <motion.p key={i} {...fu(0.14 + i * 0.08)} style={{ color: T.body, fontSize: "15px", lineHeight: 1.8, letterSpacing: "0.01em" }}>
                {para}
              </motion.p>
            ))}
            <motion.div {...fu(0.38)} style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingTop: "8px" }}>
              {[
                { icon: CheckCircle2, text: "CS Graduate 2026",       color: T.green  },
                { icon: CheckCircle2, text: "AI Intern @ Decode Labs", color: T.cyan   },
                { icon: CheckCircle2, text: "Open to Web Development Roles",        color: T.purple },
              ].map(({ icon: Icon, text, color }) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: T.body, fontWeight: 500 }}>
                  <Icon size={13} style={{ color, flexShrink: 0 }} aria-hidden="true" />{text}
                </span>
              ))}
            </motion.div>
            <EducationCard edu={about.education[0]} />
          </div>

          {/* RIGHT — Pillars + Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {PILLARS.map((p, i) => (
              <PillarCard key={p.title} {...p} delay={i * 0.09} />
            ))}
            <motion.div {...fu(0.36)} style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px", marginTop: "4px" }}>
              {about.stats.map(({ value, label }, i) => (
                <StatCard key={label} value={value} label={label} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
