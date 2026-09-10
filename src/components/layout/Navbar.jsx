import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { personalInfo } from "../../data/about"

/* ── Logo image ─────────────────────────────────────────────── */
const logoModules = import.meta.glob("../../assets/sa-logo.*", { eager: true })
const logoKey     = Object.keys(logoModules)[0]
const saLogo      = logoKey ? logoModules[logoKey].default : null

/* ── Nav items — now route-based, not scroll anchors ─────────── */
const NAV_ITEMS = [
  { label: "About",          path: "/about"          },
  { label: "Skills",         path: "/skills"         },
  { label: "Projects",       path: "/projects"       },
  { label: "Workflow",       path: "/workflow"       },
  { label: "Experience",     path: "/experience"     },
  { label: "Certifications", path: "/certifications" },
  { label: "Contact",        path: "/#contact"       },
]

/* ─────────────────────────────────────────────────────────────────
   SA Neural-Brain Logo SVG
───────────────────────────────────────────────────────────────── */
function SALogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-label="SA Neural Brain Logo" role="img">
      <defs>
        <linearGradient id="saGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#00D4AA" />
          <stop offset="45%"  stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#C8A84B" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="40" y1="40" x2="80" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E8C547" />
          <stop offset="100%" stopColor="#C8913A" />
        </linearGradient>
        <radialGradient id="bgGrad" cx="60" cy="55" r="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#0D2B3E" />
          <stop offset="70%"  stopColor="#081828" />
          <stop offset="100%" stopColor="#050E1A" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="centreGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#bgGrad)" />
      <polygon points="60,6 95,20 112,52 108,88 82,110 38,110 12,88 8,52 25,20"
        fill="none" stroke="url(#akGrad)" strokeWidth="1.2" opacity="0.45" />
      <g stroke="#1A4A6B" strokeWidth="0.8" opacity="0.7">
        <line x1="12" y1="52" x2="38" y2="35" /><line x1="12" y1="52" x2="25" y2="20" />
        <line x1="25" y1="20" x2="60" y2="6" /><line x1="38" y1="35" x2="25" y2="20" />
        <line x1="38" y1="35" x2="60" y2="28" /><line x1="12" y1="52" x2="22" y2="75" />
        <line x1="22" y1="75" x2="38" y2="35" /><line x1="22" y1="75" x2="12" y2="88" />
        <line x1="12" y1="88" x2="38" y2="110" /><line x1="38" y1="110" x2="22" y2="75" />
        <line x1="38" y1="110" x2="50" y2="90" /><line x1="22" y1="75" x2="50" y2="90" />
        <line x1="108" y1="52" x2="82" y2="35" /><line x1="108" y1="52" x2="95" y2="20" />
        <line x1="95" y1="20" x2="60" y2="6" /><line x1="82" y1="35" x2="95" y2="20" />
        <line x1="82" y1="35" x2="60" y2="28" /><line x1="108" y1="52" x2="98" y2="75" />
        <line x1="98" y1="75" x2="82" y2="35" /><line x1="98" y1="75" x2="108" y2="88" />
        <line x1="108" y1="88" x2="82" y2="110" /><line x1="82" y1="110" x2="98" y2="75" />
        <line x1="82" y1="110" x2="70" y2="90" /><line x1="98" y1="75" x2="70" y2="90" />
      </g>
      <line x1="60" y1="6" x2="60" y2="110" stroke="url(#akGrad)" strokeWidth="0.6" opacity="0.25" />
      <circle cx="60" cy="18" r="3" fill="#E0F8F5" opacity="0.9" filter="url(#centreGlow)" />
      <circle cx="60" cy="18" r="1.5" fill="#FFFFFF" />
      <g filter="url(#glow)">
        <line x1="36" y1="88" x2="50" y2="22" stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="64" y1="22" x2="50" y2="22" stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="64" y1="22" x2="54" y2="65" stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="40" y1="60" x2="56" y2="60" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g filter="url(#glow)">
        <line x1="65" y1="22" x2="65" y2="95" stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="65" y1="55" x2="92" y2="26" stroke="url(#akGrad)" strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1="55" x2="94" y2="90" stroke="url(#akGrad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M90,88 Q97,90 98,82" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
      <g filter="url(#glow)" opacity="0.9">
        <line x1="50" y1="72" x2="50" y2="104" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="104" r="3.5" fill="url(#goldGrad)" />
        <circle cx="50" cy="72"  r="3"   fill="url(#goldGrad)" />
        <line x1="44" y1="82" x2="50" y2="82" stroke="url(#goldGrad)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="44" cy="82" r="2.2" fill="url(#goldGrad)" />
        <line x1="56" y1="78" x2="50" y2="78" stroke="url(#goldGrad)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="56" cy="78" r="2.2" fill="url(#goldGrad)" />
        <line x1="40" y1="68" x2="40" y2="95" stroke="url(#akGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <line x1="60" y1="68" x2="60" y2="95" stroke="url(#akGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </g>
      <circle cx="60" cy="60" r="54" fill="none" stroke="url(#akGrad)" strokeWidth="1" opacity="0.35" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#00D4AA" strokeWidth="0.5" opacity="0.15" filter="url(#centreGlow)" />
    </svg>
  )
}

/* ── Single desktop nav link ─────────────────────────────────── */
function NavLink({ label, path, isActive, onClick }) {
  return (
    <li style={{ listStyle: "none", position: "relative" }}>
      <Link
        to={path}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        style={{
          position: "relative",
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "7px",
          fontSize: "13px",
          fontWeight: isActive ? 600 : 400,
          cursor: "pointer",
          textDecoration: "none",
          border: isActive ? "1px solid rgba(0,212,170,0.28)" : "1px solid transparent",
          background: isActive ? "rgba(0,212,170,0.10)" : "transparent",
          color: isActive ? "#7FFFD4" : "#9BBFCC",
          transition: "all 0.22s ease",
          letterSpacing: "0.012em",
          backdropFilter: isActive ? "blur(4px)" : "none",
        }}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.color = "#C8E8D4"
            e.currentTarget.style.background = "rgba(255,255,255,0.05)"
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.color = "#9BBFCC"
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.border = "1px solid transparent"
          }
        }}
      >
        {label}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            style={{
              position: "absolute", bottom: "2px", left: "14px", right: "14px",
              height: "2px", borderRadius: "1px",
              background: "linear-gradient(to right, #00D4AA, #C8A84B)",
              boxShadow: "0 0 8px rgba(0,212,170,0.7)",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </li>
  )
}

