import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { projects } from "../../data/projects"
import { personalInfo } from "../../data/about"

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
}
const cardV = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25,0.46,0.45,0.94] } },
}

function Chip({ label, accent, hovered }) {
  return (
    <span style={{
      padding: "3px 11px", borderRadius: "999px",
      fontSize: "11px", fontWeight: 500, whiteSpace: "nowrap",
      background: hovered ? `${accent}18` : `${accent}0C`,
      border: `1px solid ${hovered ? accent+"40" : accent+"25"}`,
      color: hovered ? accent : `${accent}BB`,
      transition: "all 0.25s ease",
    }}>{label}</span>
  )
}

/* ════════════════════════════════════════════════════════════
   PROJECT VISUALS
════════════════════════════════════════════════════════════ */

/* P1 — CV Builder & ATS Score Checker: rich dashboard visual */
function CVBuilderVisual({ hovered, reduced }) {
  /* ATS score donut via SVG stroke-dashoffset */
  const score   = 92
  const radius  = 28
  const circ    = 2 * Math.PI * radius          // ≈ 175.9
  const filled  = (score / 100) * circ

  /* Keyword chips */
  const keywords = [
    { w: "React",       c: "#00E5CC" },
    { w: "JavaScript",  c: "#A78BFA" },
    { w: "Tailwind",    c: "#38BDF8" },
    { w: "FastAPI",     c: "#00E5CC" },
    { w: "Node.js",     c: "#34D399" },
  ]

  /* Job-match rows */
  const jobs = [
    { role: "Frontend Dev",    pct: 94, c: "#00E5CC" },
    { role: "Full-Stack Dev",  pct: 81, c: "#A78BFA" },
    { role: "Web Developer",   pct: 88, c: "#38BDF8" },
  ]

  return (
    <div style={{
      width:"100%", height:"100%", position:"relative", overflow:"hidden",
      background:"linear-gradient(135deg,rgba(0,229,204,0.05) 0%,rgba(124,58,237,0.07) 60%,rgba(2,132,199,0.06) 100%)",
      display:"flex", alignItems:"stretch",
    }}>

      {/* ── ambient glows ── */}
      <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(0,229,204,0.14),transparent 70%)",
        top:"-30%", left:"-10%", filter:"blur(22px)", pointerEvents:"none" }} aria-hidden="true"/>
      <div style={{ position:"absolute", width:120, height:120, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(167,139,250,0.14),transparent 70%)",
        bottom:"-20%", right:"-8%", filter:"blur(18px)", pointerEvents:"none" }} aria-hidden="true"/>

      {/* ── LEFT PANEL — ATS ring + score ── */}
      <div style={{
        width:"42%", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:6,
        borderRight:"1px solid rgba(0,229,204,0.1)", padding:"12px 8px",
      }}>
        {/* SVG donut ring */}
        <div style={{ position:"relative", width:76, height:76 }}>
          <svg width="76" height="76" viewBox="0 0 76 76" style={{ transform:"rotate(-90deg)" }} aria-hidden="true">
            {/* track */}
            <circle cx="38" cy="38" r={radius} fill="none" stroke="rgba(0,229,204,0.12)" strokeWidth="6"/>
            {/* filled arc */}
            <motion.circle cx="38" cy="38" r={radius} fill="none"
              stroke="url(#atsGrad)" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: reduced ? circ - filled : circ - filled }}
              transition={{ duration: 1.4, delay: 0.5, ease:"easeOut" }}
            />
            <defs>
              <linearGradient id="atsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#00E5CC"/>
                <stop offset="100%" stopColor="#A78BFA"/>
              </linearGradient>
            </defs>
          </svg>
          {/* score text in centre */}
          <div style={{
            position:"absolute", inset:0, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
          }}>
            <span style={{ fontSize:18, fontWeight:900, lineHeight:1,
              background:"linear-gradient(135deg,#00E5CC,#A78BFA)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>{score}</span>
            <span style={{ fontSize:8, color:"rgba(0,229,204,0.6)", fontWeight:700, letterSpacing:"0.05em" }}>ATS</span>
          </div>
        </div>

        {/* label */}
        <div style={{ textAlign:"center" }}>
          <p style={{ fontSize:9, fontWeight:800, color:"#00E5CC", letterSpacing:"0.1em", textTransform:"uppercase" }}>ATS Score</p>
          <p style={{ fontSize:8, color:"rgba(255,255,255,0.35)", marginTop:2 }}>Optimized</p>
        </div>

        {/* keyword chips */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:3, justifyContent:"center", marginTop:2, padding:"0 4px" }}>
          {keywords.map(({ w, c }, i) => (
            <motion.span key={w}
              initial={reduced ? {} : { opacity:0, scale:0.8 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay: 0.6 + i * 0.1, duration:0.3 }}
              style={{ fontSize:8, fontWeight:700, color:c,
                background:`${c}12`, border:`1px solid ${c}30`,
                borderRadius:4, padding:"2px 6px", whiteSpace:"nowrap",
              }}
            >{w}</motion.span>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — job match bars ── */}
      <div style={{
        flex:1, display:"flex", flexDirection:"column",
        justifyContent:"center", padding:"12px 12px 10px 12px", gap:6,
      }}>
        {/* header row */}
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
          <motion.div
            animate={!reduced ? { rotate:[0,10,-10,0] } : {}}
            transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
            style={{ fontSize:14 }} aria-hidden="true"
          >📄</motion.div>
          <span style={{ fontSize:9, fontWeight:800, color:"rgba(255,255,255,0.7)",
            letterSpacing:"0.08em", textTransform:"uppercase" }}>
            Job Match
          </span>
        </div>

        {/* match rows */}
        {jobs.map(({ role, pct, c }, i) => (
          <div key={role} style={{ display:"flex", flexDirection:"column", gap:3 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:9, fontWeight:600, color:"rgba(255,255,255,0.65)" }}>{role}</span>
              <span style={{ fontSize:9, fontWeight:800, color:c }}>{pct}%</span>
            </div>
            <div style={{ height:4, borderRadius:3, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
              <motion.div
                style={{ height:"100%", borderRadius:3,
                  background:`linear-gradient(to right,${c},${c}88)`,
                  boxShadow: hovered ? `0 0 8px ${c}60` : "none",
                  transition:"box-shadow 0.3s",
                }}
                initial={{ width:"0%" }}
                animate={{ width:`${pct}%` }}
                transition={{ duration:1.2, delay: 0.4 + i * 0.2, ease:"easeOut" }}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}

        {/* divider */}
        <div style={{ height:"1px", background:"rgba(0,229,204,0.1)", margin:"2px 0" }} aria-hidden="true"/>

        {/* feature pills row */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
          {["Cover Letter","Templates","PDF Export"].map((f,i)=>(
            <motion.span key={f}
              initial={reduced ? {} : { opacity:0, y:4 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: 1 + i * 0.15 }}
              style={{ fontSize:8, fontWeight:700,
                color:"rgba(0,229,204,0.8)", background:"rgba(0,229,204,0.08)",
                border:"1px solid rgba(0,229,204,0.2)", borderRadius:4, padding:"2px 7px",
              }}
            >{f}</motion.span>
          ))}
        </div>

        {/* bottom tag */}
        <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.09em",
          textTransform:"uppercase", color:"rgba(0,229,204,0.5)", marginTop:2 }}>
          Resume · ATS · Optimizer
        </span>
      </div>
    </div>
  )
}

/* P2 — Movie Recommendation: film reel + floating icon motifs */
function RecommendationVisual({ hovered, reduced }) {
  /* 5 film-themed icons placed around a central reel */
  const icons = [
    { emoji:"⭐", x:"14%", y:"18%", delay:0,    dur:2.4 },
    { emoji:"🍿", x:"68%", y:"12%", delay:0.3,  dur:2.8 },
    { emoji:"🎫", x:"8%",  y:"62%", delay:0.6,  dur:2.2 },
    { emoji:"🎞️", x:"72%", y:"62%", delay:0.15, dur:3.0 },
    { emoji:"🏆", x:"38%", y:"72%", delay:0.45, dur:2.6 },
  ]
  return (
    <div style={{ width:"100%",height:"100%",position:"relative",background:"linear-gradient(135deg,rgba(167,139,250,0.07),rgba(124,58,237,0.09))",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
      {/* Glow orb */}
      <div style={{ position:"absolute",width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,0.22),transparent 70%)",filter:"blur(16px)",pointerEvents:"none" }} aria-hidden="true"/>
      {/* Central film reel */}
      <motion.div
        animate={!reduced?{rotate:360}:{}}
        transition={{ duration:12,repeat:Infinity,ease:"linear" }}
        style={{ fontSize:40,zIndex:2,userSelect:"none",filter:hovered?"drop-shadow(0 0 10px rgba(167,139,250,0.8))":"drop-shadow(0 0 4px rgba(167,139,250,0.4))",transition:"filter 0.3s" }}
        aria-hidden="true"
      >🎬</motion.div>
      {/* Floating icons */}
      {icons.map(({ emoji, x, y, delay, dur }) => (
        <motion.span key={emoji}
          style={{ position:"absolute",left:x,top:y,fontSize:18,userSelect:"none",opacity:hovered?0.9:0.5,transition:"opacity 0.3s" }}
          animate={!reduced?{y:[0,-6,0],scale:[1,1.12,1]}:{}}
          transition={{ duration:dur,repeat:Infinity,ease:"easeInOut",delay }}
          aria-hidden="true"
        >{emoji}</motion.span>
      ))}
      {/* Star rating row */}
      <div style={{ position:"absolute",bottom:10,left:12,display:"flex",alignItems:"center",gap:3 }} aria-hidden="true">
        {[1,2,3,4,5].map(s=>(
          <motion.span key={s} style={{ fontSize:10,color:`rgba(167,139,250,${hovered?0.9:0.5})`,transition:"color 0.3s" }}
            animate={!reduced?{opacity:[0.5,1,0.5]}:{}}
            transition={{ duration:1.5,repeat:Infinity,delay:s*0.15 }}
          >★</motion.span>
        ))}
        <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(167,139,250,0.6)",marginLeft:6 }}>CF + CBF</span>
      </div>
    </div>
  )
}

/* P3 — AI Content Assistant: ChatGPT-style mock UI with typing indicator */
function ChatVisual({ hovered, reduced }) {
  return (
    <div style={{ width:"100%",height:"100%",position:"relative",background:"linear-gradient(135deg,rgba(56,189,248,0.06),rgba(59,130,246,0.09))",overflow:"hidden",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8,justifyContent:"center" }}>
      {/* Glow */}
      <div style={{ position:"absolute",width:90,height:90,borderRadius:"50%",background:"radial-gradient(circle,rgba(56,189,248,0.18),transparent 70%)",bottom:"-8%",right:"-4%",filter:"blur(14px)",pointerEvents:"none" }} aria-hidden="true"/>
      {/* AI badge top-right */}
      <div style={{ position:"absolute",top:10,right:12,display:"flex",alignItems:"center",gap:5 }} aria-hidden="true">
        <span style={{ fontSize:10,fontWeight:700,color:"rgba(56,189,248,0.7)",letterSpacing:"0.06em" }}>Llama 3.3</span>
        <div style={{ width:8,height:8,borderRadius:"50%",background:"#38BDF8",boxShadow:hovered?"0 0 8px #38BDF8":"none",transition:"box-shadow 0.3s" }}/>
      </div>

      {/* User message */}
      <motion.div
        initial={reduced?{}:{opacity:0,x:16}}
        whileInView={{ opacity:1,x:0 }}
        viewport={{ once:true }}
        transition={{ delay:0.1,duration:0.38 }}
        style={{ alignSelf:"flex-end",maxWidth:"72%",padding:"6px 12px",borderRadius:"12px 3px 12px 12px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",fontSize:11,color:"#CBD5E0",fontWeight:500,lineHeight:1.4 }}
      >
        Explain neural networks 🧠
      </motion.div>

      {/* AI response */}
      <motion.div
        initial={reduced?{}:{opacity:0,x:-16}}
        whileInView={{ opacity:1,x:0 }}
        viewport={{ once:true }}
        transition={{ delay:0.28,duration:0.38 }}
        style={{ alignSelf:"flex-start",maxWidth:"78%",padding:"6px 12px",borderRadius:"3px 12px 12px 12px",background:"rgba(56,189,248,0.11)",border:"1px solid rgba(56,189,248,0.28)",fontSize:11,color:"#38BDF8",fontWeight:500,lineHeight:1.4 }}
      >
        Neural networks are layered systems that learn patterns from data…
      </motion.div>

      {/* Typing indicator */}
      <motion.div
        initial={reduced?{}:{opacity:0}}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ delay:0.5 }}
        style={{ alignSelf:"flex-start",padding:"7px 14px",borderRadius:"3px 12px 12px 12px",background:"rgba(56,189,248,0.08)",border:"1px solid rgba(56,189,248,0.22)",display:"flex",alignItems:"center",gap:5 }}
        aria-label="AI is typing"
      >
        {[0,1,2].map(i=>(
          <motion.span key={i}
            style={{ width:6,height:6,borderRadius:"50%",background:"#38BDF8",display:"inline-block" }}
            animate={!reduced?{y:[0,-4,0],opacity:[0.4,1,0.4]}:{}}
            transition={{ duration:0.7,repeat:Infinity,ease:"easeInOut",delay:i*0.18 }}
            aria-hidden="true"
          />
        ))}
      </motion.div>

      <span style={{ position:"absolute",bottom:9,right:12,fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(56,189,248,0.55)" }}>FastAPI · Groq</span>
    </div>
  )
}

/* P4 — Decode Labs: 4 project nodes in a clean orbit/grid — no overlap */
function DecodeLabsVisual({ hovered, reduced }) {
  /* 4 nodes represent the 4 internship projects */
  const nodes = [
    { label:"Chatbot",  tech:"Python",     c:"#34D399", x:"18%",  y:"20%", delay:0    },
    { label:"KNN Iris", tech:"Scikit-learn",c:"#A78BFA", x:"62%",  y:"18%", delay:0.2  },
    { label:"TF-IDF",   tech:"Cosine Sim", c:"#38BDF8", x:"14%",  y:"62%", delay:0.4  },
    { label:"OCR",      tech:"OpenCV",     c:"#FBBF24", x:"62%",  y:"62%", delay:0.6  },
  ]
  return (
    <div style={{ width:"100%",height:"100%",position:"relative",background:"linear-gradient(135deg,rgba(52,211,153,0.06),rgba(5,150,105,0.09))",overflow:"hidden" }}>
      {/* Central glow */}
      <div style={{ position:"absolute",width:80,height:80,borderRadius:"50%",background:"radial-gradient(circle,rgba(52,211,153,0.22),transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",filter:"blur(14px)",pointerEvents:"none" }} aria-hidden="true"/>
      {/* Centre hub */}
      <motion.div
        style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:42,height:42,borderRadius:"50%",zIndex:3,background:"linear-gradient(135deg,rgba(52,211,153,0.28),rgba(5,150,105,0.18))",border:`1.5px solid rgba(52,211,153,${hovered?0.7:0.4})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:hovered?"0 0 18px rgba(52,211,153,0.5)":"0 0 8px rgba(52,211,153,0.2)",transition:"box-shadow 0.3s,border-color 0.3s" }}
        animate={!reduced?{rotate:[0,360]}:{}}
        transition={{ duration:20,repeat:Infinity,ease:"linear" }}
        aria-hidden="true"
      >⚙️</motion.div>
      {/* SVG spokes */}
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1 }} aria-hidden="true">
        {nodes.map((n,i)=>(
          <line key={i} x1="50%" y1="50%" x2={`calc(${n.x} + 28px)`} y2={`calc(${n.y} + 18px)`}
            stroke={`rgba(52,211,153,${hovered?0.4:0.18})`} strokeWidth="1.2" strokeDasharray="4 3"/>
        ))}
      </svg>
      {/* Project nodes — each in own box, no overlap */}
      {nodes.map(({ label, tech, c, x, y, delay })=>(
        <motion.div key={label}
          style={{ position:"absolute",left:x,top:y,zIndex:4,minWidth:64,padding:"4px 10px",borderRadius:8,background:`${c}12`,border:`1px solid ${c}35`,display:"flex",flexDirection:"column",gap:1 }}
          animate={!reduced?{y:[0,-5,0]}:{}}
          transition={{ duration:2.4,repeat:Infinity,ease:"easeInOut",delay }}
        >
          <span style={{ fontSize:10,fontWeight:700,color:c,lineHeight:1.2 }}>{label}</span>
          <span style={{ fontSize:9,color:`${c}99`,lineHeight:1.2 }}>{tech}</span>
        </motion.div>
      ))}
      <span style={{ position:"absolute",bottom:9,left:12,fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(52,211,153,0.55)" }}>4 Internship Projects</span>
    </div>
  )
}

const VISUALS = { 1:CVBuilderVisual, 2:RecommendationVisual, 3:ChatVisual, 4:DecodeLabsVisual }

/* ── Project Card ─────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()
  const Visual  = VISUALS[project.id] || WaveformVisual
  const { accent } = project

  return (
    <motion.article
      variants={cardV}
      whileHover={reduced?{}:{y:-6,transition:{duration:0.2,ease:"easeOut"}}}
      onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
      style={{
        position:"relative",borderRadius:"20px",overflow:"hidden",
        display:"flex",flexDirection:"column",
        background:"linear-gradient(145deg,rgba(18,24,42,0.97),rgba(10,14,28,0.93))",
        backdropFilter:"blur(16px)",
        border:"1px solid",borderColor:hovered?`${accent}50`:"rgba(255,255,255,0.07)",
        boxShadow:hovered?`0 24px 64px rgba(0,0,0,0.5),0 0 0 1px ${accent}25,0 0 50px ${accent}15`:"0 4px 24px rgba(0,0,0,0.3)",
        transition:"border-color 0.3s ease,box-shadow 0.3s ease",
      }}
    >
      <div style={{ height:"180px",flexShrink:0,position:"relative" }}>
        <Visual hovered={hovered} reduced={!!reduced}/>
        <div style={{ position:"absolute",top:12,left:14,zIndex:10 }}>
          <span style={{ fontSize:"10px",fontWeight:800,letterSpacing:"0.1em",color:accent,background:"rgba(10,14,28,0.75)",border:`1px solid ${accent}30`,padding:"2px 9px",borderRadius:"999px",backdropFilter:"blur(6px)" }}>
            PROJECT {String(project.id).padStart(2,"00")}
          </span>
        </div>
        <div style={{ position:"absolute",top:0,left:"10%",right:"10%",height:"2px",borderRadius:"0 0 2px 2px",background:`linear-gradient(to right,${accent},transparent)`,opacity:hovered?1:0.5,transition:"opacity 0.3s" }} aria-hidden="true"/>
      </div>
      <div style={{ padding:"20px 22px 22px",display:"flex",flexDirection:"column",gap:"12px",flex:1 }}>
        <p style={{ fontSize:"10px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:accent,opacity:0.85 }}>{project.category}</p>
        <h3 style={{ fontSize:"15px",fontWeight:700,color:"#EEF0F8",lineHeight:1.25,letterSpacing:"-0.01em" }}>{project.title}</h3>
        <p style={{ fontSize:"13px",color:"#718096",lineHeight:1.65,flex:1 }}>{project.description}</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
          {project.tech.map(t=><Chip key={t} label={t} accent={accent} hovered={hovered}/>)}
        </div>
        <div style={{ height:"1px",background:`linear-gradient(to right,${accent}25,transparent)` }} aria-hidden="true"/>
        <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}
            style={{ display:"inline-flex",alignItems:"center",gap:"6px",padding:"7px 16px",borderRadius:"8px",fontSize:"12px",fontWeight:600,background:hovered?`${accent}20`:`${accent}0E`,border:`1px solid ${accent}30`,color:accent,textDecoration:"none",transition:"all 0.22s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background=`${accent}28`;e.currentTarget.style.boxShadow=`0 0 14px ${accent}30`}}
            onMouseLeave={e=>{e.currentTarget.style.background=hovered?`${accent}20`:`${accent}0E`;e.currentTarget.style.boxShadow="none"}}>
            <FaGithub size={13} aria-hidden="true"/>GitHub
          </a>
          {project.liveUrl&&(
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${project.title}`}
              style={{ display:"inline-flex",alignItems:"center",gap:"5px",padding:"7px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:600,background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#A0AEC0",textDecoration:"none",transition:"all 0.22s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.color="#FFFFFF";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"}}
              onMouseLeave={e=>{e.currentTarget.style.color="#A0AEC0";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}}>
              <ExternalLink size={12} aria-hidden="true"/>Live Demo
            </a>
          )}
          <motion.div style={{ marginLeft:"auto" }} animate={hovered&&!reduced?{x:[0,4,0]}:{}} transition={{ duration:0.6,repeat:Infinity }}>
            <ArrowUpRight size={16} style={{ color:hovered?accent:"#4A5568",transition:"color 0.25s" }} aria-hidden="true"/>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Main section ─────────────────────────────────────────────── */
export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <section
      id="projects"
      style={{ background:"#0A0F1E",paddingTop:"100px",paddingBottom:"100px",position:"relative",overflow:"hidden" }}
    >
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(0,229,204,0.028) 1px,transparent 1px)",backgroundSize:"40px 40px" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"-8%",right:"8%",width:"38%",height:"44%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>
      <div style={{ position:"absolute",bottom:"-8%",left:"8%",width:"34%",height:"40%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(167,139,250,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>

      <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,amount:0.3 }} transition={{ duration:0.52,ease:[0.25,0.46,0.45,0.94] }}
          style={{ textAlign:"center",marginBottom:"56px" }}
        >
          <div style={{ display:"flex",justifyContent:"center",marginBottom:"20px" }}>
            <span style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 18px",borderRadius:"999px",fontSize:"11px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",background:"linear-gradient(135deg,rgba(0,229,204,0.12),rgba(167,139,250,0.12))",border:"1px solid rgba(0,229,204,0.22)",color:"#00E5CC" }}>
              <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"linear-gradient(135deg,#00E5CC,#A78BFA)",display:"inline-block",boxShadow:"0 0 6px rgba(0,229,204,0.6)" }} aria-hidden="true"/>
              Portfolio Highlights
            </span>
          </div>
          <h2 style={{ fontSize:"clamp(2.2rem,5vw,3.2rem)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"18px",background:"linear-gradient(135deg,#FFFFFF 20%,#94A3B8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
            Featured Projects
          </h2>
          <p style={{ fontSize:"15px",color:"#718096",maxWidth:"500px",margin:"0 auto 28px",lineHeight:1.7 }}>
          A collection of web development and productivity solutions built from idea to deployment.
          </p>
          <div style={{ width:"120px",height:"3px",borderRadius:"2px",background:"linear-gradient(to right,#00E5CC,#A78BFA,transparent)",margin:"0 auto",boxShadow:"0 0 12px rgba(0,229,204,0.4)" }} aria-hidden="true"/>
        </motion.div>

        {/* 2-column grid */}
        <motion.div
          variants={reduced?{}:containerV} initial="hidden" whileInView="show"
          viewport={{ once:true,amount:0.05 }}
          style={{ display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"20px" }}
          className="projects-grid"
        >
          <style>{`@media(min-width:640px){ .projects-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
          {projects.map(p=><ProjectCard key={p.id} project={p}/>)}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,amount:0.3 }} transition={{ duration:0.52,delay:0.2 }}
          style={{ marginTop:"56px",padding:"44px 32px",borderRadius:"24px",textAlign:"center",background:"linear-gradient(145deg,rgba(18,24,42,0.96),rgba(10,14,28,0.92))",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.07)",boxShadow:"0 4px 32px rgba(0,0,0,0.3)",position:"relative",overflow:"hidden" }}
        >
          <div style={{ position:"absolute",top:"-30%",right:"5%",width:"300px",height:"300px",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,rgba(0,229,204,0.04) 0%,transparent 65%)" }} aria-hidden="true"/>
          <div style={{ width:"56px",height:"56px",borderRadius:"50%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
            <FaGithub size={26} style={{ color:"#A0AEC0" }} aria-hidden="true"/>
          </div>
          <h3 style={{ fontSize:"22px",fontWeight:800,letterSpacing:"-0.02em",marginBottom:"12px",background:"linear-gradient(135deg,#FFFFFF 30%,#94A3B8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
            Want to See More?
          </h3>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"13px 32px",borderRadius:"12px",background:"linear-gradient(135deg,#00E5CC 0%,#A78BFA 100%)",color:"#040E18",fontWeight:700,fontSize:"14px",textDecoration:"none",letterSpacing:"0.01em",boxShadow:"0 0 28px rgba(0,229,204,0.25)",transition:"all 0.22s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 44px rgba(0,229,204,0.45)";e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 28px rgba(0,229,204,0.25)";e.currentTarget.style.transform="translateY(0)"}}>
            <FaGithub size={16} aria-hidden="true"/>Explore All Projects
          </a>
        </motion.div>
      </div>
    </section>
  )
}
