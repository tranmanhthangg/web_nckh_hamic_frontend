import type { Domain } from '@/types'

/**
 * 5 trụ cột nghiên cứu của Khoa Toán - Cơ - Tin học.
 *
 * Nguồn: thẻ trụ cột ở Trang chủ (tên ngắn + số "bài" và "GV"), khối trụ cột
 * trên trang "5 Trụ cột Nghiên cứu" (MATH — đầy đủ), và danh sách trụ cột ở
 * footer (tên đầy đủ).
 *
 * `[suy luận]` = trường không quan sát được trực tiếp trong ảnh chụp màn hình;
 * giá trị được suy ra từ chính các chuỗi đã thấy ở nơi khác trong bản mẫu
 * (footer, thẻ Lab, hướng nghiên cứu của mentor, chủ đề nóng ở hero).
 */
export const domains: Domain[] = [
  {
    code: 'MATH',
    name: 'Toán học',
    fullName: 'Toán học Lý thuyết & Nền tảng',
    homeDocuments: 27,
    homeLecturers: 2,
    documents: 25,
    lecturers: 6,
    labs: 1,
    description:
      'Nghiên cứu cơ bản về Giải tích hiện đại, Đại số tuyến tính & Trừu tượng, Hình học - Tôpô vi phân, Phương trình vi phân & Hệ động lực, Xác suất và Thống kê toán học.',
    hotTopics: [
      '#Giải tích hàm & Không gian Banach',
      '#Đại số vi phân & Hình học đại số',
      '#Hệ động lực',
      '#Xác suất ngẫu nhiên',
    ],
    trainingPaths: [
      'Giải tích hàm & Phương trình đạo hàm riêng',
      'Đại số, Hình học & Tôpô',
      'Phương trình vi phân & Hệ động lực',
      'Xác suất & Quá trình ngẫu nhiên',
      'Thống kê toán học & Lý thuyết mẫu',
    ],
  },
  {
    code: 'MECH',
    name: 'Cơ học & Cơ kỹ thuật',
    fullName: 'Cơ học tính toán & Mô phỏng (XFEM/IGA)',
    homeDocuments: 26,
    homeLecturers: 1,
    // [suy luận] trang "5 Trụ cột" chưa chụp tới trụ cột này.
    documents: 26,
    lecturers: 1,
    labs: 1,
    description:
      'Nghiên cứu phương pháp phần tử hữu hạn mở rộng (XFEM), phân tích đẳng hình học (IGA) và mô phỏng đa tỉ lệ cho bài toán lan truyền vết nứt phi tuyến trong vật liệu composite.',
    hotTopics: ['#XFEM & Composite', '#Phân tích đẳng hình học (IGA)', '#Cơ học nứt gãy phi tuyến'],
    trainingPaths: [
      'Phương pháp phần tử hữu hạn (FEM/XFEM)',
      'Phân tích đẳng hình học (IGA)',
      'Cơ học vật liệu composite',
      'Mô phỏng số đa tỉ lệ',
    ],
  },
  {
    code: 'CS',
    name: 'Khoa học Máy tính & Tin học',
    fullName: 'Khoa học Máy tính & An toàn thông tin',
    homeDocuments: 26,
    homeLecturers: 1,
    // [suy luận] trang "5 Trụ cột" chưa chụp tới trụ cột này.
    documents: 26,
    lecturers: 1,
    labs: 1,
    description:
      'Nghiên cứu thuật toán, an toàn hệ thống và điện toán đám mây, xử lý ngôn ngữ tự nhiên tiếng Việt cùng các kiến trúc học sâu ứng dụng trong bài toán thực tế.',
    hotTopics: ['#An toàn hệ thống', '#Điện toán đám mây', '#Xử lý ngôn ngữ tự nhiên'],
    trainingPaths: [
      'Thuật toán & Cấu trúc dữ liệu',
      'An toàn thông tin & Mật mã',
      'Hệ phân tán & Điện toán đám mây',
      'Học máy ứng dụng',
    ],
  },
  {
    code: 'DS-AI',
    name: 'Khoa học Dữ liệu & AI',
    fullName: 'Khoa học Dữ liệu & Trí tuệ Nhân tạo (AI/NLP)',
    homeDocuments: 29,
    homeLecturers: 1,
    // [suy luận] trang "5 Trụ cột" chưa chụp tới trụ cột này.
    documents: 29,
    lecturers: 1,
    labs: 1,
    description:
      'Nghiên cứu các mô hình ngôn ngữ lớn (LLM) thích nghi tiếng Việt, thị giác máy tính, học tăng cường sâu và biểu diễn tri thức bằng đồ thị.',
    hotTopics: ['#Transformer tiếng Việt', '#Large Language Models', '#Deep Reinforcement Learning'],
    trainingPaths: [
      'Học sâu & Kiến trúc Transformer',
      'Xử lý ngôn ngữ tự nhiên (NLP)',
      'Thị giác máy tính',
      'Học tăng cường sâu',
    ],
  },
  {
    code: 'OPT',
    name: 'Toán - Tin ứng dụng & Tối ưu hóa',
    fullName: 'Toán - Tin ứng dụng & Tối ưu hóa đa mục tiêu',
    homeDocuments: 27,
    homeLecturers: 1,
    // [suy luận] trang "5 Trụ cột" chưa chụp tới trụ cột này.
    documents: 27,
    lecturers: 1,
    labs: 1,
    description:
      'Nghiên cứu quy hoạch toán học đa mục tiêu, thuật toán tối ưu hóa thích nghi cho bài toán định tuyến và logistics xanh (Green VRPTW), cùng ứng dụng học máy trong toán tài chính.',
    hotTopics: ['#Tối ưu hóa Green-VRPTW', '#Logistics xanh (Green VRPTW)', '#Rủi ro CVaR'],
    trainingPaths: [
      'Quy hoạch toán học & Tối ưu hóa',
      'Vận trù học & Logistics xanh',
      'Tối ưu hóa đa mục tiêu',
      'Tài chính định lượng',
    ],
  },
]

export function findDomain(code: string): Domain | undefined {
  return domains.find((domain) => domain.code === code)
}
