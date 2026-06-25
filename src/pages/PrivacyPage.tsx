import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useContentStore } from '@/store/contentStore'

/** Standalone page for the privacy policy document at /privacy. */
export function PrivacyPage() {
  const { privacy, settings } = useContentStore((s) => s.content)

  return (
    <div className="min-h-screen bg-milk">
      <header className="border-b border-stone-200 bg-white">
        <div className="container-px flex h-16 items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-wood hover:text-forest transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {settings.siteTitle}
          </Link>
        </div>
      </header>

      <main className="container-px py-12 md:py-16">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-wood-dark md:text-4xl">
            {privacy.title}
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Последнее обновление: {privacy.updatedAt}
          </p>

          <div className="mt-10 space-y-8">
            {privacy.sections.filter((s) => s.visible).map((section) => (
              <section key={section.id}>
                <h2 className="text-lg font-semibold text-wood-dark">{section.title}</h2>
                <div className="mt-3 space-y-3">
                  {section.text.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-stone-700 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}
