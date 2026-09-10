import { Link } from "react-router-dom"
import { Mail, ArrowUp } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { personalInfo } from "../../data/about"

const NAV_LINKS = [
  { label: "About",          to: "/about"          },
  { label: "Skills",         to: "/skills"         },
  { label: "Projects",       to: "/projects"       },
  { label: "Workflow",       to: "/workflow"       },
  { label: "Experience",     to: "/experience"     },
  { label: "Certifications", to: "/certifications" },
  { label: "Contact",        to: "/#contact"       },
]

const SOCIAL_LINKS = [
  { label: "GitHub profile",   href: personalInfo.github,            icon: FaGithub   },
  { label: "LinkedIn profile", href: personalInfo.linkedin,          icon: FaLinkedin },
  { label: "Send email",       href: `mailto:${personalInfo.email}`, icon: Mail       },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToContact = (e) => {
    const el = document.getElementById("contact")
    if (el) {
      e.preventDefault()
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" })
    }
  }

  return (
    <footer style={{ background: "#0A0F1E", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px clamp(1.5rem,5vw,4rem) 32px" }}>

        {/* 3-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px", alignItems: "start", marginBottom: "40px",
        }}>
          {/* Brand */}
          <div>
            <p style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "10px" }}>
              <span style={{ color: "#00E5CC" }}>SheharYar</span>{" "}
              <span style={{ color: "#FFFFFF" }}>Ali</span>
            </p>
            <p style={{ fontSize: "0.82rem", color: "#718096", lineHeight: 1.65 }}>
              Aspiring Web Developer &bull; Creating engaging<br />
              web experiences with modern technologies.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#718096", marginBottom: "14px",
            }}>
              Navigation
            </p>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "8px 16px", listStyle: "none" }}>
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  {to === "/#contact" ? (
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      style={{ fontSize: "0.85rem", color: "#718096", transition: "color 0.2s", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#00E5CC")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#718096")}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      to={to}
                      style={{ fontSize: "0.85rem", color: "#718096", transition: "color 0.2s", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#00E5CC")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#718096")}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#718096", marginBottom: "14px",
            }}>
              Connect
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  style={{
                    padding: "8px", borderRadius: "8px", color: "#718096",
                    background: "#111827", border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#00E5CC"
                    e.currentTarget.style.borderColor = "rgba(0,229,204,0.3)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#718096"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                  }}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: "12px",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#718096" }}>
            &copy; {year} SheharYar Ali. Aspiring Web Developer.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{
              padding: "6px", borderRadius: "8px", color: "#718096",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", background: "transparent", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#00E5CC"
              e.currentTarget.style.borderColor = "rgba(0,229,204,0.3)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#718096"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
            }}
          >
            <ArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
