import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import type { HeroContent, SiteSettings } from '@/types/content'
import { Button } from '@/components/ui/Button'
import { scrollToId } from '@/lib/utils'
import { HeroSun } from './HeroSun'

interface HeroProps {
  hero: HeroContent
  settings: SiteSettings
}

/** Full-bleed hero with atmospheric photo, animated text, badges and CTAs. */
export function Hero({ hero, settings }: HeroProps) {
  const reduce = useReducedMotion()
  const animate = settings.animationsEnabled && !reduce
  const { scrollY } = useScroll()
  // Subtle parallax on the background image.
  const bgY = useTransform(scrollY, [0, 600], [0, 120])

  const bg = hero.backgroundImage || settings.defaultHeroImage

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background image + parallax */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={animate ? { y: bgY } : undefined}
        aria-hidden
      >
        <img
          src={bg}
          alt=""
          className="h-[115%] w-full object-cover"
          fetchPriority="high"
        />
        {/* Warm gradient overlay for text contrast (accessibility). */}
        <div className="absolute inset-0 bg-gradient-to-b from-wood-dark/75 via-wood-dark/45 to-wood-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-wood-dark/50 to-transparent" />
      </motion.div>

      {/* Sun glow — driven by time of day + mouse (sits above the photo overlay,
          below the text). */}
      <HeroSun enabled={animate} />

      <div className="container-px w-full pb-16 pt-32 sm:pt-36">
        <motion.div
          className="max-w-3xl"
          variants={animate ? container : undefined}
          initial={animate ? 'hidden' : false}
          animate={animate ? 'show' : undefined}
        >
          <motion.div variants={animate ? item : undefined}>
            <span className="inline-flex items-center gap-2 rounded-full border border-milk/30 bg-milk/10 px-4 py-1.5 text-sm font-semibold text-milk backdrop-blur">
              <MapPin className="h-4 w-4 text-sun" />
              Рязанская область, с. Казарь
            </span>
          </motion.div>

          <motion.h1
            variants={animate ? item : undefined}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] text-milk sm:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={animate ? item : undefined}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-milk/85"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={animate ? item : undefined}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button
              size="lg"
              variant="accent"
              onClick={() => scrollToId('booking')}
              iconRight={<ArrowRight className="h-5 w-5" />}
            >
              {hero.primaryCtaText}
            </Button>
            <Button size="lg" variant="glass" onClick={() => scrollToId('houses')}>
              {hero.secondaryCtaText}
            </Button>
          </motion.div>

          {/* Badges */}
          <motion.ul
            variants={animate ? item : undefined}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {hero.badges
              .filter((b) => b.visible)
              .map((badge) => (
                <li
                  key={badge.id}
                  className="rounded-full border border-milk/25 bg-milk/10 px-4 py-2 text-sm font-medium text-milk backdrop-blur"
                >
                  {badge.text}
                </li>
              ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
