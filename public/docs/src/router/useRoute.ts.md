# `src/router/useRoute.ts` — Cầu nối router ↔ React

> **Trạng thái:** ✅ Đầy đủ
> **File nguồn:** `src/router/useRoute.ts` (12 dòng)

```ts
import { useSyncExternalStore } from 'react'
import { getRouterSnapshot, subscribeRouter } from './router'
import type { RouterState } from './router'

/** Theo dõi route hiện tại từ hash của trình duyệt. */
export function useRoute(): RouterState {
  return useSyncExternalStore(
    subscribeRouter,
    getRouterSnapshot,
    getRouterSnapshot,
  )
}
```

---

## A. MỤC ĐÍCH CỦA FILE

- **Dùng để làm gì?** Biến 2 hàm của `router.ts` thành **một hook React** để component đọc route hiện tại.
- **Nằm ở đâu trong kiến trúc?** Thư mục `src/router/`. Đây là **tầng giữa** giữa "sự kiện trình duyệt" và "React component".

```
┌────────────────────────────────────────────────────────┐
│  router.ts          useRoute.ts          Component      │
│  (không biết React)  (bóng giữa)         (dùng React)   │
│                                                        │
│  window.hash ──► parseHash()                            │
│       │                                                │
│  listeners ◄──► useSyncExternalStore ──► useRoute() ──► │

---

## B. GIẢI THÍCH CODE TỪ TRÊN XUỐNG DƯỚI

### B.1 — `import { useSyncExternalStore } from 'react'`

Đây là hook của React 18+, được thiết kế **riêng** cho trường hợp: dữ liệu nằm **bên ngoài** React (biến module, `window.location`, WebSocket, timer…).

**Vấn đề nó giải quyết:**

Nếu dùng cách thông thường (`useState` + `useEffect`), bạn phải viết:
```tsx
// ❌ Cách làm thủ công — có 2 vấn đề
const [route, setRoute] = useState(getInitialRoute())
useEffect(() => {
  const id = window.addEventListener('hashchange', () => {
    setRoute(getCurrentRoute())
  })
  return () => window.removeEventListener('hashchange', id)
}, [])
```
1. **Render lần đầu** sẽ hiện giá trị cũ, rồi `useEffect` chạy sau mới cập nhật → **nháy/flicker**.
2. Với **render phía server (SSR)**, `useState(getInitialRoute())` chạy trên server không có `window` → lỗi.

`useSyncExternalStore` giải quyết cả hai: nó cho React biết **ngay từ đầu** dữ liệu đến từ đâu, và tự lo phần đăng ký/huỷ đăng ký.

### B.2 — `import { getRouterSnapshot, subscribeRouter } from './router'`

Hai hàm được `useSyncExternalStore` yêu cầu. Tên chúng được đặt **đúng theo chuẩn của React**:

| Tên chuẩn React | Nhiệm vụ |
|---|---|
| `subscribe` | Đăng ký hàm được gọi khi dữ liệu thay đổi → **trả về** hàm huỷ đăng ký |
| `getSnapshot` | Trả về dữ liệu hiện tại |

**Vì sao `router.ts` đặt tên đúng như vậy?**
Nhờ vậy chúng **có thể truyền thẳng** vào `useSyncExternalStore` mà không cần bọc hàm trung gian. Đây là **API theo quy ước** (conventional API).

### B.3 — `import type { RouterState } from './router'`

**`import type`** chỉ dùng ở mức **kiểu dữ liệu**, không dùng làm giá trị ở runtime.

Nhớ quy tắc của `tsconfig.app.json`:
```jsonc
"verbatimModuleSyntax": true   // bắt buộc dùng import type khi chỉ dùng làm kiểu
```

> Nếu viết `import { RouterState } from './router'` (không có `type`), TypeScript **báo lỗi** vì `RouterState` là interface — không có giá trị thật để import.

### B.4 — Thân hàm: truyền 3 hàm vào `useSyncExternalStore`

```ts
return useSyncExternalStore(
  subscribeRouter,      // tham số 1: subscribe
  getRouterSnapshot,    // tham số 2: getSnapshot
  getRouterSnapshot,    // tham số 3: getServerSnapshot
)
```

| Vị trí | Tên chính thức | Trong dự án | Khi nào được gọi |
|---|---|---|---|
| 1 | `subscribe` | `subscribeRouter` | Khi component render lần đầu — để React biết khi nào cần cập nhật |
| 2 | `getSnapshot` | `getRouterSnapshot` | **Trong lúc render** — lấy dữ liệu hiện tại để hiển thị |
| 3 | `getServerSnapshot` | `getRouterSnapshot` | Khi render **trên server** (SSR). Dự án không dùng SSR nhưng **bắt buộc phải truyền** |

---

## C. GIẢI THÍCH LUỒNG HOẠT ĐỘNG

### C.1 — Lần render đầu tiên

```
App render lần 1
    ▼
