import { cn } from '@/lib/cn'
import type { IconComponent } from '@/types'

interface SegmentedOption<T extends string> {
  value: T
  label: string
  icon?: IconComponent
}

interface SegmentedToggleProps<T extends string> {
  ariaLabel: string
  value: T
  onChange: (value: T) => void
  options: [SegmentedOption<T>, SegmentedOption<T>]
  className?: string
}

export function SegmentedToggle<T extends string>({
  ariaLabel,
  value,
  onChange,
  options,
  className,
}: SegmentedToggleProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-hover p-1',
        className,
      )}
    >
      {options.map((option) => {
        const Icon = option.icon
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border border-slate-200 bg-white text-brand-dark shadow-xs'
                : 'border border-transparent text-slate-600 hover:text-brand-dark',
            )}
          >
            {Icon ? <Icon size={16} aria-hidden /> : null}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
