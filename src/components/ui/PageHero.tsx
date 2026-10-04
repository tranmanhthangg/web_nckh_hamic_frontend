import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card } from '@/components/ui/Card'
import type { IconComponent } from '@/types'

interface PageHeroProps {
  icon: IconComponent
  /** Dòng nhãn nhỏ phía trên tiêu đề (in hoa). */
  kicker: string
  /** Cho phép truyền JSX để tô hai màu cho tiêu đề như bản mẫu. */
  title: ReactNode
  description?: string
  /** Màu nhãn + icon, ví dụ trang Lab dùng tông hổ phách. */
  tone?: 'brand' | 'amber'
  children?: ReactNode
}

/** Khối mở đầu dùng chung cho các trang con. */
export function PageHero({
  icon: Icon,
  kicker,
  title,
  description,
  tone = 'brand',
  children,
}: PageHeroProps) {
  return (
    <Card className="px-6 py-8 sm:px-8 sm:py-10">
      <p
        className={cn(
          'flex items-center gap-2 text-sm font-bold tracking-wide uppercase',
          tone === 'amber' ? 'text-amber-600' : 'text-brand',
        )}
      >
        <Icon
          size={20}
          className={tone === 'amber' ? 'text-amber-500' : 'text-brand'}
          aria-hidden
        />
        {kicker}
      </p>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-dark">
        {title}
      </h1>

      {description ? (
        <p className="mt-3 max-w-3xl text-base text-slate-600">{description}</p>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </Card>
  )
}
