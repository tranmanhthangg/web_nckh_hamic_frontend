import { Check } from 'lucide-react'
import { mentors } from '@/data/mentors'
import { Badge } from '@/components/ui/Badge'
import { Link } from '@/components/ui/Link'

/** Mỗi mentor là một hộp riêng — nhấn vào hộp dẫn tới trang chi tiết mentor. */
export function MentorSidebarList() {
  return (
    <ul className="mt-5 space-y-3">
      {mentors.map((mentor) => (
        <li key={mentor.id}>
          <Link
            to={`/giang-vien/${mentor.id}`}
            className="block rounded-lg border border-slate-200 p-4 transition-colors hover:border-brand/30 hover:bg-hover"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="text-base leading-snug font-bold text-brand-dark">
                {mentor.title} {mentor.name}
              </span>
              {mentor.acceptingStudents ? (
                <Badge tone="emerald" className="shrink-0 rounded-md">
                  <Check size={12} aria-hidden />
                  Nhận SV
                </Badge>
              ) : null}
            </span>

            <span className="mt-1 block text-sm text-slate-600">
              {mentor.discipline}
            </span>

            <span className="mt-1 block text-sm text-slate-500">
              Hướng NC: {mentor.researchDirection}
            </span>

            <span className="mt-1 block text-sm text-slate-500">
              <span className="font-semibold text-slate-700">
                {mentor.thesisCount}
              </span>{' '}
              khóa luận
              <span aria-hidden className="mx-2 text-slate-300">
                •
              </span>
              <span className="font-semibold text-slate-700">
                {mentor.articleCount}
              </span>{' '}
              bài báo
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
