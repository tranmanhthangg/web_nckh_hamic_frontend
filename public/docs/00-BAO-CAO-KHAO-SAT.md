# BÁO CÁO KHẢO SÁT TỔNG THỂ — Dự án `web-nckh_hamic_frontend`

> **Giai đoạn 1** trong quá trình học mã nguồn.
> Ngày khảo sát: 10/5/2026 · Commit: `f04fd36 Initial commit` · Working tree sạch.
> Không có file nào bị sửa, xóa hay tạo thêm ngoài thư mục `public/docs/`.

---

## 1. Dự án này là gì

| Mục | Nội dung |
|---|---|
| Tên | `web-nckh` — Cổng Tri thức Học thuật MIM |
| Mục đích | Tái tạo giao diện website khoa Toán – Cơ – Tin học (ĐHQGHN) từ ảnh chụp màn hình bản mẫu |
| Kiểu ứng dụng | **SPA** (Single Page Application) — React chạy hoàn toàn trong trình duyệt |
| Có backend không? | ❌ **Không**. Không có `fetch`, `axios`, `Promise`, `async/await` (đã grep xác nhận) |
| Có router library không? | ❌ **Không**. Tự viết hash router trong `src/router/` (82 dòng) |
| Dữ liệu lấy ở đâu? | **Hằng số viết tay** trong `src/data/*.ts` |
| Có lưu phiên đăng nhập? | ❌ Không. Không có `localStorage`/`sessionStorage` → đóng tab là mất |
| Trạng thái build | `npm run lint` → **sạch, không cảnh báo** |

> **Điểm quan trọng nhất cần nắm:** đây là dự án **thuần Frontend, không có máy chủ**. Mọi "dữ liệu" bạn thấy trên web đều nằm sẵn trong mã nguồn dưới dạng mảng/object. Đăng nhập và phân quyền cũng chỉ là **mô phỏng trong bộ nhớ của trình duyệt**.

Phiên bản thực tế đang cài trong `node_modules`:
`react 19.3.0` · `vite 8.3.2` · `typescript 6.0.3`

---

## 2. Sơ đồ cấu trúc thư mục

```
web-nckh_hamic_frontend/
├── index.html            ← ĐIỂM VÀO của trình duyệt (khung HTML)
├── package.json          ← Khai báo thư viện + lệnh npm
├── vite.config.ts        ← Cấu hình công cụ build (plugin, bí danh @)
├── tsconfig.json         ← File "cha" trỏ tới 2 file con
├── tsconfig.app.json     ← Quy tắc TypeScript cho mã trong src/
├── tsconfig.node.json    ← Quy tắc TypeScript cho vite.config.ts
├── eslint.config.js      ← Quy tắc kiểm tra chất lượng code
├── README.md             ← Mô tả dự án do chính AI trước đó viết
├── .gitignore
├── public/               ← 17 ảnh chụp màn hình bản mẫu + favicon.svg + docs/
├── dist/                 ← Kết quả build (đã .gitignore)
└── src/                  ← TOÀN BỘ mã nguồn ứng dụng
    ├── main.tsx          ← ĐIỂM KHỞI ĐỘNG React (13 dòng)
    ├── App.tsx           ← Trung tâm điều phối trang (52 dòng)
    ├── index.css         ← Cấu hình Tailwind + theme màu (39 dòng)
    │
    ├── router/           ┐
    ├── features/auth/    ┤
    ├── data/             ┤  8 "tầng" của dự án
    ├── components/       ┤
    ├── pages/            ┤
    ├── types/            ┤
    └── lib/              ┘
```

Phân bố 68 file:

| Thư mục | Số file | Vai trò |
|---|---|---|
| `components/ui/` | 19 | **Thư viện giao diện dùng chung**: Button, Card, Modal, Select… |
| `data/` | 9 | **Toàn bộ dữ liệu tĩnh** của trang web |
| `components/layout/` | 9 | Header, Footer, Nav, Thanh debug RBAC |
| `pages/` | 7 | Mỗi file = 1 trang (Home, Search, Mentors…) |
| `components/home/` | 6 | Các khối riêng của Trang chủ |
| `components/publications/` | 5 | Thẻ công trình (dạng ô / dạng danh sách) |
| `features/auth/` | 3 | Đăng nhập, đăng ký, phân quyền |
| `router/` | 2 | Bộ định tuyến hash tự viết |
| `components/{labs,mentors,pillars}/` | 3 | Thẻ hiển thị cho Lab / Giảng viên / Trụ cột |
| `types/` | 1 | Kiểu dữ liệu dùng chung |
| `lib/` | 1 | Hàm tiện ích `cn()` |
| Gốc `src/` | 3 | `main.tsx`, `App.tsx`, `index.css` |



---

## 3. Vai trò từng file quan trọng

### 3.1 Tầng cấu hình (chạy **trước** khi code chạy)

**`package.json`** — "hồ sơ" của dự án

```json
"scripts": {
  "dev": "vite",                     // chạy server phát triển
  "build": "tsc -b && vite build",   // kiểm tra kiểu + đóng gói
  "lint": "eslint .",                // kiểm tra chất lượng code
  "preview": "vite preview"          // xem bản build
}
```

