# Bản tái tạo giao diện MIM-HUS (Web NCKH) — Khoa Toán – Cơ – Tin học

Dự án React + TypeScript + Vite + Tailwind CSS v4 tái tạo lại giao diện cổng
thông tin nghiên cứu khoa học của Viện Toán – Cơ – Tin học (MIM-HUS), dựa trên
bộ ảnh chụp màn hình của bản mẫu.

## Công nghệ

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4 (theo `@tailwindcss/vite`, token trong `src/index.css`)
- `lucide-react` cho icon
- **Không** dùng thư viện router: bộ định tuyến hash tự viết trong `src/router`
- **Không** dùng backend: dữ liệu là hằng số trong `src/data`, đăng nhập/phân
  quyền là mô phỏng phía client

## Lệnh

```bash
npm install
npm run dev        # chạy dev server
npm run build      # tsc -b + vite build
npm run lint       # eslint
npm run preview    # xem bản build
```

## Điều hướng

Bản mẫu là một SPA chỉ hiện shell, nên bản tái tạo dùng hash route để có deep
link và nút Back/Forward mà không cần cấu hình server:

| Đường dẫn             | Trang                                              |
| --------------------- | -------------------------------------------------- |
| `#/`                  | Trang chủ                                          |
| `#/tru-cot`           | 5 trụ cột nghiên cứu                                |
| `#/tim-kiem`          | Tìm kiếm & tra cứu (`?q=&domain=&kind=`)           |
| `#/cong-trinh/:id`    | Chi tiết công trình                                 |
| `#/giang-vien`        | Giảng viên & mentors                                |
| `#/giang-vien/:id`    | Hồ sơ giảng viên                                    |
| `#/lab`               | Phòng thí nghiệm / Lab                              |
| `#/lab/:id`           | Chi tiết Lab                                        |
| `#/thong-bao`         | Thông báo                                           |

## Cấu trúc mã nguồn

```
src/
  components/
    layout/     PortalBar, AppHeader/SiteHeader, MainNav, AppShell, SiteFooter,
                BrandMark, HeaderSearch, DebugRbacBar
    home/       HeroSection, PillarGrid, PublicationsSection, HomeSidebar,
                MentorSidebarList, LabSidebarList
    pillars/    PillarCard
    mentors/    MentorCard
    labs/       LabCard
    publications/ PublicationCard, PublicationListItem, PublicationCover,
                PublicationResults, PublicationViewToggle
    ui/         Button, IconButton, Card, Modal, Select, TextField, SearchInput,
                Badge, Chip, Avatar, Checkbox, Container, PageHero,
                SectionHeader, SegmentedToggle, FilterTabs, EmptyNotice
  data/         site, navigation, home, announcements, publications, mentors,
                labs, domains, rbac
  features/auth/ AuthProvider, auth-context, AuthModal
  lib/          cn() – ghép class không phụ thuộc thư viện ngoài
  pages/        HomePage, PillarsPage, MentorsPage, LabsPage, SearchPage,
                DetailPages, PlaceholderPage
  router/       router.ts (parse hash + phân tích query), useRoute.ts
  types/        Kiểu dữ liệu dùng chung
```

## Đăng nhập & phân quyền (mô phỏng)

- Thanh debug RBAC nằm trên cùng cho phép đổi nhanh giữa các vai trò:
  **Guest** (không đăng nhập), **Sinh viên**, **Giảng viên**, **Admin**.
- Quyền được định nghĩa trong `src/data/rbac.ts`, ví dụ `publication:fulltext`.
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
