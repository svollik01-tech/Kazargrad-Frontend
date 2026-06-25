import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ListEditor } from '@/components/admin/ListEditor'

/** Editor for the "advantages" grid (icon + title + description cards). */
export function AdvantagesEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('advantages')

  return (
    <EditorPage
      title="Преимущества"
      description="Карточки с ключевыми преимуществами комплекса."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard>
        <ListEditor
          items={draft}
          onChange={setDraft}
          createItem={() => ({
            id: uid('adv'),
            visible: true,
            icon: 'Home',
            title: '',
            description: '',
          })}
          itemTitle={(item) => item.title || 'Новое преимущество'}
          addLabel="Добавить преимущество"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <IconPicker label="Иконка" value={item.icon} onChange={(icon) => update({ icon })} />
              <TextField label="Заголовок" value={item.title} onChange={(title) => update({ title })} />
              <TextArea
                label="Описание"
                value={item.description}
                onChange={(description) => update({ description })}
                rows={2}
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