Ba lệnh cần nhớ: `npm run dev` (chạy) · `npm run build` (kiểm tra trước khi deploy) · `npm run lint` (soát lỗi).

**`vite.config.ts`** — chỉ làm 2 việc:

```ts
plugins: [react(), tailwindcss()],   // bật JSX + Tailwind
resolve: { alias: { '@': .../src } } // "@/data/home" → "src/data/home"
```

> **Vì sao cần alias `@`?** Nếu không có, mỗi import phải viết đường dẫn tương đối như `../../data/home`. Rất dễ sai khi di chuyển file. `@` là ký hiệu nhanh do Vite quy định.
>
> Alias phải khai báo **hai nơi** — `vite.config.ts` (để Vite build) và `tsconfig.app.json` (`paths`) (để TypeScript hiểu). Thiếu một trong hai sẽ báo lỗi.

**`tsconfig.app.json`** — các quy tắc đáng chú ý cho người học:

```jsonc
"jsx": "react-jsx",                    // dùng cú pháp JSX mới, không cần import React
"verbatimModuleSyntax": true,           // import kiểu PHẢI viết "import type"
"noUnusedLocals": true,                 // biến khai báo mà không dùng → lỗi
"erasableSyntaxOnly": true,             // cấm enum, namespace → dễ tương thích hơn
"noEmit": true                          // chỉ kiểm tra kiểu, không sinh file .js
```

> ⚠️ **`verbatimModuleSyntax: true` là lý do bạn thấy `import type` ở khắp nơi.** Khi đó, viết `import { Publication } from '@/types'` sẽ **báo lỗi**, phải viết `import type { Publication } from '@/types'`.
>
> **Quy tắc nhớ:** chỉ dùng làm **kiểu dữ liệu** → `import type`. Dùng làm **giá trị** (component, hàm, hằng số) → `import` bình thường.

### 3.2 Điểm bắt đầu (điểm khởi động)

**`index.html`** — trình duyệt đọc file này **trước tiên**:

```html
<body>
  <div id="root"></div>                                 <!-- hộp rỗng chờ React đổ nội dung vào -->
  <script type="module" src="/src/main.tsx"></script>   <!-- bảo trình duyệt tải mã ứng dụng -->
</body>
```

Chú thích trong `<head>` cấu hình tiêu đề, mô tả, font chữ (`Plus Jakarta Sans` + `JetBrains Mono`) nạp từ Google Fonts, favicon.

**`src/main.tsx`** — 13 dòng, nhưng là **trái tim** của toàn bộ ứng dụng:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />

### 3.3 Trung tâm điều phối

**`src/App.tsx`** — trái tim logic. Không có "nhiều trang cùng lúc"; có **một trang tại một thời điểm**, được chọn bằng `switch`:

```tsx
function renderPage(route: RouterState) {
  const [section, param] = route.segments   // "giang-vien/abc" → ["giang-vien", "abc"]
  switch (section) {
    case undefined:            return <HomePage />           // trang chủ
    case 'tim-kiem':           return <SearchPage key={route.raw} />
    case 'tru-cot':            return <PillarsPage />
    case 'giang-vien':         return param ? <MentorDetailPage id={param}/> : <MentorsPage />
    case 'lab':                return param ? <LabDetailPage id={param}/> : <LabsPage />
    case 'cong-trinh':         return param ? <PublicationDetailPage id={param}/> : <NotFoundPage />
    case 'thong-bao':          return <AnnouncementsPage />
    default:                   return <NotFoundPage />
  }
}
```

**`src/router/router.ts`** — bộ đọc URL (82 dòng, không phụ thuộc thư viện ngoài):

- Dùng **hash** (`#/tim-kiem`) thay vì đường dẫn thật (`/tim-kiem`). Lý do: hash không cần cấu hình máy chủ, mở `dist/index.html` bằng `file://` cũng chạy.
- `parseHash('#/tim-kiem?q=xfem')` → `{ path: '/tim-kiem', segments: ['tim-kiem'], query: { q: 'xfem' }, raw: '#/tim-kiem?q=xfem' }`
- Lắng nghe sự kiện `hashchange` của trình duyệt; mỗi lần URL đổi → gọo tất cả hàm đã đăng ký.
- `navigate(to)` — điều hướng. `buildPath(path, query)` — ghép URL kèm tham số.

**`src/router/useRoute.ts`** — cầu nối giữa React và router (12 dòng):

```ts
export function useRoute(): RouterState {
  return useSyncExternalStore(subscribeRouter, getRouterSnapshot, getRouterSnapshot)
}
```

> `useSyncExternalStore` là hook của React dành riêng cho **kho dữ liệu bên ngoài React** (ở đây là `window.location.hash`). Nó nhận 3 điều: hàm *đăng ký theo dõi*, hàm *lấy dữ liệu hiện tại*, hàm *lấy dữ liệu lúc render phía server*.

### 3.4 Lớp dữ liệu — `src/data/`

Đây là **"cơ sở dữ liệu giả lập"** của dự án: 9 file, 640 dòng, chỉ gồm hằng số.

