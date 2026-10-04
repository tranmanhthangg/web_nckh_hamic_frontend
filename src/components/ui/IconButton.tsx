import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Nhãn trợ năng (bắt buộc vì nút chỉ có icon). */
  label: string
  /** Số hiển thị trên chấm đỏ ở góc phải. */
  badge?: number
}

export function IconButton({
  label,
  badge,
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'relative inline-flex size-9 items-center justify-center rounded-md text-slate-600 transition-colors',
        'hover:bg-hover hover:text-brand-dark',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        className,
      )}
      {...rest}
    >
      {children}
      {typeof badge === 'number' && badge > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex size-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none font-bold text-white ring-2 ring-white">
          {badge}
        </span>
      ) : null}
    </button>
  )
}
