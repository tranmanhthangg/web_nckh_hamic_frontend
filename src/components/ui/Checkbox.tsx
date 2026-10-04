import { cn } from '@/lib/cn'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  className?: string
}

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-xs transition',
        'hover:border-brand/40 focus-within:border-brand',
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 shrink-0 cursor-pointer rounded-sm border-slate-300 accent-brand"
      />
      <span className="truncate font-medium">{label}</span>
    </label>
  )
}
