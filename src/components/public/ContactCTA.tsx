import { MessageCircle, Phone, Navigation, Mail, MapPin, Clock } from 'lucide-react'
import type { ContactsContent } from '@/types/content'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

interface ContactCTAProps {
  contacts: ContactsContent
}

/** Final conversion section: heading, contact info and the main CTA buttons. */
export function ContactCTA({ contacts }: ContactCTAProps) {
  const telHref = `tel:${contacts.phone.replace(/[^+\d]/g, '')}`

  return (
    <section id="contacts" className="bg-pine py-20 text-milk sm:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl text-milk sm:text-5xl">{contacts.title}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-milk/85">
                {contacts.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  as="a"
                  href={contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  icon={<MessageCircle className="h-5 w-5" />}
                >
                  {contacts.whatsappCtaText}
                </Button>
                <Button
                  as="a"
                  href={telHref}
                  variant="accent"
                  size="lg"
                  icon={<Phone className="h-5 w-5" />}
                >
                  {contacts.callCtaText}
                </Button>
                <Button
                  as="a"
                  href={contacts.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="border-milk/40 text-milk hover:bg-milk/10"
                  icon={<Navigation className="h-5 w-5" />}
                >
                  {contacts.routeCtaText}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-4 rounded-4xl bg-milk/10 p-7 backdrop-blur">
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Телефон" value={contacts.phone} href={telHref} />
              <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value={contacts.email} href={`mailto:${contacts.email}`} />
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Адрес" value={contacts.address} />
              {contacts.workingHours && (
                <ContactRow icon={<Clock className="h-5 w-5" />} label="Часы работы" value={contacts.workingHours} />
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sun/20 text-sun">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-wide text-milk/60">{label}</span>
        <span className="block break-words font-semibold text-milk">{value}</span>
      </span>
    </>
  )
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-milk/10">
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4 p-2">{content}</div>
      )}
    </li>
  )
}
