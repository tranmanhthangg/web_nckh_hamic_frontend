# 📑 BẢNG TRA CỨU — Mã nguồn ↔ Tài liệu

> **Quy tắc:** tài liệu của file nguồn `X` nằm ở `public/docs/` + đường dẫn `X` + `.md`
> Ví dụ: `src/router/router.ts` → `public/docs/src/router/router.ts.md`

| Ký hiệu | Ý nghĩa |
|---|---|
| ✅ | **Đầy đủ** — đã giải thích chi tiết theo bộ khung A–F |
| 🟡 | **Sơ lược** — có phần giải thích cơ bản, sẽ bổ sung ở Giai đoạn 2 |
| ⬜ | **Chờ giải thích** — khung đã tạo, nội dung bổ sung khi học đến |

**Cách đọc trên trình duyệt** (khi `npm run dev` đang chạy):
- Bảng tra cứu này: <http://localhost:5173/docs/INDEX.md>
- Báo cáo tổng quan: <http://localhost:5173/docs/00-BAO-CAO-KHAO-SAT.md>

> ⚠️ Thư mục `public/` được Vite **copy nguyên vẹn** sang `dist/` khi build.
> Tài liệu này (và 16 ảnh trong `public/`) sẽ được đóng gói lên hosting.
> Nếu cần tài liệu nội bộ không phát hành → nên chuyển sang thư mục `docs/` ở gốc dự án.

---

## 0. Tổng quan

| # | Tài liệu | Trạng thái |
|---|---|---|
| 0.1 | [Báo cáo khảo sát toàn bộ dự án](./00-BAO-CAO-KHAO-SAT.md) | ✅ |
| 0.2 | [Hướng dẫn dùng tài liệu](./README.md) | ✅ |
| 0.3 | Bảng tra cứu này | ✅ |

**Tổng quan dự án:** 68 file trong `src/` · 4.440 dòng · React 19.3 + Vite 8.3 + TS 6.0 + Tailwind v4 · **không có backend** · `npm run lint` sạch.

---

## 3. Router — trái tim điều hướng

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `src/router/router.ts` | [src/router/router.ts.md](./src/router/router.ts.md) | ✅ | Đọc/ghi hash, phân tích URL |
| `src/router/useRoute.ts` | [src/router/useRoute.ts.md](./src/router/useRoute.ts.md) | ✅ | Cầu nối router ↔ React |

---

## 4. Tiện ích & kiểu dữ liệu

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `src/lib/cn.ts` | [src/lib/cn.ts.md](./src/lib/cn.ts.md) | ✅ | Ghép class Tailwind (28 nơi dùng) |
| `src/types/index.ts` | [src/types/index.ts.md](./src/types/index.ts.md) | ✅ | Kiểu dữ liệu dùng chung |

---

## 5. Dữ liệu tĩnh — `src/data/` (9 file, 640 dòng)

| File nguồn | Tài liệu | Trạng thái | Xuất ra |
|---|---|---|---|
| `src/data/site.ts` | [src/data/site.ts.md](./src/data/site.ts.md) | ⬜ | Chữ header/footer |
| `src/data/navigation.ts` | [src/data/navigation.ts.md](./src/data/navigation.ts.md) | ⬜ | 5 mục menu |
| `src/data/domains.ts` | [src/data/domains.ts.md](./src/data/domains.ts.md) | ⬜ | 5 trụ cột + `findDomain()` |
| `src/data/publications.ts` | [src/data/publications.ts.md](./src/data/publications.ts.md) | ⬜ | 6 công trình + `filterPublications()` |
| `src/data/mentors.ts` | [src/data/mentors.ts.md](./src/data/mentors.ts.md) | ⬜ | 4 giảng viên + 2 mảng options |
| `src/data/labs.ts` | [src/data/labs.ts.md](./src/data/labs.ts.md) | ⬜ | 4 lab + `footerLabLinks` |
| `src/data/home.ts` | [src/data/home.ts.md](./src/data/home.ts.md) | ⬜ | Chữ hero trang chủ |
| `src/data/announcements.ts` | [src/data/announcements.ts.md](./src/data/announcements.ts.md) | ⬜ | 2 thông báo |
| `src/data/rbac.ts` | [src/data/rbac.ts.md](./src/data/rbac.ts.md) | ⬜ | 4 vai trò + bảng quyền |

