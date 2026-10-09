'use client'

import { useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { RouterState } from './router'

/**
 * Adapter: trả về đúng interface RouterState của hash router cũ nhưng đọc
 * từ App Router (pathname + searchParams) thay vì window.location.hash.
 *
 * - `path`/`segments` tương đương parseHash() cũ.
 * - `raw` là "pathname?search" — dùng làm khoá remount/scroll như `route.raw`.
 *
 * Lưu ý: vì dùng useSearchParams(), consumer phải là Client Component và
 * nằm trong một <Suspense> (yêu cầu prerender tĩnh của App Router).
 */
export function useRoute(): RouterState {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useMemo(() => {
    const query: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) {
      query[key] = value
    }

    const search = searchParams.toString()

    return {
      path: pathname,
      segments: pathname.split('/').filter(Boolean),
      query,
      raw: search ? `${pathname}?${search}` : pathname,
    }
  }, [pathname, searchParams])
}

