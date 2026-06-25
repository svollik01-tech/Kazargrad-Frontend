import { type ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useContent } from '@/store/contentStore'

/** Wraps the public site: sticky header, page content, footer, floating WhatsApp. */
export function PublicLayout({ children }: { children: ReactNode }) {
  const { footer, settings, contacts } = useContent()

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer footer={footer} settings={settings} />

      {/* Floating WhatsApp action (always reachable on mobile). */}
      <a
        href={contacts.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
