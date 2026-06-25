import { useEffect } from 'react'
import { useContent } from '@/store/contentStore'

/**
 * Lightweight SEO / head manager.
 *
 * Syncs document.title, meta description and the brand CSS variables from the
 * editable site settings. For richer SEO (per-route OG tags, JSON-LD, SSR) you
 * could swap this for react-helmet-async or a meta framework later.
 */
export function Seo() {
  const { settings } = useContent()

  useEffect(() => {
    if (settings.siteTitle) document.title = settings.siteTitle

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    setMeta('meta[name="description"]', 'content', settings.metaDescription)
    setMeta('meta[property="og:title"]', 'content', settings.siteTitle)
    setMeta('meta[property="og:description"]', 'content', settings.metaDescription)

    // Apply editable brand colors as CSS variables.
    const root = document.documentElement
    root.style.setProperty('--color-primary', settings.primaryColor)
    root.style.setProperty('--color-accent', settings.accentColor)

    // Favicon (if a custom one was uploaded in admin).
    if (settings.faviconImage) {
      const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
      if (link) link.href = settings.faviconImage
    }
  }, [settings])

  return null
}
