import { useState, useEffect, useRef } from "react"

/**
 * Tracks which page section is currently active in the viewport.
 *
 * Strategy: whichever section's top edge is closest to (but still below)
 * the navbar height wins. This guarantees every section — including tall
 * ones like Workflow — activates correctly as soon as it enters view.
 *
 * @param {string[]} sectionIds  - Section `id` values to observe, in DOM order
 * @param {number}   [navHeight] - Height of the fixed navbar in px (default 72)
 */
export function useActiveSection(sectionIds, navHeight = 72) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "")
  const tickingRef = useRef(false)

  useEffect(() => {
    function onScroll() {
      if (tickingRef.current) return
      tickingRef.current = true

      requestAnimationFrame(() => {
        tickingRef.current = false

        // Find the section whose top is closest to the navbar bottom
        // (i.e. the last section that has scrolled past the navbar)
        let best = sectionIds[0]
        let bestOffset = -Infinity

        sectionIds.forEach((id) => {
          const el = document.getElementById(id)
          if (!el) return
          const top = el.getBoundingClientRect().top - navHeight
          // We want the section that has entered the viewport (top ≤ 0)
          // and whose top is the largest (closest to 0 from below)
          if (top <= 0 && top > bestOffset) {
            bestOffset = top
            best = id
          }
        })

        setActiveSection(best)
      })
    }

    // Run once on mount so initial state is correct
    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [sectionIds, navHeight])

  return activeSection
}
