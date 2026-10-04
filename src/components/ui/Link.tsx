import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Đường dẫn nội bộ, ví dụ "/tim-kiem" — sẽ được nối vào hash router. */
  to: string
  children: ReactNode
}

/**
 * Điều hướng nội bộ dựa trên hash (#/duong-dan) — không cần thư viện router.
 */
export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  )
}
