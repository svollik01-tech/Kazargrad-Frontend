import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { ListEditor } from '@/components/admin/ListEditor'
import { ImageListField } from '@/components/admin/StringList'

/** Editor for the "for kids" section (text, highlight, list, photos). */
export function KidsEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('kids')

  return (
    <EditorPage
      title="Детям"
      description="Всё для детей: текст, выделенная плашка, список и фотографии."
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
            rows={2}
          />
          <TextField
            label="Выделенная плашка"
            value={draft.highlight}
            onChange={(highlight) => setDraft({ ...draft, highlight })}
            hint="Напр. «Анимация входит в стоимость проживания»."
          />
        </div>
      </EditorCard>

      <EditorCard title="Что есть для детей">
        <ListEditor
          items={draft.items}
          onChange={(items) => setDraft({ ...draft, items })}
          createItem={() => ({ id: uid('kid'), visible: true, text: '' })}
          itemTitle={(item) => item.text || 'Новый пункт'}
          addLabel="Добавить пункт"
          renderItem={(item, { update }) => (
            <TextField label="Текст" value={item.text} onChange={(text) => update({ text })} />
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
