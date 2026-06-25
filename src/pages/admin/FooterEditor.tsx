import { useSectionEditor } from '@/hooks/useSectionEditor'
import { uid } from '@/lib/utils'
import { EditorPage, EditorCard } from '@/components/admin/EditorPage'
import { FieldGrid, TextField } from '@/components/admin/fields'
import { IconPicker } from '@/components/admin/IconPicker'
import { ListEditor } from '@/components/admin/ListEditor'

/** Editor for the footer: contacts, legal details, social and legal links. */
export function FooterEditor() {
  const { draft, setDraft, dirty, save, cancel } = useSectionEditor('footer')

  const set = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) =>
    setDraft({ ...draft, [key]: value })

  return (
    <EditorPage
      title="Подвал сайта"
      description="Нижний блок сайта: реквизиты, ссылки на соцсети и юридические страницы."
      dirty={dirty}
      onSave={save}
      onCancel={cancel}
    >
      <EditorCard title="Основное">
        <div className="flex flex-col gap-4">
          <TextField label="Название комплекса" value={draft.complexName} onChange={(v) => set('complexName', v)} />
          <FieldGrid>
            <TextField label="Адрес" value={draft.address} onChange={(v) => set('address', v)} />
            <TextField label="Email" type="email" value={draft.email} onChange={(v) => set('email', v)} />
          </FieldGrid>
          <TextField label="Копирайт" value={draft.copyright} onChange={(v) => set('copyright', v)} />
        </div>
      </EditorCard>

      <EditorCard title="Юридическая информация">
        <div className="flex flex-col gap-4">
          <FieldGrid>
            <TextField label="Юридическое лицо" value={draft.legalEntity} onChange={(v) => set('legalEntity', v)} />
            <TextField label="ИП" value={draft.entrepreneur} onChange={(v) => set('entrepreneur', v)} />
            <TextField label="ИНН" value={draft.inn} onChange={(v) => set('inn', v)} />
            <TextField label="ОГРНИП" value={draft.ogrnip} onChange={(v) => set('ogrnip', v)} />
          </FieldGrid>
        </div>
      </EditorCard>

      <EditorCard title="Соцсети">
        <ListEditor
          items={draft.socialLinks}
          onChange={(socialLinks) => set('socialLinks', socialLinks)}
          createItem={() => ({ id: uid('soc'), visible: true, icon: 'Share2', label: '', url: '' })}
          itemTitle={(item) => item.label || 'Новая ссылка'}
          addLabel="Добавить соцсеть"
          renderItem={(item, { update }) => (
            <div className="flex flex-col gap-4">
              <IconPicker label="Иконка" value={item.icon} onChange={(icon) => update({ icon })} />
              <FieldGrid>
                <TextField label="Название" value={item.label} onChange={(label) => update({ label })} />
                <TextField label="Ссылка" type="url" value={item.url} onChange={(url) => update({ url })} />
              </FieldGrid>
            </div>
          )}
        />
      </EditorCard>

      <EditorCard title="Юридические ссылки">
        <ListEditor
          items={draft.legalLinks}
          onChange={(legalLinks) => set('legalLinks', legalLinks)}
          createItem={() => ({ id: uid('leg'), visible: true, label: '', url: '#' })}
          itemTitle={(item) => item.label || 'Новая ссылка'}
          addLabel="Добавить ссылку"
          renderItem={(item, { update }) => (
            <FieldGrid>
              <TextField label="Название" value={item.label} onChange={(label) => update({ label })} />
              <TextField label="Ссылка" value={item.url} onChange={(url) => update({ url })} />
            </FieldGrid>
          )}
        />
      </EditorCard>
    </EditorPage>
  )
}
