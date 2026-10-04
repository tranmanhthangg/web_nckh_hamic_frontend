import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  className?: string
  children: ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white shadow-xs',
        className,
      )}
    >
      {children}
    </div>
  )
}
