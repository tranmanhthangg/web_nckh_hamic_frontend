import { cn } from '@/lib/cn'
import { publicationHonorLabels } from '@/data/publications'
import type { PublicationHonor } from '@/types'

/**
 * Nền tối + chữ sáng để nhãn nổi trên ảnh bìa gradient (nền tối).
 * Cả 3 loại dùng chung một kiểu — làm nổi bật chỉ số xếp hạng & vinh danh.
 */
const honorStyles: Record<PublicationHonor, string> = {
  isi: 'border-amber-400/30 bg-slate-900/75 text-amber-200',
  scopus: 'border-amber-400/30 bg-slate-900/75 text-amber-200',
  'thesis-award': 'border-amber-400/30 bg-slate-900/75 text-amber-200',
}

/**
 * Nhãn chỉ số xếp hạng & vinh danh — nền tối bán trong suốt + chữ amber sáng
 * để làm nổi trên ảnh bìa gradient (nền tối), hiện ở góc trên bên trái bìa.
 */
export function PublicationHonorTag({
  honor,
  className,
}: {
  honor: PublicationHonor
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs leading-5 font-semibold whitespace-nowrap',
        honorStyles[honor],
        className,
      )}
    >
      {publicationHonorLabels[honor]}
    </span>
  )
}
