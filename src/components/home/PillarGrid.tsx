import { ArrowRight, Layers } from 'lucide-react'
import { domains } from '@/data/domains'
import { Badge } from '@/components/ui/Badge'
import { Link } from '@/components/ui/Link'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function PillarGrid() {
  return (
    <section>
      <SectionHeader
        icon={Layers}
        title="5 Trụ cột Nghiên cứu"
        variant="panel"
        className="mb-5"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {domains.map((domain) => (
          <Link
            key={domain.code}
            to="/tru-cot"
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <span className="flex items-center justify-between gap-2">
              <Badge tone="slate" mono>
                {domain.code}
              </Badge>
              <ArrowRight
                size={18}
                className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                aria-hidden
              />
            </span>

            <span className="mt-4 min-h-10 text-left text-sm font-bold leading-snug text-brand-dark">
              {domain.name}
            </span>

            <span className="mt-auto pt-3 text-sm text-slate-500">
              <span className="font-semibold text-slate-700">
                {domain.homeDocuments}
              </span>{' '}
              bài
              <span aria-hidden className="mx-2 text-slate-300">
                •
              </span>
              <span className="font-semibold text-slate-700">
                {domain.homeLecturers}
              </span>{' '}
              GV
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
