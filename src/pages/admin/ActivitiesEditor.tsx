import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import type { Season } from '@/types/content'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, TextArea, SelectField } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ListEditor } from '@/components/admin/ListEditor'

const SEASON_OPTIONS: Array<{ value: Season; label: string }> = [
  { value: 'summer', label: 'Лето' },
  { value: 'winter', label: 'Зима' },
]

/** Editor for the seasonal activities section. */
export function ActivitiesEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('activities')

  return (
    <EditorPage
      title="Развлечения"
      description="Активности по сезонам. Каждой активности можно задать сезон (лето/зима)."
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
          <FieldGrid>
            <TextField
              label="Подпись «Лето»"
              value={draft.summerLabel}
              onChange={(summerLabel) => setDraft({ ...draft, summerLabel })}
            />
            <TextField
              label="Подпись «Зима»"
              value={draft.winterLabel}
              onChange={(winterLabel) => setDraft({ ...draft, winterLabel })}
            />
          </FieldGrid>
        </div>
      </EditorCard>

      <EditorCard title="Активности">
        <ListEditor
          items={draft.items}
          onChange={(items) => setDraft({ ...draft, items })}
          createItem={() => ({
            id: uid('act'),
            visible: true,
            season: 'summer' as Season,
            icon: 'Sparkles',
            title: '',
            price: '',
            description: '',
          })}
          itemTitle={(item) =>
            `${item.season === 'winter' ? '❄' : '☀'} ${item.title || 'Новая активность'}`
          }
          addLabel="Добавить активность"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <FieldGrid>
                <IconPicker label="Иконка" value={item.icon} onChange={(icon) => update({ icon })} />
                <SelectField
                  label="Сезон"
                  value={item.season}
                  onChange={(season) => update({ season })}
                  options={SEASON_OPTIONS}
                />
              </FieldGrid>
              <TextField label="Название" value={item.title} onChange={(title) => update({ title })} />
              <FieldGrid>
                <TextField
                  label="Цена (необязательно)"
                  value={item.price}
                  onChange={(price) => update({ price })}
                />
                <TextField
                  label="Описание (необязательно)"
                  value={item.description}
                  onChange={(description) => update({ description })}
                />
              </FieldGrid>
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