| File | Xuất ra | Ghi chú |
|---|---|---|
| `site.ts` | `siteIdentity`, `portalBar`, `headerContent`, link footer | Chữ ở header/footer |
| `navigation.ts` | `navItems` (5 mục) | Kèm icon từ `lucide-react` |
| `domains.ts` | `domains` (5 trụ cột) + `findDomain()` | **Có logic**: hàm tìm theo mã |
| `publications.ts` | `publications` (6 bản ghi) + `filterPublications()` | **Có logic**: lọc theo tab |
| `mentors.ts` | `mentors` (4 GV) + 2 mảng options | |
| `labs.ts` | `labs` (4 lab) + `footerLabLinks` | `footerLabLinks` **sinh ra** từ `labs` bằng `.map()` |
| `home.ts` | `homeHero`, `hotResearchTopics`, `publicationsSection` | Chữ riêng Trang chủ |
| `announcements.ts` | `announcements` (2) + `announcementTotal` | |
| `rbac.ts` | `RoleId`, `roles`, `rolePermissions` | **4 vai trò + bảng quyền** |

**Kỹ thuật TypeScript đáng chú ý trong `data/`:**

```ts
export type DomainCode = 'MATH' | 'MECH' | 'CS' | 'DS-AI' | 'OPT'
export type RoleId = 'guest' | 'student' | 'lecturer' | 'admin'
export type PublicationKind = 'project' | 'international' | 'master' | 'bachelor'
```

Đây là **union type** (kiểu hợp nhất): biến chỉ được mang **đúng 1 trong các giá trị** được liệt kê. Nếu bạn viết `kind: 'abc'` → TypeScript báo lỗi ngay. Đây là lý do dữ liệu dùng `code` thay vì tên đầy đủ (`'CS'` gọn hơn `'Khoa học Máy tính & Tin học'`, dễ so sánh).

```ts
export const rolePermissions: Record<RoleId, string[]> = { ... }
```
### 3.6 Giao diện dùng chung — `src/components/ui/` (19 file)

Đây là **bộ dụng cụ xây giao diện** của dự án. Đặc điểm chung:

```tsx
// Mẫu viết chuẩn của cả thư mục này
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface CardProps {
  className?: string       // cho phép ghi đè thêm class từ nơi gọi
  children: ReactNode      // nội dung được đặt vào
}

export function Card({ className, children }: CardProps) {
  return <div className={cn('rounded-xl border ...', className)}>{children}</div>
}
```

**`src/lib/cn.ts`** — hàm 8 dòng nhưng dùng ở **28 chỗ**:

```ts
export type ClassValue = string | number | null | undefined | false | ClassValue[]
export function cn(...values: ClassValue[]): string {
  return values.flat().filter(Boolean).join(' ')
}
```

- `values.flat()` — làm phẳng mảng lồng nhau (mảng trong mảng).
- `.filter(Boolean)` — loại bỏ `undefined`, `null`, `false`, `''` (giá trị "falsy").
- `.join(' ')` — nối thành chuỗi class.

> ⚠️ **Điểm cần hiểu đúng:** hàm này chỉ **nối chuỗi**, nó **KHÔNG** giải quyết xung đột class Tailwind. Nếu bạn viết `cn('p-2', 'p-4')` thì kết quả là `"p-2 p-4"` — trình duyệt sẽ áp dụng cái nào sau cùng. Thư viện `tailwind-merge` mới làm xử lý xung đột này. Dự án cố ý không dùng thư viện, nên khi sửa giao diện bạn nên tránh truyền class mâu thuẫn.

Danh sách component `ui/`: `Avatar, Badge, Button, button-variants, Card, Checkbox, Chip, Container, EmptyNotice, FilterTabs, IconButton, Link, Modal, PageHero, SearchInput, SectionHeader, SegmentedToggle, Select, TextField`

> `button-variants.ts` tách riêng khỏi `Button.tsx` vì `SearchInput` cần dùng **class của nút** mà không muốn tạo cả component `<Button>`.

### 3.7 Cấu hình giao diện — `src/index.css`

```css
@import "tailwindcss";

@theme {
### 3.8 Trang — `src/pages/` (7 file)

| File | Chức năng | Có state? |
|---|---|---|
| `HomePage.tsx` | Trang chủ — chỉ **ghép** 4 component, không có logic | ❌ (23 dòng) |
| `SearchPage.tsx` | Tìm kiếm + 2 bộ lọc + sắp xếp + đổi kiểu hiển thị | ✅ 5 `useState` |
| `MentorsPage.tsx` | Danh sách GV + 3 bộ lọc | ✅ 4 `useState` |
| `LabsPage.tsx` | Danh sách Lab + tìm kiếm | ✅ 1 `useState` |
| `PillarsPage.tsx` | 5 trụ cột — chỉ lặp `domains.map()` | ❌ (28 dòng) |
| `DetailPages.tsx` | 5 trang chi tiết gộp trong 1 file | ❌ |
| `PlaceholderPage.tsx` | **Trang giữ chỗ** cho nội dung chưa có ảnh chụp | ❌ |

> **Chiến lược "Trang mỏng – Component dày":** `HomePage` và `PillarsPage` gần như không có logic, chỉ sắp xếp component. Nhờ vậy khi cần sửa giao diện trang chủ, bạn mở `src/components/home/` chứ không phải `pages/`.
>
> **`DetailPages.tsx` gộp 5 trang** (`PublicationDetailPage`, `MentorDetailPage`, `LabDetailPage`, `AnnouncementsPage`, `NotFoundPage`) vì chúng đều là biến thể của cùng một khuôn: tìm dữ liệu theo `id` → nếu không có thì `NotFoundPage` → nếu có thì đưa vào `PlaceholderPage`.

---

## 4. Luồng thực thi tổng thể: từ lúc bấm `npm run dev` đến khi thấy giao diện

```
[Bước 1]  Bạn gõ: npm run dev
    │      Vite đọc vite.config.ts, bật plugin React + Tailwind,
    │      khởi động máy chủ phát triển ở localhost:5173
    ▼
