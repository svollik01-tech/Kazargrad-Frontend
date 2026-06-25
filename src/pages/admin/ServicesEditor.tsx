import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import type { PricingType } from '@/types/content'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, TextArea, SelectField, Toggle } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ListEditor } from '@/components/admin/ListEditor'

const PRICING_OPTIONS: Array<{ value: PricingType; label: string }> = [
  { value: 'per_hour', label: 'За час' },
  { value: 'fixed', label: 'Фиксированная' },
  { value: 'from', label: 'От суммы' },
  { value: 'negotiable', label: 'По договорённости' },
  { value: 'included', label: 'Входит в стоимость' },
]

/** Editor for additional services & prices. */
export function ServicesEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('services')

  return (
    <EditorPage
      title="Услуги и цены"
      description="Дополнительные услуги с ценами. Часть услуг может входить в стоимость проживания."
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

      <EditorCard title="Услуги">
        <ListEditor
          items={draft.items}
          onChange={(items) => setDraft({ ...draft, items })}
          createItem={() => ({
            id: uid('srv'),
            visible: true,
            name: '',
            description: '',
            price: '',
            priceLabel: '',
            pricingType: 'fixed' as PricingType,
            includedInStay: false,
            icon: 'Tag',
          })}
          itemTitle={(item) => item.name || 'Новая услуга'}
          addLabel="Добавить услугу"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <FieldGrid>
                <IconPicker label="Иконка" value={item.icon} onChange={(icon) => update({ icon })} />
                <SelectField
                  label="Тип цены"
                  value={item.pricingType}
                  onChange={(pricingType) => update({ pricingType })}
                  options={PRICING_OPTIONS}
                />
              </FieldGrid>
              <TextField label="Название" value={item.name} onChange={(name) => update({ name })} />
              <TextArea
                label="Описание"
                value={item.description}
                onChange={(description) => update({ description })}
                rows={2}
              />
              <FieldGrid>
                <TextField
                  label="Цена (кратко)"
                  value={item.price}
                  onChange={(price) => update({ price })}
                  hint="Напр. «от 1000 ₽/час»"
                />
                <TextField
                  label="Подпись к цене"
                  value={item.priceLabel}
                  onChange={(priceLabel) => update({ priceLabel })}
                />
              </FieldGrid>
              <Toggle
                label="Входит в стоимость проживания"
                checked={item.includedInStay}
                onChange={(includedInStay) => update({ includedInStay })}
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