---

## 6. Đăng nhập & phân quyền — `src/features/auth/`

---

## 8. Component bố cục — `src/components/layout/` (9 file)

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `AppShell.tsx` | [layout/AppShell.tsx.md](./src/components/layout/AppShell.tsx.md) | ⬜ | Khung trang dùng chung mọi trang |
| `AppHeader.tsx` | [layout/AppHeader.tsx.md](./src/components/layout/AppHeader.tsx.md) | ⬜ | Gói 3 khối header |
| `PortalBar.tsx` | [layout/PortalBar.tsx.md](./src/components/layout/PortalBar.tsx.md) | ⬜ | Dải breadcrumb ĐHQGHN |
| `SiteHeader.tsx` | [layout/SiteHeader.tsx.md](./src/components/layout/SiteHeader.tsx.md) | ⬜ | Logo, tìm kiếm, đăng nhập |
| `MainNav.tsx` | [layout/MainNav.tsx.md](./src/components/layout/MainNav.tsx.md) | ⬜ | Menu 5 mục + menu mobile |
| `HeaderSearch.tsx` | [layout/HeaderSearch.tsx.md](./src/components/layout/HeaderSearch.tsx.md) | ⬜ | Ô tìm kiếm trên header |
| `SiteFooter.tsx` | [layout/SiteFooter.tsx.md](./src/components/layout/SiteFooter.tsx.md) | ⬜ | Chân trang 4 cột |
| `BrandMark.tsx` | [layout/BrandMark.tsx.md](./src/components/layout/BrandMark.tsx.md) | ⬜ | Logo vẽ bằng SVG |
| `DebugRbacBar.tsx` | [layout/DebugRbacBar.tsx.md](./src/components/layout/DebugRbacBar.tsx.md) | ⬜ | Thanh đổi vai trò RBAC |

---

## 9. Component Trang chủ — `src/components/home/` (6 file)

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `HeroSection.tsx` | [home/HeroSection.tsx.md](./src/components/home/HeroSection.tsx.md) | ⬜ | Tiêu đề + ô tìm kiếm lớn |
| `PillarGrid.tsx` | [home/PillarGrid.tsx.md](./src/components/home/PillarGrid.tsx.md) | ⬜ | Lưới 5 thẻ trụ cột |
| `PublicationsSection.tsx` | [home/PublicationsSection.tsx.md](./src/components/home/PublicationsSection.tsx.md) | ⬜ | Khu vực công trình + tab lọc |
| `HomeSidebar.tsx` | [home/HomeSidebar.tsx.md](./src/components/home/HomeSidebar.tsx.md) | ⬜ | Cột phải gồm 4 khối |
| `MentorSidebarList.tsx` | [home/MentorSidebarList.tsx.md](./src/components/home/MentorSidebarList.tsx.md) | ⬜ | Danh sách GV rút gọn |
| `LabSidebarList.tsx` | [home/LabSidebarList.tsx.md](./src/components/home/LabSidebarList.tsx.md) | ⬜ | 3 lab mới nhất |

---

