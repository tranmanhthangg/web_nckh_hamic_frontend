import { SearchX } from 'lucide-react'
import { cn } from '@/lib/cn'

interface EmptyNoticeProps {
  title?: string
  description?: string
  className?: string
}

/** Khối thông báo khi bộ lọc không trả về kết quả nào. */
export function EmptyNotice({
  title = 'Không tìm thấy kết quả phù hợp',
  description = 'Thử đổi từ khóa hoặc bộ lọc khác.',
  className,
}: EmptyNoticeProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center',
        className,
      )}
    >
      <SearchX size={28} className="text-slate-400" aria-hidden />
      <p className="font-semibold text-slate-700">{title}</p>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  )
}
