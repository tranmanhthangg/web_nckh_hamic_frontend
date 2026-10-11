# Bản tái tạo giao diện MIM-HUS (Web NCKH) — Khoa Toán – Cơ – Tin học

Dự án Next.js (App Router) + React 19 + TypeScript + Tailwind CSS v4 tái tạo lại
giao diện cổng thông tin nghiên cứu khoa học của Viện Toán – Cơ – Tin học
(MIM-HUS), dựa trên bộ ảnh chụp màn hình của bản mẫu.

## Công nghệ

- **Next.js 16 (App Router)** + React 19 + TypeScript
- Tailwind CSS v4 (qua `@tailwindcss/postcss`, token trong `src/index.css`)
- Font **tự host** qua `next/font/google` (Plus Jakarta Sans + JetBrains Mono,
  subset `latin`/`vietnamese`, biến `--font-*` nối vào token Tailwind)
- Logo dùng `next/image`; icon `lucide-react`
- **ESLint theo chuẩn `eslint-config-next`** (core-web-vitals + typescript)
- **Điều hướng bằng file-based routing** của App Router — đã thay thế bộ hash
  router tự viết (chuyển đổi trên nhánh `migration/nextjs`; liên kết hash cũ
  dạng `/#/tru-cot` được `src/components/layout/HashRedirect.tsx` tự chuyển
  sang `/tru-cot`)
- **Không** dùng backend: dữ liệu là hằng số trong `src/data`, đăng nhập/phân
  quyền là mô phỏng phía client

## Lệnh

```bash
npm install
npm run dev      # dev server → http://localhost:3000
npm run build    # build production
npm run start    # chạy bản production
npm run lint     # eslint
```

## Điều hướng

| Đường dẫn         | Trang                                              |
| ----------------- | -------------------------------------------------- |
| `/`               | Trang chủ                                          |
| `/tru-cot`        | 5 trụ cột nghiên cứu                               |
| `/tim-kiem`       | Tìm kiếm & tra cứu (`?q=&domain=&kind=`)           |
| `/cong-trinh/:id` | Chi tiết công trình                                |
| `/giang-vien`     | Giảng viên & mentors                               |
| `/giang-vien/:id` | Hồ sơ giảng viên                                   |
| `/lab`            | Phòng thí nghiệm / Lab                            |
| `/lab/:id`        | Chi tiết Lab                                       |
| `/thong-bao`      | Thông báo                                          |

Đường dẫn lạ trả về `not-found.tsx` (giao diện 404 dùng chung). Các route chi
tiết `[id]` được prerender lúc build nhờ `generateStaticParams`; trang có
`loading.tsx`/`error.tsx` và metadata (title theo trang) riêng.

## SEO & môi trường

- `src/app/sitemap.ts` — sinh `sitemap.xml` từ dữ liệu tĩnh (9 route chính +
  toàn bộ công trình/giảng viên/lab).
- `src/app/robots.ts` — `robots.txt` cho phép thu thập toàn bộ.
- URL gốc lấy từ biến môi trường `NEXT_PUBLIC_SITE_URL` (xem `.env.example`),
  đồng thời dùng cho `metadataBase`. Mặc định khi chưa cấu hình:
  `http://localhost:3000`.

## Cấu trúc mã nguồn

```
src/
  app/            # App Router
    layout.tsx    #   root layout: metadata (title template + metadataBase),
                  #   next/font, HashRedirect, AuthProvider + AppShell
    page.tsx      #   Trang chủ
    loading.tsx   #   trạng thái tải khi navigate
    error.tsx     #   lỗi cấp route (Client Component)
    global-error.tsx # lỗi cấp ứng dụng
    not-found.tsx #   404
    sitemap.ts robots.ts # SEO
    tim-kiem/ tru-cot/ giang-vien/ lab/ cong-trinh/ thong-bao/
                  #   1 thư mục = 1 route, mỗi route 1 page.tsx
                  #   (route [id] có generateStaticParams + generateMetadata)
  components/     # giữ nguyên theo feature: layout/ ui/ home/ pillars/
                  #   mentors/ labs/ publications/ — thêm 'use client' ở boundary
                  #   thật sự cần tương tác phía trình duyệt
  data/           # site, navigation, home, announcements, publications, mentors,
                  #   labs, domains, rbac
  features/auth/  # AuthProvider, auth-context, AuthModal
  lib/            # cn() – ghép class không phụ thuộc thư viện ngoài
  views/          # component trang (đổi tên từ src/pages để Next không hiểu
                  #   nhầm thành Pages Router); app/**/page.tsx import từ đây
  router/         # buildPath() – ghép URL; điều hướng do next/navigation lo
  types/          # Kiểu dữ liệu dùng chung
```

## Đăng nhập & phân quyền (mô phỏng)

- Thanh debug RBAC nằm trên cùng cho phép đổi nhanh giữa các vai trò:
  **Guest** (không đăng nhập), **Sinh viên**, **Giảng viên**, **Admin**.
- Quyền được định nghĩa trong `src/data/rbac.ts`, ví dụ `fulltext:read`.
- Xem toàn văn công trình cần quyền `fulltext:read`; với khách chưa đăng nhập,
  thao tác này mở modal đăng nhập/đăng ký thay vì hiện nội dung.
- Trạng thái phiên chỉ tồn tại trong bộ nhớ của tab (không `localStorage`) để
  trả nguyên trạng trình chủ như bản mẫu.

## Mức độ khớp với bản mẫu

- Nội dung chữ (tên trụ cột, tên giảng viên, tên đề tài, số liệu lượt xem/tải…)
  lấy từ ảnh chụp màn hình.
- Ảnh bìa công trình và logo không có nguồn phù hợp nên được dựng bằng gradient
  theo trụ cột.
- Các trang chưa có ảnh chụp (chi tiết công trình/giảng viên/Lab, thông báo) dùng
  `PlaceholderPage`: hiển thị đúng dữ liệu quan sát được kèm ghi chú cho biết
  phần bố cục chưa được tái tạo.

