import { useSectionEditor } from '@/hooks/useSectionEditor'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField, TextArea, ColorField, Toggle } from '@/components/admin/fields'
import { ImageField } from '@/components/admin/ImageField'

/** Site-wide settings: SEO, brand, logo, and section feature flags. */
export function SettingsEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('settings')

  return (
    <EditorPage
      title="Настройки сайта"
      description="Название, описание для поисковиков, логотип, фирменные цвета и видимость разделов."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="SEO и название">
        <div className="flex flex-col gap-4">
          <TextField
            label="Название сайта (title)"
            value={draft.siteTitle}
            onChange={(siteTitle) => setDraft({ ...draft, siteTitle })}
            hint="Показывается во вкладке браузера и в результатах поиска."
          />
          <TextArea
            label="Описание (meta description)"
            value={draft.metaDescription}
            onChange={(metaDescription) => setDraft({ ...draft, metaDescription })}
            rows={3}
            hint="Краткое описание для поисковых систем и соцсетей."
          />
        </div>
      </EditorCard>

      <EditorCard title="Фирменные цвета">
        <FieldGrid>
          <ColorField
            label="Основной цвет"
            value={draft.primaryColor}
            onChange={(primaryColor) => setDraft({ ...draft, primaryColor })}
          />
          <ColorField
            label="Акцентный цвет"
            value={draft.accentColor}
            onChange={(accentColor) => setDraft({ ...draft, accentColor })}
          />
        </FieldGrid>
      </EditorCard>

      <EditorCard title="Логотип и иконка">
        <FieldGrid>
          <ImageField
            label="Логотип"
            value={draft.logoImage}
            onChange={(logoImage) => setDraft({ ...draft, logoImage })}
            hint="Если пусто — используется текстовый логотип."
          />
          <ImageField
            label="Favicon"
            value={draft.faviconImage}
            onChange={(faviconImage) => setDraft({ ...draft, faviconImage })}
            aspect="square"
            hint="Маленькая иконка во вкладке браузера."
          />
        </FieldGrid>
        <div className="mt-4">
          <ImageField
            label="Фото для главного экрана по умолчанию"
            value={draft.defaultHeroImage}
            onChange={(defaultHeroImage) => setDraft({ ...draft, defaultHeroImage })}
            hint="Запасное фото. Основное фото первого экрана задаётся в разделе «Главный экран» → «Фоновое изображение» и имеет приоритет."
          />
        </div>
      </EditorCard>

      <EditorCard
        title="Видимость разделов"
        description="Выключите раздел, чтобы временно скрыть его на сайте без удаления содержимого."
      >
        <div className="flex flex-col gap-2.5">
          <Toggle
            label="Анимации"
            checked={draft.animationsEnabled}
            onChange={(animationsEnabled) => setDraft({ ...draft, animationsEnabled })}
            hint="Плавные появления элементов при прокрутке."
          />
          <Toggle
            label="Раздел «Детям»"
            checked={draft.kidsEnabled}
            onChange={(kidsEnabled) => setDraft({ ...draft, kidsEnabled })}
          />
          <Toggle
            label="Раздел «Цены»"
            checked={draft.pricesEnabled}
            onChange={(pricesEnabled) => setDraft({ ...draft, pricesEnabled })}
          />
          <Toggle
            label="Раздел «Отзывы»"
            checked={draft.reviewsEnabled}
            onChange={(reviewsEnabled) => setDraft({ ...draft, reviewsEnabled })}
          />
          <Toggle
            label="Раздел «FAQ»"
            checked={draft.faqEnabled}
            onChange={(faqEnabled) => setDraft({ ...draft, faqEnabled })}
          />
          <Toggle
            label="Юридическая информация в подвале"
            checked={draft.footerLegalEnabled}
            onChange={(footerLegalEnabled) => setDraft({ ...draft, footerLegalEnabled })}
          />
        </div>
      </EditorCard>
    </EditorPage>
  )
}
