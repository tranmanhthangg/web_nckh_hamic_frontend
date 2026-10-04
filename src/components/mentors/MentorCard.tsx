import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Link } from '@/components/ui/Link'
import type { Mentor } from '@/types'

interface MentorCardProps {
  mentor: Mentor
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-start gap-4">
        <Avatar name={mentor.name} size="lg" />

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold tracking-wide text-brand uppercase">
            {mentor.title}
          </p>
          <h2 className="text-lg leading-snug font-bold text-brand-dark">
            {mentor.title} {mentor.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{mentor.discipline}</p>
          {mentor.email ? (
            <a
              href={`mailto:${mentor.email}`}
              className="mt-1 block font-mono text-[13px] text-brand hover:underline"
            >
              {mentor.email}
            </a>
          ) : null}
        </div>

        {mentor.acceptingStudents ? (
          <Badge tone="emerald" className="rounded-full">
            <Check size={12} aria-hidden />
            Đang nhận hướng dẫn
          </Badge>
        ) : null}
      </div>

      <div className="mt-5 flex-1 border-t border-slate-200 pt-5">
        {mentor.bio ? (
          <p className="text-base text-slate-600">{mentor.bio}</p>
        ) : (
          <p className="text-base text-slate-600">
            Hướng nghiên cứu: {mentor.researchDirection}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
        <p className="text-sm text-slate-500">
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

        <Link
          to={`/giang-vien/${mentor.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark hover:underline"
        >
          Xem chi tiết Mentor
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </Card>
  )
}
