import Image from 'next/image'
import { cn } from '@/lib/cn'
import { logoSrc } from '@/data/site'

interface BrandMarkProps {
  /**
   * Đường dẫn ảnh logo (vd: '/logo.png'). Bỏ trống sẽ đọc mặc định từ
   * `logoSrc` trong src/data/site.ts; nếu giá trị rỗng thì dùng SVG mặc định.
   */
  src?: string
  className?: string
}

/**
 * Biểu trưng vòng tròn lồng nhau của Khoa Toán - Cơ - Tin học.
 * Bản mẫu dùng ảnh raster; bản tái tạo vẽ lại bằng SVG để không cần tài nguyên ảnh.
 * Truyền `src` (hoặc khai báo `logoSrc` ở data/site.ts) để dùng ảnh làm logo.
 */
export function BrandMark({ src = logoSrc, className }: BrandMarkProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt="Biểu trưng Khoa Toán - Cơ - Tin học"
        width={80}
        height={44}
        className={cn('h-11 w-20 shrink-0 object-contain', className)}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 84 46"
      role="img"
      aria-label="Biểu trưng Khoa Toán - Cơ - Tin học"
      className={cn('h-11 w-20 shrink-0', className)}
    >
      <g fill="none" strokeLinecap="round">
        <ellipse
          cx="32"
          cy="21"
          rx="18"
          ry="15.5"
          stroke="#4A90E2"
          strokeWidth="1.6"
        />
        <ellipse
          cx="52"
          cy="21"
          rx="18"
          ry="15.5"
          stroke="#2BB3C0"
          strokeWidth="1.6"
        />
      </g>
      <text
        x="42"
        y="43"
        textAnchor="middle"
        fontSize="6.2"
        letterSpacing="0.35"
        fill="#4A90E2"
        fontFamily="'Plus Jakarta Sans', sans-serif"
      >
        TOÁN-CƠ-TIN HỌC
      </text>
    </svg>
  )
}
