import type { Metadata } from 'next'
import '@/index.css'
import { AppShell } from '@/components/layout/AppShell'
import { HashRedirect } from '@/components/layout/HashRedirect'
import { AuthProvider } from '@/features/auth/AuthProvider'

/** metadata thay cho <title>/<meta description> trong index.html cũ. */
export const metadata: Metadata = {
  title:
    'HUS MIM - Kho Lưu trữ Tài liệu Nghiên cứu Khoa học | Khoa Toán - Cơ - Tin học',
  description:
    'Cổng Tri thức Học thuật MIM — Kho lưu trữ tài liệu nghiên cứu khoa học của Khoa Toán - Cơ - Tin học, Trường Đại học Khoa học Tự nhiên, ĐHQGHN.',
  icons: { icon: '/favicon.svg' },
}

/**
 * Root layout — thay thế index.html + main.tsx của Vite:
 * - Google Fonts nạp y hệt bằng <link> như index.html (React tự chuyển lên <head>).
 * - AuthProvider bọc ngoài AppShell để trạng thái RBAC sống xuyên suốt các lần
 *   navigate (layout không bị remount).
 * - HashRedirect chuyển tiếp link hash cũ dạng /#/... sang đường dẫn App Router.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <HashRedirect />
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  )
}