[Bước 2]  Bạn mở trình duyệt → GET http://localhost:5173/
    │      Vite trả về nội dung index.html
    ▼
[Bước 3]  Trình duyệt đọc index.html
    │      ├─ tìm thấy <div id="root"></div>   (rỗng)
    │      └─ thấy <script type="module" src="/src/main.tsx">  → tải file đó
    ▼
[Bước 4]  Vite biến đổi mã nguồn TRƯỚC khi gửi cho trình duyệt
    │      ├─ main.tsx        → JavaScript thuần (bỏ kiểu TS)
    │      ├─ .tsx            → JSX được chuyển thành hàm gọi
    │      ├─ "@/data/home"   → đường dẫn thật nhờ alias
    │      └─ index.css       → Tailwind quét toàn bộ class đã dùng
    │                          và SINH RA đúng các đoạn CSS cần thiết
    ▼
[Bước 5]  Trình duyệt chạy main.tsx
           createRoot(document.getElementById('root')!).render(...)
    ▼
[Bước 6]  React dựng cây component — theo thứ tự lồng nhau:
    │
    └─ <StrictMode>
        └─ <AuthProvider>            ← tạo state: role='guest', user=null,
           │                           authModal=null, debugBarVisible=true
           └─ <App />
               ├─ gọi useRoute() → đọc window.location.hash
               │     hash rỗng → { path:'/', segments:[], query:{}, raw:'' }
               ├─ useEffect: window.scrollTo(0,0)
               └─ render <AppShell>{renderPage(route)}</AppShell>
                    │
                    ├─ <DebugRbacBar />      ← thanh "SWITCHMODE: ON"
                    ├─ <AppHeader />          (dính trên cùng khi cuộn)
                    │    ├─ <PortalBar />     ← dải breadcrumb ĐHQGHN
                    │    ├─ <SiteHeader />    ← logo, ô tìm kiếm, nút Đăng nhập
                    │    └─ <MainNav />       ← 5 mục điều hướng
                    ├─ <main>
                    │    └─ renderPage() trả về <HomePage />
                    │         ├─ <HeroSection />        ← tiêu đề + ô tìm kiếm lớn
                    │         └─ <Card>
                    │              ├─ <PillarGrid />         ← 5 thẻ trụ cột
                    │              └─ <PublicationsSection/> ← công trình
                    │                   ├─ <FilterTabs />      ← 5 tab lọc
---

## 5. Khi người dùng chuyển trang — luồng đầy đủ

```
Người dùng bấm menu "5 Trụ cột Nghiên cứu"
    ▼
<Link to="/tru-cot">  →  <a href="#/tru-cot">
    ▼
Trình duyệt đổi phần hash của URL thành "#/tru-cot"
    ▼
Trình duyệt tự động bắn sự kiện "hashchange"
    ▼
router.ts: current = parseHash('#/tru-cot')
           = { path:'/tru-cot', segments:['tru-cot'], query:{}, raw:'#/tru-cot' }
    ▼
router.ts gọi vòng lặp: for (const listener of listeners) listener()
    ▼
useRoute() nhận snapshot MỚI khác snapshot cũ → React biết phải render lại
    ▼
App() chạy lại → renderPage(route) → switch(section='tru-cot') → <PillarsPage />
    ▼
useEffect trong App chạy (vì route.raw đổi) → window.scrollTo(0, 0)  ← cuộn lên đầu
    ▼
Trang mới hiện ra
```

> **Vì sao App.tsx có `useEffect(() => window.scrollTo(0, 0), [route.raw])`?**
> Không có nó, khi bạn cuộn xuống giữa trang rồi bấm sang trang khác, bạn vẫn ở vị trí giữa trang → thấy trang mới bị cắt cụt. Đây là "chi tiết nhỏ nhưng tạo cảm giác chuyên nghiệp".
>
> `[route.raw]` là **mảng phụ thuộc**: effect chỉ chạy lại khi giá trị này thay đổi.

**So sánh hai cách chuyển trang trong dự án:**

| Cách | Ví dụ | Khi nào dùng |
|---|---|---|
| `<Link to="/tru-cot">` | Chuyển trang thuần | Đi tới trang khác (chỉ đổi hash) |
| `navigate(buildPath('/tim-kiem', { q: 'xfem' }))` | Tìm kiếm | Trong `onSubmit` của form — cần **tạo URL có tham số** |

---

## 6. Cây component (ai chứa ai)

