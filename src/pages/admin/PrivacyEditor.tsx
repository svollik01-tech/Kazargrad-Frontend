import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { ListEditor } from '@/components/admin/ListEditor'

export function PrivacyEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('privacy')

  return (
    <EditorPage
      title="Политика конфиденциальности"
      description="Текст документа отображается на странице /privacy. Ссылку в подвале настройте в разделе «Подвал сайта»."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Заголовок и дата">
        <div className="flex flex-col gap-4">
          <TextField
            label="Заголовок страницы"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <TextField
            label="Дата последнего обновления"
            value={draft.updatedAt}
            onChange={(updatedAt) => setDraft({ ...draft, updatedAt })}
            hint="Напр. «25 июня 2026 г.»"
          />
        </div>
      </EditorCard>

      <EditorCard title="Разделы документа">
        <ListEditor
          items={draft.sections}
          onChange={(sections) => setDraft({ ...draft, sections })}
          createItem={() => ({ id: uid('prv'), visible: true, title: '', text: '' })}
          itemTitle={(item) => item.title || 'Новый раздел'}
          addLabel="Добавить раздел"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <TextField
                label="Заголовок раздела"
                value={item.title}
                onChange={(title) => update({ title })}
              />
              <TextArea
                label="Текст"
                value={item.text}
                onChange={(text) => update({ text })}
                rows={6}
                hint="Для переноса строки используйте пустую строку между абзацами."
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
