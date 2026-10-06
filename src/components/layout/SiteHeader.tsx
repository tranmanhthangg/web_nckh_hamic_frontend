import { Bell, ChevronDown, CirclePlus, LogOut } from 'lucide-react'
import { roles } from '@/data/rbac'
import { headerContent } from '@/data/site'
import { useAuth } from '@/features/auth/auth-context'
import { BrandMark } from '@/components/layout/BrandMark'
import { HeaderSearch } from '@/components/layout/HeaderSearch'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { IconButton } from '@/components/ui/IconButton'
import { Link } from '@/components/ui/Link'

/** Số thông báo hiển thị trên chuông — quan sát được trên bản mẫu ở trạng thái khách. */
const notificationsCount = 3

export function SiteHeader() {
  const { user, isAuthenticated, openAuthModal, signOut } = useAuth()
  const roleLabel = user
    ? roles.find((item) => item.id === user.role)?.label
    : undefined

  return (
    <header className="bg-white">
      <Container className="flex h-20 items-center gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Về trang chủ Cổng Tri thức Học thuật MIM"
          onClick={(event) => {
            // Chỉ cuộn về đầu trang hiện tại — không điều hướng về trang chủ.
            event.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <BrandMark />
          <span className="hidden sm:block">
            <span className="block text-xs font-bold tracking-[0.14em] text-brand uppercase">
              {headerContent.kicker}
            </span>
            <span className="block text-lg leading-tight font-extrabold text-brand-dark">
              {headerContent.wordmark}
            </span>
            <span className="block text-sm text-slate-500">
              {headerContent.subline}
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 justify-center px-4 lg:flex">
          <HeaderSearch className="max-w-[26rem]" />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          {isAuthenticated ? (
            <span className="hidden lg:block">
              <Button className="whitespace-nowrap">
                <CirclePlus size={18} aria-hidden />
                Đăng tải công trình
              </Button>
            </span>
          ) : null}

          <IconButton label="Thông báo" badge={notificationsCount}>
            <Bell size={20} aria-hidden />
          </IconButton>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-xs">
                <Avatar name={user.name} size="sm" />
                <span className="hidden leading-tight sm:block">
                  <span className="block text-sm font-semibold text-slate-800">
                    {user.name}
                  </span>
                  <span className="block text-xs text-slate-500">{roleLabel}</span>
                </span>
                <ChevronDown
                  size={16}
                  className="shrink-0 text-slate-400"
                  aria-hidden
                />
              </div>
              <IconButton label="Đăng xuất" onClick={signOut}>
                <LogOut size={18} aria-hidden />
              </IconButton>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="rounded-md px-3 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-hover"
              >
                Đăng nhập
              </button>
              <Button onClick={() => openAuthModal('register')}>
                Đăng ký
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}
