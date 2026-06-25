import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, TextArea, NumberField } from '@/components/admin/fields'
import { ListEditor } from '@/components/admin/ListEditor'

/**
 * Editor for guest reviews. Reviews should be real quotes pasted from
 * Yandex.Maps — do not invent them.
 */
export function ReviewsEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('reviews')

  return (
    <EditorPage
      title="Отзывы"
      description="Реальные отзывы гостей (например, из Яндекс.Карт) и ссылка на источник."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Заголовок и ссылка">
        <div className="flex flex-col gap-4">
          <TextField
            label="Заголовок"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <FieldGrid>
            <TextField
              label="Ссылка на отзывы (Яндекс)"
              type="url"
              value={draft.yandexUrl}
              onChange={(yandexUrl) => setDraft({ ...draft, yandexUrl })}
            />
            <TextField
              label="Текст кнопки"
              value={draft.buttonText}
              onChange={(buttonText) => setDraft({ ...draft, buttonText })}
            />
          </FieldGrid>
        </div>
      </EditorCard>

      <EditorCard title="Отзывы">
        <ListEditor
          items={draft.items}
          onChange={(items) => setDraft({ ...draft, items })}
          createItem={() => ({
            id: uid('rev'),
            visible: true,
            source: 'Яндекс.Карты',
            author: '',
            rating: 5,
            text: '',
            date: '',
            link: '',
          })}
          itemTitle={(item) => item.author || 'Новый отзыв'}
          addLabel="Добавить отзыв"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <FieldGrid cols={3}>
                <TextField label="Автор" value={item.author} onChange={(author) => update({ author })} />
                <TextField
                  label="Источник"
                  value={item.source}
                  onChange={(source) => update({ source })}
                />
                <NumberField
                  label="Оценка (1–5)"
                  value={item.rating}
                  onChange={(rating) => update({ rating: Math.min(5, Math.max(1, rating)) })}
                  min={1}
                  max={5}
                />
              </FieldGrid>
              <TextArea
                label="Текст отзыва"
                value={item.text}
                onChange={(text) => update({ text })}
                rows={3}
              />
              <FieldGrid>
                <TextField
                  label="Дата (необязательно)"
                  value={item.date}
                  onChange={(date) => update({ date })}
                  hint="Напр. «март 2024»"
                />
                <TextField
                  label="Ссылка на отзыв (необязательно)"
                  type="url"
                  value={item.link}
                  onChange={(link) => update({ link })}
                />
              </FieldGrid>
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
