import type { Metadata } from 'next'
import { MentorsPage } from '@/views/MentorsPage'

export const metadata: Metadata = { title: 'Giảng viên & Mentors' }

/** Danh sách Giảng viên & Mentors (Client Component — có bộ lọc state). */
export default function MentorsRoutePage() {
  return <MentorsPage />
}
