import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Shared admin form controls.
 *
 * Every section editor builds its UI from these labelled, value/onChange-bound
 * primitives so the whole admin panel looks and behaves consistently. They are
 * intentionally "dumb" — state lives in the editor's draft (see
 * `useSectionEditor`), these just render and report changes.
 */

const inputBase =
  'w-full rounded-xl border border-wood-dark/15 bg-white px-3.5 py-2.5 text-sm text-graphite shadow-sm outline-none transition-colors placeholder:text-graphite/40 focus:border-pine focus:ring-2 focus:ring-pine/20'

interface FieldProps {
  label?: string
  hint?: string
  className?: string
  children: ReactNode
}

/** Label + optional hint wrapper around any control. */
export function Field({ label, hint, className, children }: FieldProps) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="text-sm font-semibold text-wood-dark">{label}</span>
      )}
      {children}
      {hint && <span className="text-xs text-graphite/55">{hint}</span>}
    </label>
  )
}

/** Responsive grid for laying out fields side by side. */
export function FieldGrid({
  children,
  cols = 2,
  className,
}: {
  children: ReactNode
  cols?: 2 | 3
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-4',
        cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface TextFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  hint?: string
  placeholder?: string
  type?: 'text' | 'email' | 'url' | 'tel'
  className?: string
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  placeholder,
  type = 'text',
  className,
}: TextFieldProps) {
  return (
    <Field label={label} hint={hint} className={className}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      />
    </Field>
  )
}

interface TextAreaProps {
  label?: string
  value: string
  onChange: (value: string) => void
  hint?: string
  placeholder?: string
  rows?: number
  className?: string
}

export function TextArea({
  label,
  value,
  onChange,
  hint,
  placeholder,
  rows = 3,
  className,
}: TextAreaProps) {
  return (
    <Field label={label} hint={hint} className={className}>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputBase, 'resize-y leading-relaxed')}
      />
    </Field>
  )
}

interface NumberFieldProps {
  label?: string
  value: number
  onChange: (value: number) => void
  hint?: string
  min?: number
  max?: number
  step?: number
  className?: string
}

export function NumberField({
  label,
  value,
  onChange,
  hint,
  min,
  max,
  step,
  className,
}: NumberFieldProps) {
  return (
    <Field label={label} hint={hint} className={className}>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(e.target.valueAsNumber || 0)}
        className={inputBase}
      />
    </Field>
  )
}

interface SelectFieldProps<T extends string> {
  label?: string
  value: T
  onChange: (value: T) => void
  options: Array<{ value: T; label: string }>
  hint?: string
  className?: string
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
  className,
}: SelectFieldProps<T>) {
  return (
    <Field label={label} hint={hint} className={className}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(inputBase, 'cursor-pointer')}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

interface ColorFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  hint?: string
  className?: string
}

export function ColorField({ label, value, onChange, hint, className }: ColorFieldProps) {
  return (
    <Field label={label} hint={hint} className={className}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-14 shrink-0 cursor-pointer rounded-lg border border-wood-dark/15 bg-white p-1"
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputBase, 'font-mono uppercase')}
        />
      </div>
    </Field>
  )
}

interface ToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  hint?: string
  className?: string
}

/** Accessible on/off switch with an inline label. */
export function Toggle({ label, checked, onChange, hint, className }: ToggleProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 rounded-xl border border-wood-dark/10 bg-white px-4 py-3',
        className,
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-wood-dark">{label}</span>
        {hint && <span className="text-xs text-graphite/55">{hint}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors',
          checked ? 'bg-pine' : 'bg-wood-dark/20',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[1.375rem]' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  )
}
