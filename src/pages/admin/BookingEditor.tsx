import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ListEditor } from '@/components/admin/ListEditor'

/** Editor for the "how to book" steps. */
export function BookingEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('booking')

  return (
    <EditorPage
      title="Бронирование"
      description="Пошаговое описание процесса бронирования."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Заголовок раздела">
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
            rows={2}
          />
        </div>
      </EditorCard>

      <EditorCard title="Шаги">
        <ListEditor
          items={draft.steps}
          onChange={(steps) => setDraft({ ...draft, steps })}
          createItem={() => ({
            id: uid('step'),
            visible: true,
            icon: 'MessageSquare',
            title: '',
            description: '',
          })}
          itemTitle={(item, index) => `${index + 1}. ${item.title || 'Новый шаг'}`}
          addLabel="Добавить шаг"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <IconPicker label="Иконка" value={item.icon} onChange={(icon) => update({ icon })} />
              <TextField label="Заголовок" value={item.title} onChange={(title) => update({ title })} />
              <TextArea
                label="Описание"
                value={item.description}
                onChange={(description) => update({ description })}
                rows={3}
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
