import { useSectionEditor } from '@/hooks/useSectionEditor'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, TextArea } from '@/components/admin/fields'

/** Editor for the contacts / final CTA block. */
export function ContactsEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('contacts')

  const set = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) =>
    setDraft({ ...draft, [key]: value })

  return (
    <EditorPage
      title="Контакты"
      description="Контактные данные, ссылки на мессенджеры и тексты кнопок."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Заголовок блока">
        <div className="flex flex-col gap-4">
          <TextField label="Заголовок" value={draft.title} onChange={(v) => set('title', v)} />
          <TextArea
            label="Описание"
            value={draft.description}
            onChange={(v) => set('description', v)}
            rows={2}
          />
        </div>
      </EditorCard>

      <EditorCard title="Связь">
        <FieldGrid>
          <TextField label="Телефон" type="tel" value={draft.phone} onChange={(v) => set('phone', v)} />
          <TextField label="Email" type="email" value={draft.email} onChange={(v) => set('email', v)} />
          <TextField label="WhatsApp (ссылка)" type="url" value={draft.whatsapp} onChange={(v) => set('whatsapp', v)} />
          <TextField label="Telegram (ссылка)" type="url" value={draft.telegram} onChange={(v) => set('telegram', v)} />
          <TextField label="ВКонтакте (ссылка)" type="url" value={draft.vk} onChange={(v) => set('vk', v)} />
          <TextField label="Instagram (ссылка)" type="url" value={draft.instagram} onChange={(v) => set('instagram', v)} />
        </FieldGrid>
      </EditorCard>

      <EditorCard title="Адрес и режим работы">
        <div className="flex flex-col gap-4">
          <TextField label="Адрес" value={draft.address} onChange={(v) => set('address', v)} />
          <FieldGrid>
            <TextField label="Ссылка на карту" type="url" value={draft.mapLink} onChange={(v) => set('mapLink', v)} />
            <TextField label="Режим работы" value={draft.workingHours} onChange={(v) => set('workingHours', v)} />
          </FieldGrid>
        </div>
      </EditorCard>

      <EditorCard title="Тексты кнопок">
        <FieldGrid cols={3}>
          <TextField label="Кнопка WhatsApp" value={draft.whatsappCtaText} onChange={(v) => set('whatsappCtaText', v)} />
          <TextField label="Кнопка «Позвонить»" value={draft.callCtaText} onChange={(v) => set('callCtaText', v)} />
          <TextField label="Кнопка «Маршрут»" value={draft.routeCtaText} onChange={(v) => set('routeCtaText', v)} />
        </FieldGrid>
      </EditorCard>
    </EditorPage>
  )
}