```
App
└── AppShell ──────────────────────────────────── "khung" dùng chung mọi trang
    ├── DebugRbacBar            ┐
    ├── AppHeader               │ dùng useAuth() + useRoute()
    │   ├── PortalBar           │
    │   ├── SiteHeader          │── HeaderSearch ── SearchInput
    │   └── MainNav             │
    ├── <main> ─ renderPage() ──┴── trang hiện tại
    │   │
    │   ├── HomePage
    │   │   ├── HeroSection ──── SearchInput (+ nút "Tìm" bên trong)
    │   │   └── Card
    │   │       ├── PillarGrid          → Badge, Link, SectionHeader
    │   │       └── PublicationsSection → FilterTabs, PublicationViewToggle,
    │   │           │                   → PublicationResults
    │   │           │                        ├── PublicationCard ── PublicationCover
    │   │           │                        └── PublicationListItem
---

## 7. Dữ liệu: tạo ở đâu, truyền qua đâu, dùng ở đâu

### 7.1 Nguồn dữ liệu (3 loại)

```
┌─ A. HẰNG SỐ TRONG src/data/ ─────────────────────────────┐
│  domains.ts      →  5 trụ cột                              │
│  publications.ts →  6 công trình + nhãn loại + hàm lọc     │
│  mentors.ts      →  4 giảng viên                            │
│  labs.ts         →  4 lab                                   │
│  announcements.ts→  2 thông báo                             │
│  navigation.ts   →  5 mục menu                             │
│  site.ts         →  chữ header/footer                       │
│  home.ts         →  chữ hero trang chủ                      │
│  rbac.ts         →  4 vai trò + bảng quyền                 │
└────────────────────────────────────────────────────────────┘

┌─ B. HẰNG SỐ NỘM BỘ component ────────────────────────────┐
│  AuthProvider.tsx  → demoAccounts   (3 tài khoản giả)       │
│  AuthModal.tsx     → audienceOptions (Sinh viên/GV)         │
│  DebugRbacBar.tsx  → roleIcons      (Eye/GraduationCap/...) │
│  PublicationCover  → coverStyles    (gradient theo loại)     │
│  button-variants   → variantStyles, sizeStyles              │
│  SiteFooter.tsx    → footerLinkClass                        │
│  MainNav.tsx       → isActiveRoute()  ← HÀM LOGIC           │
└────────────────────────────────────────────────────────────┘

┌─ C. DỮ LIỆU SINH RA (derived) ────────────────────────────┐
│  labs.ts      → footerLabLinks = labs.map(lab => ({...}))   │
│  PublicationsSection → filterTabs = publicationFilters.map()│
│  SearchPage   → results = useMemo(() => filter + sort)     │
│  MentorsPage  → filtered = useMemo(() => filter)           │
│  SiteHeader   → roleLabel = roles.find(...)?.label          │
└────────────────────────────────────────────────────────────┘
```

### 7.2 Ba cách "truyền dữ liệu" trong dự án

**① Props — cha truyền cho con (chiều xuống)**

```tsx
// PillarsPage (cha)
{domains.map((domain, index) => (
  <PillarCard key={domain.code} domain={domain} order={String(index + 1).padStart(2, '0')} />
))}

// PillarCard (con) — nhận và dùng, KHÔNG tự tải về
export function PillarCard({ domain, order }: PillarCardProps) { ... domain.fullName ... }
```

**② Context — chia sẻ toàn cây (không cần props xuyên tầng)**

```
AuthProvider (giữ state)  ──►  AuthContext  ──►  useAuth()
                                                      │
      ┌───────────────────────────────────────────────┼──────────────┬──────────────┐
      ▼                          ▼                   ▼              ▼              ▼
 DebugRbacBar               SiteHeader        PublicationCard  PublicationListItem  AuthModal
 (đổi vai trò)              (tên/avatar)      (check quyền)     (check quyền)    (form)
```

---

## 8. Logic lọc & tìm kiếm (chi tiết đáng học nhất)

Dự án có **3 nơi** làm việc lọc — đều dùng cùng một khuôn mẫu:

```tsx
const filtered = useMemo(() => {
  const keyword = query.trim().toLowerCase()          // 1. chuẩn hoá từ khoá
  return labs.filter((lab) =>                          // 2. lọc từng phần tử
    [lab.tag, lab.name, lab.description, ...lab.focusTopics]
      .join(' ')                                       // 3. gộp thành 1 chuỗi
      .toLowerCase()                                   // 4. về chữ thường
      .includes(keyword),                              // 5. có chứa từ khoá không
  )
}, [query])                                           // 6. chỉ tính lại khi query đổi
```

Đọc từng bước:

- `.trim()` — bỏ khoảng trắng thừa đầu/cuối.
- `.toLowerCase()` — giúp tìm "XFEM" khi gõ "xfem".
- `mảng.join(' ')` — gộp nhiều trường thành một chuỗi để tìm trên tất cả.
- `.includes(keyword)` — trả `true`/`false`, dùng làm điều kiện giữ lại phần tử.
- `useMemo(..., [query])` — **ghi nhớ kết quả**. Chỉ khi `query` đổi mới tính lại, tránh lọc lại toàn bộ mỗi lần gõ.

Trong `SearchPage` còn có **sắp xếp**:

```tsx
return [...filtered].sort((a, b) => {
  if (sort === 'views')     return b.views - a.views         // b - a = giảm dần
  if (sort === 'downloads') return b.downloads - a.downloads
  return b.year - a.year
})
```

> `[...filtered]` — tạo **bản sao** trước khi `.sort()`. Cần thiết vì `.sort()` sửa tại chỗ mảng gốc. Nếu thiếu, dữ liệu gốc trong `publications.ts` sẽ bị đảo thứ tự vĩnh viễn mỗi lần người dùng đổi bộ lọc.

**Bộ lọc nhiều điều kiện dùng `return false` sớm** (`SearchPage`, `MentorsPage`):

```tsx
if (domain !== 'all' && item.domainCode !== domain) return false
if (kind !== 'all' && item.kind !== kind) return false
if (!keyword) return true                    // không có từ khoá → giữ lại
return [...].includes(keyword)
```

> Giá trị `'all'` là **quy ước** (convention) chứ không phải thứ gì đặc biệt: nếu bộ lọc đang ở `'all'` thì bỏ qua điều kiện đó.

---

## 9. Thư viện bên ngoài và vai trò

### 9.1 Thư viện chính (runtime) — chỉ **3** nhóm

| Thư viện | Vai trò | Dùng ở đâu |
|---|---|---|
| `react` + `react-dom` | Nền tảng: JSX, component, hook | Mọi file |
| `lucide-react` | **Bộ icon SVG** (không phải ảnh) | 34 file |
| `tailwindcss` + `@tailwindcss/vite` | Viết giao diện bằng class tiện ích | `index.css` + mọi `className` |

> **`lucide-react` là icon component, không phải file ảnh.** Mỗi icon là một component React nhận props `size`, `className`, `strokeWidth`:
>
> ```tsx

