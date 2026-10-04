import { cn } from '@/lib/cn'
import { EmptyNotice } from '@/components/ui/EmptyNotice'
import { PublicationCard } from '@/components/publications/PublicationCard'
import { PublicationListItem } from '@/components/publications/PublicationListItem'
import type { PublicationView } from '@/components/publications/PublicationViewToggle'
import type { Publication } from '@/types'

interface PublicationResultsProps {
  items: Publication[]
  view: PublicationView
  /** Số cột ở chế độ "Dạng ô" trên màn hình lớn. */
  columns?: 2 | 3
  className?: string
}

export function PublicationResults({
  items,
  view,
  columns = 2,
  className,
}: PublicationResultsProps) {
  if (items.length === 0) {
    return (
      <EmptyNotice
        title="Không tìm thấy công trình phù hợp"
        description="Thử đổi từ khóa, trụ cột nghiên cứu hoặc loại hình công trình."
        className={className}
      />
    )
  }

  if (view === 'list') {
    return (
      <div className={cn('space-y-4', className)}>
        {items.map((item) => (
          <PublicationListItem key={item.id} publication={item} />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid gap-5',
        columns === 3 ? 'sm:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2',
        className,
      )}
    >
      {items.map((item) => (
        <PublicationCard key={item.id} publication={item} />
      ))}
    </div>
  )
}
