import type { Publication, PublicationKind } from '@/types'

/** Nhãn loại công trình in trên ảnh bìa — quan sát được nguyên văn. */
export const publicationKindLabels: Record<PublicationKind, string> = {
  project: 'ĐỀ TÀI NCKH SINH VIÊN',
  international: 'BÀI BÁO QUỐC TẾ (ISI/SCOPUS)',
  master: 'LUẬN VĂN THẠC SĨ',
  bachelor: 'KHÓA LUẬN CỬ NHÂN',
}

/**
 * 6 công trình hiển thị ở Trang chủ (tab "Tất cả (6)").
 * Toàn bộ tiêu đề, tác giả, GVHD, lượt xem và lượt tải đều đọc trực tiếp từ
 * ảnh chụp màn hình; tiêu đề dài bị bản mẫu cắt bằng dấu "…" nên bản tái tạo
 * giữ đúng phần nhìn thấy được rồi để CSS cắt 2 dòng.
 */
export const publications: Publication[] = [
  {
    id: 'pub-transformer-vi',
    kind: 'project',
    year: 2026,
    title:
      'Nghiên cứu mô hình Transformer nâng cao cho bài toán phân tích ngữ nghĩa và trích xuất thực thể tiếng Việt',
    domainCode: 'CS',
    domainLabel: 'Khoa học Máy tính & Tin học',
    major: 'Xử lý Ngôn ngữ Tự nhiên (NLP)',
    author: { name: 'Nguyễn Văn Quang', cohort: 'K67' },
    advisor: { title: 'TS.', name: 'Lê Hồng Phương' },
    views: 1250,
    downloads: 342,
  },
  {
    id: 'pub-xfem-crack',
    kind: 'international',
    year: 2026,
    title:
      'Phương pháp phần tử hữu hạn mở rộng (XFEM) giải bài toán lan truyền vết nứt phi tuyến trong vật liệu',
    domainCode: 'MECH',
    domainLabel: 'Cơ học & Cơ kỹ thuật',
    major: 'Phương pháp Phần tử Hữu hạn (FEM/XFEM)',
    author: { name: 'Đỗ Duy Cường', cohort: 'Phòng' },
    advisor: { title: 'PGS.TS', name: 'Đỗ Duy Cường' },
    views: 2180,
    downloads: 521,
  },
  {
    id: 'pub-ito-stability',
    kind: 'international',
    year: 2026,
    title:
      'Về tính ổn định mũ nghiệm của hệ phương trình vi phân ngẫu nhiên Itô với trễ vô hạn và nhiễu xung',
    domainCode: 'MATH',
    domainLabel: 'Toán học',
    major: 'Phương trình vi phân & Hệ động lực',
    author: { name: 'Nguyễn Minh Trí', cohort: 'Bộ' },
    advisor: { title: 'GS.TSKH', name: 'Nguyễn Minh Trí' },
    views: 960,
    downloads: 289,
  },
  {
    id: 'pub-mopso-green-vrptw',
    kind: 'bachelor',
    year: 2025,
    title:
      'Giải thuật Tối ưu hóa Bầy đàn Đa mục tiêu (MOPSO) thích nghi cho bài toán Định tuyến Xe giao hàng xanh',
    domainCode: 'OPT',
    domainLabel: 'Toán - Tin ứng dụng & Tối ưu hóa',
    major: 'Vận trù học & Chuỗi cung ứng / Logistics xanh',
    author: { name: 'Phạm Hoàng Nam', cohort: 'Cử' },
    advisor: { title: 'TS.', name: 'Nguyễn Thị Minh Tâm' },
    views: 1620,
    downloads: 410,
  },
  {
    id: 'pub-drl-actor-critic',
    kind: 'master',
    year: 2025,
    title:
      'Học sâu Tăng cường (Deep Reinforcement Learning) dựa trên Actor-Critic cho bài toán Điều khiển Tự hành Tránh vật cản',
    domainCode: 'DS-AI',
    domainLabel: 'Khoa học Dữ liệu & AI',
    major: 'Học tăng cường (Deep RL) & Tự hành',
    author: { name: 'Đặng Vũ Tuấn', cohort: 'Học' },
    advisor: { title: 'TS.', name: 'Bùi Thế Duy' },
    views: 2450,
    downloads: 680,
  },
  {
    id: 'pub-kyber-fpga',
    kind: 'bachelor',
    year: 2025,
    title:
      'Xây dựng thuật toán mật mã hậu lượng tử Kyber trên phần cứng nhúng FPGA',
    domainCode: 'CS',
    domainLabel: 'Khoa học Máy tính & Tin học',
    major: 'An toàn thông tin & Mật mã ứng dụng',
    author: { name: 'Nguyễn Thành Nam', cohort: 'K66' },
    advisor: { title: 'TS.', name: 'Bùi Thế Duy' },
    views: 780,
    downloads: 230,
  },
]

/** Bộ lọc công trình ở Trang chủ — nhãn quan sát được nguyên văn. */
export type PublicationFilterId =
  | 'all'
  | 'thesis'
  | 'international'
  | 'dsai'
  | 'mathinfo'

export const publicationFilters: { id: PublicationFilterId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'thesis', label: 'Khóa luận & Luận văn' },
  { id: 'international', label: 'ISI / Scopus' },
  { id: 'dsai', label: 'DS & AI' },
  { id: 'mathinfo', label: 'Toán - Tin' },
]

export function filterPublications(id: PublicationFilterId): Publication[] {
  switch (id) {
    case 'all':
      return publications
    case 'thesis':
      return publications.filter(
        (item) => item.kind === 'bachelor' || item.kind === 'master',
      )
    case 'international':
      return publications.filter((item) => item.kind === 'international')
    case 'dsai':
      return publications.filter((item) => item.domainCode === 'DS-AI')
    case 'mathinfo':
      return publications.filter((item) => item.domainCode === 'OPT')
  }
}

/** Số công trình ở link "Xem toàn bộ kho tài liệu (7 công trình)" — quan sát được. */
export const libraryTotal = 7
