/**
 * Reusable button / anchor.
 * primary  → filled #00E5CC, dark text, arrow suffix
 * outline  → ghost border rgba(255,255,255,0.25), white text, hover cyan
 * ghost    → no border, subtle hover
 */
export default function Button({
  children,
  variant = "primary",
  href,
  target,
  rel,
  className = "",
  icon,
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
}) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 28px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.2s ease",
    textDecoration: "none",
    border: "none",
    outline: "none",
  }

  const styles = {
    primary: {
      ...baseStyle,
      background: "#00E5CC",
      color: "#0A0F1E",
      boxShadow: "0 0 20px rgba(0,229,204,0.25)",
    },
    outline: {
      ...baseStyle,
      background: "transparent",
      color: "#FFFFFF",
      border: "1.5px solid rgba(255,255,255,0.25)",
    },
    ghost: {
      ...baseStyle,
      background: "transparent",
      color: "#A0AEC0",
      border: "none",
      padding: "12px 16px",
    },
  }

  const hoverHandlers = {
    primary: {
      onMouseEnter: (e) => { e.currentTarget.style.filter = "brightness(1.1)" },
      onMouseLeave: (e) => { e.currentTarget.style.filter = "brightness(1)" },
    },
    outline: {
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "#00E5CC"
        e.currentTarget.style.color = "#00E5CC"
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
        e.currentTarget.style.color = "#FFFFFF"
      },
    },
    ghost: {
      onMouseEnter: (e) => {
        e.currentTarget.style.color = "#00E5CC"
        e.currentTarget.style.background = "rgba(0,229,204,0.06)"
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.color = "#A0AEC0"
        e.currentTarget.style.background = "transparent"
      },
    },
  }

  const s = styles[variant] || styles.primary
  const h = hoverHandlers[variant] || hoverHandlers.primary

  /* "→" arrow only on primary */
  const suffix = variant === "primary" ? (
    <span aria-hidden="true" style={{ fontSize: "1rem", lineHeight: 1 }}>→</span>
  ) : null

  const content = (
    <>
      {icon && <span aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
      {suffix}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        style={s}
        className={className}
        {...h}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={s}
      className={className}
      {...h}
    >
      {content}
    </button>
  )
}
