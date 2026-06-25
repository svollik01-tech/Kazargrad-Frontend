import { useEffect, useMemo, useState } from 'react'
import type { SiteContent, SectionKey } from '@/types/content'
import { useContentStore } from '@/store/contentStore'
import { useToast } from '@/components/ui/Toast'

/**
 * Shared logic for every admin section editor.
 *
 * Holds an editable DRAFT copy of one content section. Components mutate the
 * draft freely; nothing is persisted until `save()`. `cancel()` discards the
 * draft back to the stored value. This gives every editor a consistent
 * save / cancel / "unsaved changes" experience.
 */
export function useSectionEditor<K extends SectionKey>(sectionKey: K) {
  const stored = useContentStore((s) => s.content[sectionKey])
  const updateSection = useContentStore((s) => s.updateSection)
  const toast = useToast()

  const clone = (v: SiteContent[K]): SiteContent[K] =>
    typeof structuredClone === 'function'
      ? structuredClone(v)
      : JSON.parse(JSON.stringify(v))

  const [draft, setDraft] = useState<SiteContent[K]>(() => clone(stored))

  // If the stored value changes externally (e.g. reset), refresh the draft.
  useEffect(() => {
    setDraft(clone(stored))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stored])

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(stored),
    [draft, stored],
  )

  const save = async () => {
    try {
      await updateSection(sectionKey, draft)
      toast.success('Сохранено')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Ошибка сохранения')
    }
  }

  const cancel = () => {
    setDraft(clone(stored))
    toast.info('Изменения отменены')
  }

  return { draft, setDraft, dirty, save, cancel }
}
