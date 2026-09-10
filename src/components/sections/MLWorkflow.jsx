import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Database, FilterX, Wrench, BrainCircuit, BarChart3, Rocket, CheckCircle2 } from "lucide-react"
import { mlWorkflow } from "../../data/workflow"

const ICON_MAP = { Database, FilterX, Wrench, BrainCircuit, BarChart3, Rocket }

const METRICS = [
  "End-to-End AI Development",
  "Data Entry Operations",
  "API Deployment",
  "Production-Ready Solutions",
]

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const cardV = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.25,0.46,0.45,0.94] } },
}

function WorkflowCard({ step }) {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()
  const Icon = ICON_MAP[step.icon] || BrainCircuit

  return (
    <motion.article
      variants={cardV}
      whileHover={reduced?{}:{y:-6,transition:{duration:0.2,ease:"easeOut"}}}
      onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
      style={{
        position:"relative",borderRadius:"20px",padding:"26px 24px",
        display:"flex",flexDirection:"column",gap:"16px",overflow:"hidden",cursor:"default",
        background:"linear-gradient(145deg,rgba(18,24,42,0.95) 0%,rgba(10,14,28,0.90) 100%)",
        backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
        border:"1px solid",borderColor:hovered?`${step.color}50`:"rgba(255,255,255,0.07)",
        boxShadow:hovered?`0 24px 64px rgba(0,0,0,0.5),0 0 0 1px ${step.color}25,0 0 48px ${step.glow}`:"0 4px 24px rgba(0,0,0,0.35),0 1px 0 rgba(255,255,255,0.04) inset",
        transition:"border-color 0.3s ease,box-shadow 0.3s ease",
        height:"100%",
      }}
    >
      <div style={{ position:"absolute",top:0,left:"12%",right:"12%",height:"2px",borderRadius:"0 0 2px 2px",background:step.gradient,opacity:hovered?1:0.5,transition:"opacity 0.3s ease" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"-24px",right:"-24px",width:"88px",height:"88px",borderRadius:"50%",background:`radial-gradient(circle,${step.glow} 0%,transparent 70%)`,opacity:hovered?1:0.45,transition:"opacity 0.35s ease",pointerEvents:"none" }} aria-hidden="true"/>

      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between" }}>
        <span style={{ fontSize:"11px",fontWeight:800,letterSpacing:"0.08em",color:step.color,background:`${step.color}12`,border:`1px solid ${step.color}28`,padding:"3px 10px",borderRadius:"999px" }}>
          STEP {String(step.step).padStart(2,"0")}
        </span>
        <motion.div
          animate={hovered&&!reduced?{rotate:[0,-8,8,0]}:{}} transition={{ duration:0.4 }}
          style={{ width:"44px",height:"44px",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:`linear-gradient(145deg,${step.color}20 0%,${step.color}0A 100%)`,border:`1px solid ${step.color}30`,boxShadow:hovered?`0 0 18px ${step.glow}`:"none",transition:"box-shadow 0.3s ease" }}>
          <Icon size={20} style={{ color:step.color }} aria-hidden="true"/>
        </motion.div>
      </div>
      <h3 style={{ fontSize:"15px",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.01em",lineHeight:1.25 }}>{step.title}</h3>
      <p style={{ fontSize:"13px",lineHeight:1.65,color:"#718096",flex:1 }}>{step.description}</p>
      <div style={{ height:"1px",background:`linear-gradient(to right,${step.color}28,transparent)` }} aria-hidden="true"/>
      <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
        {step.tools.map(tool=>(
          <span key={tool} style={{ padding:"3px 11px",borderRadius:"999px",fontSize:"11px",fontWeight:500,letterSpacing:"0.01em",background:hovered?`${step.color}18`:`${step.color}0C`,border:`1px solid ${step.color}28`,color:hovered?step.color:`${step.color}BB`,transition:"all 0.25s ease",whiteSpace:"nowrap" }}>{tool}</span>
        ))}
      </div>
    </motion.article>
  )
}

function PipelineConnector() {
  const reduced = useReducedMotion()
  return (
    <div style={{ position:"relative",height:"4px",borderRadius:"2px",overflow:"hidden",background:"rgba(255,255,255,0.05)",flex:1,margin:"0 -2px" }} aria-hidden="true">
      <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,229,204,0.3),rgba(167,139,250,0.3),rgba(251,113,133,0.3))",borderRadius:"2px" }}/>
      {!reduced&&(
        <motion.div style={{ position:"absolute",top:0,bottom:0,width:"60px",borderRadius:"2px",background:"linear-gradient(to right,transparent,rgba(0,229,204,0.9),transparent)" }}
          animate={{ x:["-60px","calc(100vw + 60px)"] }} transition={{ duration:2.8,repeat:Infinity,ease:"linear",repeatDelay:1.2 }}/>
      )}
    </div>
  )
}

