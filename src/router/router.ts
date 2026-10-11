/**
 * Ghép đường dẫn kèm query, dùng cho các link tìm kiếm/bộ lọc.
 * (Bộ hash router cũ đã bị thay thế hoàn toàn bằng App Router — điều hướng
 * do `next/navigation` đảm nhiệm; file này chỉ còn `buildPath`.)
 */
export function buildPath(
  path: string,
  query: Record<string, string | undefined> = {},
): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value) search.set(key, value)
  }
  const suffix = search.toString()
  return suffix ? `${path}?${suffix}` : path
}

