import type { NextConfig } from 'next'

/**
 * Cấu hình Next.js — tối giản trong giai đoạn migration.
 * Không thêm backend/API/database ở giai đoạn này.
 */
const nextConfig: NextConfig = {
  // Ghim thư mục gốc cho Turbopack để không lẫn với lockfile ngoài dự án.
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig

