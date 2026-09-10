/**
 * Tech-stack / skill badge pill.
 * variant: "cyan" (default, ML/Python) | "purple" (frameworks)
 */
export default function Badge({ label, variant = "cyan" }) {
  const styles = {
    cyan: {
      background: "rgba(0,229,204,0.1)",
      color: "#00E5CC",
      border: "1px solid rgba(0,229,204,0.25)",
    },
    purple: {
      background: "rgba(124,111,234,0.1)",
      color: "#7C6FEA",
      border: "1px solid rgba(124,111,234,0.25)",
    },
  }

  return (
    <span
      style={{
        ...styles[variant] || styles.cyan,
        borderRadius: "999px",
        padding: "4px 14px",
        fontSize: "12px",
        fontWeight: 500,
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  )
}
