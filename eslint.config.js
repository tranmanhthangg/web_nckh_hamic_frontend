import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

// Cấu hình ESLint theo chuẩn Next.js 16 (flat config).
export default defineConfig([
  globalIgnores(['dist', '.next']),
  ...nextVitals,
  ...nextTs,
])



