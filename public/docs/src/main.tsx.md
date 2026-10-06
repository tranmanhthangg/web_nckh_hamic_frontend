# `src/main.tsx` — Điểm khởi động của ứng dụng

> **Trạng thái:** ✅ Đầy đủ
> **File nguồn:** `src/main.tsx` (13 dòng)

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@/features/auth/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
```

---

## A. MỤC ĐÍCH CỦA FILE

---

## B. GIẢI THÍCH CODE TỪ TRÊN XUỐNG DƯỚI

### B.1 — `import { StrictMode } from 'react'`

`StrictMode` là một **component đặc biệt** của React, không hiển thị gì lên màn hình. Nó bọc quanh app của bạn để **kiểm tra lỗi ở chế độ phát triển**.

React 19 khi bật `StrictMode` sẽ cố tình:

1. Gọi mỗi `useEffect` **hai lần** để phát hiện effect ghi dữ liệu ra ngoài rồi dọn dẹp không đúng.
2. Kiểm tra render có **tạo object/mảng mới** ở mỗi lần render không (nguyên nhân phổ biến gây vòng lặp render vô hạn).

> **Quan trọng:** `StrictMode` chỉ hoạt động khi phát triển (`npm run dev`). Khi build bản thật, React **tự bỏ qua** nó.

### B.2 — `import { createRoot } from 'react-dom/client'`

| Tên | Nghĩa |
|---|---|
| `react` | Thư viện lõi: component, hook, JSX |
| `react-dom` | Lớp giao tiếp giữa React và **DOM** (các thẻ HTML thật) |

> **Tại sao tách `react` và `react-dom`?** Trước React 18, mọi thứ nằm trong một gói `react-dom`. Từ React 18 tách ra để bản đóng gói cho server (không cần DOM) nhẹ hơn.
>
> `createRoot` nằm ở đường dẫn con `/client` vì React 18+ hỗ trợ nhiều "root" độc lập trên cùng trang.

### B.3 — `import './index.css'`

Đây là **import không có tên biến** (side-effect import). Nhiệm vụ: nạp CSS vào trang.

Nhưng với dự án này, nó còn làm thêm một việc quan trọng: `@tailwindcss/vite` sẽ **quét toàn bộ mã nguồn** để tìm các class Tailwind đã dùng, rồi **sinh ra CSS chỉ gồm những class đó**.

> **Điểm hay:** Vì CSS chỉ được sinh ra khi có class được dùng, thêm một component mới với class lạ **không cần khai báo trước** ở bất kỳ đâu. Tailwind tự phát hiện.

### B.4 — `import App from './App.tsx'` và `import { AuthProvider } from '@/features/auth/AuthProvider.tsx'`

Hai khác biệt cần chú ý:

| Dòng | Cách viết | Nghĩa |
|---|---|---|
| `import App from './App.tsx'` | `App` **không có** dấu `{}` | Đây là **default export** — export mặc định duy nhất của file |
| `import { AuthProvider } from '...'` | `AuthProvider` **có** dấu `{}` | Đây là **named export** — export có tên |

Trong `App.tsx`:
```tsx
export default function App() { ... }                  // ← default export
```
Trong `AuthProvider.tsx`:
```tsx
export function AuthProvider({ children }) { ... }      // ← named export
```

> **Quy tắc nhớ:**
> - `export default X` → import: `import X from 'file'`
> - `export function X()` → import: `import { X } from 'file'`
> - Nhiều file có thể dùng chung một `export` có tên; `default` thì mỗi file chỉ có 1.

### B.5 — `createRoot(document.getElementById('root')!)`

**Bước 1: `document.getElementById('root')`**
Trong `index.html`:
```html
<div id="root"></div>
```
→ Hàm này tìm trong **tài liệu HTML** đang tải thẻ có `id="root"`, trả về **phần tử DOM** tương ứng.

**Bước 2: dấu `!` (dấu chấm than)**
```tsx
document.getElementById('root')!
```
TypeScript biết `getElementById` có thể trả về `null` (vì thẻ có thể không tồn tại). Biến kiểu `HTMLElement | null` sẽ gây lỗi khi truyền vào hàm yêu cầu `HTMLElement`.

Dấu `!` là cách bạn nói với TypeScript: **"Tôi chắc chắn nó không null, hãy tin tôi."**

```tsx
// [VÍ DỤ minh họa]
const x = "hello"
x.length      // ✅ OK vì x luôn là string