---

## 10. Chức năng chưa hoàn thiện (ghi nhận, không suy đoán)

Tôi chỉ nêu những gì **kiểm chứng được từ mã nguồn**:

**① Nhiều trang là `PlaceholderPage` — giao diện chưa được tái tạo**
`#/cong-trinh/:id`, `#/giang-vien/:id`, `#/lab/:id`, `#/thong-bao` chỉ hiện dữ liệu dạng bảng + dòng ghi chú tự nhận:
>
> *"Trang này không xuất hiện trong ảnh chụp màn hình của bản mẫu nên phần giao diện chi tiết chưa được tái tạo."*

Trang chi tiết chỉ liệt kê vài trường, **không có**: nội dung toàn văn, tải PDF, bình luận, trích dẫn. Nút "Xem PDF" chỉ điều hướng tới trang giữ chỗ — **không có file PDF nào**.

**② Đăng nhập không kiểm tra mật khẩu**

```tsx
// AuthModal.tsx — nhập mật khẩu, xác nhận mật khẩu...
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
...
signIn({ email, role: isLogin ? 'student' : audience })
//  ↑ không truyền password, không so sánh confirmPassword với password
```

Nhập bất kỳ mật khẩu nào (kể cả để trống — dù `required` chỉ chặn ở tầng HTML) đều "đăng nhập thành công".

**③ Trạng thái đăng nhập mất khi tải lại trang**
Không có `localStorage`/`sessionStorage` (đã grep xác nhận). Đóng tab là về vai trò `guest`.

**④ Nút chuông thông báo chưa làm gì**

```tsx
<IconButton label="Thông báo" badge={notificationsCount}>   // không có onClick
```

`notificationsCount = 3` là hằng số. Nhấn chuông không mở gì.

**⑤ Nút "Lưu công trình" không lưu thật**

```tsx
const [saved, setSaved] = useState(false)   // chỉ tồn tại trong RAM của 1 thẻ công trình
onClick={() => setSaved((value) => !value)}
```

Tải lại trang là mất. Không có `localStorage`, không có API.

**⑥ Trang không tải được từ lỗi 404** — không có thao tác `fetch` nào để xảy ra lỗi mạng.

**⑦ Một số ô chọn chưa dùng hết danh sách**

- `MentorAudience` khai báo 3 giá trị (`'student' | 'master' | 'phd'`) nhưng `mentorAudienceOptions` **chỉ cung cấp `'all'` và `'student'`** — 2 giá trị kia không dùng được.
- `SearchPage` bình luận: *"bản mẫu chỉ chụp được 2 bộ lọc đầu của khối này"* — còn bộ lọc khác không có.

**⑧ Không có `keyProjects` cho Lab nào** → nhánh `else` trong `LabCard.tsx` luôn chạy, thẻ Lab luôn hiện dòng *"…chưa có trong dữ liệu quan sát."*

**⑨ 16 ảnh trong `public/` không được dùng**

```
public/home/image*.png, public/lab/image*.png, public/five_study/...,
public/login/..., public/teacher_mentor/..., public/map_knowledge_and search/...
```

Đã grep toàn bộ `src/` và `index.html`: **không file nào tham chiếu**. Chúng là **ảnh chụp màn hình bản mẫu** dùng làm tài liệu tham chiếu khi tái tạo giao diện. Duy nhất `public/favicon.svg` được dùng (`index.html` dòng 6). Vì Vite copy nguyên thư mục `public/` sang `dist/`, 16 ảnh này **đang được đóng gói vào bản build dù không dùng đến**.

**⑩ Bảng filter và số liệu không nhất quán**

```ts
export const libraryTotal = 7        // link ghi "Xem toàn bộ kho tài liệu (7 công trình)"
export const publications = [...6 phần tử...]   // thực tế chỉ có 6

export const announcementTotal = 4    // link ghi "Xem (4)"
export const announcements = [...2 phần tử...]  // thực tế chỉ có 2
```

