import { portalBar } from '@/data/site'
import { Container } from '@/components/ui/Container'

/** Dải breadcrumb cấp ĐHQGHN/Trường/Khoa nằm ngay dưới thanh gỡ lỗi RBAC. */
export function PortalBar() {
  return (
    <div className="bg-brand-dark text-white">
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5 text-xs">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-bold tracking-wide text-amber-400">
            {portalBar.organisation}
          </span>
          {portalBar.breadcrumb.map((crumb, index) => {
            const isLast = index === portalBar.breadcrumb.length - 1

            return (
              <span key={crumb} className="flex items-center gap-2">
                <span aria-hidden className="text-white/40">
                  •
                </span>
                <span className={isLast ? 'font-bold text-white' : 'font-medium text-white/80'}>
                  {crumb}
                </span>
              </span>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/80">
          <span className="font-medium">{portalBar.portal}</span>
          <span aria-hidden className="text-white/40">
            •
          </span>
          <span>{portalBar.address}</span>
        </div>
      </Container>
    </div>
  )
}
