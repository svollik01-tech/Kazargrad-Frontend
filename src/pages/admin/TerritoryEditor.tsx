import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ImageField } from '@/components/admin/ImageField'
import { ListEditor } from '@/components/admin/ListEditor'

/** Editor for the territory section (intro + feature cards with photos). */
export function TerritoryEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('territory')

  return (
    <EditorPage
      title="Территория"
      description="Описание территории комплекса и карточки с фотографиями."
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
            rows={3}
          />
        </div>
      </EditorCard>

      <EditorCard title="Карточки">
        <ListEditor
          items={draft.cards}
          onChange={(cards) => setDraft({ ...draft, cards })}
          createItem={() => ({
            id: uid('terr'),
            visible: true,
            icon: 'Trees',
            title: '',
            description: '',
            image: '',
          })}
          itemTitle={(item) => item.title || 'Новая карточка'}
          addLabel="Добавить карточку"
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
              <ImageField
                label="Фото"
                value={item.image}
                onChange={(image) => update({ image })}
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
