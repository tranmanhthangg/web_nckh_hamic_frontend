import type { Metadata } from 'next'
import { PillarsPage } from '@/views/PillarsPage'

export const metadata: Metadata = { title: '5 Trụ cột Nghiên cứu' }

/** 5 Trụ cột Nghiên cứu — Server Component thuần render. */
export default function PillarsRoutePage() {
  return <PillarsPage />
}
