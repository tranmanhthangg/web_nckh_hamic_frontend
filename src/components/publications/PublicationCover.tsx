import { FileText } from 'lucide-react'
import { cn } from '@/lib/cn'
import { publicationKindLabels } from '@/data/publications'
import { Badge } from '@/components/ui/Badge'
import type { Publication, PublicationKind } from '@/types'

/**
 * Nền bìa theo loại công trình — thay cho ảnh bìa/ảnh minh hoạ của bản mẫu
 * (không có sẵn tệp ảnh trong nguồn).
 */
const coverStyles: Record<PublicationKind, string> = {
  project: 'from-amber-600 via-orange-800 to-slate-900',
  international: 'from-slate-700 via-brand-dark to-slate-900',
  master: 'from-slate-500 via-brand to-slate-900',
  bachelor: 'from-emerald-800 via-slate-800 to-slate-900',
}

interface PublicationCoverProps {
  publication: Publication
  className?: string
}

export function PublicationCover({
  publication,
  className,
}: PublicationCoverProps) {
  return (
    <div
      className={cn(
        'relative aspect-[13/5] w-full bg-linear-to-br',
        coverStyles[publication.kind],
        className,
      )}
    >
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

      <span className="absolute top-3 left-4 text-[11px] font-bold tracking-wide text-white/95 uppercase">
        MIM-HUS • ĐHQGHN
      </span>
      <Badge
        tone="brand"
        className="absolute top-3 right-4 border-transparent bg-brand text-white"
      >
        <FileText size={12} aria-hidden />
        PDF
      </Badge>

      <div className="absolute inset-x-4 bottom-3">
        <p className="text-[11px] font-bold tracking-wide text-amber-200 uppercase">
          {publicationKindLabels[publication.kind]}
          {' • '}
          {publication.year}
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-bold text-white">
          {publication.title}
        </p>
      </div>
    </div>
  )
}
