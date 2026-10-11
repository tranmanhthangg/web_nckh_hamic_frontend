/**
 * URL gốc của site — dùng cho metadataBase, sitemap, robots.
 * Cấu hình NEXT_PUBLIC_SITE_URL khi deploy; mặc định localhost cho môi trường
 * phát triển.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/+$/, '')
