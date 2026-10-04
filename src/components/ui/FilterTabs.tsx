import { cn } from '@/lib/cn'

export interface FilterTabItem {
  value: string
  label: string
  count?: number
}

interface FilterTabsProps {
  ariaLabel: string
  items: FilterTabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function FilterTabs({
  ariaLabel,
  items,
  value,
  onChange,
  className,
}: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap items-center gap-1', className)}
    >
      {items.map((item) => {
        const isActive = item.value === value

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-brand font-semibold text-white'
                : 'text-slate-600 hover:bg-hover hover:text-brand-dark',
            )}
          >
            {item.label}
            {typeof item.count === 'number' ? ` (${item.count})` : null}
          </button>
        )
      })}
    </div>
  )
}