useRoute() gọi useSyncExternalStore(...)
    │
    ├─ React gọi getRouterSnapshot() → trả `current`
    │     (đã được parseHash() tính sẵn khi module nạp)
    │
    ├─ React gọi subscribeRouter(nộiBộ)
    │     └─ listeners.add(nộiBộ)     ← giờ React đã "lắng nghe"
    │
    └─ useRoute() trả về `current`
          │
          ▼
    renderPage(route) dùng route.segments
```

> **Điểm hay:** `current` **đã có sẵn giá trị** trước khi render lần đầu → **không có trạng thái "đang tải"**, không nháy màn hình.

### C.2 — Khi URL đổi giữa chừng

```
Người dùng bấm menu "Lab"
    ▼
window.location.hash = '/lab'
    ▼
Trình duyệt bắn 'hashchange'
    ▼
callback trong router.ts:
    ├─ current = parseHash('/lab')     ← current giờ là OBJECT MỚI (B)
    └─ for (const listener of listeners) listener()
          │
          ▼
    React gọi hàm lắng nghe của useSyncExternalStore
          │
          ▼
    React gọi getRouterSnapshot() → object B
          │
          ▼
    React so sánh: object B !== object A (cũ)  → KHÁC
          │
          ▼
    React render lại component đã gọi useRoute()
          │
          ▼
    useRoute() trả về object B → App dùng segments = ['lab']
```

### C.3 — Khi state đổi nhưng URL không đổi

```
Component SearchPage gọi setQuery('xfem')  (không liên quan đến URL)
    ▼
React render lại SearchPage
    ▼
useRoute() chạy lại → getRouterSnapshot() → object A
    │  (CÙNG tham chiếu với lần trước)
    ▼
React thấy dữ liệu KHÔNG đổi → giữ nguyên giá trị route
```

### C.4 — Khi component bị gỡ khỏi màn hình

```
Chuyển trang → SearchPage bị unmount
    ▼
React tự gọi hàm huỷ đăng ký mà subscribeRouter ĐÃ TRẢ VỀ
    ▼
listeners.delete(nộiBộ)
    ▼
Set không còn hàm của SearchPage → không rò rỉ bộ nhớ ✅
```

---

## E. VÍ DỤ THỰC TẾ

### E.1 — Mô phỏng `App.tsx` render 3 lần

**Trạng thái đầu:** URL = `#/tim-kiem?q=xfem`

**Render lần 1** (vừa vào trang):
```
getRouterSnapshot() → current (object A)
A.raw = '#/tim-kiem?q=xfem'
    ↓
route.segments = ['tim-kiem']
    ↓
renderPage: switch('tim-kiem') → <SearchPage key="#/tim-kiem?q=xfem" />
    ↓
SearchPage: useState(route.query.q ?? '') = useState('xfem')
```

**Render lần 2** (người dùng gõ thêm vào ô tìm kiếm):
```
Người dùng gõ → setQuery('xfem v') → SearchPage render lại
    ↓
useRoute() chạy lại → getRouterSnapshot() → vẫn object A
A === A  →  React giữ nguyên route, không làm gì thêm
    ↓
Chỉ SearchPage render lại vì state của nó đổi ✅
```

**Render lần 3** (người dùng điều hướng tới giảng viên):
```
navigate('/giang-vien') → hash = '/giang-vien'
    ↓
hashchange → current = parseHash('/giang-vien')   ← object B (MỚI)
    ↓
listener bắn → getRouterSnapshot() → object B
B !== A → render lại ✅
    ↓
renderPage: switch('giang-vien'), param = undefined
    → <MentorsPage />   (không có key → thay thế hoàn toàn)
```

### E.2 — Nếu viết sai `getRouterSnapshot`

```ts
// ❌ CÁCH SAI — tạo object mới mỗi lần gọi
export function getRouterSnapshot() {
  return { ...current }          // object MỚI mỗi lần!
}
```

