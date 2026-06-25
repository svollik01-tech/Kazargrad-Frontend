import type { PhotoCategory } from '@/types/content'

/**
 * Photo/video categories with human-readable Russian labels. Shared by the
 * admin gallery editor (the category dropdown) and the public gallery section
 * (filter chips), so the two never drift apart.
 */
export const PHOTO_CATEGORIES: Array<{ value: PhotoCategory; label: string }> = [
  { value: 'Hero', label: 'Главный экран' },
  { value: 'Houses', label: 'Дома' },
  { value: 'One-floor house', label: 'Одноэтажный дом' },
  { value: 'Two-floor house', label: 'Двухэтажный дом' },
  { value: 'Interior', label: 'Интерьер' },
  { value: 'Territory', label: 'Территория' },
  { value: 'Kids', label: 'Детям' },
  { value: 'Foam party', label: 'Пенная вечеринка' },
  { value: 'Activities', label: 'Развлечения' },
  { value: 'Banquet', label: 'Банкет' },
  { value: 'Winter', label: 'Зима' },
  { value: 'Reviews', label: 'Отзывы' },
  { value: 'Other', label: 'Прочее' },
]

/** Russian label for a category value (falls back to the raw value). */
export function categoryLabel(value: string): string {
  return PHOTO_CATEGORIES.find((c) => c.value === value)?.label ?? value
}
