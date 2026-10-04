import { useState } from 'react'
import {
  Bookmark,
  Download,
  ExternalLink,
  Eye,
  GraduationCap,
  Quote,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAuth } from '@/features/auth/auth-context'
import { buildPath, navigate } from '@/router/router'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { PublicationCover } from '@/components/publications/PublicationCover'
import type { Publication } from '@/types'

interface PublicationCardProps {
  publication: Publication
  className?: string
}

export function PublicationCard({
  publication,
  className,
}: PublicationCardProps) {
  const { hasPermission, openAuthModal } = useAuth()
  const [saved, setSaved] = useState(false)

  const canReadFulltext = hasPermission('fulltext:read')

  const openDetail = () => {
    if (!canReadFulltext) {
      openAuthModal('login')
      return
    }
    navigate(buildPath(`/cong-trinh/${publication.id}`))
  }

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-md',
        className,
      )}
    >
      <PublicationCover publication={publication} />

      <div className="flex flex-1 flex-col">
        <div className="flex-1 space-y-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <Badge tone="blue" className="rounded-md">
              {publication.domainLabel}
            </Badge>
            <span className="text-sm whitespace-nowrap text-slate-500">
              Năm{' '}
              <span className="font-semibold text-slate-700">
                {publication.year}
              </span>
            </span>
          </div>

          <h3 className="line-clamp-2 text-base leading-snug font-bold text-brand-dark">
            {publication.title}
          </h3>

          <p className="text-sm text-slate-500">
            Chuyên ngành:{' '}
            <span className="font-semibold text-slate-700">
              {publication.major}
            </span>
          </p>

          <div className="space-y-2.5 border-t border-slate-100 pt-3.5">
            <p className="flex items-center gap-2.5">
              <Avatar name={publication.author.name} size="xs" />
              <span className="text-sm font-semibold text-slate-800">
                {publication.author.name}
              </span>
              <span className="text-sm text-slate-400">
                ({publication.author.cohort})
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <GraduationCap
                size={16}
                className="shrink-0 text-slate-400"
                aria-hidden
              />
              GVHD:{' '}
              <span className="font-semibold text-slate-700">
                {publication.advisor.title} {publication.advisor.name}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-5 py-3">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5" title="Lượt xem">
              <Eye size={16} className="text-slate-400" aria-hidden />
              {publication.views}
            </span>
            <span className="inline-flex items-center gap-1.5" title="Lượt tải">
              <Download size={16} className="text-slate-400" aria-hidden />
              {publication.downloads}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span aria-hidden className="p-1.5 text-slate-400">
              <Quote size={18} />
            </span>
            <IconButton
              label={saved ? 'Bỏ lưu công trình' : 'Lưu công trình'}
              aria-pressed={saved}
              onClick={() => setSaved((value) => !value)}
              className="size-8"
            >
              <Bookmark
                size={18}
                className={saved ? 'fill-brand text-brand' : undefined}
                aria-hidden
              />
            </IconButton>
            <Button
              size="sm"
              className="h-8"
              onClick={openDetail}
              title={
                canReadFulltext
                  ? 'Mở toàn văn công trình'
                  : 'Cần đăng nhập để truy cập toàn văn'
              }
            >
              Xem PDF
              <ExternalLink size={14} aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
