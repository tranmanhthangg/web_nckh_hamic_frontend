import type { NextConfig } from 'next'

/**
 * Cấu hình Next.js.
 * Không thêm backend/API/database ở thời điểm hiện tại.
 */
const nextConfig: NextConfig = {
  // Ghim thư mục gốc cho Turbopack để không lẫn với lockfile ngoài dự án.
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig

