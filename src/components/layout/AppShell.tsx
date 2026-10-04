import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'
import { DebugRbacBar } from './DebugRbacBar'
import { SiteFooter } from './SiteFooter'
import { AuthModal } from '@/features/auth/AuthModal'

interface AppShellProps {
  children: ReactNode
}

/**
 * Khung trang dùng chung: thanh gỡ lỗi RBAC (cuộn theo trang) → khối dính
 * (dải portal + header + nav) → nội dung → footer.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DebugRbacBar />

      <div className="sticky top-0 z-40">
        <AppHeader />
      </div>

      <main className="flex-1 py-8 lg:py-12">{children}</main>

      <SiteFooter />
      <AuthModal />
    </div>
  )
}
