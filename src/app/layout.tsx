import type { Metadata } from 'next'
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import '@/index.css'
import { AppShell } from '@/components/layout/AppShell'
import { HashRedirect } from '@/components/layout/HashRedirect'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { siteUrl } from '@/lib/site-url'

/**
 * Font tự host qua next/font (thay cho <link> Google Fonts của index.html cũ):
 * preload + font metric fallback, vẫn dùng đúng family/weight trước đây.
 */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

/** metadata thay cho <title>/<meta description> trong index.html cũ. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'HUS MIM - Kho Lưu trữ Tài liệu Nghiên cứu Khoa học | Khoa Toán - Cơ - Tin học',
    template: '%s | HUS MIM',
  },
  description:
    'Cổng Tri thức Học thuật MIM — Kho lưu trữ tài liệu nghiên cứu khoa học của Khoa Toán - Cơ - Tin học, Trường Đại học Khoa học Tự nhiên, ĐHQGHN.',
  icons: { icon: '/favicon.svg' },
}

/**
 * Root layout:
 * - Font self-host qua next/font (biến --font-* nối sang token Tailwind).
 * - AuthProvider bọc ngoài AppShell để trạng thái RBAC sống xuyên suốt các lần
 *   navigate (layout không bị remount).
 * - HashRedirect chuyển tiếp link hash cũ dạng /#/... sang đường dẫn App Router.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      >
        <HashRedirect />
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  )
}