## 10. Component giao diện dùng chung — `src/components/ui/` (19 file)

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `Container.tsx` | [ui/Container.tsx.md](./src/components/ui/Container.tsx.md) | ⬜ | Khung canh giữa `max-w-[1380px]` |
| `Card.tsx` | [ui/Card.tsx.md](./src/components/ui/Card.tsx.md) | ⬜ | Hộp trắng bo góc |
| `Button.tsx` | [ui/Button.tsx.md](./src/components/ui/Button.tsx.md) | ⬜ | Nút có 6 kiểu × 3 cỡ |
| `button-variants.ts` | [ui/button-variants.ts.md](./src/components/ui/button-variants.ts.md) | ⬜ | Bảng class của nút |
| `Link.tsx` | [ui/Link.tsx.md](./src/components/ui/Link.tsx.md) | ⬜ | `<a href="#/...">` nội bộ |
| `SearchInput.tsx` | [ui/SearchInput.tsx.md](./src/components/ui/SearchInput.tsx.md) | ⬜ | Ô tìm kiếm có icon |
| `Select.tsx` | [ui/Select.tsx.md](./src/components/ui/Select.tsx.md) | ⬜ | Ô chọn |
| `TextField.tsx` | [ui/TextField.tsx.md](./src/components/ui/TextField.tsx.md) | ⬜ | Ô nhập có nhãn |
| `Checkbox.tsx` | [ui/Checkbox.tsx.md](./src/components/ui/Checkbox.tsx.md) | ⬜ | Ô tích |
| `Modal.tsx` | [ui/Modal.tsx.md](./src/components/ui/Modal.tsx.md) | ⬜ | Hộp thoại |
| `Avatar.tsx` | [ui/Avatar.tsx.md](./src/components/ui/Avatar.tsx.md) | ⬜ | Chữ viết tắt |
| `Badge.tsx` | [ui/Badge.tsx.md](./src/components/ui/Badge.tsx.md) | ⬜ | Nhãn nhỏ, 7 tông màu |
| `Chip.tsx` | [ui/Chip.tsx.md](./src/components/ui/Chip.tsx.md) | ⬜ | Chip, 3 tông |
| `EmptyNotice.tsx` | [ui/EmptyNotice.tsx.md](./src/components/ui/EmptyNotice.tsx.md) | ⬜ | "Không có kết quả" |
| `FilterTabs.tsx` | [ui/FilterTabs.tsx.md](./src/components/ui/FilterTabs.tsx.md) | ⬜ | Dãy tab lọc |
| `IconButton.tsx` | [ui/IconButton.tsx.md](./src/components/ui/IconButton.tsx.md) | ⬜ | Nút chỉ có icon + badge |
| `PageHero.tsx` | [ui/PageHero.tsx.md](./src/components/ui/PageHero.tsx.md) | ⬜ | Khối mở đầu trang con |
| `SectionHeader.tsx` | [ui/SectionHeader.tsx.md](./src/components/ui/SectionHeader.tsx.md) | ⬜ | Tiêu đề khối |
| `SegmentedToggle.tsx` | [ui/SegmentedToggle.tsx.md](./src/components/ui/SegmentedToggle.tsx.md) | ⬜ | Nút chuyển 2 chế độ (generic) |

---

## 11. Component công trình — `src/components/publications/` (5 file)

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|

---

## 13. Đề xuất thứ tự học

| # | Chủ đề | File | Trạng thái |
|---|---|---|---|
| 1 | Nền tảng HTML & Tailwind | `index.html` → `src/index.css` | ⬜ |
| 2 | Điểm khởi động | `package.json` → `vite.config.ts` → `tsconfig.app.json` → `src/main.tsx` | 🟡 `main.tsx` xong |
| 3 | **Router** | `src/router/router.ts` → `useRoute.ts` | ✅ **Xong** |
| 4 | Kiểu dữ liệu | `src/types/index.ts` → `src/data/domains.ts` → `publications.ts` | 🟡 `types` xong |
| 5 | Component cơ bản | `src/lib/cn.ts` → `Card` → `Container` → `Button` → `Link` | 🟡 `cn.ts` xong |
| 6 | Luồng điều phối | `src/App.tsx` → `HomePage` → `components/home/*` | ⬜ |
| 7 | State & Hook | `SearchPage` → `MentorsPage` | ⬜ |
| 8 | Context & phân quyền | `features/auth/*` → `DebugRbacBar` | 🟡 `auth-context` xong |

