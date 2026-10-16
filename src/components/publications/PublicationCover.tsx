import { FileText } from 'lucide-react'
import { cn } from '@/lib/cn'
import { publicationKindLabels } from '@/data/publications'
import { Badge } from '@/components/ui/Badge'
import { PublicationHonorTag } from '@/components/publications/PublicationHonorTag'
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
  /** Ẩn năm ở dòng meta dưới bìa — chỉ giữ tên thể loại đề tài. */
  hideYear?: boolean
  /** Ép badge PDF xuống hàng riêng (dùng cho bìa hẹp của dạng danh sách). */
  stackPdf?: boolean
}

export function PublicationCover({
  publication,
  className,
  hideYear = false,
  stackPdf = false,
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

      {/*
        Hai nhãn trong một hàng flex + justify-between: bìa rộng (dạng ô) badge
        nằm gọn góc phải, bìa hẹp (dạng danh sách, w-48) badge tự xuống dòng
        và căn lề trái.
      */}
      {/*
        Hàng badge trên bìa:
        - Dạng ô: honor + PDF nằm cùng hàng (justify-between).
        - Dạng danh sách (stackPdf): khối honor chiếm trọn hàng 1, badge PDF
          luôn xuống hàng 2 (canh phải) — kể cả khi honor ngắn.
      */}
      <div className="absolute top-3 right-4 left-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <span className={stackPdf ? 'w-full' : undefined}>
          {publication.honor ? (
            <PublicationHonorTag honor={publication.honor} />
          ) : (
            <span aria-hidden />
          )}
        </span>
        <Badge
          tone="brand"
          className="border-transparent bg-brand text-white"
        >
          <FileText size={12} aria-hidden />
          PDF
        </Badge>
      </div>

      <div className="absolute inset-x-4 bottom-3">
        <p className="text-[11px] font-bold tracking-wide text-amber-200 uppercase">
          {publicationKindLabels[publication.kind]}
          {hideYear ? null : (
            <>
              {' • '}
              {publication.year}
            </>
          )}
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-bold text-white">
          {publication.title}
        </p>
      </div>
    </div>
  )
}
