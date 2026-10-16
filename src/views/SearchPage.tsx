'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import { useSearchParams } from 'next/navigation'
import { Filter, RotateCcw, Sparkles } from 'lucide-react'
import { domains } from '@/data/domains'
import {
  publicationKindLabels,
  publications,
} from '@/data/publications'
import { mentors } from '@/data/mentors'
import { cn } from '@/lib/cn'
import { PublicationResults } from '@/components/publications/PublicationResults'
import { PublicationViewToggle } from '@/components/publications/PublicationViewToggle'
import type { PublicationView } from '@/components/publications/PublicationViewToggle'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SearchInput } from '@/components/ui/SearchInput'
import { Select } from '@/components/ui/Select'
import type { PublicationKind } from '@/types'

const domainFilterOptions = [
  { value: 'all', label: 'Tất cả 5 trụ cột' },
  ...domains.map((domain) => ({
    value: domain.code,
    label: `${domain.code} — ${domain.name}`,
  })),
]

const kindFilterOptions = [
  { value: 'all', label: 'Tất cả loại hình' },
  ...(
    Object.keys(publicationKindLabels) as PublicationKind[]
  ).map((kind) => ({
    value: kind,
    label: publicationKindLabels[kind]
      .toLowerCase()
      .replace(/(^|\s)\S/g, (char) => char.toUpperCase()),
  })),
]

// [suy luận] các trường mới trong ảnh mẫu — chỉ dựng giao diện, chưa lọc theo dữ liệu thật.
const honorFilterOptions = [
  { value: 'isi', label: 'ISI (Q1/Q2)' },
  { value: 'scopus', label: 'Scopus' },
  { value: 'thesis-award', label: 'Khóa luận xuất sắc & Giải NCKH' },
]

const advisorFilterOptions = [
  { value: 'all', label: 'Tất cả giảng viên hướng dẫn' },
  ...mentors.map((mentor) => ({
    value: mentor.id,
    label: `${mentor.title} ${mentor.name}`,
  })),
]

const yearFilterOptions = (() => {
  const years = [...new Set(publications.map((item) => item.year))].sort(
    (a, b) => b - a,
  )
  return [
    { value: 'all', label: 'Tất cả các năm' },
    ...years.map((year) => ({ value: String(year), label: `Năm ${year}` })),
  ]
})()

// [suy luận] bản mẫu chỉ hiển thị giá trị "Mới nhất" trong ô sắp xếp.
const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'views', label: 'Xem nhiều nhất' },
  { value: 'downloads', label: 'Tải nhiều nhất' },
]

/** Kho kiểu xem ở trang Tìm kiếm — giữ lựa chọn "Danh sách/Dạng ô" sau khi tải lại. */
const VIEW_STORAGE_KEY = 'mim:search-publication-view'

