import { ArrowRight, GraduationCap, Sparkles, Users } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Link } from '@/components/ui/Link'
import type { Lab } from '@/types'

interface LabCardProps {
  lab: Lab
}

export function LabCard({ lab }: LabCardProps) {
  return (
    <Card className="flex flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <Badge tone="amber" mono className="rounded-md">
          {lab.tag}
        </Badge>
        <p className="text-sm text-slate-500">{lab.domainLabel}</p>
      </div>

      <h2 className="mt-4 text-xl leading-snug font-bold text-brand-dark">
        {lab.name}
      </h2>

      <p className="mt-3 text-base text-slate-600">{lab.description}</p>

      {lab.keyProjects && lab.keyProjects.length > 0 ? (
        <div className="mt-5 rounded-lg border border-slate-200 bg-page p-4">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-slate-700 uppercase">
            <Sparkles size={16} className="text-brand" aria-hidden />
            Đề tài trọng điểm:
          </p>
          <ul className="mt-3 space-y-1.5">
            {lab.keyProjects.map((project) => (
              <li
                key={project}
                className="flex gap-2 text-sm text-slate-700"
              >
                <span aria-hidden className="text-slate-400">
                  •
                </span>
                {project}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400 italic">
          Danh sách đề tài trọng điểm chưa có trong dữ liệu quan sát.
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          {lab.lead ? (
            <span className="flex items-center gap-2">
              <GraduationCap
                size={16}
                className="text-emerald-600"
                aria-hidden
              />
              <span className="font-medium">
                {lab.lead.title} {lab.lead.name}
              </span>
            </span>
          ) : null}
          {typeof lab.memberCount === 'number' ? (
            <span className="flex items-center gap-2">
              <Users size={16} className="text-blue-600" aria-hidden />
              <span className="font-medium">{lab.memberCount}+ TV</span>
            </span>
          ) : null}
        </div>

        <Link
          to={`/lab/${lab.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark hover:underline"
        >
          Khám phá Lab
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </Card>
  )
}
