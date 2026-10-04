import { ArrowLeft, Compass } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Link } from '@/components/ui/Link'
import type { IconComponent } from '@/types'

export interface PlaceholderFact {
  label: string
  value: string
}

interface PlaceholderPageProps {
  icon?: IconComponent
  title: string
  description?: string
  facts?: PlaceholderFact[]
  backTo: string
  backLabel: string
}

/**
 * Trang giữ chỗ cho các đường dẫn có thật trong bản mẫu nhưng không nằm trong
 * ảnh chụp màn hình (trang chi tiết, danh sách thông báo, bộ sưu tập...).
 */
export function PlaceholderPage({
  icon: Icon = Compass,
  title,
  description,
  facts,
  backTo,
  backLabel,
}: PlaceholderPageProps) {
  return (
    <Container>
      <Card className="px-6 py-12 text-center sm:px-8">
        <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-page text-brand">
          <Icon size={24} aria-hidden />
        </span>

        <h1 className="mt-4 text-2xl font-bold text-brand-dark">{title}</h1>

        {description ? (
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
            {description}
          </p>
        ) : null}

        {facts && facts.length > 0 ? (
          <dl className="mx-auto mt-6 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-slate-200 bg-page px-4 py-3"
              >
                <dt className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-700">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <p className="mx-auto mt-6 max-w-2xl rounded-lg border border-dashed border-slate-300 bg-page px-4 py-3 text-sm text-slate-500">
          Trang này không xuất hiện trong ảnh chụp màn hình của bản mẫu nên phần
          giao diện chi tiết chưa được tái tạo; dữ liệu hiển thị ở trên vẫn lấy
          từ chính bản mẫu.
        </p>

        <Link
          to={backTo}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark hover:underline"
        >
          <ArrowLeft size={16} aria-hidden />
          {backLabel}
        </Link>
      </Card>
    </Container>
  )
}
