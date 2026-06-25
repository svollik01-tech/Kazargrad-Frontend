import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import type { PhotoCategory, MediaType } from '@/types/content'
import { PHOTO_CATEGORIES } from '@/lib/galleryCategories'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, SelectField } from '@/components/admin/fields'
import { ImageField } from '@/components/admin/ImageField'
import { ListEditor } from '@/components/admin/ListEditor'

const TYPE_OPTIONS: Array<{ value: MediaType; label: string }> = [
  { value: 'image', label: 'Фото' },
  { value: 'video', label: 'Видео' },
]

/** Editor for the photo & video gallery / media library. */
export function GalleryEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('gallery')

  return (
    <EditorPage
      title="Фото и видео галерея"
      description="Медиатека комплекса. Добавляйте фотографии (загрузкой) и видео (ссылкой на YouTube или прямой ссылкой на файл .mp4). Каждый элемент можно отнести к категории."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard>
        <ListEditor
          items={draft}
          onChange={setDraft}
          createItem={() => ({
            id: uid('gal'),
            visible: true,
            src: '',
            name: '',
            alt: '',
            category: 'Other' as PhotoCategory,
            type: 'image' as MediaType,
          })}
          itemTitle={(item) =>
            `${item.type === 'video' ? '🎬 ' : ''}${item.name || 'Новый элемент'}`
          }
          addLabel="Добавить фото или видео"
          renderItem={(item, { update }) => {
            const type: MediaType = item.type ?? 'image'
            return (
              <div className="flex flex-col gap-4">
                <FieldGrid>
                  <SelectField
                    label="Тип"
                    value={type}
                    onChange={(t) => update({ type: t })}
                    options={TYPE_OPTIONS}
                  />
                  <SelectField
                    label="Категория"
                    value={item.category}
                    onChange={(category) => update({ category })}
                    options={PHOTO_CATEGORIES}
                  />
                </FieldGrid>

                {type === 'image' ? (
                  <ImageField
                    label="Изображение"
                    value={item.src}
                    onChange={(src) => update({ src })}
                  />
                ) : (
                  <TextField
                    label="Ссылка на видео"
                    type="url"
                    value={item.src}
                    onChange={(src) => update({ src })}
                    hint="YouTube (напр. https://youtu.be/…) или прямая ссылка на файл .mp4. Видео не хранится в браузере — только ссылка."
                  />
                )}

                <FieldGrid>
                  <TextField
                    label="Название"
                    value={item.name}
                    onChange={(name) => update({ name })}
                  />
                  <TextField
                    label="Alt-текст / описание"
                    value={item.alt}
                    onChange={(alt) => update({ alt })}
                    hint="Описание для поисковиков и доступности."
                  />
                </FieldGrid>
              </div>
            )
          }}
        />
      </EditorCard>
    </EditorPage>
  )
}
