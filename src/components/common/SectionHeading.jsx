import { motion } from "framer-motion"

/**
 * Section heading with eyebrow label, gradient h2, accent underline.
 * Spacing: label 12px, letter-spacing 0.12em, mb-12; h2 clamp 2-3rem, mb-12.
 */
export default function SectionHeading({ label, title, align = "center" }) {
  const isCenter = align === "center"

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        textAlign: isCenter ? "center" : "left",
        marginBottom: "48px",
      }}
    >
      {/* Eyebrow label */}
      {label && (
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#00E5CC",
            marginBottom: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            justifyContent: isCenter ? "center" : "flex-start",
          }}
        >
          <span
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#00E5CC", display: "inline-block",
            }}
            aria-hidden="true"
          />
          {label}
        </p>
      )}

      {/* Main h2 */}
      <h2
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>

      {/* Accent underline */}
      <div
        style={{
          width: "64px",
          height: "3px",
          borderRadius: "2px",
          background: "linear-gradient(to right, #00E5CC, #7C6FEA)",
          marginTop: "16px",
          marginLeft: isCenter ? "auto" : "0",
          marginRight: isCenter ? "auto" : "0",
          boxShadow: "0 0 10px rgba(0,229,204,0.4)",
        }}
      />
    </motion.div>
  )
}
