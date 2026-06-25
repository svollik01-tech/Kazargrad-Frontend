import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ListEditor } from '@/components/admin/ListEditor'
import { ImageListField } from '@/components/admin/StringList'

/** Editor for the events / celebrations section. */
export function EventsEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('events')

  return (
    <EditorPage
      title="Праздники и мероприятия"
      description="Сценарии праздников, текст раздела и фотографии."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Текст">
        <div className="flex flex-col gap-4">
          <TextField
            label="Заголовок"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <TextArea
            label="Описание"
            value={draft.description}
            onChange={(description) => setDraft({ ...draft, description })}
            rows={3}
          />
          <TextField
            label="Текст кнопки"
            value={draft.ctaText}
            onChange={(ctaText) => setDraft({ ...draft, ctaText })}
          />
        </div>
      </EditorCard>

      <EditorCard title="Сценарии праздников">
        <ListEditor
          items={draft.scenarios}
          onChange={(scenarios) => setDraft({ ...draft, scenarios })}
          createItem={() => ({ id: uid('ev'), visible: true, icon: 'PartyPopper', title: '' })}
          itemTitle={(item) => item.title || 'Новый сценарий'}
          addLabel="Добавить сценарий"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <IconPicker label="Иконка" value={item.icon} onChange={(icon) => update({ icon })} />
              <TextField label="Название" value={item.title} onChange={(title) => update({ title })} />
            </div>
          )}
        />
      </EditorCard>

      <EditorCard title="Фотографии">
        <ImageListField
          values={draft.images}
          onChange={(images) => setDraft({ ...draft, images })}
        />
      </EditorCard>
    </EditorPage>
  )
}
