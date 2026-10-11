/** Trang chờ khi navigate — hiển thị giữa khung trang cũ, khớp design system. */
export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-label="Đang tải trang"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface">
        <span className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </span>
      <span className="sr-only">Đang tải trang...</span>
    </div>
  )
}