Tương tự: `homeHero.stats` ghi "257+ công trình / 36 giảng viên / 5 phòng lab" trong khi dữ liệu chỉ có 6 / 4 / 4. Theo chú thích, đây là **số liệu đọc nguyên văn từ bản mẫu**, giữ lại để khớp giao diện — nhưng khi nối backend thật phải thay.

---

## 11. Tình trạng kỹ thuật hiện tại

| Kiểm tra | Kết quả |
|---|---|
| `npm run lint` | ✅ **Sạch**, không cảnh báo |
| Số dòng trong `src/` | 4.440 |
| Lỗi TypeScript | Không phát hiện (lint đã bao gồm `tseslint.configs.recommended`) |
| `git status` | Sạch — không có file nào bị sửa bởi tôi (trừ thư mục `public/docs/`) |
| Commit | `f04fd36 Initial commit` — toàn bộ dự án nằm trong 1 commit |

---

## 12. Đề xuất thứ tự học

| # | Chủ đề | File | Vì sao học phần này trước |
|---|---|---|---|
| **1** | Nền tảng: HTML & Tailwind | `index.html` → `src/index.css` | Thấy "khung" và "màu sắc" trước khi đụng React |
| **2** | Điểm khởi động | `package.json` → `vite.config.ts` → `tsconfig.app.json` → `src/main.tsx` | Hiểu công cụ và cách app "sống" |
| **3** | **Router** | `src/router/router.ts` → `useRoute.ts` | Mọi thứ chuyển trang đều đi qua đây |
| **4** | Kiểu dữ liệu & dữ liệu tĩnh | `src/types/index.ts` → `src/data/domains.ts` → `publications.ts` | Học `interface`, `type`, `Record` trên ví dụ thật |
| **5** | Component cơ bản | `src/lib/cn.ts` → `components/ui/Card.tsx`, `Container.tsx`, `Button.tsx`, `Link.tsx` | Nắm props, JSX, cách ghép class |
| **6** | Luồng điều phối | `src/App.tsx` → `pages/HomePage.tsx` → `components/home/*` | Thấy cách trang được "lắp ráp" |
| **7** | State & Hook | `pages/SearchPage.tsx` → `MentorsPage.tsx` | `useState`, `useMemo`, lọc–tìm–sắp xếp |
| **8** | Context & phân quyền | `features/auth/*` → `components/layout/DebugRbacBar.tsx` | Bài toán trạng thái dùng chung |

**Lý do sắp xếp này:** phần 1–2 không cần biết React; phần 3 phải đi trước phần 6 vì `App.tsx` phụ thuộc router; phần 4 đi trước phần 7 vì hiểu cấu trúc dữ liệu thì mới hiểu vì sao code lọc được.

---

## 13. Câu hỏi tự kiểm tra sau khi học xong toàn bộ

1. Tại sao `index.html` vẫn cần `<div id="root">` khi React đã sinh ra mọi thứ?
2. Khác biệt giữa `src/data/publications.ts` và một API thật là gì?
3. Nếu đổi alias `@` trong `vite.config.ts` nhưng quên `tsconfig.app.json`, chuyện gì xảy ra?
4. Tại sao dùng hash (`#/`) thay vì đường dẫn thật?
5. `SearchPage` có `key={route.raw}` — bỏ đi thì ô tìm kiếm sẽ hỏng như thế nào?
6. `useMemo` ở `SearchPage` ngăn được việc gì?
7. `cn()` có xử lý xung đột class Tailwind không?

---

> **Trạng thái:** Giai đoạn 1 hoàn tất. Tài liệu chi tiết từng file sẽ được bổ sung dần khi học theo thứ tự ở mục 12.

