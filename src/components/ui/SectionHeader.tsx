import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { IconComponent } from '@/types'

interface SectionHeaderProps {
  icon?: IconComponent
  title: string
  /** Nút/link hành động bên phải tiêu đề. */
  action?: ReactNode
  /**
   * `section`: tiêu đề lớn cho khu vực nội dung (vd "Công trình mới bảo vệ...").
   * `panel`: tiêu đề nhỏ, in hoa cho các khối trong sidebar và footer.
   */
  variant?: 'section' | 'panel'
  className?: string
}

export function SectionHeader({
  icon: Icon,
  title,
  action,
  variant = 'panel',
  className,
}: SectionHeaderProps) {
  const isPanel = variant === 'panel'

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <h2
        className={cn(
          'flex min-w-0 items-center gap-2 font-bold text-brand-dark',
          isPanel
            ? 'text-sm tracking-wide uppercase'
            : 'text-lg tracking-tight normal-case',
        )}
      >
        {Icon ? (
          <Icon
            size={isPanel ? 18 : 20}
            className={cn('shrink-0 text-brand', isPanel ? 'mt-0.5' : undefined)}
            aria-hidden
          />
        ) : null}
        <span className="truncate">{title}</span>
      </h2>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
