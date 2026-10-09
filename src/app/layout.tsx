import '@/index.css'

/**
 * Root layout của Next.js — thay thế index.html + main.tsx của Vite.
 * Google Fonts + metadata + AuthProvider/AppShell được bổ sung ở Giai đoạn 3;
 * giai đoạn này chỉ kiểm tra công cụ build (Tailwind v4 qua PostCSS + alias @/*).
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}

