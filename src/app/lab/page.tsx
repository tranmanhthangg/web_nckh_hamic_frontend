import type { Metadata } from 'next'
import { LabsPage } from '@/views/LabsPage'

export const metadata: Metadata = {
  title: 'Phòng thí nghiệm & Nhóm nghiên cứu',
}

/** Danh sách Lab (Client Component — có tìm kiếm state). */
export default function LabsRoutePage() {
  return <LabsPage />
}
