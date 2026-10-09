'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { navItems } from '@/data/navigation'
import { HeaderSearch } from '@/components/layout/HeaderSearch'
import { Container } from '@/components/ui/Container'
import { Link } from '@/components/ui/Link'

function isActiveRoute(currentPath: string, itemPath: string): boolean {
  return itemPath === '/'
    ? currentPath === '/'
    : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}

export function MainNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      aria-label="Điều hướng chính"
      className="border-b border-slate-200 bg-white/95 backdrop-blur-md"
    >
      <Container>
        <ul className="hidden h-12 items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = isActiveRoute(pathname, item.path)

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-brand text-white'
                      : 'text-slate-700 hover:bg-hover hover:text-brand',
                  )}
                >
                  <Icon
                    size={18}
                    className={isActive ? 'text-white' : 'text-slate-500'}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex h-12 items-center justify-between gap-3 lg:hidden">
          <span className="text-sm font-semibold text-slate-700">
            {navItems.find((item) => isActiveRoute(pathname, item.path))
              ?.label ?? 'Danh mục'}
          </span>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-nav-mobile"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-hover hover:text-brand"
          >
            {menuOpen ? (
              <X size={18} aria-hidden />
            ) : (
              <Menu size={18} aria-hidden />
            )}
            Danh mục
          </button>
        </div>

        {menuOpen ? (
          <div
            id="main-nav-mobile"
            className="border-t border-slate-200 py-3 lg:hidden"
          >
            <HeaderSearch className="mb-3" shape="rounded" />
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = isActiveRoute(pathname, item.path)

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
                        isActive
                          ? 'bg-brand text-white'
                          : 'text-slate-700 hover:bg-hover hover:text-brand',
                      )}
                    >
                      <Icon
                        size={18}
                        className={isActive ? 'text-white' : 'text-slate-500'}
                        aria-hidden
                      />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </Container>
    </nav>
  )
}
