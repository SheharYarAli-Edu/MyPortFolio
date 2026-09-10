import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, ShieldCheck } from "lucide-react"
import { certifications } from "../../data/certifications"

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}
const cardV = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25,0.46,0.45,0.94] } },
}

function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false)
  const reduced  = useReducedMotion()
  const ACCENTS  = ["#00E5CC","#A78BFA","#38BDF8","#FB7185"]
  const accent   = ACCENTS[index % ACCENTS.length]

  return (
    <motion.article
      variants={cardV}
      whileHover={reduced?{}:{y:-5,transition:{duration:0.18,ease:"easeOut"}}}
      onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
      style={{
        position:"relative",borderRadius:"16px",padding:"24px 20px 20px",
        display:"flex",flexDirection:"column",justifyContent:"space-between",
        gap:"16px",minHeight:"160px",overflow:"hidden",cursor:"default",
        background:"linear-gradient(145deg,rgba(18,24,42,0.96) 0%,rgba(10,14,28,0.92) 100%)",
        backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
        border:"1px solid",borderColor:hovered?`${accent}45`:"rgba(255,255,255,0.07)",
        boxShadow:hovered?`0 16px 48px rgba(0,0,0,0.45),0 0 0 1px ${accent}22,0 0 32px ${accent}18`:"0 4px 20px rgba(0,0,0,0.3),0 1px 0 rgba(255,255,255,0.04) inset",
        transition:"border-color 0.28s ease,box-shadow 0.28s ease",
      }}
    >
      <div style={{ position:"absolute",top:0,left:"15%",right:"15%",height:"2px",borderRadius:"0 0 2px 2px",background:`linear-gradient(to right,${accent},transparent)`,opacity:hovered?1:0.4,transition:"opacity 0.28s ease" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"-20px",right:"-20px",width:"70px",height:"70px",borderRadius:"50%",background:`radial-gradient(circle,${accent}22 0%,transparent 70%)`,opacity:hovered?1:0.35,transition:"opacity 0.3s ease",pointerEvents:"none" }} aria-hidden="true"/>

      <span style={{ fontSize:"10px",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:accent,opacity:0.75 }}>
        CERT {String(cert.id).padStart(2,"0")}
      </span>

      <div style={{ display:"flex",alignItems:"flex-start",gap:"10px",flex:1 }}>
        <ShieldCheck size={16} style={{ color:accent,flexShrink:0,marginTop:"2px",opacity:0.8 }} aria-hidden="true"/>
        <h3 style={{ fontSize:"13px",fontWeight:600,color:"#EEF0F8",lineHeight:1.5,letterSpacing:"0.005em" }}>
          {cert.title}
        </h3>
      </div>

      <div style={{ height:"1px",background:`linear-gradient(to right,${accent}28,transparent)` }} aria-hidden="true"/>

      <div>
        {cert.verifyLink?(
          <a href={cert.verifyLink} target="_blank" rel="noopener noreferrer"
            aria-label={`Verify certificate: ${cert.title}`}
            style={{ display:"inline-flex",alignItems:"center",gap:"6px",padding:"7px 16px",borderRadius:"8px",fontSize:"12px",fontWeight:600,letterSpacing:"0.02em",textDecoration:"none",cursor:"pointer",background:hovered?`${accent}22`:`${accent}10`,border:`1px solid ${accent}35`,color:accent,boxShadow:hovered?`0 0 14px ${accent}28`:"none",transition:"all 0.22s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background=`${accent}30`;e.currentTarget.style.borderColor=`${accent}60`;e.currentTarget.style.boxShadow=`0 0 18px ${accent}35`}}
            onMouseLeave={e=>{e.currentTarget.style.background=hovered?`${accent}22`:`${accent}10`;e.currentTarget.style.borderColor=`${accent}35`;e.currentTarget.style.boxShadow=hovered?`0 0 14px ${accent}28`:"none"}}>
            <ExternalLink size={11} aria-hidden="true"/>Verify
          </a>
        ):(
          <span style={{ display:"inline-flex",alignItems:"center",gap:"6px",padding:"7px 16px",borderRadius:"8px",fontSize:"12px",fontWeight:500,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",color:"#4A5568",cursor:"default" }}>
            Link coming soon
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default function Certifications() {
  const reduced = useReducedMotion()

  return (
    <section
      id="certifications"
      style={{ background:"#0A0F1E",paddingTop:"100px",paddingBottom:"100px",position:"relative",overflow:"hidden" }}
    >
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(0,229,204,0.028) 1px,transparent 1px)",backgroundSize:"40px 40px" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"0%",right:"8%",width:"36%",height:"40%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(167,139,250,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>
      <div style={{ position:"absolute",bottom:"0%",left:"8%",width:"32%",height:"38%",borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 70%)" }} aria-hidden="true"/>

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
              Credentials
            </span>
          </div>
          <h2 style={{ fontSize:"clamp(2.2rem,5vw,3.2rem)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"18px",background:"linear-gradient(135deg,#FFFFFF 20%,#94A3B8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
            Certifications
          </h2>
          <p style={{ fontSize:"15px",color:"#718096",maxWidth:"480px",margin:"0 auto 28px",lineHeight:1.7 }}>
            Professional certifications and credentials that validate my skills across AI, Data Entry, and Personal development.
          </p>
          <div style={{ width:"120px",height:"3px",borderRadius:"2px",background:"linear-gradient(to right,#00E5CC,#A78BFA,transparent)",margin:"0 auto",boxShadow:"0 0 12px rgba(0,229,204,0.4)" }} aria-hidden="true"/>
        </motion.div>

        {/* 4-column responsive grid */}
        <motion.div
          variants={reduced?{}:containerV} initial="hidden" whileInView="show"
          viewport={{ once:true,amount:0.05 }}
          style={{ display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"16px" }}
          className="cert-grid"
        >
          <style>{`
            @media(min-width:640px)  { .cert-grid { grid-template-columns: repeat(2,1fr) !important; } }
            @media(min-width:1024px) { .cert-grid { grid-template-columns: repeat(4,1fr) !important; } }
          `}</style>
          {certifications.map((cert,i)=><CertCard key={cert.id} cert={cert} index={i}/>)}
        </motion.div>

        {/* Footer count */}
        <motion.p
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ delay:0.6,duration:0.5 }}
          style={{ textAlign:"center",marginTop:"36px",fontSize:"13px",color:"#4A5568" }}
        >
          {certifications.length} Professional certificates
        </motion.p>
      </div>
    </section>
  )
}
