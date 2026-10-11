'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'

/**
 * Lỗi cấp route — chạy trong root layout nên vẫn giữ nguyên header/footer.
 * `reset()` thử render lại segment bị lỗi.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container>
      <Card className="px-6 py-12 text-center sm:px-8">
        <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-page text-red-500">
          <span className="text-2xl font-extrabold" aria-hidden>
            !
          </span>
        </span>

        <h1 className="mt-4 text-2xl font-bold text-brand-dark">
          Đã xảy ra lỗi khi hiển thị trang
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
          Vui lòng thử lại. Nếu lỗi tiếp tục xảy ra, hãy quay lại trang chủ.
        </p>

        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-slate-400">
            Mã lỗi: {error.digest}
          </p>
        ) : null}

        <Button
          size="lg"
          className="mt-6 rounded-md"
          onClick={() => {
            reset()
          }}
        >
          Thử lại
        </Button>
      </Card>
    </Container>
  )
}
