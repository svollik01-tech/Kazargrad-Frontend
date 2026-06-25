import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '@/types/content'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Reveal } from '@/components/ui/Reveal'
import { categoryLabel } from '@/lib/galleryCategories'
import { resolveVideo } from '@/lib/media'
import { cn } from '@/lib/utils'

interface GallerySectionProps {
  gallery: GalleryImage[]
}

const ALL = '__all__'

const isVideo = (item: GalleryImage) => item.type === 'video'

/** Public photo & video gallery with category filters and a lightbox viewer. */
export function GallerySection({ gallery }: GallerySectionProps) {
  const items = useMemo(
    () => gallery.filter((g) => g.visible && g.src.trim()),
    [gallery],
  )

  // Distinct categories present (in their defined order).
  const categories = useMemo(() => {
    const seen = new Set(items.map((i) => i.category))
    return Array.from(seen)
  }, [items])

  const [active, setActive] = useState<string>(ALL)
  const filtered = active === ALL ? items : items.filter((i) => i.category === active)

  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') setIndex((i) => (i === null ? i : (i + 1) % filtered.length))
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered.length])

  if (items.length === 0) return null

  const current = index !== null ? filtered[index] : null

  return (
    <section id="gallery" className="bg-milk py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle
          eyebrow="Галерея"
          title="Фото и видео комплекса"
          subtitle="Атмосфера Казарьграда: дома, территория, развлечения и праздники."
        />

        {/* Category filter chips */}
        {categories.length > 1 && (
          <Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <FilterChip active={active === ALL} onClick={() => setActive(ALL)}>
                Все
              </FilterChip>
              {categories.map((c) => (
                <FilterChip key={c} active={active === c} onClick={() => setActive(c)}>
                  {categoryLabel(c)}
                </FilterChip>
              ))}
            </div>
          </Reveal>
        )}

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={(i % 8) * 0.04}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-sand/50 shadow-card"
              >
                <Thumb item={item} />
                <span className="absolute inset-0 bg-wood-dark/0 transition-colors group-hover:bg-wood-dark/20" />
                {isVideo(item) && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-milk/90 text-pine shadow-lift transition-transform group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-wood-dark/95 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
          >
            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Закрыть"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-milk/10 text-milk transition-colors hover:bg-milk/25"
            >
              <X className="h-6 w-6" />
            </button>

            {filtered.length > 1 && (
              <>
                <NavArrow
                  side="left"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
                  }}
                />
                <NavArrow
                  side="right"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIndex((i) => (i === null ? i : (i + 1) % filtered.length))
                  }}
                />
              </>
            )}

            <motion.div
              key={current.id}
              className="flex max-h-full w-full max-w-5xl flex-col items-center gap-3"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Viewer item={current} />
              {current.name && (
                <p className="text-center text-sm font-medium text-milk/85">{current.name}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/** Grid thumbnail — photo, YouTube poster, or a video preview frame. */
function Thumb({ item }: { item: GalleryImage }) {
  if (!isVideo(item)) {
    return (
      <img
        src={item.src}
        alt={item.alt || item.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    )
  }
  const video = resolveVideo(item.src)
  if (video.thumbnail) {
    return (
      <img
        src={video.thumbnail}
        alt={item.alt || item.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    )
  }
  if (video.kind === 'file') {
    return <video src={video.embedUrl} preload="metadata" className="h-full w-full object-cover" muted />
  }
  return <div className="h-full w-full bg-wood-dark" />
}

/** Full-size viewer inside the lightbox. */
function Viewer({ item }: { item: GalleryImage }) {
  if (!isVideo(item)) {
    return (
      <img
        src={item.src}
        alt={item.alt || item.name}
        className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-lift"
      />
    )
  }
  const video = resolveVideo(item.src)
  if (video.kind === 'file') {
    return (
      <video
        src={video.embedUrl}
        controls
        autoPlay
        className="max-h-[80vh] w-full rounded-2xl bg-black shadow-lift"
      />
    )
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lift">
      <iframe
        src={video.embedUrl}
        title={item.name || 'Видео'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
        active ? 'bg-pine text-milk shadow-soft' : 'bg-pine/10 text-pine hover:bg-pine/20',
      )}
    >
      {children}
    </button>
  )
}

function NavArrow({
  side,
  onClick,
}: {
  side: 'left' | 'right'
  onClick: (e: React.MouseEvent) => void
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Предыдущее' : 'Следующее'}
      className={cn(
        'absolute top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-milk/10 text-milk transition-colors hover:bg-milk/25',
        side === 'left' ? 'left-3 sm:left-5' : 'right-3 sm:right-5',
      )}
    >
      <Icon className="h-7 w-7" />
    </button>
  )
}
