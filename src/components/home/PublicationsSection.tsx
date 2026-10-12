'use client'

import { useState, useSyncExternalStore } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import { publicationsSection } from '@/data/home'
import { filterPublications, publicationFilters } from '@/data/publications'
import type { PublicationFilterId } from '@/data/publications'
import { PublicationResults } from '@/components/publications/PublicationResults'
import { PublicationViewToggle } from '@/components/publications/PublicationViewToggle'
import type { PublicationView } from '@/components/publications/PublicationViewToggle'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Link } from '@/components/ui/Link'
import { SectionHeader } from '@/components/ui/SectionHeader'

/** Tab không hiển thị số lượng — chức năng đếm "(6)" đã loại bỏ theo yêu cầu UI. */
const filterTabs = publicationFilters.map((filter) => ({
  value: filter.id,
  label: filter.label,
}))

/** Kho lưu kiểu xem ở Trang chủ — giữ lựa chọn "Danh sách/Dạng ô" sau khi tải lại trang. */
const VIEW_STORAGE_KEY = 'mim:home-publication-view'

/**
 * Kho kiểu xem đọc từ localStorage qua useSyncExternalStore: lần render trên
 * server và lúc hydration luôn là 'grid' (không lệch hydration), rồi tự áp
 * dụng lựa chọn đã lưu ngay sau khi hydration xong — không cần setState trong
 * useEffect.
 */
const viewListeners = new Set<() => void>()

function subscribeView(onStoreChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    // storage chỉ bắn ở tab khác khi giá trị đổi — đồng bộ đa tab miễn phí.
    if (event.key === VIEW_STORAGE_KEY) onStoreChange()
  }
  window.addEventListener('storage', handleStorage)
  viewListeners.add(onStoreChange)
  return () => {
    window.removeEventListener('storage', handleStorage)
    viewListeners.delete(onStoreChange)
  }
}

function getViewSnapshot(): PublicationView | null {
  const saved = window.localStorage.getItem(VIEW_STORAGE_KEY)
  return saved === 'grid' || saved === 'list' ? saved : null
}

function getViewServerSnapshot(): PublicationView | null {
  // Prerender tĩnh chưa biết lựa chọn của người dùng.
  return null
}

export function PublicationsSection() {
  const [filter, setFilter] = useState<PublicationFilterId>('all')
  const savedView = useSyncExternalStore(
    subscribeView,
    getViewSnapshot,
    getViewServerSnapshot,
  )
  const view = savedView ?? 'grid'
  const items = filterPublications(filter)

  const handleViewChange = (next: PublicationView) => {
    window.localStorage.setItem(VIEW_STORAGE_KEY, next)
    // Cùng tab không bắn sự kiện 'storage' nên tự thông báo để React đọc lại.
    for (const listener of viewListeners) listener()
  }

  return (
    <section className="lg:col-span-2">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <SectionHeader
          icon={FileText}
          title={publicationsSection.title}
          variant="section"
        />
        <PublicationViewToggle value={view} onChange={handleViewChange} />
      </div>

      <div className="mt-5 border-b border-slate-200 pb-3">
        <FilterTabs
          ariaLabel="Lọc công trình theo loại hình"
          items={filterTabs}
          value={filter}
          onChange={(value) => setFilter(value as PublicationFilterId)}
        />
      </div>

      <PublicationResults items={items} view={view} className="mt-6" />

      <Link
        to="/tim-kiem"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark hover:underline"
      >
        {publicationsSection.viewAllLabel}
        <ArrowRight size={16} aria-hidden />
      </Link>
    </section>
  )
}
