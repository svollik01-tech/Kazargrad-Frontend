import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, TextArea } from '@/components/admin/fields'
import { ImageField } from '@/components/admin/ImageField'
import { ListEditor } from '@/components/admin/ListEditor'

/** Editor for the hero (first screen): headline, subtitle, CTAs, badges, bg. */
export function HeroEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('hero')

  return (
    <EditorPage
      title="Главный экран"
      description="Первое, что видит посетитель: заголовок, подзаголовок, кнопки и фоновое фото."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Текст">
        <div className="flex flex-col gap-4">
          <TextArea
            label="Заголовок"
            value={draft.headline}
            onChange={(headline) => setDraft({ ...draft, headline })}
            rows={2}
          />
          <TextArea
            label="Подзаголовок"
            value={draft.subtitle}
            onChange={(subtitle) => setDraft({ ...draft, subtitle })}
            rows={3}
          />
        </div>
      </EditorCard>

      <EditorCard title="Кнопки">
        <FieldGrid>
          <TextField
            label="Основная кнопка"
            value={draft.primaryCtaText}
            onChange={(primaryCtaText) => setDraft({ ...draft, primaryCtaText })}
          />
          <TextField
            label="Вторая кнопка"
            value={draft.secondaryCtaText}
            onChange={(secondaryCtaText) => setDraft({ ...draft, secondaryCtaText })}
          />
        </FieldGrid>
      </EditorCard>

      <EditorCard title="Фоновое изображение">
        <ImageField
          value={draft.backgroundImage}
          onChange={(backgroundImage) => setDraft({ ...draft, backgroundImage })}
          hint="Рекомендуется горизонтальное фото высокого качества."
        />
      </EditorCard>

      <EditorCard title="Бейджи" description="Короткие плашки-преимущества поверх фона.">
        <ListEditor
          items={draft.badges}
          onChange={(badges) => setDraft({ ...draft, badges })}
          createItem={() => ({ id: uid('badge'), visible: true, text: '' })}
          itemTitle={(item) => item.text || 'Новый бейдж'}
          addLabel="Добавить бейдж"
          renderItem={(item, { update }) => (
            <TextField label="Текст" value={item.text} onChange={(text) => update({ text })} />
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
