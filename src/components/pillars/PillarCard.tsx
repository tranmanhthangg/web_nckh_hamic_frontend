import {
  ArrowRight,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
} from 'lucide-react'
import { buildPath } from '@/router/router'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Link } from '@/components/ui/Link'
import type { Domain } from '@/types'

interface PillarCardProps {
  domain: Domain
  /** Số thứ tự hiển thị, dạng "01". */
  order: string
}

export function PillarCard({ domain, order }: PillarCardProps) {
  const stats = [
    { icon: FileText, value: domain.documents, label: 'công trình' },
    { icon: GraduationCap, value: domain.lecturers, label: 'giảng viên' },
    { icon: Users, value: domain.labs, label: 'phòng lab' },
  ]

  return (
    <Card className="p-6 lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-sm font-bold text-brand">
            {order}
          </span>
          <div>
            <h2 className="text-xl font-bold text-brand-dark">
              {domain.fullName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Mã định danh:{' '}
              <span className="font-mono tracking-wide uppercase">
                {domain.code}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <span key={stat.label} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden className="text-slate-300">
                    •
                  </span>
                ) : null}
                <span className="flex items-center gap-1.5">
                  <Icon size={16} className="text-brand" aria-hidden />
                  <span className="font-bold text-slate-700">
                    {stat.value}
                  </span>
                  {stat.label}
                </span>
              </span>
            )
          })}
        </div>
      </div>

      <div className="mt-5 space-y-5 border-t border-slate-200 pt-5">
        <p className="text-base text-slate-600">{domain.description}</p>

        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-page p-4">
          <span className="flex items-center gap-2 text-sm text-slate-600">
            <TrendingUp size={16} className="text-brand" aria-hidden />
            Chủ đề nghiên cứu nóng:
          </span>
          {domain.hotTopics.map((topic) => (
            <Chip key={topic} tone="brand" className="font-semibold">
              {topic}
            </Chip>
          ))}
        </div>

        <div>
          <p className="text-xs font-bold tracking-wide text-slate-600 uppercase">
            Hướng chuyên sâu đào tạo &amp; nghiên cứu:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {domain.trainingPaths.map((path) => (
              <Chip
                key={path}
                tone="outline"
                suffix={
                  <ArrowRight size={14} className="text-slate-400" aria-hidden />
                }
              >
                {path}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to={buildPath('/tim-kiem', { domain: domain.code })}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark hover:underline"
          >
            Khám phá toàn bộ công trình ngành {domain.code}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </Card>
  )
}
