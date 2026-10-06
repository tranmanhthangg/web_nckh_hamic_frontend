/**
 * Router tối giản dựa trên hash (#/duong-dan) — không cần thư viện ngoài.
 * Hỗ trợ deep-link, nút Back/Forward của trình duyệt và query string đơn giản.
 */

export interface RouterState {
  /** Đường dẫn đã chuẩn hoá, ví dụ "/giang-vien". */
  path: string
  /** Các đoạn đường dẫn, ví dụ ["giang-vien"]. */
  segments: string[]
  /** Query string đã giải mã. */
  query: Record<string, string>
  /** Hash thô, dùng làm khoá để cuộn lên đầu trang. */
  raw: string
}

function parseHash(rawHash: string): RouterState {
  const withoutHash = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash
  const [pathPart = '', queryPart = ''] = withoutHash.split('?')
  const normalized = `/${pathPart.replace(/^\/+|\/+$/g, '')}`
  const path = normalized === '/' ? '/' : normalized

  const query: Record<string, string> = {}
  if (queryPart) {
    // URLSearchParams encode space thành '+', nên decode '+' về space trước.
    const decode = (raw: string) =>
      decodeURIComponent(raw.replace(/\+/g, ' '))
    for (const pair of queryPart.split('&')) {
      if (!pair) continue
      const [key, value = ''] = pair.split('=')
      if (!key) continue
      query[decode(key)] = decode(value)
    }
  }

  return {
    path,
    segments: path.split('/').filter(Boolean),
    query,
    raw: rawHash,
  }
}

const listeners = new Set<() => void>()
let current: RouterState = parseHash(
  typeof window === 'undefined' ? '' : window.location.hash,
)

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    current = parseHash(window.location.hash)
    for (const listener of listeners) listener()
  })
}

export function subscribeRouter(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getRouterSnapshot(): RouterState {
  return current
}

/** Điều hướng nội bộ; không làm gì nếu đang đứng đúng đường dẫn. */
export function navigate(to: string): void {
  const target = to.startsWith('/') ? to : `/${to}`
  if (window.location.hash === `#${target}`) return
  window.location.hash = target
}

/** Ghép đường dẫn kèm query, dùng cho các link tìm kiếm/bộ lọc. */
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
