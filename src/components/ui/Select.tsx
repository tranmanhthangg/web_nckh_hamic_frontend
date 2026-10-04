import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  ariaLabel: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  /** Nhãn in hoa hiển thị phía trên (dùng cho sidebar bộ lọc). */
  label?: string
  /** Cao của ô chọn: bản mẫu dùng ô lớn ở trang tìm kiếm, ô nhỏ ở sidebar. */
  size?: 'sm' | 'lg'
  className?: string
  disabled?: boolean
}

export function Select({
  ariaLabel,
  value,
  onChange,
  options,
  label,
  size = 'sm',
  className,
  disabled,
}: SelectProps) {
  const id = `select-${ariaLabel.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <label
          htmlFor={id}
          className="mb-1.5 block text-xs font-bold tracking-wide text-slate-600 uppercase"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={id}
          aria-label={ariaLabel}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'w-full appearance-none rounded-lg border border-slate-300 bg-white pr-10 pl-4 shadow-xs transition',
            size === 'lg'
              ? 'h-12 text-base text-slate-800'
              : 'h-10 text-sm text-slate-700',
            'focus:border-brand focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50',
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
      </div>
    </div>
  )
}
