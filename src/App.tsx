import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { LoginPage } from '@/pages/admin/LoginPage'
import { Dashboard } from '@/pages/admin/Dashboard'
import { SettingsEditor } from '@/pages/admin/SettingsEditor'
import { HeroEditor } from '@/pages/admin/HeroEditor'
import { AdvantagesEditor } from '@/pages/admin/AdvantagesEditor'
import { HousesEditor } from '@/pages/admin/HousesEditor'
import { TerritoryEditor } from '@/pages/admin/TerritoryEditor'
import { KidsEditor } from '@/pages/admin/KidsEditor'
import { ActivitiesEditor } from '@/pages/admin/ActivitiesEditor'
import { AmenitiesEditor } from '@/pages/admin/AmenitiesEditor'
import { ServicesEditor } from '@/pages/admin/ServicesEditor'
import { EventsEditor } from '@/pages/admin/EventsEditor'
import { BookingEditor } from '@/pages/admin/BookingEditor'
import { ReviewsEditor } from '@/pages/admin/ReviewsEditor'
import { FaqEditor } from '@/pages/admin/FaqEditor'
import { ContactsEditor } from '@/pages/admin/ContactsEditor'
import { FooterEditor } from '@/pages/admin/FooterEditor'
import { GalleryEditor } from '@/pages/admin/GalleryEditor'

/**
 * App routing.
 *
 *  /                — public one-page landing
 *  /admin/login     — admin sign-in (mock auth)
 *  /admin/*         — protected CMS-like editor (nested under <AdminLayout>)
 *
 * Both the public site and the admin panel read/write the same content store,
 * so admin edits appear on the public page immediately.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<SettingsEditor />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="advantages" element={<AdvantagesEditor />} />
        <Route path="houses" element={<HousesEditor />} />
        <Route path="territory" element={<TerritoryEditor />} />
        <Route path="kids" element={<KidsEditor />} />
        <Route path="activities" element={<ActivitiesEditor />} />
        <Route path="amenities" element={<AmenitiesEditor />} />
        <Route path="services" element={<ServicesEditor />} />
        <Route path="events" element={<EventsEditor />} />
        <Route path="booking" element={<BookingEditor />} />
        <Route path="reviews" element={<ReviewsEditor />} />
        <Route path="faq" element={<FaqEditor />} />
        <Route path="contacts" element={<ContactsEditor />} />
        <Route path="footer" element={<FooterEditor />} />
        <Route path="gallery" element={<GalleryEditor />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