const y = document.getElementById('khong-ton-tai')
y.length      // ❌ Lỗi: 'y' is possibly 'null'
y!.length     // ✅ Bỏ qua kiểm tra
```

> ⚠️ **Cảnh báo:** `!` chỉ làm TypeScript *im lặng*, không làm mã an toàn hơn. Nếu bạn viết sai `id="root"` trong HTML, dấu `!` **không cứu được** — lỗi hiện ra lúc chạy chứ không phải lúc viết code. Trong dự án này dùng `!` là chấp nhận được vì `index.html` và `main.tsx` luôn đi cùng nhau.

**Bước 3: `createRoot(...)`**
Tạo một "gốc" React gắn với phần tử DOM đó. Từ giờ, React sẽ **quản lý toàn bộ nội dung bên trong** nó.

### B.6 — `.render(<StrictMode>...</StrictMode>)`

```tsx
.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
```

> **Dấu `,` ở cuối trong ngoặc `()`?** Đây là dấu phẩy "trailing". Trong JSX/TS cho phép, Vite tự bỏ qua. Nhiều dự án dùng để code nhất quán khi gọi hàm nhiều tham số.

**Cấu trúc lồng nhau — đọc từ trong ra ngoài:**

```
<StrictMode>           ← lớp ngoài cùng: kiểm tra lỗi
  <AuthProvider>       ← cung cấp dữ liệu đăng nhập cho mọi component bên trong
    <App />            ← ứng dụng thật sự
  </AuthProvider>
</StrictMode>
```

| Tầng | Ý nghĩa |
|---|---|
| `StrictMode` | Bọc ngoài để kiểm tra. Có thể bỏ mà app vẫn chạy. |
| `AuthProvider` | **Bắt buộc về mặt logic.** Nếu bỏ nó, mọi component gọi `useAuth()` sẽ ném lỗi ngay. |
---

## C. GIẢI THÍCH LUỒNG HOẠT ĐỘNG

```
Trình duyệt tải index.html
    │
    ▼
Tìm thấy <div id="root"></div>  ← RỖNG, chưa có gì
    │
    ▼
Thấy <script type="module" src="/src/main.tsx">
    │
    ▼
Vite biến đổi main.tsx → JavaScript:
    ├─ Bỏ kiểu TypeScript
    ├─ Chuyển JSX thành hàm gọi hàm
    ├─ Giải "@/features/..." thành đường dẫn thật
    └─ Với ./index.css: chạy Tailwind sinh CSS
    │
    ▼
Trình duyệt thực thi JavaScript đã biến đổi
    │
    ▼
① document.getElementById('root')  →  tìm thấy div rỗng
② createRoot(div)                   →  React bắt đầu quản lý div này
③ .render(<StrictMode><AuthProvider><App/></AuthProvider></StrictMode>)
    │
    ▼
④ React gọi <AuthProvider /> lần đầu
     └─ AuthProvider chạy useState 4 lần → tạo state khởi tạo:
        role='guest', user=null, authModal=null, debugBarVisible=true
    │
    ▼
⑤ React gọi <App />
     ├─ useRoute() đọc window.location.hash (đang rỗng)
     ├─ render <AppShell> chứa trang do renderPage() chọn
     └─ trả về: DebugRbacBar, AppHeader, main, SiteFooter, AuthModal
    │
    ▼
⑥ React chuyển cây component thành HTML thật, chèn vào div#root
    │
    ▼
⑦ BẠN NHÌN THẤY GIAO DIỆN
```

**Điều gì xảy ra đầu tiên?** Trình duyệt đọc `index.html`, tạo `<div id="root">` **rỗng**.

**Component nào render trước?** `AuthProvider` — vì nó là cha của `App`.

**Dữ liệu đi qua đâu?** `AuthProvider` tạo state → đưa vào `AuthContext` → các component con gọi `useAuth()` để đọc.

**Kết quả cuối cùng?** `<div id="root">` giờ chứa toàn bộ giao diện thay vì rỗng.

---

## D. KIẾN THỨC LẬP TRÌNH LIÊN QUAN

### D.4 — `children` — nội dung nằm giữa thẻ

```tsx
<AuthProvider>          ← thẻ mở
  <App />               ← children (con)
