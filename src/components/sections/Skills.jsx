import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Brain, Network, Code2, Server, Monitor, Workflow } from "lucide-react"
import { skills } from "../../data/skills"

const ICON_MAP = { Brain, Network, Code2, Server, Monitor, Workflow }

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const cardV = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25,0.46,0.45,0.94] } },
}

function SkillCard({ category }) {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()
  const Icon = ICON_MAP[category.iconName] || Brain
  const { color, gradient, glowColor } = category

  return (
    <motion.article
      variants={cardV}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      style={{
        position: "relative", borderRadius: "22px", padding: "28px",
        display: "flex", flexDirection: "column", gap: "20px", cursor: "default",
        background: "linear-gradient(145deg,rgba(22,28,45,0.92) 0%,rgba(12,16,32,0.88) 100%)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: "1px solid", borderColor: hovered ? `${color}55` : "rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.45),0 0 0 1px ${color}30,0 0 40px ${glowColor}`
          : "0 4px 24px rgba(0,0,0,0.3),0 1px 0 rgba(255,255,255,0.04) inset",
        transition: "border-color 0.3s ease,box-shadow 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "2px", borderRadius: "0 0 2px 2px", background: gradient, opacity: hovered ? 1 : 0.45, transition: "opacity 0.3s ease" }} aria-hidden="true" />
      <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle,${glowColor} 0%,transparent 70%)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.35s ease", pointerEvents: "none" }} aria-hidden="true" />

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "14px",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          background: `linear-gradient(145deg,${color}22 0%,${color}10 100%)`,
          border: `1px solid ${color}30`,
          boxShadow: hovered ? `0 0 16px ${glowColor}` : "none", transition: "box-shadow 0.3s ease",
        }}>
          <Icon size={22} style={{ color }} aria-hidden="true" />
        </div>
        <div>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "3px" }}>
            {category.label}
          </h3>
          <span style={{ fontSize: "11px", fontWeight: 500, color, background: `${color}12`, border: `1px solid ${color}25`, padding: "1px 8px", borderRadius: "999px" }}>
            {category.items.length} skills
          </span>
        </div>
      </div>

      <div style={{ height: "1px", background: `linear-gradient(to right,${color}30,transparent)`, margin: "0 -4px" }} aria-hidden="true" />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", flex: 1, alignContent: "flex-start" }}>
        {category.items.map((skill) => (
          <motion.span
            key={skill}
            whileHover={reduced ? {} : { scale: 1.06, y: -1 }}
            transition={{ duration: 0.15 }}
            style={{
              display: "inline-block", padding: "5px 13px", borderRadius: "999px",
              fontSize: "12px", fontWeight: 500, letterSpacing: "0.01em", lineHeight: "1.4",
              cursor: "default", whiteSpace: "nowrap",
              background: hovered ? `linear-gradient(135deg,${color}18 0%,${color}08 100%)` : `${color}0E`,
              border: `1px solid ${color}28`,
              color: hovered ? color : `${color}CC`,
              boxShadow: hovered ? `0 0 10px ${color}18` : "none",
              transition: "background 0.25s ease,color 0.25s ease,box-shadow 0.25s ease",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.article>
  )
}

export default function Skills() {
  const reduced = useReducedMotion()
  const categories = Object.values(skills)

  return (
    <section
      id="skills"
      style={{ background: "#080C18", paddingTop: "100px", paddingBottom: "100px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(0,229,204,0.035) 1px,transparent 1px)", backgroundSize: "40px 40px" }} aria-hidden="true" />
      <div style={{ position: "absolute", top: "-10%", left: "5%", width: "40%", height: "50%", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 65%)" }} aria-hidden="true" />
      <div style={{ position: "absolute", bottom: "0%", right: "5%", width: "35%", height: "45%", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(ellipse,rgba(167,139,250,0.04) 0%,transparent 65%)" }} aria-hidden="true" />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.25,0.46,0.45,0.94] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 18px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              background: "linear-gradient(135deg,rgba(0,229,204,0.12),rgba(167,139,250,0.12))",
              border: "1px solid rgba(0,229,204,0.22)", color: "#00E5CC",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "linear-gradient(135deg,#00E5CC,#A78BFA)", display: "inline-block", boxShadow: "0 0 6px rgba(0,229,204,0.6)" }} aria-hidden="true" />
              Technical Expertise
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px", background: "linear-gradient(135deg,#FFFFFF 20%,#94A3B8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Skills &amp; Technologies
          </h2>
          <p style={{ fontSize: "15px", color: "#718096", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.65 }}>
            Tools and technologies I use to build intelligent AI-powered solutions.
          </p>
          <div style={{ width: "120px", height: "3px", borderRadius: "2px", background: "linear-gradient(to right,#00E5CC,#A78BFA,transparent)", margin: "0 auto", boxShadow: "0 0 12px rgba(0,229,204,0.4)" }} aria-hidden="true" />
        </motion.div>

        {/* 3-column responsive grid */}
        <motion.div
          variants={reduced ? {} : containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: "20px" }}
          className="skills-grid"
        >
          <style>{`
            @media(min-width:640px)  { .skills-grid { grid-template-columns: repeat(2,1fr) !important; } }
            @media(min-width:1024px) { .skills-grid { grid-template-columns: repeat(3,1fr) !important; } }
          `}</style>
          {categories.map((cat) => <SkillCard key={cat.label} category={cat} />)}
        </motion.div>
      </div>
    </section>
  )
}