**Hậu quả:**
```
React render
    ↓
getRouterSnapshot() → object A
React so sánh với lần trước: A₁ khác A₂ (khác tham chiếu!)
    ↓
React nghĩ: dữ liệu đổi → render lại
    ↓
Render lại → getRouterSnapshot() → object B
    ↓
So sánh: B khác A → render lại
    ↓
    ♾️ VÒNG LẶP RENDER VÔ HẠN → treo máy (tab chết)
```

> **Đây là lý do `router.ts` phải viết `return current` chứ không `return { ...current }`.**

---

## F. TỔNG KẾT

### F.1 — Kiến thức quan trọng cần nhớ

1. **`useSyncExternalStore`** là hook cho dữ liệu **bên ngoài React** — thay cho cặp `useState` + `useEffect`.
2. **3 tham số**: `subscribe`, `getSnapshot`, `getServerSnapshot` — thứ 3 bắt buộc phải truyền (dù không dùng SSR).
3. **`getSnapshot` phải trả về cùng tham chiếu** khi dữ liệu không đổi — nếu không sẽ **render vô hạn**.
4. **`subscribe` phải trả về hàm huỷ đăng ký** — React tự gọi khi component unmount.
5. **Tách file để đổi router dễ** — sửa 12 dòng này thay vì sửa 3 file component.
6. **`import type`** bắt buộc khi chỉ dùng kiểu (do `verbatimModuleSyntax: true`).
7. **Tên hàm đúng chuẩn React** cho phép truyền thẳng, không cần bọc.

### F.2 — Hàm quan trọng

| Hàm | Nhiệm vụ |
|---|---|
| `useRoute()` | Trả về `RouterState` hiện tại, tự cập nhật khi URL đổi |

### F.3 — File có liên quan

| File | Quan hệ |
|---|---|
| `src/router/router.ts` | Cung cấp `subscribeRouter`, `getRouterSnapshot`, kiểu `RouterState` |
| `src/App.tsx` | `const route = useRoute()` → `renderPage(route)`; `useEffect(…, [route.raw])` |
| `src/components/layout/MainNav.tsx` | `const route = useRoute()` → `isActiveRoute(route.path, item.path)` |
| `src/pages/SearchPage.tsx` | `const route = useRoute()` → `useState(route.query.q ?? '')` |
| `src/main.tsx` | Nơi React bắt đầu render, kích hoạt chuỗi render lần đầu |

### F.4 — Câu hỏi tự kiểm tra

1. Nếu đổi thứ tự 3 tham số thì chuyện gì xảy ra?
2. Vì sao `getServerSnapshot` bắt buộc phải truyền dù dự án không dùng SSR?
3. Điều gì xảy ra nếu `router.ts` dùng `const current` thay vì `let`?
4. Viết lại `useRoute()` bằng `useState` + `useEffect`. Bạn phải xử lý những vấn đề nào?
5. Nếu thêm component thứ 4 gọi `useRoute()`, file `router.ts` có cần sửa không?
6. `subscribeRouter` được gọi **bao nhiêu lần** cho 3 component dùng `useRoute()`? Vì sao `Set` quan trọng ở đây?
7. Giải thích bằng lời tại sao `current` phải là `let` (dòng 42) và được gán lại trong callback `hashchange`.

---

**Xem tiếp:** [`../features/auth/auth-context.ts.md`](../features/auth/auth-context.ts.md) — cơ chế Context chia sẻ trạng thái đăng nhập


**Đây chính là lý do `subscribeRouter` phải `return` hàm gỡ đăng ký** — React nhận hàm đó từ `useSyncExternalStore` và tự gọi khi cần.

---

## D. KIẾN THỨC LẬP TRÌNH LIÊN QUAN

### D.1 — `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`

Hook React 18+ cho dữ liệu **ngoài React**.

```ts
const value = useSyncExternalStore(
  subscribe,            // (onStoreChange) => unsubscribe
  getSnapshot,          // () => data   — khi render phía client
  getServerSnapshot,    // () => data   — khi render phía server
)
```

**Yêu cầu bắt buộc của `getSnapshot`:**
- Phải trả về **dữ liệu đã cache** (cùng tham chiếu nếu không đổi).
- Nên **rẻ** (không tính toán nặng), vì React gọi nó rất nhiều lần.

> ⚠️ **Lỗi thường gặp:** trả về object/array mới mỗi lần gọi → React render vô hạn. Dự án này **đã tránh đúng** bằng cách dùng biến `current` module-level.

### D.2 — `import type` vs `import`