</AuthProvider>          ← thẻ đóng
```

Trong `AuthProvider.tsx`:
```tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
```

Destructuring `{ children }` rút ra **nội dung trong thẻ** để component cha có thể truyền lại xuống bên trong Provider.

### D.5 — `StrictMode`

Component không hiển thị gì, chỉ bật **chế độ kiểm tra** của React ở môi trường phát triển. Giúp phát hiện:
- Effect không cleanup đúng cách.
- Object/array được tạo lại mỗi lần render (nguyên nhân phổ biến của vòng lặp render vô hạn).
- Side effect không an toàn (như ghi trực tiếp ra DOM ngoài React).

---

## E. VÍ DỤ THỰC TẾ

### E.1 — Mô phỏng 6 bước đầu tiên

Đầu vào: URL là `http://localhost:5173/` (chưa có hash)

| Bước | Biến / thao tác | Giá trị | Ghi chú |
|---|---|---|---|
| 1 | `document.getElementById('root')` | phần tử `<div id="root">` | Thẻ này rỗng, chưa có con nào |
| 2 | `!` (kiểm tra kiểu) | `HTMLElement` | Bỏ qua khả năng `null` |
| 3 | `createRoot(...)` | Root React | Gắn React vào thẻ div |
| 4 | `<StrictMode>` | Bọc ngoài | Chỉ hoạt động ở chế độ dev |
| 5 | `<AuthProvider>` | Khởi tạo state | `role='guest'`, `user=null`, `authModal=null`, `debugBarVisible=true` |
| 6 | `<App />` | `useRoute()` đọc hash | `window.location.hash === ''` |

### E.2 — `parseHash('')` trả về gì?

Nội dung `<div id="root">` sau bước 6:

```html
<div id="root">
  <div class="flex min-h-screen flex-col">      <!-- AppShell -->
    ... DebugRbacBar, AppHeader, main, SiteFooter, AuthModal(null) ...
  </div>
</div>
```

Vì `route.segments` là `[]`, `switch(section)` với `section === undefined` rơi vào `case undefined` → `<HomePage />`. **Đây là lý do trang chủ hiện ra khi mới mở website.**

---

## F. TỔNG KẾT

### F.1 — Kiến thức quan trọng cần nhớ

1. **Đây là điểm vào duy nhất.** Chỉ file này gọi `createRoot`.
2. **`index.html` có `<div id="root"></div>`** vì React cần một phần tử DOM rỗng để gắn vào.
3. **`import './index.css'`** vừa nạp CSS vừa kích hoạt Tailwind quét toàn bộ mã nguồn.
4. **`@/` = `src/`** — nhờ alias trong `vite.config.ts` + `tsconfig.app.json`.
5. **Thứ tự bọc:** `StrictMode` → `AuthProvider` → `App`. Đảo `AuthProvider` ra ngoài `App` sẽ làm app hỏng.
6. **`{}` trong `import` = named export**; không có `{}` = default export.
7. **Dấu `!`** bỏ qua kiểm tra `null` của TypeScript — không phải kiểm tra an toàn thật.

### F.2 — Các hàm quan trọng

| Hàm | Nhiệm vụ |
|---|---|
| `createRoot(element)` | Tạo gốc React gắn với phần tử DOM |
| `.render(<jsx>)` | Yêu cầu React vẽ cây component vào gốc |
| `document.getElementById(id)` | Tìm phần tử HTML theo `id` |

### F.3 — File có liên quan

| File | Quan hệ |
|---|---|
| `index.html` | Chứa `<div id="root">` và `<script src="/src/main.tsx">` |
| `src/App.tsx` | Được render ngay bên trong `AuthProvider` |
| `src/features/auth/AuthProvider.tsx` | Bọc ngoài `App`, cấp Context cho toàn cây |
| `src/index.css` | Được nạp để Tailwind sinh CSS |
| `vite.config.ts` | Cấu hình alias `@` và plugin JSX |
| `tsconfig.app.json` | Cho phép `allowImportingTsExtensions` (viết `.tsx` trong import) |

### F.4 — Câu hỏi tự kiểm tra

1. Tại sao `index.html` cần `<div id="root"></div>` nếu React tự sinh ra mọi thứ?
2. Nếu bỏ `<AuthProvider>` khỏi `main.tsx`, chuyện gì xảy ra khi chạy? *(gợi ý: xem `useAuth()` trong `auth-context.ts`)*
3. `import App from './App.tsx'` — nếu đổi thành `import { App } from './App.tsx'` thì sao?
4. Dấu `!` ở `document.getElementById('root')!` giúp ích gì, và khi nào nó gây hại?
5. `import './index.css'` — tại sao bỏ dòng này thì trang mất hết màu?
6. `<StrictMode>` chỉ hoạt động khi nào? Vì sao?
7. `.tsx` là viết tắt của từ gì? `.ts` khác `.tsx` ở chỗ nào?

---