> import { ArrowRight, GraduationCap, Layers } from 'lucide-react'
> <ArrowRight size={16} aria-hidden />   // → thẻ <svg> 16px trong HTML
> ```
>
> Nhờ vậy đổi màu/size icon chỉ bằng class Tailwind, không cần chỉnh sửa ảnh.
>
> `aria-hidden` xuất hiện cực nhiều — nghĩa là "icon này chỉ để trang trí, **đọc khiếm khuyết** không cần đọc nó", giúp người dùng điều khiển bằng màn hình đọc không bị vướng.

### 9.2 Công cụ phát triển (devDependencies)

`vite` (máy chủ + đóng gói) · `@vitejs/plugin-react` (biến JSX thành JS) · `typescript` (kiểm tra kiểu) · `eslint` + `typescript-eslint` + plugins (soát lỗi) · `@types/*` (định nghĩa kiểu cho thư viện JS).

### 9.3 Cố ý **không** dùng (quyết định có chủ đích)

| Thư viện thường dùng | Thay bằng | Lý do (theo chính README) |
|---|---|---|
| `react-router-dom` | `src/router/` (82 dòng tự viết) | Bản mẫu là SPA chỉ hiện shell → hash route đủ dùng |
| `clsx` + `tailwind-merge` | `src/lib/cn.ts` (8 dòng) | Tránh thêm dependency |
| `axios` / backend | Hằng số trong `src/data/` | Bản mẫu không có máy chủ |

> **Bài học:** Không phải lúc nào cũng cần thư viện. Với 9 trang và 9 đường dẫn, 82 dòng tự viết còn dễ hiểu hơn việc học API của React Router.


**③ State cục bộ — dữ liệu chỉ sống trong 1 component**

```tsx
// Trong SearchPage
const [query, setQuery]   = useState(route.query.q ?? '')  // đọc từ URL lúc mở trang
const [domain, setDomain] = useState(route.query.domain ?? 'all')
const [kind, setKind]     = useState(route.query.kind ?? 'all')
const [sort, setSort]     = useState('newest')
const [view, setView]     = useState<PublicationView>('grid')
```


    │   │           └── HomeSidebar → MentorSidebarList, LabSidebarList,
    │   │                            Chip, SectionHeader
    │   │
    │   ├── SearchPage → PageHero, SearchInput, Select, Button,
    │   │                → PublicationViewToggle, PublicationResults
    │   ├── PillarsPage → PageHero → PillarCard → Card, Chip
    │   ├── MentorsPage → PageHero, SearchInput, Select, Checkbox,
    │   │                → EmptyNotice | MentorCard → Card, Avatar, Badge
    │   ├── LabsPage    → PageHero, SearchInput → EmptyNotice | LabCard
    │   └── DetailPages → PlaceholderPage (dùng cho cả 5 trang chi tiết)
    ├── SiteFooter → FooterHeading, BrandMark, Container, Link
    └── AuthModal → Modal → TextField, Button      (chỉ hiện khi authModal ≠ null)
```


                    │                   └─ <PublicationResults/> → <PublicationCard/>
                    │              <HomeSidebar />
                    │                   ├─ <MentorSidebarList />
                    │                   ├─ <LabSidebarList />
                    │                   └─ danh sách thông báo
                    ├─ <SiteFooter />
                    └─ <AuthModal />        ← render null vì chưa mở
    ▼
[Bước 7]  Trình duyệt vẽ HTML từ cây trên → BẠN NHÌN THẤY TRANG CHỦ
```

**Điểm bắt đầu chính xác:** `index.html` → `src/main.tsx`.
**Điểm quyết định trang nào hiện:** `App.tsx` hàm `renderPage()`.


  --color-brand-dark: #002855;
  --color-brand: #003D7A;
  --color-page: #F8FAFC;
  --font-sans: "Plus Jakarta Sans", sans-serif;
  --radius-btn: 5px;
}
```

> **Đây là cú pháp Tailwind CSS v4.** Không có file `tailwind.config.js` — toàn bộ cấu hình nằm trong CSS bằng khối `@theme`.
>
> Khai báo `--color-brand` **tự động tạo ra** các class: `bg-brand`, `text-brand`, `border-brand`, `text-brand-dark`… Nhờ vậy khi đọc code bạn sẽ thấy `bg-brand` chứ không phải `bg-[#003D7A]` — dễ hiểu hơn nhiều.

> ⚠️ **Cẩn trọng khi tìm tài liệu Tailwind trên Google:** v4 đã **đổi tên** nhiều class. Ví dụ `bg-gradient-to-br` → `bg-linear-to-br` (dùng ở `PublicationCover.tsx`). Mấy bài viết hướng dẫn Tailwind v3 sẽ gây hiểu nhầm.



`Record<K, V>` = "object có key kiểu `K`, value kiểu `V`". Ở đây: bắt buộc phải có **đủ 4 vai trò**, thiếu là lỗi TypeScript.

### 3.5 Tính năng đăng nhập & phân quyền — `src/features/auth/`

3 file, tách bạch rõ ràng:

| File | Vai trò | Có JSX? |
|---|---|---|
| `auth-context.ts` | Định nghĩa **hợp đồng** + cách đọc dữ liệu (`useAuth()`) | ❌ |
| `AuthProvider.tsx` | **Nắm giữ state**, cung cấp cho toàn cây | ✅ |
| `AuthModal.tsx` | Giao diện hộp thoại đăng nhập/đăng ký | ✅ |

> **Vì sao tách 3 file?** `AuthModal.tsx` cần `useAuth()`, mà `useAuth()` lấy từ `AuthContext`, mà `AuthContext` do `AuthProvider` cấp. Nếu gộp tất cả vào 1 file, file đó sẽ vừa định nghĩa vừa cung cấp vừa tiêu thụ → dễ gây **vòng import** (A import B, B import A).

Cơ chế **Context**: cho phép component ở sâu trong cây (ví dụ `PublicationCard`) đọc dữ liệu đăng nhập mà **không cần** component cha truyền `props` xuống qua từng bậc — điều mà React gọi là *props drilling*.


    </AuthProvider>
  </StrictMode>,
)
```

- `document.getElementById('root')!` — tìm `<div id="root">` trong HTML. Dấu `!` là cú pháp TypeScript bảo "tôi chắc chắn nó không null" (nếu không chắc thì dùng `?.`).
- `createRoot(...).render(...)` — bảo React: "bắt đầu quản lý nội dung trong hộp này".
- `StrictMode` — chế độ kiểm tra của React 19, tự phát hiện lỗi (gọi `useEffect` 2 lần ở dev).
- `AuthProvider` bọc ngoài `App` để **mọi component bên trong đều đọc được thông tin đăng nhập**.
