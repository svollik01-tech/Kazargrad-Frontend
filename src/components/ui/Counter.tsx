import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { useContent } from '@/store/contentStore'

interface CounterProps {
  to: number
  duration?: number
  suffix?: string
  className?: string
}

/** Animated number that counts up when scrolled into view. */
export function Counter({ to, duration = 1400, suffix = '', className }: CounterProps) {
  const { settings } = useContent()
  const reduce = useReducedMotion()
  const animate = settings.animationsEnabled && !reduce

  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(animate ? 0 : to)

  useEffect(() => {
    if (!inView || !animate) {
      setValue(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, animate, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