| Tình huống | Cách viết |
|---|---|
| Chỉ dùng làm **kiểu dữ liệu** | `import type { RouterState } from './router'` |
| Dùng làm **giá trị** | `import { navigate } from './router'` |

Có thể viết cả hai trong một dòng:
```ts
import { navigate, type RouterState } from './router'
```

### D.3 — Vì sao không dùng `useState` + `useEffect`?

| | `useState` + `useEffect` | `useSyncExternalStore` |
|---|---|---|
| Render đầu | Giá trị cũ → rồi mới đúng (**flicker**) | Đúng ngay ✅ |
| Đăng ký listener | Bạn tự viết | React tự lo ✅ |
| Huỷ đăng ký | Bạn tự viết `removeEventListener` | React tự gọi hàm trả về ✅ |
| SSR | Phải tự xử lý | Có `getServerSnapshot` riêng ✅ |

### D.4 — Hook là gì?

**Hook** là hàm bắt đầu bằng chữ `use`, cho phép dùng "sức mạnh của React" (state, hiệu ứng, context) **bên trong function component**.

```ts
useState, useEffect, useMemo, useCallback, useRef, useContext, useSyncExternalStore
```

**Quy tắc:** Hook chỉ gọi được **ở cấp cao nhất** của component, **không** trong `if`, `for`, hay hàm lồng nhau.

```tsx
// ❌ Sai — gọi hook trong điều kiện
if (x) { const [a] = useState(0) }

// ✅ Đúng
const [a] = useState(0)
if (x) { /* … */ }
```

### D.5 — Convention over Configuration

`useSyncExternalStore` **yêu cầu tên hàm đúng quy ước** (`subscribe`, `getSnapshot`) — không có cấu hình để đổi tên. Vì vậy `router.ts` đặt tên hàm theo đúng chuẩn để truyền thẳng được.



**Điểm quan trọng nhất về `useSyncExternalStore`:**

Trong lúc render, React gọi `getSnapshot()` và so sánh kết quả với lần trước:

```
React render lần 1:
  gọi getRouterSnapshot() → current (object A)
  React nhớ object A

URL đổi → hashchange → current = parseHash(...)  →  object B mới
  → listeners bắn → React kiểm tra:
     getRouterSnapshot() → object B
     B !== A  →  KHÁC  →  render lại ✅

Không có URL đổi:
  React render (do setState chẳng hạn):
     getRouterSnapshot() → vẫn object A
     A === A  →  GIỐNG  →  KHÔNG render lại ✅
```

> **Đây là lý do `router.ts` phải dùng `let current` thay vì tạo object mới mọi lần gọi `getRouterSnapshot()`.** Nếu hàm đó là:
> ```ts
> function getRouterSnapshot() { return { ...parseHash(...) } }   // ❌ SAI
> ```
> thì mỗi lần gọi trả về object **khác nhau** → React so sánh thấy khác → **render lại liên tục** → ứng dụng treo máy.
>
> Code hiện tại đúng vì `return current` trả về **cùng tham chiếu** cho tới khi URL thực sự đổi.

### B.5 — `export function useRoute(): RouterState`

Khai báo kiểu trả về `RouterState` giúp người gọi biết chắc `route.path`, `route.segments`… đều tồn tại.

**Vì sao `export function` chứ không phải `export const useRoute = …`?**
Vì khai báo dạng function **được nâng lên (hoisted)** — có thể dùng trước khi khai báo. Dạng `const` thì không.


└────────────────────────────────────────────────────────┘
```

- **File nào sử dụng?** 3 file:

| File | Dùng để làm gì |
|---|---|
| `src/App.tsx` | Lấy `route` để chọn trang qua `renderPage()`, và `route.raw` làm dependency `useEffect` |
| `src/components/layout/MainNav.tsx` | Lấy `route.path` để biết menu nào đang active |
| `src/pages/SearchPage.tsx` | Lấy `route.query.q/domain/kind` để điền sẵn bộ lọc từ URL |

- **File này phụ thuộc vào đâu?** `react` (`useSyncExternalStore`) + `./router` (3 thứ).

> **Vì sao tách riêng file này?**
> ① `router.ts` được thiết kế **không biết React** — nhờ vậy có thể test hoặc dùng lại ở nơi không có React.
> ② Cho phép **tối ưu hoá**: nếu sau này đổi sang React Router, bạn chỉ cần sửa **12 dòng** này, không phải sửa `App.tsx`, `MainNav.tsx`, `SearchPage.tsx`.
