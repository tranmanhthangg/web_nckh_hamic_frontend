import type { Metadata } from 'next'
import { AnnouncementsPage } from '@/views/DetailPages'

export const metadata: Metadata = { title: 'Lịch bảo vệ & Thông báo' }

/** Lịch bảo vệ & Thông báo — Server Component thuần render. */
export default function AnnouncementsRoutePage() {
  return <AnnouncementsPage />
}
