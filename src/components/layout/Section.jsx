/**
 * Standard section wrapper.
 * max-width: 1200px, centered, responsive horizontal padding.
 * padding-top: 100px, padding-bottom: 80px (as specified).
 */
export default function Section({ id, children, className = "", style = {} }) {
  return (
    <section
      id={id}
      aria-label={id}
      className={className}
      style={{
        background: "#0A0F1E",
        paddingTop: "100px",
        paddingBottom: "80px",
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        {children}
      </div>
    </section>
  )
}
