import { Check } from 'lucide-react'
import { mentors } from '@/data/mentors'
import { Badge } from '@/components/ui/Badge'
import { Link } from '@/components/ui/Link'

/** Khối "MENTOR DISCOVERY" ở sidebar Trang chủ (4 mentor rút gọn). */
export function MentorSidebarList() {
  return (
    <ul className="mt-5 space-y-5">
      {mentors.map((mentor) => (
        <li key={mentor.id}>
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/giang-vien/${mentor.id}`}
              className="text-base leading-snug font-bold text-brand-dark hover:underline"
            >
              {mentor.title} {mentor.name}
            </Link>
            {mentor.acceptingStudents ? (
              <Badge tone="emerald" className="rounded-md">
                <Check size={12} aria-hidden />
                Nhận SV
              </Badge>
            ) : null}
          </div>

          <p className="mt-1 text-sm text-slate-600">{mentor.discipline}</p>

          <p className="mt-1 text-sm text-slate-500">
            Hướng NC: {mentor.researchDirection}
          </p>

          <p className="mt-1 text-sm text-slate-500">
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
          </p>
        </li>
      ))}
    </ul>
  )
}
