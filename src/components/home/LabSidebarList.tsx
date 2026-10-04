import { labs } from '@/data/labs'
import { Link } from '@/components/ui/Link'

/** 3 Lab mới nhất trong khối "PHÒNG THÍ NGHIỆM & NHÓM NC" ở sidebar Trang chủ. */
export function LabSidebarList() {
  return (
    <div className="mt-5 space-y-3">
      {labs.slice(0, 3).map((lab) => (
        <Link
          key={lab.id}
          to={`/lab/${lab.id}`}
          className="block rounded-lg border border-slate-200 p-4 transition-colors hover:bg-hover"
        >
          <span className="flex items-start justify-between gap-3">
            <span className="text-base font-bold text-brand-dark">
              {lab.tag}
            </span>
            {typeof lab.memberCount === 'number' ? (
              <span className="text-sm whitespace-nowrap text-slate-500">
                {lab.memberCount} thành viên
              </span>
            ) : null}
          </span>

          <span className="mt-1 block text-sm text-slate-600">{lab.name}</span>

          {lab.lead ? (
            <span className="mt-1 block text-sm text-slate-500">
              Trưởng Lab:{' '}
              <span className="font-semibold text-brand-dark">
                {lab.lead.title} {lab.lead.name}
              </span>
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  )
}
