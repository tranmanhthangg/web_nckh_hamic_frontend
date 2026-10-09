import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.next']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      // eslint-plugin-react-refresh (Vite) đã gỡ khi chuyển sang Next.js:
      // layout/page xuất metadata... là hợp lệ trong App Router.
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])

