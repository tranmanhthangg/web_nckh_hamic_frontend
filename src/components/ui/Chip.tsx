import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ChipTone = 'outline' | 'brand' | 'surface'

const toneStyles: Record<ChipTone, string> = {
  outline: 'border-slate-200 bg-white text-slate-700',
  brand: 'border-slate-200 bg-white text-brand-dark',
  surface: 'border-slate-200 bg-page text-slate-600',
}

interface ChipProps {
  tone?: ChipTone
  /** Phần tử hiển thị sau nhãn, thường là mũi tên "→". */
  suffix?: ReactNode
  className?: string
  children: ReactNode
}

export function Chip({
  tone = 'outline',
  suffix,
  className,
  children,
}: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-sm whitespace-nowrap',
        toneStyles[tone],
        className,
      )}
    >
      {children}
      {suffix}
    </span>
  )
}
