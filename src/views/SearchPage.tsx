import { useMemo, useState } from 'react'
import { Filter, RotateCcw, Sparkles } from 'lucide-react'
import { domains } from '@/data/domains'
import {
  publicationKindLabels,
  publications,
} from '@/data/publications'
import { useRoute } from '@/router/useRoute'
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

// [suy luận] bản mẫu chỉ hiển thị giá trị "Mới nhất" trong ô sắp xếp.
const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'views', label: 'Xem nhiều nhất' },
  { value: 'downloads', label: 'Tải nhiều nhất' },
]

export function SearchPage() {
  const route = useRoute()
  const [query, setQuery] = useState(route.query.q ?? '')
  const [domain, setDomain] = useState(route.query.domain ?? 'all')
  const [kind, setKind] = useState(route.query.kind ?? 'all')
  const [sort, setSort] = useState('newest')
  const [view, setView] = useState<PublicationView>('grid')

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

          {/* Bản mẫu chỉ chụp được 2 bộ lọc đầu của khối này. */}
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
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
            <p className="text-base text-slate-600">
              Tìm thấy{' '}
              <span className="font-bold text-brand-dark">
                {results.length}
              </span>{' '}
              công trình học thuật
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-500">Sắp xếp theo:</span>
              <Select
                ariaLabel="Sắp xếp kết quả"
                size="lg"
                value={sort}
                onChange={setSort}
                options={sortOptions}
                className="w-56"
              />
              <PublicationViewToggle value={view} onChange={setView} />
            </div>
          </Card>

          <PublicationResults items={results} view={view} />
        </div>
      </div>
    </Container>
  )
}
