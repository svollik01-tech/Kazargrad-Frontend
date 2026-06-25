/**
 * Central content model for the Kazargrad website.
 *
 * Every piece of editable text, price, image and toggle on the public site lives
 * in `SiteContent`. The admin panel edits this object; the public site renders
 * from it. This single source of truth is what makes the CMS-like flow possible
 * and keeps the door open for a real backend later (just swap the persistence
 * layer in `services/contentService.ts`).
 */

/** Base fields shared by most repeatable list items. */
export interface BaseItem {
  id: string
  /** Hidden items are kept in storage but not rendered on the public site. */
  visible: boolean
}

/** Lucide icon name (see `src/lib/icons.ts` for the supported set). */
export type IconName = string

/* ------------------------------------------------------------------ */
/* Site-wide settings & SEO                                            */
/* ------------------------------------------------------------------ */

export interface SiteSettings {
  siteTitle: string
  metaDescription: string
  /** Logo image (optional). When empty, the text logo component is used. */
  logoImage: string
  faviconImage: string
  primaryColor: string
  accentColor: string
  defaultHeroImage: string
  // Feature flags — let a manager hide whole sections without code changes.
  animationsEnabled: boolean
  reviewsEnabled: boolean
  kidsEnabled: boolean
  pricesEnabled: boolean
  faqEnabled: boolean
  footerLegalEnabled: boolean
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export interface HeroBadge extends BaseItem {
  text: string
}

export interface HeroContent {
  headline: string
  subtitle: string
  backgroundImage: string
  primaryCtaText: string
  secondaryCtaText: string
  badges: HeroBadge[]
}

/* ------------------------------------------------------------------ */
/* Advantages                                                          */
/* ------------------------------------------------------------------ */

export interface Advantage extends BaseItem {
  icon: IconName
  title: string
  description: string
}

/* ------------------------------------------------------------------ */
/* Houses                                                              */
/* ------------------------------------------------------------------ */

export interface House extends BaseItem {
  name: string
  housesCount: number
  maxGuests: number
  bathrooms: number
  price: number
  priceLabel: string
  description: string
  suitableFor: string
  image: string
  gallery: string[]
  features: string[]
  ctaText: string
}

export interface HousesContent {
  title: string
  intro: string
  footnote: string
  items: House[]
}

/* ------------------------------------------------------------------ */
/* Territory                                                           */
/* ------------------------------------------------------------------ */

export interface TerritoryCard extends BaseItem {
  icon: IconName
  title: string
  description: string
  image: string
}

export interface TerritoryContent {
  title: string
  description: string
  cards: TerritoryCard[]
}

/* ------------------------------------------------------------------ */
/* Kids                                                                */
/* ------------------------------------------------------------------ */

export interface KidsListItem extends BaseItem {
  text: string
}

export interface KidsContent {
  title: string
  description: string
  highlight: string
  items: KidsListItem[]
  images: string[]
}

/* ------------------------------------------------------------------ */
/* Activities (seasonal)                                               */
/* ------------------------------------------------------------------ */

export type Season = 'summer' | 'winter'

export interface Activity extends BaseItem {
  title: string
  icon: IconName
  season: Season
  price: string
  description: string
}

export interface ActivitiesContent {
  title: string
  description: string
  summerLabel: string
  winterLabel: string
  items: Activity[]
}

/* ------------------------------------------------------------------ */
/* Amenities                                                           */
/* ------------------------------------------------------------------ */

export interface Amenity extends BaseItem {
  icon: IconName
  title: string
  description: string
}

export interface AmenitiesContent {
  title: string
  description: string
  items: Amenity[]
}

/* ------------------------------------------------------------------ */
/* Services & prices                                                   */
/* ------------------------------------------------------------------ */

export type PricingType = 'per_hour' | 'fixed' | 'from' | 'negotiable' | 'included'

export interface Service extends BaseItem {
  name: string
  description: string
  price: string
  priceLabel: string
  pricingType: PricingType
  includedInStay: boolean
  icon: IconName
}

export interface ServicesContent {
  title: string
  description: string
  items: Service[]
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export interface EventScenario extends BaseItem {
  icon: IconName
  title: string
}

export interface EventsContent {
  title: string
  description: string
  ctaText: string
  scenarios: EventScenario[]
  images: string[]
}

/* ------------------------------------------------------------------ */
/* Booking steps                                                       */
/* ------------------------------------------------------------------ */

export interface BookingStep extends BaseItem {
  icon: IconName
  title: string
  description: string
}

export interface BookingContent {
  title: string
  description: string
  steps: BookingStep[]
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export interface Review extends BaseItem {
  source: string
  author: string
  rating: number
  text: string
  date: string
  link: string
}

export interface ReviewsContent {
  title: string
  yandexUrl: string
  buttonText: string
  items: Review[]
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export interface FaqItem extends BaseItem {
  question: string
  answer: string
  category: string
}

export interface FaqContent {
  title: string
  items: FaqItem[]
}

/* ------------------------------------------------------------------ */
/* Contacts                                                            */
/* ------------------------------------------------------------------ */

export interface ContactsContent {
  title: string
  description: string
  phone: string
  whatsapp: string
  telegram: string
  vk: string
  instagram: string
  email: string
  address: string
  mapLink: string
  workingHours: string
  whatsappCtaText: string
  callCtaText: string
  routeCtaText: string
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export interface LegalLink extends BaseItem {
  label: string
  url: string
}

export interface SocialLink extends BaseItem {
  /** Lucide / brand icon name. */
  icon: IconName
  label: string
  url: string
}

export interface FooterContent {
  complexName: string
  address: string
  email: string
  legalEntity: string
  entrepreneur: string
  inn: string
  ogrnip: string
  copyright: string
  socialLinks: SocialLink[]
  legalLinks: LegalLink[]
}

/* ------------------------------------------------------------------ */
/* Privacy policy                                                      */
/* ------------------------------------------------------------------ */

export interface PrivacySection extends BaseItem {
  title: string
  text: string
}

export interface PrivacyContent {
  title: string
  updatedAt: string
  sections: PrivacySection[]
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export type PhotoCategory =
  | 'Hero'
  | 'Houses'
  | 'One-floor house'
  | 'Two-floor house'
  | 'Interior'
  | 'Territory'
  | 'Kids'
  | 'Foam party'
  | 'Activities'
  | 'Banquet'
  | 'Winter'
  | 'Reviews'
  | 'Other'

/** A gallery item is either a photo or a video. */
export type MediaType = 'image' | 'video'

export interface GalleryImage extends BaseItem {
  /**
   * For images: base64 data URL (demo) or remote URL (production).
   * For videos: a URL — YouTube/VK link or a direct .mp4 URL.
   */
  src: string
  name: string
  alt: string
  category: PhotoCategory
  /** Defaults to 'image' when absent (back-compat with older saved content). */
  type?: MediaType
}

/* ------------------------------------------------------------------ */
/* Root content object                                                 */
/* ------------------------------------------------------------------ */

export interface SiteContent {
  /** Schema version — bump when the shape changes to invalidate old storage. */
  version: number
  /** ISO date string of the last save. */
  lastSaved: string
  settings: SiteSettings
  hero: HeroContent
  advantages: Advantage[]
  houses: HousesContent
  territory: TerritoryContent
  kids: KidsContent
  activities: ActivitiesContent
  amenities: AmenitiesContent
  services: ServicesContent
  events: EventsContent
  booking: BookingContent
  reviews: ReviewsContent
  faq: FaqContent
  contacts: ContactsContent
  footer: FooterContent
  privacy: PrivacyContent
  gallery: GalleryImage[]
}

/** Keys of the editable sections (used by `updateSection`). */
export type SectionKey = keyof Omit<SiteContent, 'version' | 'lastSaved'>