**Vì sao sắp xếp thế này:** phần 1–2 không cần biết React · phần 3 phải đi trước phần 6 vì `App.tsx` phụ thuộc router · phần 4 đi trước phần 7 vì hiểu cấu trúc dữ liệu thì mới hiểu vì sao code lọc được.

---

## 14. Chức năng chưa hoàn thiện (đã xác nhận từ mã nguồn)

| # | Vấn đề | Vị trí |
|---|---|---|
| 1 | Trang chi tiết dùng `PlaceholderPage` — không có toàn văn, không có PDF | `DetailPages.tsx`, `PlaceholderPage.tsx` |
| 2 | Đăng nhập không kiểm tra mật khẩu; `confirmPassword` không được so sánh | `AuthModal.tsx` |
| 3 | Trạng thái đăng nhập mất khi tải lại trang (không `localStorage`) | `AuthProvider.tsx` |
| 4 | Nút chuông thông báo không có `onClick` | `SiteHeader.tsx` |
| 5 | Nút "Lưu công trình" chỉ đổi trạng thái trong RAM | `PublicationCard.tsx` |
| 6 | Không có `fetch`/`Promise`/`async` nào trong toàn bộ dự án | — |
| 7 | `MentorAudience` có 3 giá trị nhưng chỉ dùng 1 | `data/mentors.ts` |
| 8 | Không lab nào có `keyProjects` → nhánh `else` luôn chạy | `LabCard.tsx` |
| 9 | 16 ảnh trong `public/` không được `src/` nào tham chiếu | `public/` |
| 10 | `libraryTotal = 7` nhưng `publications` chỉ có 6; `announcementTotal = 4` nhưng có 2 | `data/publications.ts`, `data/announcements.ts` |

---

## 15. Câu hỏi tự kiểm tra

1. Tại sao `index.html` vẫn cần `<div id="root">` khi React sinh ra mọi thứ?
2. Khác biệt giữa `src/data/publications.ts` và một API thật là gì?
3. Đổi alias `@` trong `vite.config.ts` nhưng quên `tsconfig.app.json` thì sao?
4. Vì sao dùng hash (`#/`) thay vì đường dẫn thật?
5. `SearchPage` có `key={route.raw}` — bỏ đi thì hỏng thế nào?
6. `useMemo` ở `SearchPage` ngăn được việc gì?
7. `cn()` có xử lý xung đột class Tailwind không?

| `PublicationResults.tsx` | [publications/PublicationResults.tsx.md](./src/components/publications/PublicationResults.tsx.md) | ⬜ | Chọn giữa dạng ô / danh sách |
| `PublicationCard.tsx` | [publications/PublicationCard.tsx.md](./src/components/publications/PublicationCard.tsx.md) | ⬜ | Thẻ dạng ô |
| `PublicationListItem.tsx` | [publications/PublicationListItem.tsx.md](./src/components/publications/PublicationListItem.tsx.md) | ⬜ | Thẻ dạng danh sách |
| `PublicationCover.tsx` | [publications/PublicationCover.tsx.md](./src/components/publications/PublicationCover.tsx.md) | ⬜ | Nền bìa gradient |
| `PublicationViewToggle.tsx` | [publications/PublicationViewToggle.tsx.md](./src/components/publications/PublicationViewToggle.tsx.md) | ⬜ | Chuyển ô/danh sách |

---

## 12. Thẻ hiển thị khác (3 file)

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `src/components/labs/LabCard.tsx` | [labs/LabCard.tsx.md](./src/components/labs/LabCard.tsx.md) | ⬜ | Thẻ phòng thí nghiệm |
| `src/components/mentors/MentorCard.tsx` | [mentors/MentorCard.tsx.md](./src/components/mentors/MentorCard.tsx.md) | ⬜ | Thẻ giảng viên |
| `src/components/pillars/PillarCard.tsx` | [pillars/PillarCard.tsx.md](./src/components/pillars/PillarCard.tsx.md) | ⬜ | Thẻ trụ cột (trang 5 trụ cột) |



| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `src/features/auth/auth-context.ts` | [auth-context.ts.md](./src/features/auth/auth-context.ts.md) | ✅ | Hợp đồng + hook `useAuth()` |
| `src/features/auth/AuthProvider.tsx` | [AuthProvider.tsx.md](./src/features/auth/AuthProvider.tsx.md) | ⬜ | Giữ state đăng nhập |
| `src/features/auth/AuthModal.tsx` | [AuthModal.tsx.md](./src/features/auth/AuthModal.tsx.md) | ⬜ | Giao diện đăng nhập/đăng ký |

---

## 7. Trang — `src/pages/` (7 file)

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `src/pages/HomePage.tsx` | [src/pages/HomePage.tsx.md](./src/pages/HomePage.tsx.md) | ⬜ | Trang chủ — chỉ ghép component |
| `src/pages/SearchPage.tsx` | [src/pages/SearchPage.tsx.md](./src/pages/SearchPage.tsx.md) | ⬜ | Tìm kiếm + lọc + sắp xếp |
| `src/pages/MentorsPage.tsx` | [src/pages/MentorsPage.tsx.md](./src/pages/MentorsPage.tsx.md) | ⬜ | Danh sách GV + 3 bộ lọc |
| `src/pages/LabsPage.tsx` | [src/pages/LabsPage.tsx.md](./src/pages/LabsPage.tsx.md) | ⬜ | Danh sách Lab + tìm kiếm |
| `src/pages/PillarsPage.tsx` | [src/pages/PillarsPage.tsx.md](./src/pages/PillarsPage.tsx.md) | ⬜ | 5 trụ cột |
| `src/pages/DetailPages.tsx` | [src/pages/DetailPages.tsx.md](./src/pages/DetailPages.tsx.md) | ⬜ | 5 trang chi tiết gộp chung |
| `src/pages/PlaceholderPage.tsx` | [src/pages/PlaceholderPage.tsx.md](./src/pages/PlaceholderPage.tsx.md) | ⬜ | Trang giữ chỗ |



---

## 1. File gốc dự án

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `index.html` | [root/index.html.md](./root/index.html.md) | ⬜ | Khung HTML, điểm vào của trình duyệt |
| `package.json` | [root/package.json.md](./root/package.json.md) | ⬜ | Hồ sơ dự án, lệnh npm, thư viện |
| `vite.config.ts` | [root/vite.config.ts.md](./root/vite.config.ts.md) | ⬜ | Plugin React/Tailwind, bí danh `@` |
| `tsconfig.json` | [root/tsconfig.json.md](./root/tsconfig.json.md) | ⬜ | File "cha" trỏ 2 file con |
| `tsconfig.app.json` | [root/tsconfig.app.json.md](./root/tsconfig.app.json.md) | ⬜ | Quy tắc TypeScript cho `src/` |
| `tsconfig.node.json` | [root/tsconfig.node.json.md](./root/tsconfig.node.json.md) | ⬜ | Quy tắc TypeScript cho `vite.config.ts` |
| `eslint.config.js` | [root/eslint.config.js.md](./root/eslint.config.js.md) | ⬜ | Quy tắc soát lỗi |
| `README.md` | [root/README.md.md](./root/README.md.md) | ⬜ | Mô tả dự án (AI viết trước đó) |

---

## 2. Điểm khởi động

| File nguồn | Tài liệu | Trạng thái | Vai trò |
|---|---|---|---|
| `src/main.tsx` | [src/main.tsx.md](./src/main.tsx.md) | ✅ | Bắt đầu React, bọc `AuthProvider` |
| `src/App.tsx` | [src/App.tsx.md](./src/App.tsx.md) | ⬜ | Điều phối trang — timeless React |
| `src/index.css` | [src/index.css.md](./src/index.css.md) | ⬜ | Nạp Tailwind + định nghĩa theme màu |