/* ── Main Navbar ─────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled,    setIsScrolled]    = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [contactActive, setContactActive] = useState(false)
  const location   = useLocation()
  const navigate   = useNavigate()

  /* Derive active path */
  const activePath = location.pathname

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 60)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  /* Scroll-spy: highlight Contact whenever the #contact section is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setContactActive(entry.isIntersecting),
      { threshold: 0.15 }
    )
    const el = document.getElementById("contact")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [location.pathname]) // re-run after route changes so the element is found

  /* Close drawer on resize to desktop */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  /* Logo click — go home, then scroll to top */
  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      navigate("/")
    }
  }

  /* Contact special case — scroll to #contact on home page */
  const handleContactClick = (e, path) => {
    if (path === "/#contact") {
      e.preventDefault()
      setMenuOpen(false)
      if (location.pathname === "/") {
        setTimeout(() => {
          const el = document.getElementById("contact")
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" })
        }, 60)
      } else {
        navigate("/")
        setTimeout(() => {
          const el = document.getElementById("contact")
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" })
        }, 350)
      }
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <style>{`
        .nav-desktop-list { display: none !important; }
        .nav-hire-btn     { display: none !important; }
        .nav-hamburger    { display: flex !important; }
        @media (min-width: 1024px) {
          .nav-desktop-list { display: flex !important; }
          .nav-hire-btn     { display: flex !important; }
          .nav-hamburger    { display: none !important; }
        }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: isScrolled ? "rgba(4,22,32,0.97)" : "rgba(4,20,30,0.78)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        borderBottom: "1px solid rgba(0,212,170,0.14)",
        boxShadow: isScrolled
          ? "0 1px 0 0 rgba(0,212,170,0.12), 0 4px 24px rgba(0,0,0,0.5)"
          : "0 1px 0 0 rgba(0,212,170,0.07)",
        transition: "background 0.35s ease, box-shadow 0.35s ease",
      }}>
        <nav style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 clamp(1.5rem,5vw,4rem)",
          height: "66px", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: "1rem",
        }} aria-label="Main navigation">

          {/* Logo — clicking navigates home, no icon shown */}
          <button
            onClick={handleLogoClick}
            aria-label="Go to home — SA Portfolio"
            style={{
              cursor: "pointer", background: "none", border: "none",
              padding: "4px 6px", borderRadius: "8px", flexShrink: 0,
              fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.06em",
              color: "#00D4AA",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#7FFFD4"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#00D4AA"
            }}
          >
            SA
          </button>

          {/* Desktop nav */}
          <ul className="nav-desktop-list" style={{
            display: "flex", alignItems: "center", gap: "2px", listStyle: "none",
            background: "rgba(0,60,70,0.35)",
            border: "1px solid rgba(0,212,170,0.12)",
            borderRadius: "12px", padding: "4px 6px",
            backdropFilter: "blur(12px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            {NAV_ITEMS.map(({ label, path }) => (
              <NavLink
                key={path}
                label={label}
                path={path}
                isActive={
                  path === "/#contact"
                    ? contactActive
                    : activePath === path || (path !== "/" && activePath.startsWith(path))
                }
                onClick={e => handleContactClick(e, path)}
              />
            ))}
          </ul>

          {/* Hire Me */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-hire-btn"
            style={{
              alignItems: "center", gap: "6px",
              background: "linear-gradient(135deg,#00D4AA 0%,#4ECDC4 40%,#C8A84B 100%)",
              color: "#040E18", fontWeight: 700, fontSize: "13px",
              padding: "8px 20px", borderRadius: "999px", border: "none",
              cursor: "pointer",
              boxShadow: "0 0 18px rgba(0,212,170,0.32),inset 0 1px 0 rgba(255,255,255,0.25)",
              transition: "box-shadow 0.2s,transform 0.15s",
              whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,170,0.55),inset 0 1px 0 rgba(255,255,255,0.25)"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 18px rgba(0,212,170,0.32),inset 0 1px 0 rgba(255,255,255,0.25)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Hire Me ✨
          </a>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              padding: "8px", borderRadius: "10px", cursor: "pointer",
              color: "#7FFFD4",
              background: menuOpen ? "rgba(0,212,170,0.1)" : "transparent",
              border: `1px solid ${menuOpen ? "rgba(0,212,170,0.28)" : "rgba(0,212,170,0.12)"}`,
              transition: "all 0.2s", flexShrink: 0,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.div key="x" initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.15 }}>
                    <X size={20} aria-hidden="true" />
                  </motion.div>
                : <motion.div key="m" initial={{ rotate:90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }} transition={{ duration:0.15 }}>
                    <Menu size={20} aria-hidden="true" />
                  </motion.div>
              }
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity:0, height:0 }}
              animate={{ opacity:1, height:"auto" }}
              exit={{ opacity:0, height:0 }}
              transition={{ duration:0.22, ease:"easeInOut" }}
              style={{
                background: "rgba(4,18,28,0.98)",
                backdropFilter: "blur(28px)",
                borderBottom: "1px solid rgba(0,212,170,0.12)",
                overflow: "hidden",
              }}
            >
              <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"16px clamp(1.5rem,5vw,4rem)" }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"8px" }}>
                  {NAV_ITEMS.map(({ label, path }) => {
                    const isActive = path === "/#contact"
                      ? contactActive
                      : activePath === path || (path !== "/" && activePath.startsWith(path))
                    return (
                      <Link
                        key={path}
                        to={path === "/#contact" ? "/" : path}
                        onClick={e => handleContactClick(e, path)}
                        aria-current={isActive ? "page" : undefined}
                        style={{
                          display: "flex", alignItems: "center",
                          padding: "11px 16px", borderRadius: "10px",
                          fontSize: "14px", fontWeight: isActive ? 600 : 400,
                          cursor: "pointer", textDecoration: "none",
                          color: isActive ? "#7FFFD4" : "#9BBFCC",
                          background: isActive ? "rgba(0,212,170,0.1)" : "rgba(0,40,50,0.4)",
                          border: `1px solid ${isActive ? "rgba(0,212,170,0.25)" : "rgba(0,212,170,0.08)"}`,
                          transition: "all 0.2s",
                        }}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </div>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginTop:"10px", padding:"12px", borderRadius:"10px",
                    background:"linear-gradient(135deg,#00D4AA,#4ECDC4,#C8A84B)",
                    color:"#040E18", fontWeight:700, fontSize:"14px",
                    textDecoration: "none",
                  }}
                >
                  Hire Me ✨
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
