import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ListEditor } from '@/components/admin/ListEditor'

/** Editor for the "amenities in every house" list. */
export function AmenitiesEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('amenities')

  return (
    <EditorPage
      title="Удобства"
      description="Что есть в каждом доме комплекса."
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

      <EditorCard title="Список удобств">
        <ListEditor
          items={draft.items}
          onChange={(items) => setDraft({ ...draft, items })}
          createItem={() => ({
            id: uid('am'),
            visible: true,
            icon: 'Check',
            title: '',
            description: '',
          })}
          itemTitle={(item) => item.title || 'Новое удобство'}
          addLabel="Добавить удобство"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <IconPicker label="Иконка" value={item.icon} onChange={(icon) => update({ icon })} />
              <TextField label="Название" value={item.title} onChange={(title) => update({ title })} />
              <TextField
                label="Описание (необязательно)"
                value={item.description}
                onChange={(description) => update({ description })}
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