**Xem tiếp:** [`./router/router.ts.md`](./router/router.ts.md) — file quyết định trang nào hiển thị

### D.1 — `import` / `export`: cách chia sẻ code giữa các file

Mỗi file là một **module** riêng biệt. Để dùng code của file khác, bạn `import`. Để cho file khác dùng, bạn `export`.

```ts
// ── File A: nguồn ─────────────────────────────────
export const PI = 3.14           // named export
export function area(r) {        // named export
  return PI * r * r
}
export default function hinhTron() { ... }   // default export (chỉ 1)

// ── File B: dùng ─────────────────────────────────
import hinhTron, { PI, area } from './A'

hinhTron()     // dùng default export
area(2)        // PI = 3.14 → 3.14 * 4 = 12.56
```

> **Tự điển:** Một file .ts/.tsx là một module. Bạn **không** cần `require` hay `module.exports` như trong Node.js cũ.

### D.2 — `default export` vs `named export`

| | Named export | Default export |
|---|---|---|
| Cú pháp | `export function X()` hoặc `export const x` | `export default X` |
| Số lượng / file | **Không giới hạn** | **Chỉ 1** |
| Import | `import { X } from './f'` — **phải có `{}`** | `import X from './f'` — **không `{}`** |
| Tên khi import | Phải trùng tên | Tùy ý đặt lại |

> **Mẹo nhớ:** Nếu thấy dấu `{}` trong `import` → named export. Không có → default export.

### D.3 — Component và JSX

**Component** trong React đơn giản là **một hàm trả về giao diện**:

```tsx
function XinChao(props) {
  return <h1>Xin chào {props.ten}</h1>
}

// Dùng:
<XinChao ten="Nam" />
```

**JSX** (JavaScript XML) là cú pháp cho phép viết HTML bên trong JavaScript:

| Viết HTML | Viết JSX |
|---|---|
| `class` | `className` ← bắt buộc vì `class` là từ khóa của JavaScript |
| `for` | `htmlFor` |
| `style="color: red"` | `style={{ color: 'red' }}` ← phải là **object** |
| Biến HTML | `{tenBien}` ← dùng ngoặc nhọn |
| Comment | `{/* ... */}` |

> **Cú pháp `{}` trong JSX** cho phép **chèn bất kỳ biểu thức JavaScript nào** vào giữa thẻ HTML:
> ```tsx
> <p>Tổng: {a + b}</p>
> <div className={tinhLoai()}>...</div>
> {danhSach.map(x => <li key={x.id}>{x.ten}</li>)}
> ```


| `App` | Component gốc, vào `App.tsx`. |

> **Vì sao `AuthProvider` phải bọc `App`, không phải ngược lại?**
> Vì `AuthProvider` là người **cấp** dữ liệu, `App` và tất cả component con là người **tiêu thụ**. Context chỉ truyền được xuống (cha → con), không truyền ngược lên.

### B.7 — `<App />` — cú pháp tự đóng

```tsx
<App />      // ← dấu "/" tự đóng
<App></App>  // ← dạng đầy đủ, giống nhau
```

Vì `App` **không có nội dung con** (không cần thẻ bao bên trong), dùng dạng tự đóng gọn hơn.

Trong HTML thuần bạn **không** được viết `<div />` — phải là `<div></div>`. Nhưng **JSX cho phép** dạng tự đóng.




- **Dùng để làm gì?** Đây là **cửa khẩu duy nhất** của ứng dụng. File này là nơi React được "khởi động" và nội dung bắt đầu đổ vào trang.
- **Nằm ở đâu trong kiến trúc?** Ở gốc `src/`, ngang hàng với `App.tsx` và `index.css`. Không file nào khác trong dự án gọi `createRoot`.
- **File nào import file này?** **Không file nào trong `src/`** (impossible vì đây là điểm vào). Thay vào đó, **`index.html` trỏ tới nó**:
  ```html
  <script type="module" src="/src/main.tsx"></script>
  ```
- **File này phụ thuộc vào đâu?** 5 import: `react`, `react-dom/client`, `./index.css`, `./App.tsx`, `@/features/auth/AuthProvider.tsx`

> **Vì sao import `./App.tsx` lại có đuôi `.tsx`?**
> Vì `tsconfig.app.json` bật `"allowImportingTsExtensions": true`. Nếu không bật, bạn phải viết `import App from './App'` (không đuôi).
> Thường thì React project **không** viết đuôi. Dự án này viết đuôi ở 2 chỗ (`main.tsx` và `AuthProvider`) — cả hai cách đều chạy được.
