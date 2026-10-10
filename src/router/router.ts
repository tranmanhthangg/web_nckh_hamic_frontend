/**
 * Ghép đường dẫn kèm query, dùng cho các link tìm kiếm/bộ lọc.
 * (Bộ hash router cũ đã bị thay thế bằng App Router của Next.js —
 * `navigate`/`useRoute` sống ở next/navigation và components tương ứng.)
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