/**
 * Đọc kiểu xem từ localStorage qua useSyncExternalStore: lần render trên server
 * và lúc hydration luôn là 'grid' (không lệch hydration), rồi tự áp dụng lựa
 * chọn đã lưu ngay sau khi hydration xong.
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

export function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [domain, setDomain] = useState(searchParams.get('domain') ?? 'all')
  const [kind, setKind] = useState(searchParams.get('kind') ?? 'all')
  const [honor, setHonor] = useState<string | null>(null)
  const [advisor, setAdvisor] = useState('all')
  const [year, setYear] = useState('all')
  const [sort, setSort] = useState('newest')
  const savedView = useSyncExternalStore(
    subscribeView,
    getViewSnapshot,
    getViewServerSnapshot,
  )
  const view = savedView ?? 'grid'

  const handleViewChange = (next: PublicationView) => {
    window.localStorage.setItem(VIEW_STORAGE_KEY, next)
    // Cùng tab không bắn sự kiện 'storage' nên tự thông báo để React đọc lại.
    for (const listener of viewListeners) listener()
  }

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    const filtered = publications.filter((item) => {
      if (domain !== 'all' && item.domainCode !== domain) return false
      if (kind !== 'all' && item.kind !== kind) return false
      if (!keyword) return true

      return [
        item.title,
        item.major,
        item.domainLabel,
        item.author.name,
        `${item.advisor.title} ${item.advisor.name}`,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'views') return b.views - a.views
      if (sort === 'downloads') return b.downloads - a.downloads
      return b.year - a.year
    })
  }, [query, domain, kind, sort])

  const resetFilters = () => {
    setQuery('')
    setDomain('all')
    setKind('all')
    setHonor(null)
    setAdvisor('all')
    setYear('all')
    setSort('newest')
  }

  return (
    <Container className="space-y-6">
      <PageHero
        icon={Sparkles}
        kicker="Semantic Search & Scholarly Discovery"
        title={
          <>
            Khám Phá &amp; Tra Cứu Tri Thức{' '}
            <span className="text-brand">Khoa Toán - Cơ - Tin Học</span>
          </>
        }
      >
        <SearchInput
          ariaLabel="Tìm theo tên đề tài, tác giả, giảng viên hướng dẫn, từ khóa, DOI"
          placeholder="Tìm theo tên đề tài, tác giả, giảng viên hướng dẫn, từ khóa, DOI..."
          size="lg"
          value={query}
          onChange={setQuery}
          inputClassName="bg-page"
        />
      </PageHero>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Card className="self-start p-6">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-dark">
              <Filter size={18} className="text-brand" aria-hidden />
              Bộ lọc phân loại
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-slate-600"
            >
              <RotateCcw size={14} aria-hidden />
              Đặt lại
            </Button>
          </div>

          {/* Các trường mới trong ảnh mẫu — chỉ dựng giao diện, chưa lọc theo dữ liệu thật. */}
          <div className="mt-5 space-y-6">
            <Select
              ariaLabel="Trụ cột nghiên cứu"
              label="Trụ cột nghiên cứu (Domain)"
              size="lg"
              value={domain}
              onChange={setDomain}
              options={domainFilterOptions}
            />
            <Select
              ariaLabel="Loại hình công trình"
              label="Loại hình công trình"
              size="lg"
              value={kind}
              onChange={setKind}
              options={kindFilterOptions}
            />

            <fieldset>
              <legend className="mb-1.5 text-xs font-bold tracking-wide text-slate-600 uppercase">
                Chỉ số xếp hạng &amp; vinh danh
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {honorFilterOptions.slice(0, 2).map((option) => {
                  const isActive = honor === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        setHonor((current) =>
                          current === option.value ? null : option.value,
                        )
                      }
                      className={cn(
                        'h-10 rounded-lg border px-3 text-sm transition-colors',
                        isActive
                          ? 'border-red-300 bg-red-50 font-bold text-red-800'
                          : 'border-slate-200 bg-slate-50 font-medium text-slate-600 hover:border-slate-300 hover:text-slate-800',
                      )}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              {honorFilterOptions.slice(2).map((option) => {
                const isActive = honor === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setHonor((current) =>
                        current === option.value ? null : option.value,
                      )
                    }
                    className={cn(
                      'mt-2 h-10 w-full rounded-lg border px-3 text-sm transition-colors',
                      isActive
                        ? 'border-red-300 bg-red-50 font-bold text-red-800'
                        : 'border-slate-200 bg-slate-50 font-medium text-slate-600 hover:border-slate-300 hover:text-slate-800',
                    )}
                  >
                    {option.label}
                  </button>
                )
              })}
            </fieldset>

            <Select
              ariaLabel="Giảng viên hướng dẫn"
              label="Giảng viên hướng dẫn"
              size="lg"
              value={advisor}
              onChange={setAdvisor}
              options={advisorFilterOptions}
            />
            <Select
              ariaLabel="Năm học, năm công bố"
              label="Năm học / Năm công bố"
              size="lg"
              value={year}
              onChange={setYear}
              options={yearFilterOptions}
            />
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="flex flex-col gap-3 p-4 xl:flex-row xl:items-center xl:justify-between">
            <p className="text-sm whitespace-nowrap text-slate-600">
              Tìm thấy{' '}
              <span className="font-bold text-brand-dark">
                {results.length}
              </span>{' '}
              công trình học thuật
            </p>

            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3">
              <span className="text-sm whitespace-nowrap text-slate-500">
                Sắp xếp theo:
              </span>
              <Select
                ariaLabel="Sắp xếp kết quả"
                size="md"
                value={sort}
                onChange={setSort}
                options={sortOptions}
                className="w-auto shrink-0"
                selectClassName="w-36 font-semibold text-brand-dark"
              />
              <PublicationViewToggle
                value={view}
                onChange={handleViewChange}
                className="shrink-0"
              />
            </div>
          </Card>

          <PublicationResults items={results} view={view} />
        </div>
      </div>
    </Container>
  )
}
