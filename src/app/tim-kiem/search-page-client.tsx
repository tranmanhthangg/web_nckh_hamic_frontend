'use client'

import { useSearchParams } from 'next/navigation'
import { SearchPage } from '@/views/SearchPage'

/**
 * Bọc SearchPage bằng key theo query — tái tạo hành vi `key={route.raw}`
 * cũ: khi gửi tìm kiếm mới từ header trong khi đang ở trang Tìm kiếm,
 * component remount với giá trị q/domain/kind mới thay vì giữ state cũ.
 */
export function SearchPageClient() {
  const searchParams = useSearchParams()
  return <SearchPage key={searchParams.toString()} />
}
