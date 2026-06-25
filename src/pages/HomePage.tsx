import { useContent } from '@/store/contentStore'
import { Seo } from '@/components/Seo'
import { PublicLayout } from '@/components/public/PublicLayout'
import { Hero } from '@/components/public/Hero'
import { Advantages } from '@/components/public/Advantages'
import { HousesSection } from '@/components/public/HousesSection'
import { TerritorySection } from '@/components/public/TerritorySection'
import { KidsSection } from '@/components/public/KidsSection'
import { ActivitiesSection } from '@/components/public/ActivitiesSection'
import { AmenitiesSection } from '@/components/public/AmenitiesSection'
import { ServicesPricing } from '@/components/public/ServicesPricing'
import { EventsSection } from '@/components/public/EventsSection'
import { BookingSteps } from '@/components/public/BookingSteps'
import { Reviews } from '@/components/public/Reviews'
import { FAQ } from '@/components/public/FAQ'
import { GallerySection } from '@/components/public/GallerySection'
import { ContactCTA } from '@/components/public/ContactCTA'

/**
 * Public one-page landing.
 *
 * All content is read from the content store (which the admin panel edits).
 * Section feature-flags from Site Settings can hide whole sections.
 */
export function HomePage() {
  const content = useContent()
  const { settings } = content

  return (
    <>
      <Seo />
      <PublicLayout>
        <Hero hero={content.hero} settings={settings} />
        <Advantages advantages={content.advantages} houses={content.houses} />
        <HousesSection houses={content.houses} />
        <TerritorySection territory={content.territory} />
        {settings.kidsEnabled && <KidsSection kids={content.kids} />}
        <ActivitiesSection activities={content.activities} />
        <AmenitiesSection amenities={content.amenities} />
        {settings.pricesEnabled && <ServicesPricing services={content.services} />}
        <EventsSection events={content.events} />
        <BookingSteps booking={content.booking} />
        {settings.reviewsEnabled && <Reviews reviews={content.reviews} />}
        {settings.faqEnabled && <FAQ faq={content.faq} />}
        <GallerySection gallery={content.gallery} />
        <ContactCTA contacts={content.contacts} />
      </PublicLayout>
    </>
  )
}
