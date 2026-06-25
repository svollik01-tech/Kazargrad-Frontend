import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { TextField, TextArea } from '@/components/admin/fields'
import { ListEditor } from '@/components/admin/ListEditor'

/** Editor for frequently asked questions. */
export function FaqEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('faq')

  return (
    <EditorPage
      title="Частые вопросы (FAQ)"
      description="Вопросы и ответы. Категория помогает группировать вопросы."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Заголовок раздела">
        <TextField
          label="Заголовок"
          value={draft.title}
          onChange={(title) => setDraft({ ...draft, title })}
        />
      </EditorCard>

      <EditorCard title="Вопросы">
        <ListEditor
          items={draft.items}
          onChange={(items) => setDraft({ ...draft, items })}
          createItem={() => ({
            id: uid('faq'),
            visible: true,
            category: '',
            question: '',
            answer: '',
          })}
          itemTitle={(item) => item.question || 'Новый вопрос'}
          addLabel="Добавить вопрос"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <TextField
                label="Категория"
                value={item.category}
                onChange={(category) => update({ category })}
                hint="Напр. «Правила», «Удобства», «Бронирование»."
              />
              <TextField
                label="Вопрос"
                value={item.question}
                onChange={(question) => update({ question })}
              />
              <TextArea
                label="Ответ"
                value={item.answer}
                onChange={(answer) => update({ answer })}
                rows={3}
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
