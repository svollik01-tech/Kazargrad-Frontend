import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  Sparkles,
  Home,
  Trees,
  Baby,
  Volleyball,
  Wind,
  Tag,
  PartyPopper,
  ListChecks,
  Star,
  HelpCircle,
  Phone,
  PanelBottom,
  Images,
  type LucideIcon,
} from 'lucide-react'

/**
 * Admin sidebar navigation. `to` is the path segment under `/admin`
 * (empty string = the dashboard index route). Order here is the order shown.
 */
export interface AdminNavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const ADMIN_NAV: AdminNavItem[] = [
  { to: '', label: 'Панель управления', icon: LayoutDashboard },
  { to: 'settings', label: 'Настройки сайта', icon: Settings },
  { to: 'hero', label: 'Главный экран', icon: ImageIcon },
  { to: 'advantages', label: 'Преимущества', icon: Sparkles },
  { to: 'houses', label: 'Дома', icon: Home },
  { to: 'territory', label: 'Территория', icon: Trees },
  { to: 'kids', label: 'Детям', icon: Baby },
  { to: 'activities', label: 'Развлечения', icon: Volleyball },
  { to: 'amenities', label: 'Удобства', icon: Wind },
  { to: 'services', label: 'Услуги и цены', icon: Tag },
  { to: 'events', label: 'Праздники', icon: PartyPopper },
  { to: 'booking', label: 'Бронирование', icon: ListChecks },
  { to: 'reviews', label: 'Отзывы', icon: Star },
  { to: 'faq', label: 'Вопросы (FAQ)', icon: HelpCircle },
  { to: 'contacts', label: 'Контакты', icon: Phone },
  { to: 'footer', label: 'Подвал сайта', icon: PanelBottom },
  { to: 'gallery', label: 'Фотогалерея', icon: Images },
]
