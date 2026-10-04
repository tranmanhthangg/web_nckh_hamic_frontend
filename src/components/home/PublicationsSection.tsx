import { useState } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import { publicationsSection } from '@/data/home'
import {
  filterPublications,
  libraryTotal,
  publicationFilters,
  publications,
} from '@/data/publications'
import type { PublicationFilterId } from '@/data/publications'
import { PublicationResults } from '@/components/publications/PublicationResults'
import { PublicationViewToggle } from '@/components/publications/PublicationViewToggle'
import type { PublicationView } from '@/components/publications/PublicationViewToggle'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Link } from '@/components/ui/Link'
import { SectionHeader } from '@/components/ui/SectionHeader'

/** Chỉ tab "Tất cả" hiển thị số lượng — đúng như bản mẫu. */
const filterTabs = publicationFilters.map((filter) => ({
  value: filter.id,
  label: filter.label,
  count: filter.id === 'all' ? publications.length : undefined,
}))

export function PublicationsSection() {
  const [filter, setFilter] = useState<PublicationFilterId>('all')
  const [view, setView] = useState<PublicationView>('grid')
  const items = filterPublications(filter)

  return (
    <section className="lg:col-span-2">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <SectionHeader
          icon={FileText}
          title={publicationsSection.title}
          variant="section"
        />
        <PublicationViewToggle value={view} onChange={setView} />
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
        {publicationsSection.viewAllLabel} ({libraryTotal} công trình)
        <ArrowRight size={16} aria-hidden />
      </Link>
    </section>
  )
}
