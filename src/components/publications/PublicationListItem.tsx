import {
  Download,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { publicationKindLabels } from '@/data/publications'
import { useAuth } from '@/features/auth/auth-context'
import { buildPath, navigate } from '@/router/router'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PublicationCover } from '@/components/publications/PublicationCover'
import type { Publication } from '@/types'

interface PublicationListItemProps {
  publication: Publication
  className?: string
}

/**
 * Chế độ "Danh sách" của khối công trình. Bản mẫu chưa chụp tới chế độ này nên
 * bố cục dưới đây là [suy luận]: giữ nguyên toàn bộ trường dữ liệu của thẻ "Dạng ô"
 * nhưng xếp theo hàng ngang.
 */
export function PublicationListItem({
  publication,
  className,
}: PublicationListItemProps) {
  const { hasPermission, openAuthModal } = useAuth()

  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md sm:flex-row',
        className,
      )}
    >
      <PublicationCover
        publication={publication}
        className="sm:aspect-[4/3] sm:h-auto sm:w-48 sm:shrink-0"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge tone="blue" className="rounded-md">
            {publication.domainLabel}
          </Badge>
          <span className="text-sm text-slate-500">
            {publicationKindLabels[publication.kind]} • Năm{' '}
            <span className="font-semibold text-slate-700">
              {publication.year}
            </span>
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-base font-bold text-brand-dark">
          {publication.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Chuyên ngành:{' '}
          <span className="font-semibold text-slate-700">
            {publication.major}
          </span>
        </p>

        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <Avatar name={publication.author.name} size="xs" />
            <span className="font-semibold text-slate-800">
              {publication.author.name}
            </span>
            <span className="text-slate-400">
              ({publication.author.cohort})
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap
              size={16}
              className="text-slate-400"
              aria-hidden
            />
            GVHD:{' '}
            <span className="font-semibold text-slate-700">
              {publication.advisor.title} {publication.advisor.name}
            </span>
          </span>
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Eye size={16} className="text-slate-400" aria-hidden />
              {publication.views}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Download size={16} className="text-slate-400" aria-hidden />
              {publication.downloads}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText size={16} className="text-slate-400" aria-hidden />
              PDF
            </span>
          </div>

          <Button
            size="sm"
            className="h-8"
            onClick={() => {
              if (!hasPermission('fulltext:read')) {
                openAuthModal('login')
                return
              }
              navigate(buildPath(`/cong-trinh/${publication.id}`))
            }}
          >
            Xem PDF
            <ExternalLink size={14} aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  )
}
