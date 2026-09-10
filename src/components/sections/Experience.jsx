import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  GraduationCap, Brain, Presentation, Briefcase,
  MapPin, Calendar, ChevronDown, ChevronUp, CheckCircle2,
} from "lucide-react"
import { experience } from "../../data/experience"

const ICON_MAP = { GraduationCap, Brain, Presentation, Briefcase }

const ACHIEVEMENTS = [
  "BS Computer Science Graduate",
  "Web Development Intern @ Decode Labs",
  "CV Builder Projects Built",
  "Community Leadership",
]

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
}
const cardV = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25,0.46,0.45,0.94] } },
}

function SkillChip({ label, accent }) {
  return (
    <span style={{ padding:"3px 10px",borderRadius:"999px",fontSize:"11px",fontWeight:500,whiteSpace:"nowrap",background:`${accent}0D`,border:`1px solid ${accent}28`,color:`${accent}BB` }}>
      {label}
    </span>
  )
}

function ExperienceCard({ exp }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const reduced  = useReducedMotion()
  const Icon     = ICON_MAP[exp.icon] || Briefcase
  const { accent, gradient } = exp

  return (
    <motion.article
      variants={cardV}
      whileHover={reduced?{}:{y:-5,transition:{duration:0.2,ease:"easeOut"}}}
      onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
      style={{
        position:"relative",borderRadius:"20px",overflow:"hidden",
        display:"flex",flexDirection:"column",
        background:"linear-gradient(145deg,rgba(18,24,42,0.97),rgba(10,14,28,0.93))",
        backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
        border:"1px solid",borderColor:hovered?`${accent}48`:"rgba(255,255,255,0.07)",
        boxShadow:hovered?`0 24px 64px rgba(0,0,0,0.45),0 0 0 1px ${accent}22,0 0 48px ${accent}12`:"0 4px 24px rgba(0,0,0,0.3)",
        transition:"border-color 0.3s ease,box-shadow 0.3s ease",
      }}
    >
      <div style={{ position:"absolute",top:0,left:"10%",right:"10%",height:"2px",borderRadius:"0 0 2px 2px",background:gradient,opacity:hovered?1:0.45,transition:"opacity 0.3s" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"-24px",right:"-24px",width:"90px",height:"90px",borderRadius:"50%",background:`radial-gradient(circle,${accent}20 0%,transparent 70%)`,opacity:hovered?1:0.4,transition:"opacity 0.35s",pointerEvents:"none" }} aria-hidden="true"/>

      <div style={{ padding:"24px 24px 20px",display:"flex",flexDirection:"column",gap:"16px",flex:1 }}>
        {/* Header */}
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between" }}>
          <div style={{ width:"46px",height:"46px",borderRadius:"13px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(145deg,${accent}22,${accent}0A)`,border:`1px solid ${accent}30`,boxShadow:hovered?`0 0 16px ${accent}28`:"none",transition:"box-shadow 0.3s" }}>
            <motion.div animate={hovered&&!reduced?{rotate:[0,-8,8,0]}:{}} transition={{ duration:0.4 }}>
              <Icon size={22} style={{ color:accent }} aria-hidden="true"/>
            </motion.div>
          </div>
          <span style={{ fontSize:"11px",fontWeight:700,letterSpacing:"0.06em",color:accent,background:`${accent}10`,border:`1px solid ${accent}28`,padding:"3px 10px",borderRadius:"999px",display:"flex",alignItems:"center",gap:"5px" }}>
            <Calendar size={10} aria-hidden="true"/>{exp.duration}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 style={{ fontSize:"15px",fontWeight:700,color:"#EEF0F8",lineHeight:1.25,letterSpacing:"-0.01em",marginBottom:"5px" }}>{exp.title}</h3>
          <p style={{ fontSize:"13px",fontWeight:600,color:accent,marginBottom:"4px" }}>{exp.organization}</p>
          <p style={{ fontSize:"12px",color:"#4A5568",display:"flex",alignItems:"center",gap:"4px" }}>
            <MapPin size={11} aria-hidden="true"/>{exp.location}
          </p>
        </div>

        <p style={{ fontSize:"13px",color:"#718096",lineHeight:1.65 }}>{exp.summary}</p>

        <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
          {exp.skills.map(s=><SkillChip key={s} label={s} accent={accent}/>)}
        </div>

        <div style={{ height:"1px",background:`linear-gradient(to right,${accent}25,transparent)` }} aria-hidden="true"/>

        {/* Expandable details */}
        <AnimatePresence initial={false}>
          {expanded&&(
            <motion.div key="details"
              initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:"auto" }} exit={{ opacity:0,height:0 }}
              transition={{ duration:0.32,ease:[0.25,0.46,0.45,0.94] }}
              style={{ overflow:"hidden" }}>
              <ul style={{ display:"flex",flexDirection:"column",gap:"8px",paddingBottom:"4px" }}>
                {exp.details.map((d,i)=>(
                  <motion.li key={i}
                    initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                    transition={{ delay:i*0.06,duration:0.3 }}
                    style={{ display:"flex",alignItems:"flex-start",gap:"8px",fontSize:"13px",color:"#A0AEC0",lineHeight:1.6 }}>
                    <CheckCircle2 size={13} style={{ color:accent,flexShrink:0,marginTop:"3px" }} aria-hidden="true"/>
                    {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={()=>setExpanded(v=>!v)}
          aria-expanded={expanded}
          style={{ display:"inline-flex",alignItems:"center",gap:"6px",padding:"8px 16px",borderRadius:"8px",cursor:"pointer",alignSelf:"flex-start",background:expanded?`${accent}18`:`${accent}0C`,border:`1px solid ${accent}30`,color:accent,fontSize:"12px",fontWeight:700,transition:"all 0.22s ease" }}
          onMouseEnter={e=>{e.currentTarget.style.background=`${accent}25`;e.currentTarget.style.boxShadow=`0 0 12px ${accent}28`}}
          onMouseLeave={e=>{e.currentTarget.style.background=expanded?`${accent}18`:`${accent}0C`;e.currentTarget.style.boxShadow="none"}}>
          {expanded?<><ChevronUp size={13} aria-hidden="true"/> View Less</>:<><ChevronDown size={13} aria-hidden="true"/> View More</>}
        </button>
      </div>
    </motion.article>
  )
}

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <section
      id="experience"
      style={{ background:"#0A0F1E",paddingTop:"100px",paddingBottom:"100px",position:"relative",overflow:"hidden" }}
    >
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(0,229,204,0.028) 1px,transparent 1px)",backgroundSize:"40px 40px" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"-8%",left:"8%",width:"36%",height:"44%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>
      <div style={{ position:"absolute",bottom:"-8%",right:"8%",width:"32%",height:"38%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(167,139,250,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>

      <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,amount:0.3 }} transition={{ duration:0.52,ease:[0.25,0.46,0.45,0.94] }}
          style={{ textAlign:"center",marginBottom:"48px" }}
        >
          <div style={{ display:"flex",justifyContent:"center",marginBottom:"20px" }}>
            <span style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 18px",borderRadius:"999px",fontSize:"11px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",background:"linear-gradient(135deg,rgba(0,229,204,0.12),rgba(167,139,250,0.12))",border:"1px solid rgba(0,229,204,0.22)",color:"#00E5CC" }}>
              <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"linear-gradient(135deg,#00E5CC,#A78BFA)",display:"inline-block",boxShadow:"0 0 6px rgba(0,229,204,0.6)" }} aria-hidden="true"/>
              Professional Journey
            </span>
          </div>
          <h2 style={{ fontSize:"clamp(2.2rem,5vw,3.2rem)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"18px",background:"linear-gradient(135deg,#FFFFFF 20%,#94A3B8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
            Experience &amp; Growth
          </h2>
          <p style={{ fontSize:"15px",color:"#718096",maxWidth:"520px",margin:"0 auto 28px",lineHeight:1.7 }}>
            My journey of learning, building, leading, and applying AI to solve real-world problems.
          </p>
          <div style={{ width:"120px",height:"3px",borderRadius:"2px",background:"linear-gradient(to right,#00E5CC,#A78BFA,transparent)",margin:"0 auto",boxShadow:"0 0 12px rgba(0,229,204,0.4)" }} aria-hidden="true"/>
        </motion.div>

        {/* Achievement badges */}
        <motion.div
          initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,amount:0.3 }} transition={{ duration:0.5,delay:0.1 }}
          style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"10px",marginBottom:"48px" }}
        >
          {ACHIEVEMENTS.map(a=>(
            <span key={a} style={{ display:"inline-flex",alignItems:"center",gap:"7px",padding:"7px 16px",borderRadius:"999px",fontSize:"12px",fontWeight:600,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"#A0AEC0" }}>
              <CheckCircle2 size={12} style={{ color:"#00E5CC",flexShrink:0 }} aria-hidden="true"/>{a}
            </span>
          ))}
        </motion.div>

        {/* 2-column grid */}
        <motion.div
          variants={reduced?{}:containerV} initial="hidden" whileInView="show"
          viewport={{ once:true,amount:0.05 }}
          style={{ display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"20px" }}
          className="exp-grid"
        >
          <style>{`@media(min-width:640px){ .exp-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
          {experience.map(exp=><ExperienceCard key={exp.id} exp={exp}/>)}
        </motion.div>
      </div>
    </section>
  )
}
