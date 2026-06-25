import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Atmospheric "sun" glow over the hero.
 *
 * Two inputs drive it:
 *  - Real time of day — the sun arcs left→right and rises/sets, and its colour
 *    shifts from warm dawn → bright gold midday → orange dusk → cool night.
 *  - The mouse — the glow drifts slightly toward the cursor for a parallax feel.
 *
 * Rendered with `mix-blend-screen` so it brightens the photo like real light.
 * When animations are disabled (settings / reduced-motion) it stays put.
 */
interface HeroSunProps {
  enabled: boolean
}

function sunPalette(hour: number): { core: string; glow: string; opacity: number } {
  // Night (deep): cool moonlight.
  if (hour < 5 || hour >= 22) {
    return { core: 'rgba(150,180,225,0.55)', glow: 'rgba(70,100,150,0.35)', opacity: 0.4 }
  }
  // Dawn: warm orange.
  if (hour < 8) {
    return { core: 'rgba(255,176,92,0.95)', glow: 'rgba(240,120,60,0.45)', opacity: 0.72 }
  }
  // Day: bright gold.
  if (hour < 17) {
    return { core: 'rgba(255,236,160,0.95)', glow: 'rgba(242,183,5,0.5)', opacity: 0.8 }
  }
  // Dusk: orange-pink.
  if (hour < 20) {
    return { core: 'rgba(255,150,95,0.95)', glow: 'rgba(220,80,70,0.45)', opacity: 0.75 }
  }
  // Twilight.
  return { core: 'rgba(200,160,200,0.7)', glow: 'rgba(110,90,150,0.4)', opacity: 0.55 }
}

export function HeroSun({ enabled }: HeroSunProps) {
  const [hour, setHour] = useState(() => {
    const d = new Date()
    return d.getHours() + d.getMinutes() / 60
  })

  // Re-read the clock every minute so the sun tracks real time during a session.
  useEffect(() => {
    const id = window.setInterval(() => {
      const d = new Date()
      setHour(d.getHours() + d.getMinutes() / 60)
    }, 60_000)
    return () => window.clearInterval(id)
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, mx, my])

  // Sun arc: 6:00 → 18:00 maps left→right; height peaks at noon (sin curve).
  const dayProgress = Math.min(1, Math.max(0, (hour - 6) / 12))
  const baseLeft = 12 + dayProgress * 76 // %
  const baseTop = 64 - Math.sin(dayProgress * Math.PI) * 48 // % (high at noon)

  const left = useTransform(sx, (v) => `calc(${baseLeft}% + ${v * 70}px)`)
  const top = useTransform(sy, (v) => `calc(${baseTop}% + ${v * 50}px)`)

  const { core, glow, opacity } = sunPalette(hour)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen" aria-hidden>
      <motion.div
        style={{
          left,
          top,
          opacity,
          background: `radial-gradient(circle, ${core} 0%, ${glow} 32%, transparent 70%)`,
        }}
        className="absolute h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px]"
        animate={enabled ? { scale: [1, 1.07, 1] } : undefined}
        transition={enabled ? { duration: 9, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
    </div>
  )
}
