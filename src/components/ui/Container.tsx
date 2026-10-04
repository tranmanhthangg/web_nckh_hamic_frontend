import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  className?: string
  children: ReactNode
}

/**
 * Khung nội dung dùng chung cho toàn site (header, nav, main, footer đều canh
 * theo cùng mép trái/phải). Bề rộng chốt theo bản mẫu ở màn hình lớn.
 */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1380px] px-4 sm:px-6', className)}>
      {children}
    </div>
  )
}
