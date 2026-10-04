import type { Lab } from '@/types'

/**
 * Phòng thí nghiệm & nhóm nghiên cứu.
 *
 * MIM-OptLab và MIM-AILab được quan sát đầy đủ trên trang "Phòng thí nghiệm / Lab".
 * CMS-Lab và SecCloud-MIM chỉ xuất hiện trong danh sách Lab ở footer nên mô tả
 * `[suy luận]` được viết từ chính chú thích trong footer.
 */
export const labs: Lab[] = [
  {
    id: 'lab-mim-optlab',
    tag: 'MIM-OptLab',
    name: 'Nhóm Nghiên cứu Tối ưu hóa & Vận trù học Ứng dụng',
    domainCode: 'OPT',
    domainLabel: 'Toán - Tin ứng dụng & Tối ưu hóa',
    description:
      'Nghiên cứu phát triển các thuật toán toán học giải bài toán định tuyến, logistics chuỗi cung ứng xanh và mô hình hóa rủi ro tài chính.',
    focusTopics: [
      'Giải thuật heuristic cho bài toán Green-VRPTW đô thị',
      'Tối ưu hóa danh mục đầu tư đa mục tiêu tích hợp rủi ro CVaR',
      'Mô phỏng điều độ phân phối năng lượng tái tạo',
    ],
    lead: { title: 'PGS.TS', name: 'Trần Mạnh Cường' },
    memberCount: 14,
  },
  {
    id: 'lab-mim-ailab',
    tag: 'MIM-AILab',
    name: 'Phòng Thí nghiệm Trí tuệ Nhân tạo & Xử lý Ngôn ngữ Tự nhiên',
    domainCode: 'DS-AI',
    domainLabel: 'Khoa học Dữ liệu & AI',
    description:
      'Nghiên cứu các mô hình ngôn ngữ lớn (LLM) thích nghi tiếng Việt, thị giác máy tính và biểu diễn tri thức bằng đồ thị.',
    focusTopics: [
      'Xây dựng bộ ngữ liệu và mô hình Foundation Model cho Tiếng Việt',
      'Hệ thống trích xuất thông tin bệnh án điện tử đa phương thức',
      'Mô hình Deep Reinforcement Learning cho xe tự hành trong nhà xưởng',
    ],
    lead: { title: 'TS.', name: 'Lê Hồng Phương' },
    memberCount: 22,
  },
  {
    id: 'lab-cms-lab',
    tag: 'CMS-Lab',
    name: 'Phòng Thí nghiệm Cơ học Tính toán Đa tỉ lệ',
    domainCode: 'MECH',
    domainLabel: 'Cơ học & Cơ kỹ thuật',
    // [suy luận] chưa có ảnh chụp cho Lab này.
    description:
      'Nghiên cứu mô phỏng số đa tỉ lệ cho cơ học vật liệu và kết cấu, phát triển các phương pháp XFEM/IGA ứng dụng trong phân tích nứt gãy.',
    focusTopics: [],
  },
  {
    id: 'lab-seccloud-mim',
    tag: 'SecCloud-MIM',
    name: 'Phòng Thí nghiệm An toàn Hệ thống & Điện toán Đám mây',
    domainCode: 'CS',
    domainLabel: 'Khoa học Máy tính & Tin học',
    // [suy luận] chưa có ảnh chụp cho Lab này.
    description:
      'Nghiên cứu an toàn hệ thống, mật mã ứng dụng và các mô hình điện toán đám mây phục vụ hạ tầng dữ liệu học thuật.',
    focusTopics: [],
  },
]

/** 4 Lab hiển thị trong khối footer (quan sát được nguyên văn). */
export const footerLabLinks = labs.map((lab) => ({
  to: `/lab/${lab.id}`,
  label: lab.tag,
  note: lab.domainLabel,
}))
