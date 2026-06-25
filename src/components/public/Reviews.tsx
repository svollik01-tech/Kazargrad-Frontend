import { Star, ExternalLink, Quote } from 'lucide-react'
import type { ReviewsContent } from '@/types/content'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

interface ReviewsProps {
  reviews: ReviewsContent
}

/**
 * Guest reviews (from Yandex.Maps).
 *
 * NOTE FOR DEVELOPERS: these are PLACEHOLDER cards. Do not invent real reviews.
 * Real reviews should be pasted by the admin (Admin → Reviews) or pulled from
 * the Yandex.Maps widget / API. The "real reviews" insertion point is the map
 * over `reviews.items` below.
 */
export function Reviews({ reviews }: ReviewsProps) {
  const items = reviews.items.filter((r) => r.visible)

  return (
    <section id="reviews" className="bg-sand/40 py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="Отзывы" title={reviews.title} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* === Real Yandex reviews should be rendered here === */}
          {items.map((review, i) => (
            <Reveal key={review.id} delay={(i % 3) * 0.06}>
              <article className="flex h-full flex-col rounded-3xl border border-wood-dark/10 bg-white p-7 shadow-card">
                <Quote className="h-8 w-8 text-sun" aria-hidden />
                <div className="mt-3 flex gap-0.5" aria-label={`Оценка ${review.rating} из 5`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={
                        idx < review.rating
                          ? 'h-4 w-4 fill-sun text-sun'
                          : 'h-4 w-4 text-wood-dark/20'
                      }
                    />
                  ))}
                </div>
                <p className="mt-3 flex-1 leading-relaxed text-graphite/80">{review.text}</p>
                <footer className="mt-5 flex items-center justify-between border-t border-wood-dark/10 pt-4 text-sm">
                  <span className="font-semibold text-wood-dark">{review.author}</span>
                  <span className="text-graphite/50">{review.source}</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Button
            as="a"
            href={reviews.yandexUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            iconRight={<ExternalLink className="h-5 w-5" />}
          >
            {reviews.buttonText}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
