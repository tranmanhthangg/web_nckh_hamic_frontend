import type { Mentor } from '@/types'

/**
 * Giảng viên / người hướng dẫn — nguồn: khối "MENTOR DISCOVERY" ở sidebar
 * Trang chủ và thẻ mentor trên trang "Giảng viên & Mentors".
 *
 * Lưu ý: bản mẫu hiển thị trùng học vị ("PGS.TS PGS.TS Trần Mạnh Cường") do
 * trường `name` đã chứa sẵn học vị. Bản tái tạo tách `title` và `name` rồi
 * ghép khi hiển thị, nên giữ đúng bố cục nhưng không lặp học vị.
 */
export const mentors: Mentor[] = [
  {
    id: 'mentor-tran-manh-cuong',
    title: 'PGS.TS',
    name: 'Trần Mạnh Cường',
    domainCode: 'OPT',
    discipline: 'Toán - Tin ứng dụng & Tối ưu hóa',
    researchDirection:
      'Tối ưu hóa đa mục tiêu • Logistics xanh (Green VRPTW)',
    thesisCount: 28,
    articleCount: 42,
    acceptingStudents: true,
    // [suy luận] nhãn "Nhận SV"/"Đang nhận hướng dẫn" cho biết có nhận sinh viên.
    audiences: ['student'],
    email: 'cuongtm@hus.edu.vn',
    bio: 'Nghiên cứu chuyên sâu về quy hoạch toán học đa mục tiêu, thuật toán tối ưu hóa thích nghi trong logistics xanh và ứng dụng Machine Learning trong toán tài chính.',
  },
  {
    id: 'mentor-le-hong-phuong',
    title: 'TS',
    name: 'Lê Hồng Phương',
    domainCode: 'DS-AI',
    discipline: 'Khoa học Máy tính & Tin học',
    researchDirection:
      'Xử lý Ngôn ngữ Tự nhiên (NLP) • Transformer Architectures',
    thesisCount: 35,
    articleCount: 54,
    acceptingStudents: true,
    audiences: ['student'],
    email: 'phuonglh@hus.edu.vn',
    bio: 'Chuyên gia đầu ngành về Xử lý Ngôn ngữ Tự nhiên (NLP) tiếng Việt, kiến trúc Large Language Models (LLM) và trích xuất tri thức từ văn bản y tế.',
  },
  {
    id: 'mentor-do-duy-cuong',
    title: 'PGS.TS',
    name: 'Đỗ Duy Cường',
    domainCode: 'MECH',
    discipline: 'Cơ học & Cơ kỹ thuật',
    researchDirection: 'Phương pháp XFEM & IGA • Cơ học nứt gãy phi tuyến',
    thesisCount: 22,
    articleCount: 68,
    acceptingStudents: true,
    audiences: ['student'],
  },
  {
    id: 'mentor-bui-the-duy',
    title: 'TS',
    name: 'Bùi Thế Duy',
    domainCode: 'DS-AI',
    discipline: 'Khoa học Dữ liệu & AI',
    researchDirection:
      'Deep Reinforcement Learning • Computer Vision & Autonomous Robotics',
    thesisCount: 19,
    articleCount: 31,
    acceptingStudents: true,
    audiences: ['student'],
  },
]

export const mentorDisciplineOptions = [
  { value: 'all', label: 'Tất cả ngành & Bộ môn' },
  { value: 'OPT', label: 'Toán - Tin ứng dụng & Tối ưu hóa' },
  { value: 'MECH', label: 'Cơ học & Cơ kỹ thuật' },
  { value: 'CS', label: 'Khoa học Máy tính & Tin học' },
  { value: 'DS-AI', label: 'Khoa học Dữ liệu & AI' },
]

export const mentorAudienceOptions = [
  { value: 'all', label: 'Tất cả đối tượng' },
  { value: 'student', label: 'Sinh viên (Khoá luận)' },
]
