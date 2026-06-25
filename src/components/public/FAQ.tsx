import type { FaqContent } from '@/types/content'
import { Accordion } from '@/components/ui/Accordion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Reveal } from '@/components/ui/Reveal'

interface FAQProps {
  faq: FaqContent
}

/** Frequently asked questions accordion. */
export function FAQ({ faq }: FAQProps) {
  const items = faq.items
    .filter((i) => i.visible)
    .map((i) => ({ id: i.id, question: i.question, answer: i.answer }))

  return (
    <section id="faq" className="bg-milk py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="FAQ" title={faq.title} />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  )
}
