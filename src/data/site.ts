/**
 * Dữ liệu phần chân trang — đọc nguyên văn từ ảnh chụp màn hình Trang chủ.
 */

export const siteIdentity = {
  wordmark: 'KHOA TOÁN - CƠ - TIN HỌC',
  unit: 'Trường Đại học Khoa học Tự nhiên, ĐHQGHN',
  description:
    'Công trình thực số hóa và hệ sinh thái nghiên cứu khoa học, lưu trữ các công trình, khóa luận cử nhân tài năng, luận văn, luận án và bài báo quốc tế của Khoa MIM.',
  academicSponsor: 'Bảo trợ học thuật bởi Hội đồng Khoa học Khoa MIM',
  developedBy: 'Phát triển bởi: CLB Toán - Tin HAMIC',
  address: 'Nhà T1, 334 Nguyễn Trãi, Phường Thanh Xuân, TP. Hà Nội',
  phones: ['(024) 3858 1135', '(024) 3858 2214'],
  emails: ['mim@hus.edu.vn', 'science.mim@hus.edu.vn'],
}

export const footerLegalLinks = [
  'Quy chuẩn Trích dẫn',
  'Chính sách Truy cập Toàn văn',
  'Bảo vệ Sở hữu Trí tuệ',
]

export const footerCopyright =
  '© 2026 Khoa Toán - Cơ - Tin học, Trường Đại học Khoa học Tự nhiên – ĐHQGHN.'

/** Dải thông tin trên cùng (thanh portal màu xanh brand). */
export const portalBar = {
  organisation: 'ĐHQGHN',
  breadcrumb: ['Trường Đại học Khoa học Tự nhiên', 'Khoa Toán - Cơ - Tin học (MIM)'],
  portal: 'VNU Academic Knowledge Portal',
  address: 'Địa chỉ: 334 Nguyễn Trãi, Thanh Xuân, Hà Nội',
}

/** Khối nhận diện ở header. */
export const headerContent = {
  kicker: 'CỔNG TRI THỨC HỌC THUẬT',
  wordmark: 'KHOA TOÁN - CƠ - TIN HỌC',
  subline: 'Mathematics, Mechanics and Informatics • HUS',
  searchPlaceholder: 'Tìm công trình, giảng viên, khóa luận, DOI...',
}

/**
 * Đường dẫn ảnh logo dùng chung cho Header & Footer.
 * Đặt file ảnh vào thư mục `public/` rồi điền đường dẫn, ví dụ: '/logo.png'.
 * Để trống ('') sẽ dùng biểu trưng SVG mặc định trong BrandMark.tsx.
 */
export const logoSrc = '/logo.png'