export default function MLWorkflow() {
  const reduced = useReducedMotion()

  return (
    <section
      id="workflow"
      style={{ background:"#080C18",paddingTop:"100px",paddingBottom:"100px",position:"relative",overflow:"hidden" }}
    >
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(0,229,204,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"-5%",right:"10%",width:"38%",height:"45%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>
      <div style={{ position:"absolute",bottom:"-5%",left:"10%",width:"35%",height:"40%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(167,139,250,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>

      <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,amount:0.3 }} transition={{ duration:0.55,ease:[0.25,0.46,0.45,0.94] }}
          style={{ textAlign:"center",marginBottom:"56px" }}
        >
          <div style={{ display:"flex",justifyContent:"center",marginBottom:"20px" }}>
            <span style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 18px",borderRadius:"999px",fontSize:"11px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",background:"linear-gradient(135deg,rgba(0,229,204,0.12),rgba(167,139,250,0.12))",border:"1px solid rgba(0,229,204,0.22)",color:"#00E5CC" }}>
              <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"linear-gradient(135deg,#00E5CC,#A78BFA)",display:"inline-block",boxShadow:"0 0 6px rgba(0,229,204,0.6)" }} aria-hidden="true"/>
              AI Development Process
            </span>
          </div>
          <h2 style={{ fontSize:"clamp(2.2rem,5vw,3.2rem)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"18px",background:"linear-gradient(135deg,#FFFFFF 20%,#94A3B8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
            Workflow of Intelligent Products
          </h2>
          <p style={{ fontSize:"15px",color:"#718096",maxWidth:"520px",margin:"0 auto 28px",lineHeight:1.7 }}>
            I design, train, evaluate, and deploy AI solutions using a production-focused machine learning workflow.
          </p>
          <div style={{ width:"120px",height:"3px",borderRadius:"2px",background:"linear-gradient(to right,#00E5CC,#A78BFA,transparent)",margin:"0 auto",boxShadow:"0 0 12px rgba(0,229,204,0.4)" }} aria-hidden="true"/>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,amount:0.3 }} transition={{ duration:0.5,delay:0.1 }}
          style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"12px",marginBottom:"52px" }}
        >
          {METRICS.map(m=>(
            <span key={m} style={{ display:"inline-flex",alignItems:"center",gap:"7px",padding:"8px 18px",borderRadius:"999px",fontSize:"12px",fontWeight:500,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"#A0AEC0" }}>
              <CheckCircle2 size={13} style={{ color:"#00E5CC",flexShrink:0 }} aria-hidden="true"/>{m}
            </span>
          ))}
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          variants={reduced?{}:containerV} initial="hidden" whileInView="show"
          viewport={{ once:true,amount:0.06 }}
          style={{ display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"16px" }}
          className="workflow-grid"
        >
          <style>{`
            @media(min-width:640px)  { .workflow-grid { grid-template-columns: repeat(2,1fr) !important; } }
            @media(min-width:1024px) { .workflow-grid { grid-template-columns: repeat(3,1fr) !important; } }
          `}</style>
          {mlWorkflow.map(step=><WorkflowCard key={step.step} step={step}/>)}
        </motion.div>

        {/* Pipeline connector — desktop only */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ delay:0.8,duration:0.6 }}
          style={{ marginTop:"40px",display:"none",alignItems:"center",gap:"0" }}
          className="pipeline-line"
        >
          <style>{`.pipeline-line{display:none!important}@media(min-width:1024px){.pipeline-line{display:flex!important}}`}</style>
          {mlWorkflow.map((step,i)=>(
            <div key={step.step} style={{ display:"flex",alignItems:"center",flex:i<mlWorkflow.length-1?"1":"none" }}>
              <div style={{ width:"10px",height:"10px",borderRadius:"50%",flexShrink:0,background:step.gradient,boxShadow:`0 0 10px ${step.glow}` }} aria-hidden="true"/>
              {i<mlWorkflow.length-1&&<PipelineConnector/>}
            </div>
          ))}
        </motion.div>

        <div style={{ display:"none",marginTop:"10px" }} className="pipeline-labels" aria-hidden="true">
          <style>{`.pipeline-labels{display:none!important}@media(min-width:1024px){.pipeline-labels{display:grid!important;grid-template-columns:repeat(6,1fr)}}`}</style>
          {mlWorkflow.map(step=>{
            const SHORT={1:"Acquisition",2:"Preprocessing",3:"Feature",4:"Model",5:"Performance",6:"Deployment"}
            return <span key={step.step} style={{ fontSize:"10px",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:step.color,opacity:0.75,textAlign:"center",padding:"0 4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{SHORT[step.step]}</span>
          })}
        </div>
      </div>
    </section>
  )
}
