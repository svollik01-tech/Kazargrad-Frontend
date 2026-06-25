/** Public-site anchor navigation (shared by Header + MobileMenu). */
export interface NavLink {
  label: string
  /** Target section id (without #). */
  target: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Дома', target: 'houses' },
  { label: 'Территория', target: 'territory' },
  { label: 'Детям', target: 'kids' },
  { label: 'Развлечения', target: 'activities' },
  { label: 'Цены', target: 'services' },
  { label: 'Бронирование', target: 'booking' },
  { label: 'FAQ', target: 'faq' },
  { label: 'Галерея', target: 'gallery' },
  { label: 'Контакты', target: 'contacts' },
]
