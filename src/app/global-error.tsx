'use client'

/**
 * Lỗi cấp ứng dụng — thay thế TOÀN BỘ root layout khi layout itself lỗi,
 * nên phải tự render <html>/<body> (Tailwind CSS vẫn được nạp từ build).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="vi">
      <body className="bg-page text-ink">
        <main className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-page text-red-500">
              <span className="text-2xl font-extrabold" aria-hidden>
                !
              </span>
            </span>

            <h1 className="mt-4 text-2xl font-bold text-brand-dark">
              Ứng dụng gặp lỗi nghiêm trọng
            </h1>

            <p className="mt-3 text-base text-slate-600">
              Vui lòng thử lại. Nếu lỗi tiếp tục xảy ra, hãy liên hệ quản trị
              viên.
            </p>

            {error.digest ? (
              <p className="mt-4 font-mono text-xs text-slate-400">
                Mã lỗi: {error.digest}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => {
                reset()
              }}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Thử lại
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
