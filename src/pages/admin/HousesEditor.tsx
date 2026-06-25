import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, TextArea, NumberField } from '@/components/admin/fields'
import { ImageField } from '@/components/admin/ImageField'
import { ListEditor } from '@/components/admin/ListEditor'
import { StringListField, ImageListField } from '@/components/admin/StringList'

/** Editor for the guest houses section (intro + the house cards). */
export function HousesEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('houses')

  return (
    <EditorPage
      title="Дома"
      description="Гостевые дома: вступительный текст и карточки домов с ценами и фото."
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
            label="Вступление"
            value={draft.intro}
            onChange={(intro) => setDraft({ ...draft, intro })}
            rows={3}
          />
          <TextArea
            label="Сноска (под карточками)"
            value={draft.footnote}
            onChange={(footnote) => setDraft({ ...draft, footnote })}
            rows={2}
          />
        </div>
      </EditorCard>

      <EditorCard title="Дома">
        <ListEditor
          items={draft.items}
          onChange={(items) => setDraft({ ...draft, items })}
          createItem={() => ({
            id: uid('house'),
            visible: true,
            name: '',
            housesCount: 1,
            maxGuests: 12,
            bathrooms: 1,
            price: 0,
            priceLabel: '',
            description: '',
            suitableFor: '',
            image: '',
            gallery: [],
            features: [],
            ctaText: 'Выбрать дом',
          })}
          itemTitle={(item) => item.name || 'Новый дом'}
          addLabel="Добавить дом"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <TextField label="Название" value={item.name} onChange={(name) => update({ name })} />
              <FieldGrid cols={3}>
                <NumberField
                  label="Кол-во домов"
                  value={item.housesCount}
                  onChange={(housesCount) => update({ housesCount })}
                  min={0}
                />
                <NumberField
                  label="Макс. гостей"
                  value={item.maxGuests}
                  onChange={(maxGuests) => update({ maxGuests })}
                  min={0}
                />
                <NumberField
                  label="Санузлов"
                  value={item.bathrooms}
                  onChange={(bathrooms) => update({ bathrooms })}
                  min={0}
                />
              </FieldGrid>
              <FieldGrid>
                <NumberField
                  label="Цена (число, ₽)"
                  value={item.price}
                  onChange={(price) => update({ price })}
                  min={0}
                  step={500}
                />
                <TextField
                  label="Подпись к цене"
                  value={item.priceLabel}
                  onChange={(priceLabel) => update({ priceLabel })}
                  hint="Напр. «от 19 500 ₽/сутки»"
                />
              </FieldGrid>
              <TextArea
                label="Описание"
                value={item.description}
                onChange={(description) => update({ description })}
                rows={2}
              />
              <TextField
                label="Для кого подходит"
                value={item.suitableFor}
                onChange={(suitableFor) => update({ suitableFor })}
              />
              <TextField
                label="Текст кнопки"
                value={item.ctaText}
                onChange={(ctaText) => update({ ctaText })}
              />
              <ImageField
                label="Главное фото"
                value={item.image}
                onChange={(image) => update({ image })}
              />
              <ImageListField
                label="Галерея дома"
                values={item.gallery}
                onChange={(gallery) => update({ gallery })}
              />
              <StringListField
                label="Особенности"
                values={item.features}
                onChange={(features) => update({ features })}
                placeholder="Напр. «2 санузла»"
                addLabel="Добавить особенность"
              />
            </div>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
