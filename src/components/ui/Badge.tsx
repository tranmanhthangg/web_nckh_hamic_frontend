import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone =
  | 'brand'
  | 'blue'
  | 'indigo'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'slate'

const toneStyles: Record<BadgeTone, string> = {
  brand: 'border-brand/20 bg-brand/10 text-brand',
  blue: 'border-blue-100 bg-blue-50 text-blue-700',
  indigo: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  rose: 'border-rose-200 bg-rose-50 text-rose-700',
  slate: 'border-slate-200 bg-slate-100 text-slate-700',
}

interface BadgeProps {
  tone?: BadgeTone
  /** Dùng cho các mã định danh (MATH, MIM-OptLab...). */
  mono?: boolean
  className?: string
  children: ReactNode
}

export function Badge({
  tone = 'slate',
  mono = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs leading-5 font-semibold whitespace-nowrap',
        toneStyles[tone],
        mono && 'font-mono tracking-wide uppercase',
        className,
      )}
    >
      {children}
    </span>
  )
}
