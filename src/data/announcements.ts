import type { Announcement } from '@/types'

/**
 * Khối "THÔNG BÁO" ở sidebar Trang chủ.
 * Bản mẫu hiển thị 2 thông báo mới nhất và link "Xem".
 */
export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    kind: 'news',
    title: 'Thông báo nộp hồ sơ xét giải thưởng NCKH Sinh viên cấp Trường',
  },
  {
    id: 'ann-2',
    kind: 'defense',
    title:
      'Lịch bảo vệ Khóa luận tốt nghiệp và Luận văn Thạc sĩ đợt 1 năm học 2025-2026',
  },
]

/** Nhãn loại thông báo in ở góc phải — quan sát được nguyên văn. */
export const announcementKindLabels = {
  news: 'news',
  defense: 'defense',
} as const
