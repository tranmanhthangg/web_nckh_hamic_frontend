import { cn } from '@/lib/cn'
import type { IconComponent } from '@/types'

interface TextFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  icon?: IconComponent
  required?: boolean
  autoComplete?: string
  className?: string
}

export function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon,
  required = false,
  autoComplete,
  className,
}: TextFieldProps) {
  const id = `field-${name}`

  return (
    <div className={cn('w-full', className)}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-slate-800"
      >
        {label}
        {required ? (
          <>
            {' '}
            <span className="text-red-500">*</span>
          </>
        ) : null}
      </label>
      <div className="relative">
        {Icon ? (
          <Icon
            size={18}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
        ) : null}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'h-11 w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-800 transition',
            'placeholder:text-slate-400 focus:border-brand focus:outline-none',
            Icon ? 'pr-3 pl-11' : 'px-3',
          )}
        />
      </div>
    </div>
  )
}
