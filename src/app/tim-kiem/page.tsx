import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchPageClient } from './search-page-client'

export const metadata: Metadata = { title: 'Tìm kiếm & Tra cứu tri thức' }

/**
 * Trang Tìm kiếm — SearchPage dùng useSearchParams nên phải bọc Suspense
 * (yêu cầu prerender tĩnh của App Router).
 */
export default function SearchRoutePage() {
  return (
    <Suspense fallback={null}>
      <SearchPageClient />
    </Suspense>
  )
}
