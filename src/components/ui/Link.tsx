import NextLink from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Đường dẫn nội bộ, ví dụ "/tim-kiem" — ánh xạ thẳng thành href của next/link. */
  to: string
  children: ReactNode
}

/**
 * Điều hướng nội bộ — adapter above next/link, giữ nguyên API `to` để
 * không phải sửa các call-site. Hành vi Back/Forward/Prefetch do App Router lo.
 */
export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <NextLink href={to} {...rest}>
      {children}
    </NextLink>
  )
}

