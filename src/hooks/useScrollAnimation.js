import { useReducedMotion } from "framer-motion"

/**
 * Returns Framer Motion viewport + transition config for scroll-triggered
 * entrance animations. Automatically disables animations when the user
 * has enabled `prefers-reduced-motion`.
 *
 * @param {object} options
 * @param {number} [options.yOffset=40]   - Initial y translate in px
 * @param {number} [options.duration=0.6] - Animation duration in seconds
 * @param {number} [options.delay=0]      - Delay before animation starts
 * @param {number} [options.threshold=0.2]- Viewport intersection threshold
 */
export function useScrollAnimation({
  yOffset = 40,
  duration = 0.6,
  delay = 0,
  threshold = 0.2,
} = {}) {
  const prefersReduced = useReducedMotion()

  const initial = prefersReduced ? { opacity: 1 } : { opacity: 0, y: yOffset }
  const animate = { opacity: 1, y: 0 }
  const transition = prefersReduced
    ? { duration: 0 }
    : { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }

  const viewport = { once: true, amount: threshold }

  return { initial, whileInView: animate, transition, viewport }
}

/**
 * Staggered container variants for Framer Motion.
 * @param {number} [staggerDelay=0.1] - Delay between each child
 */
export function useStaggerContainer(staggerDelay = 0.1) {
  const prefersReduced = useReducedMotion()

  return {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : staggerDelay,
      },
    },
  }
}

/**
 * Child item variants used inside a stagger container.
 * @param {number} [yOffset=30] - Initial y offset in px
 */
export function useStaggerItem(yOffset = 30) {
  const prefersReduced = useReducedMotion()

  return {
    hidden: prefersReduced
      ? { opacity: 1 }
      : { opacity: 0, y: yOffset },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }
}
