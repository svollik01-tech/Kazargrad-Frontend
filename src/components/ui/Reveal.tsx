import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useContent } from '@/store/contentStore'

interface RevealProps {
  children: ReactNode
  /** Stagger delay in seconds. */
  delay?: number
  /** Animation distance in px (vertical). */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Scroll-reveal wrapper. Animates children into view once.
 * Respects both the global "animations" setting and prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const { settings } = useContent()
  const reduce = useReducedMotion()
  const animate = settings.animationsEnabled && !reduce

  const MotionTag = motion[as]

  if (!animate) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
