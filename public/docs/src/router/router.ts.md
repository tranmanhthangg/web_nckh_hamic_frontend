# `src/router/router.ts` — Bộ đọc và ghi URL

> **Trạng thái:** ✅ Đầy đủ
> **File nguồn:** `src/router/router.ts` (82 dòng)

**Chú thích đầu file (dòng 1–4):**
> *"Router tối giản dựa trên hash (#/duong-dan) — không cần thư viện ngoài. Hỗ trợ deep-link, nút Back/Forward của trình duyệt và query string đơn giản."*

Nêu rõ **3 tính năng** mà router này hỗ trợ:

| Tính năng | Nghĩa là gì | Ví dụ |
|---|---|---|
| **deep-link** | Mở thẳng URL trang con vẫn được | Dán `#/lab/lab-mim-optlab` vào thanh địa chỉ → vào đúng trang đó |
| **Back/Forward** | Nút ← → của trình duyệt hoạt động | Bấm Back sau khi chuyển trang → về trang trước |
| **query string** | Truyền tham số qua URL | `#/tim-kiem?q=xfem` → trang tự điền "xfem" vào ô tìm kiếm |

Đây là **cả 3 tính năng chính** mà một router thực sự phải có. Chúng đều đạt được chỉ bằng hash — vì hash của trình duyệt **có sẵn lịch sử** và **có sẵn sự kiện thay đổi**.

---

## A. MỤC ĐÍCH CỦA FILE

- **Dùng để làm gì?** Biến phần **hash** của URL (`#/tim-kiem?q=xfem`) thành dữ liệu có cấu trúc mà React dùng được, và cung cấp hàm để **ghi** URL mới.
- **Nằm ở đâu trong kiến trúc?** Thư mục `src/router/`. Đây là **tầng thấp nhất** của phần điều hướng — nó biết về `window.location` nhưng **không biết về React**.
- **File nào sử dụng?** 8 file:

| File | Dùng gì |
|---|---|
| `src/router/useRoute.ts` | `subscribeRouter`, `getRouterSnapshot`, kiểu `RouterState` |
| `src/App.tsx` | Kiểu `RouterState` (định kiểu tham số hàm) |

---

## B. GIẢI THÍCH CODE TỪ TRÊN XUỐNG DƯỚI

### B.1 — `export interface RouterState` (dòng 6–15)

```ts
export interface RouterState {
  path: string       // Đường dẫn đã chuẩn hoá, ví dụ "/giang-vien"
  segments: string[] // Các đoạn đường dẫn, ví dụ ["giang-vien"]
  query: Record<string, string>   // Query string đã giải mã
  raw: string        // Hash thô, dùng làm khoá để cuộn lên đầu trang
}
```

**Interface là gì?** Là cách mô tả **hình dạng** của một object trong TypeScript.

```ts
// [VÍ DỤ minh họa]
interface Nguoi {
  ten: string
  tuoi: number
}

const a: Nguoi = { ten: 'Nam', tuoi: 20 }    // ✅
const b: Nguoi = { ten: 'An' }                // ❌ thiếu tuoi
const c: Nguoi = { ten: 'Bình', tuoi: '20' }  // ❌ tuoi phải là number
```

> **Khác biệt `interface` và `type`:**
> - `interface` — dùng khi mô tả **hình dạng object**. Có thể **mở rộng** sau bằng `extends`.
> - `type` — dùng cho **mọi kiểu**: union, primitive, mảng, object.
>
> Trong dự án: `RouterState`, `Domain`, `Publication`, `Mentor`, `Lab` dùng `interface`; `DomainCode`, `PublicationKind`, `RoleId` dùng `type` (vì là union).

**Tại sao cần cả 4 trường?**

| Trường | Ví dụ giá trị | Dùng để làm gì |
|---|---|---|
| `path` | `"/giang-vien"` | So sánh trong `isActiveRoute()` để tô đậm menu |
| `segments` | `["giang-vien"]` | `App.tsx` dùng `segments[0]` và `segments[1]` để chọn trang |
| `query` | `{ q: "xfem" }` | `SearchPage` đọc `route.query.q` để điền sẵn từ khoá |
| `raw` | `"#/giang-vien"` | `App.tsx` dùng làm **dependency của `useEffect`** để phát hiện đã đổi trang |

> **Vì sao cần cả `path` và `raw`?**
> - `path` **đã chuẩn hoá** → dùng để so sánh logic.
> - `raw` là **nguyên bản** → dùng làm khoá vì nó thay đổi mỗi kể cả khi `path` không đổi.
>
> **Ví dụ minh họa:** bạn ở `#/tim-kiem?q=xfem` rồi đổi sang `#/tim-kiem?q=iga`.
> - `path` vẫn là `/tim-kiem` → **không đổi**.
> - `raw` đổi → **có đổi**.
>
> Nếu `App.tsx` dùng `[route.path]` làm dependency thì trang **không cuộn lên đầu** khi đổi từ khoá. Đó là lý do tách riêng `raw`.

### B.2 — `function parseHash(rawHash: string): RouterState` (dòng 17–39)

Hàm biến chuỗi hash thành object `RouterState`. **Đây là hàm quan trọng nhất trong file.**

#### Dòng 18 — Bỏ dấu `#`

#### Dòng 19 — Tách đường dẫn và query

```ts
const [pathPart = '', queryPart = ''] = withoutHash.split('?')
```

Ba kỹ thuật dồn vào một dòng:

**① `.split('?')`** — tách chuỗi theo ký tự `?`, trả về **mảng**.

```ts
// [VÍ DỤ minh họa]
'/tim-kiem?q=xfem'.split('?')   // → ['/tim-kiem', 'q=xfem']
'/lab'.split('?')               // → ['/lab']
```

**② `const [a, b] = ...`** — **destructuring** (phân rã mảng): lấy từng phần tử gán vào biến.

```ts
// [VÍ DỤ minh họa]
const [so1, so2] = [10, 20]
console.log(so1)   // 10
console.log(so2)   // 20
```

**③ `= ''` (giá trị mặc định)** — nếu phần tử **không tồn tại** (`undefined`), dùng `''` thay thế.

```ts
// [VÍ DỤ minh họa]
const [pathPart = '', queryPart = ''] = '/lab'.split('?')
// '/lab'.split('?') → ['/lab']   ← chỉ có 1 phần tử
// pathPart  = '/lab'
// queryPart = ''      ← không có phần tử thứ 2 nên lấy giá trị mặc định
```

> **Vì sao cần `= ''`?** Vì TypeScript biết phần tử thứ 2 **có thể không tồn tại**. Nếu không có `= ''`, `queryPart` sẽ kiểu `string | undefined`, và dòng `queryPart.split('&')` sẽ **báo lỗi kiểu**.

#### Dòng 20–21 — Chuẩn hoá đường dẫn (dòng quan trọng nhất)

```ts
const normalized = `/${pathPart.replace(/^\/+|\/+$/g, '')}`
const path = normalized === '/' ? '/' : normalized
```

**Ý nghĩa:** xoá mọi dấu `/` ở **đầu** và **cuối**, rồi thêm đúng một dấu `/` ở đầu.

**Biểu thức `/^\/+|\/+$/g`** là **regular expression** (biểu thức chính quy):

| Phần | Ý nghĩa |
|---|---|
| `^` | Bắt đầu chuỗi |
| `\/+` | Một hoặc nhiều dấu `/` liên tiếp |
| `\|` | **HOẶC** |
| `\/+$` | Một hoặc nhiều dấu `/` ở cuối chuỗi |
| `g` | global — thay tất cả vị trí khớp |

```ts
// [VÍ DỤ minh họa]
'//giang-vien//'.replace(/^\/+|\/+$/g, '')   // → 'giang-vien'
'/lab/'.replace(/^\/+|\/+$/g, '')             // → 'lab'
'/lab/abc'.replace(/^\/+|\/+$/g, '')          // → 'lab/abc'  (/ ở giữa giữ nguyên)
```

Sau đó thêm `/` ở đầu bằng **template literal** (dấu backtick):

```ts
`/${'giang-vien'}`   // → '/giang-vien'
```
### B.3 — `const listeners = new Set<() => void>()` (dòng 41)

Đây là **"danh sách hàm chờ được gọi"** — một pattern cực kỳ quan trọng trong React.

**`Set` là gì?** Kiểu dữ liệu giống mảng nhưng khác 2 điểm:

| | Mảng `[]` | Tập hợp `Set` |
|---|---|---|
| Trùng lặp | Cho phép | **Không** — thêm 2 lần vẫn chỉ có 1 |
| Tìm kiếm | Chậm | **Nhanh** (bảng băm) |

```ts
// [VÍ DỤ minh họa]
const s = new Set()
s.add(f)
s.add(f)      // thêm lại cùng hàm f
s.size        // → 1  (không phải 2!)
```

> **`<() => void>` là gì?** Là **kiểu hàm**: hàm không tham số, không trả về gì.
> - `()` = không tham số · `=>` = arrow function · `void` = không trả về giá trị

**Vì sao dùng `Set` chứ không dùng mảng?**
Vì cùng một component có thể đăng ký nhiều lần qua nhiều lần render, nhưng **chỉ nên được gọi 1 lần** khi gỡ đăng ký. `Set` đảm bảo tính duy nhất đó.

### B.4 — `let current: RouterState = parseHash(...)` (dòng 42–44)

Đây là **biến toàn cục** (module-level) — tồn tại suốt vòng đời ứng dụng.

| Phần | Ý nghĩa |
|---|---|
| `let` | Khai báo biến **có thể thay đổi** (khác `const`) |
| `current` | Luôn chứa trạng thái route hiện tại |
| `parseHash(...)` | Gọi hàm **một lần lúc khởi động** để đọc URL hiện tại |

**Tại sao `typeof window === 'undefined' ? '' : window.location.hash`?**

Đây là **bảo vệ cho server-side rendering (SSR)** — nơi chưa có trình duyệt.

```ts
// [VÍ DỤ minh họa]
typeof window    // trong trình duyệt: "object"
                 // trong Node.js (server): "undefined"

// Nếu chạy trên server mà không có check:
//   window.location → ❌ ReferenceError: window is not defined → app sập
```

> Dự án này **không dùng SSR** nên về lý thuyết check này không cần. Nhưng nó giúp file **an toàn hơn** nếu sau này ai thêm SSR. Đây là thói quen viết code phòng xa.

**Vì sao đọc hash ngay khi khởi động?**
Vì người dùng có thể vào thẳng `#/lab/lab-mim-optlab` (deep-link). Nếu không đọc ở đây, `current` sẽ `undefined` và app không biết đang ở đâu.

### B.5 — Đăng ký lắng nghe `hashchange` (dòng 46–51)

```ts
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    current = parseHash(window.location.hash)
    for (const listener of listeners) listener()
  })
}
### B.6 — `export function subscribeRouter(listener: () => void): () => void` (dòng 53–58)

```ts
export function subscribeRouter(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
```

**Hàm này cho phép React đăng ký** một hàm sẽ được gọi mỗi khi URL đổi.

| Dòng | Ý nghĩa |
|---|---|
| `listeners.add(listener)` | Thêm hàm vào danh sách chờ |
| `return () => { … }` | **Trả về hàm gỡ đăng ký** |

**Tại sao phải trả về hàm gỡ đăng ký?**
Đây là **quy ước chuẩn của React**. Khi component bị gỡ khỏi màn hình, React gọi hàm trả về để "dọn dẹp". Nếu không có, các hàm cũ sẽ **tích tụ trong `Set`** mãi mãi → rò rỉ bộ nhớ (memory leak).

```tsx
// React hiểu quy ước này. Khi component bị unmount, React tự gọi hàm trả về:
const unsubscribe = subscribeRouter(callback)
// ... sau này:
unsubscribe()   // ← React tự động gọi, bạn không cần viết
```

> **Arrow function không tên `() => {}`**: hàm ẩn danh. Ở đây `return () => { … }` trả về một hàm **chưa được gọi** — gọi nó mới thực sự gỡ đăng ký.

### B.7 — `export function getRouterSnapshot(): RouterState` (dòng 60–62)

```ts
export function getRouterSnapshot(): RouterState {
  return current
}
```

Cực kỳ đơn giản: **trả về trạng thái hiện tại**.

**Vì sao cần hàm bọc thay vì `export const current`?**
Vì `current` là `let` (thay đổi được). Nếu export trực tiếp, các module khác sẽ **giữ tham chiếu cũ** và không thấy giá trị mới. Qua hàm, mỗi lần gọi luôn đọc được giá trị mới nhất.

**Yêu cầu quan trọng của React:**
`getRouterSnapshot` phải trả về **cùng một object** nếu URL không đổi. Ở đây đúng: `current` chỉ được gán lại trong callback `hashchange`, nên giữa hai lần URL đổi, `current` là **cùng một object** → React so sánh tham chiếu, thấy bằng nhau → **không render lại**.

### B.8 — `export function navigate(to: string): void` (dòng 64–69)

```ts
export function navigate(to: string): void {
  const target = to.startsWith('/') ? to : `/${to}`
  if (window.location.hash === `#${target}`) return
  window.location.hash = target
}
```

| Dòng | Ý nghĩa |
---

## C. GIẢI THÍCH LUỒNG HOẠT ĐỘNG

### C.1 — Khi ứng dụng vừa khởi động

```
Trình duyệt nạp router.ts
    │
    ├─ Hàm khai báo được đăng ký, CHƯA chạy
    │
    ├─ Dòng 42: let current = parseHash(window.location.hash)
    │   Giả sử URL = "http://localhost:5173/#/lab/lab-mim-optlab"
    │   → current = {
    │       path: '/lab/lab-mim-optlab',
    │       segments: ['lab', 'lab-mim-optlab'],
    │       query: {},
    │       raw: '#/lab/lab-mim-optlab'
    │     }
    │
    └─ Dòng 47: window.addEventListener('hashchange', callback)  ← chờ, chưa chạy
    │
    ▼
main.tsx → createRoot().render(<App/>)
    ▼
App gọi useRoute() → getRouterSnapshot() → trả về `current`  ✅
    ▼
renderPage(route): route.segments = ['lab', 'lab-mim-optlab']
    const [section, param] = ['lab', 'lab-mim-optlab']
    switch('lab') → case 'lab': param có → <LabDetailPage id="lab-mim-optlab" />
    ▼
Chuyển đúng trang chi tiết Lab ngay từ đầu (deep-link hoạt động) ✅
```

### C.2 — Khi người dùng bấm menu

```
Người dùng bấm <Link to="/tru-cot">
    ▼
Link.tsx render: <a href="#/tru-cot">
    ▼
Trình duyệt nhảy tới #/tru-cot, tự bắn sự kiện 'hashchange'
    ▼
callback trong router.ts chạy:
    ├─ current = parseHash('#/tru-cot')
    │     = { path:'/tru-cot', segments:['tru-cot'], query:{}, raw:'#/tru-cot' }
    │
    └─ for (const listener of listeners) listener()
          ↓
    React (qua useSyncExternalStore) nhận snapshot mới
          ↓
    App render lại → renderPage() → <PillarsPage />
          ↓
    useEffect [route.raw] chạy → window.scrollTo(0,0)
          ↓
    Trang mới hiện ra
```

### C.3 — Khi tìm kiếm từ header

```
<form onSubmit> trong HeaderSearch.tsx
    ▼
new FormData(event.currentTarget).get('q')  →  "XFEM"
    ▼
navigate(buildPath('/tim-kiem', { q: "XFEM" }))
    │         │
    │         └─ buildPath: URLSearchParams tự encode → "/tim-kiem?q=XFEM"
    ▼
window.location.hash = "/tim-kiem?q=XFEM"
    ▼
Trình duyệt bắn 'hashchange' → parseHash → segments = ['tim-kiem']
                                       query = { q: 'XFEM' }
    │                                  └──────────────┬──────────────┘
    ▼                                                 ▼
renderPage() → <SearchPage key={route.raw}/>     useState(route.query.q ?? '')
    │                                                 ↓
    │                                            query = "XFEM"
    │                                                 ↓
    └──────────────────────────────────►  Ô tìm kiếm hiện sẵn "XFEM"
```
---

## E. VÍ DỤ THỰC TẾ — Bảng tra `parseHash`

| Input `rawHash` | `path` | `segments` | `query` | Trang hiện |
|---|---|---|---|---|
| `''` | `/` | `[]` | `{}` | HomePage |
| `'#'` | `/` | `[]` | `{}` | HomePage |
| `'#/'` | `/` | `[]` | `{}` | HomePage |
| `'#/tru-cot'` | `/tru-cot` | `['tru-cot']` | `{}` | PillarsPage |
| `'#/tim-kiem?q=XFEM'` | `/tim-kiem` | `['tim-kiem']` | `{q:'XFEM'}` | SearchPage (ô điền sẵn) |
| `'#/tim-kiem?domain=DS-AI&kind=master'` | `/tim-kiem` | `['tim-kiem']` | `{domain:'DS-AI', kind:'master'}` | SearchPage (lọc sẵn) |
| `'#/giang-vien'` | `/giang-vien` | `['giang-vien']` | `{}` | MentorsPage |
| `'#/giang-vien/mentor-bui-the-duy'` | `/giang-vien/mentor-bui-the-duy` | `['giang-vien','mentor-bui-the-duy']` | `{}` | MentorDetailPage |
| `'#/giang-vien/abc'` | `/giang-vien/abc` | `['giang-vien','abc']` | `{}` | MentorDetailPage → không tìm thấy → **NotFoundPage** |
| `'#/khong-ton-tai'` | `/khong-ton-tai` | `['khong-ton-tai']` | `{}` | **NotFoundPage** (default) |

### E.1 — Mô phỏng từng bước cho `'#/tim-kiem?q=b%C3%A0i%20to%C3%A1n'`

**Đầu vào:** người dùng gõ "bài toán" rồi nhấn Enter ở ô tìm kiếm.

```
Bước 1: withoutHash = rawHash.slice(1)
        '#/tim-kiem?q=b%C3%A0i%20to%C3%A1n'.slice(1)
        = '/tim-kiem?q=b%C3%A0i%20to%C3%A1n'

Bước 2: withoutHash.split('?')
        = ['/tim-kiem', 'q=b%C3%A0i%20to%C3%A1n']
          pathPart  = '/tim-kiem'
          queryPart = 'q=b%C3%A0i%20to%C3%A1n'

Bước 3: pathPart.replace(/^\/+|\/+$/g, '')
        '/tim-kiem' → không có / ở đầu/cuối → giữ nguyên 'tim-kiem'
        normalized = '/' + 'tim-kiem' = '/tim-kiem'
        path = '/tim-kiem'   (không phải '/')

Bước 4: queryPart.split('&')  →  ['q=b%C3%A0i%20to%C3%A1n']

Bước 5: pair = 'q=b%C3%A0i%20to%C3%A1n'
        pair.split('=') = ['q', 'b%C3%A0i%20to%C3%A1n']
        key = 'q',  value = 'b%C3%A0i%20to%C3%A1n'

Bước 6: query['q'] = decodeURIComponent('b%C3%A0i%20to%C3%A1n')
        query = { q: 'bài toán' }        ← ✅ đã giải mã tiếng Việt

Bước 7: path.split('/').filter(Boolean)
        '/tim-kiem'.split('/') = ['', 'tim-kiem']
        .filter(Boolean)       = ['tim-kiem']
---

## F. TỔNG KẾT

### F.1 — Kiến thức quan trọng cần nhớ

1. **`RouterState` có 4 trường**: `path` (chuẩn hoá, để so sánh), `segments` (mảng để chọn trang), `query` (đã giải mã), `raw` (nguyên bản, làm khoá `useEffect`).
2. **`.filter(Boolean)` trong `segments` là mấu chốt** — làm trang chủ có `segments = []` nên `App.tsx` dùng `case undefined:`.
3. **`parseHash` là hàm thuần túy** — cùng đầu vào luôn cho cùng kết quả. Đó là điều kiện để React so sánh tham chiếu.
4. **`navigate()` chỉ gán `window.location.hash`** — không gọi React. Nhờ vậy nút Back/Forward hoạt động miễn phí.
5. **`subscribeRouter` trả về hàm gỡ đăng ký** — quy ước bắt buộc của React, tránh rò rỉ bộ nhớ.
6. **`buildPath` dùng `URLSearchParams`** — tự encode an toàn, và tự bỏ qua giá trị rỗng.
7. **`typeof window === 'undefined'`** là check phòng xa cho SSR, không bắt buộc trong dự án này.
8. **`listeners` là `Set` chứ không phải mảng** — đảm bảo mỗi listener chỉ xuất hiện 1 lần.

### F.2 — Các hàm quan trọng

| Hàm | Nhiệm vụ | Xuất ra? |
|---|---|---|
| `parseHash(rawHash)` | Chuỗi hash → object `RouterState` | ❌ nội bộ |
| `subscribeRouter(listener)` | Đăng ký hàm chờ; **trả về** hàm gỡ đăng ký | ✅ |
| `getRouterSnapshot()` | Trả về `current` (route hiện tại) | ✅ |
| `navigate(to)` | Ghi hash mới (tự thêm dấu `/`; bỏ qua nếu trùng) | ✅ |
| `buildPath(path, query?)` | Ghép đường dẫn + query string (tự encode) | ✅ |

### F.3 — File có liên quan

| File | Quan hệ |
|---|---|
| `src/router/useRoute.ts` | Bọc `subscribeRouter` + `getRouterSnapshot` thành hook `useRoute()` |
| `src/App.tsx` | Nhận `RouterState`, dùng `segments[0]`/`segments[1]` để chọn trang; `route.raw` làm dependency `useEffect` |
| `src/components/ui/Link.tsx` | Render `<a href="#{to}">` — kích hoạt `hashchange` khi bấm |
| `src/components/layout/MainNav.tsx` | Dùng `route.path` qua `isActiveRoute()` để tô đậm menu |
| `src/pages/SearchPage.tsx` | Dùng `route.query.q/domain/kind` làm giá trị khởi tạo `useState` |
| `src/components/home/HeroSection.tsx` | `buildPath` + `navigate` trong `onSubmit` của form |
| `src/components/pillars/PillarCard.tsx` | `buildPath('/tim-kiem', { domain: domain.code })` |

### F.4 — Câu hỏi tự kiểm tra

1. `parseHash('#/giang-vien/abc/def')` trả về `segments` gì? `App.tsx` sẽ render trang nào?
2. Nếu bỏ `.filter(Boolean)` ở dòng 35, chuyện gì xảy ra? Giải thích cụ thể bằng `App.tsx`.
3. `parseHash('#/tim-kiem?')` cho `query` là gì? Vì sao không lỗi?
4. Vì sao `navigate('/lab')` lại có dòng `if (...) return`?
5. Nếu bỏ `return () => listeners.delete(listener)` trong `subscribeRouter`, chuyện gì xảy ra khi chuyển trang nhiều lần?
6. `route.path` và `route.raw` khác nhau khi nào? Vì sao `App.tsx` dùng `raw`?
7. Giải thích lý do `useSyncExternalStore` yêu cầu `getRouterSnapshot` trả về **cùng tham chiếu** khi không có thay đổi.
8. Nếu dùng `window.history.pushState` thay vì `location.hash` thì mất tính năng nào?

---

**Xem tiếp:** [`./useRoute.ts.md`](./useRoute.ts.md) — cầu nối 12 dòng giữa router và React


Bước 8: return {
          path: '/tim-kiem',
          segments: ['tim-kiem'],
          query: { q: 'bài toán' },
          raw: '#/tim-kiem?q=b%C3%A0i%20to%C3%A1n'   ← giữ nguyên bản gốc có encode
        }
```

**Điểm hay ở bước 8:** `raw` giữ lại chuỗi **đã encode** (nguyên bản từ URL), còn `query` là chuỗi **đã giải mã**. Cả hai đều cần ở những chỗ khác nhau.

### E.2 — Chuỗi rỗng trong query

```
Input: '#/tim-kiem?q='
  → queryPart = 'q='
  → .split('&')  = ['q=']
  → 'q='.split('=') = ['q', '']     ← có phần tử thứ 2 (rỗng), không phải undefined
  → key='q', value=''
  → query = { q: '' }

Input: '#/tim-kiem?q'
  → queryPart = 'q'
  → .split('&')  = ['q']
  → 'q'.split('=') = ['q']          ← KHÔNG có phần tử thứ 2!
  → value = undefined → lấy mặc định ''   ← nhờ `value = ''` trong destructuring
  → query = { q: '' }
```

> Nhờ `= ''` mặc định, `decodeURIComponent(undefined)` không xảy ra → **không lỗi runtime**.



### C.4 — Component nào được render lại?

```
URL đổi → listener bắn → useSyncExternalStore thấy snapshot khác
    ↓
React so sánh: useRoute() trả object MỚI (khác tham chiếu)
    ↓
Chỉ component gọi useRoute() bị render lại
    ↓
Trong dự án:
  • App.tsx                      ← gọi useRoute()
  • components/layout/MainNav.tsx ← gọi useRoute()
  • pages/SearchPage.tsx          ← gọi useRoute()

Component KHÔNG dùng useRoute() (Card, Button, Modal…) KHÔNG render lại ✅
```

> **Đây là lợi ích lớn của `useSyncExternalStore`:** React tự động so sánh và chỉ render lại đúng những component thực sự cần.

---

## D. KIẾN THỨC LẬP TRÌNH LIÊN QUAN

### D.1 — Destructuring (phân rã)

```ts
// Mảng
const [a, b, c] = [1, 2, 3]

// Object
const { ten, tuoi } = { ten: 'Nam', tuoi: 20 }

// Object trong tham số hàm (dùng ở mọi component React)
function Card({ className, children }) { /* … */ }
```

> **Ghi nhớ:** `const [x]` dùng cho **mảng** (theo vị trí). `const { x }` dùng cho **object** (theo tên).

### D.2 — Toán tử ba ngôi `? :`

```ts
const ketQua = dieuKien ? giaTriNeuDung : giaTriNeuSai
```

Rút gọn của `if/else`.

### D.3 — Regular expression cơ bản

```ts
'/lab/'.replace(/^\/+|\/+$/g, '')
```

| Ký hiệu | Ý nghĩa |
|---|---|
| `/.../` | Bắt đầu và kết thúc biểu thức chính quy |
| `^` | Bắt đầu chuỗi |
| `$` | Kết thúc chuỗi |
| `+` | Một hoặc nhiều |
| `\|` | HOẶC |
| `\/` | Dấu `/` phải escape vì `/` đóng biểu thức |
| `g` (cờ) | global — thay tất cả vị trí khớp |

### D.4 — `URLSearchParams`

API có sẵn của trình duyệt để dựng/đọc query string **an toàn**, tự động encode ký tự đặc biệt.

```ts
const p = new URLSearchParams()
p.set('q', 'bài toán & xác suất')
p.toString()   // "q=b%C3%A0i+to%C3%A1n+%26+x%C3%A1c+s%E1%BA%A1t"
```

### D.5 — `for...of` — lặp qua giá trị

```ts
for (const listener of listeners) { listener() }
```

Khác `for (let i = 0; i < arr.length; i++)`, `for...of` lấy **trực tiếp từng phần tử**, không phải chỉ số.

### D.6 — `continue` — bỏ vòng lặp hiện tại

```ts
if (!pair) continue     // sang phần tử kế tiếp
```

Khác `break` (thoát hẳn vòng lặp) và `return` (thoát hàm).

### D.7 — Side effect ở module level

```ts
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => { /* … */ })
}
```

Cách phổ biến để một module tự khởi tạo hệ thống con (event listener, timer, cache).

> ⚠️ **Hệ quả:** Import `router.ts` vào bất kỳ đâu cũng kích hoạt đăng ký listener. Vì React chỉ nạp module **một lần** rồi cache, nên không bị nhân bản.


|---|---|
| `const target = to.startsWith('/') ? to : '/' + to` | Bảo đảm có dấu `/` ở đầu |
| `if (window.location.hash === '#' + target) return` | **Chốt**: đang ở đúng trang → không làm gì |
| `window.location.hash = target` | **Ghi** hash mới → trình duyệt bắn `hashchange` |

**Tại sao cần dòng `if` chốt?**
Nếu bạn đang ở `#/lab` và bấm lại menu "Lab", gán `hash = '/lab'` sẽ **không làm gì** (hash không đổi → trình duyệt không bắn sự kiện). Dòng `if` làm hành vi **xác định**: cùng đường dẫn → không làm gì cả, trên mọi trình duyệt.

> **Điểm hay:** `navigate()` **không gọi trực tiếp** hàm nào của React. Nó chỉ gán `window.location.hash`. Mọi thứ còn lại do **trình duyệt** điều phối qua sự kiện `hashchange`. Đây là lý do nút Back/Forward **hoạt động miễn phí**.

### B.9 — `export function buildPath(...)` (dòng 71–82)

```ts
export function buildPath(
  path: string,
  query: Record<string, string | undefined> = {},
): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value) search.set(key, value)
  }
  const suffix = search.toString()
  return suffix ? `${path}?${suffix}` : path
}
```

**Hàm ghép đường dẫn kèm tham số.**

| Dòng | Ý nghĩa |
|---|---|
| `query = {}` | Tham số mặc định — có thể gọi `buildPath('/lab')` |
| `new URLSearchParams()` | Công cụ chuẩn của trình duyệt để dựng query string **an toàn** |
| `Object.entries(query)` | Biến object thành mảng cặp `[['k','v'], …]` |
| `if (value) search.set(key, value)` | **Bỏ qua** giá trị rỗng |
| `suffix ? … : path` | Không có query → trả về đường dẫn trần |

**Vì sao dùng `URLSearchParams` thay vì nối chuỗi thủ công?**

```ts
// [VÍ DỤ minh họa]
// Cách thủ công — SAI khi từ khoá có ký tự đặc biệt:
`${path}?q=${encodeURIComponent('bài toán & xác suất')}`
// → /tim-kiem?q=bài%20to%C3%A1n%20%26%20xác%20sắt  ← phải tự encode, dễ quên

// Cách URLSearchParams — tự động encode:
const s = new URLSearchParams()
s.set('q', 'bài toán & xác suất')
s.toString()   // → "q=b%C3%A0i+to%C3%A1n+%26+x%C3%A1c+s%E1%BA%A1t"  ✅
```

**Vì sao `if (value)` bỏ qua giá trị rỗng?**
Vì nhiều nơi gọi `buildPath(path, { q: gocTri, domain: ma }` với biến **có thể `undefined`**:

```tsx
// [VÍ DỤ minh họa - từ HeaderSearch.tsx]
buildPath('/tim-kiem', { q: 'xfem' })                 // → "/tim-kiem?q=xfem"
buildPath('/tim-kiem', { q: '' })                     // → "/tim-kiem"   (bỏ rỗng)
buildPath('/tim-kiem', {})                            // → "/tim-kiem"
buildPath('/tim-kiem', { q: 'a', page: undefined })   // → "/tim-kiem?q=a"
```


```

Đây là **trái tim của router**. Đọc từ trong ra:

| Dòng | Ý nghĩa |
|---|---|
| `window.addEventListener('hashchange', fn)` | Khi hash URL đổi → gọi `fn` |
| `current = parseHash(window.location.hash)` | **Cập nhật** trạng thái hiện tại |
| `for (const listener of listeners) listener()` | **Gọi tất cả** hàm đang chờ trong `Set` |

**Vì sao nằm ở ngoài hàm (module-level)?**
Để nó chạy **đúng một lần** khi file được nạp. Nếu đặt trong component, mỗi lần render sẽ đăng ký lại → sự kiện bắn nhiều lần.

> **Đây là side effect.** File `router.ts` không chỉ "xuất hàm" mà còn **tự chạy code** khi được import.

**Mối quan hệ với React:**
```
Trình duyệt đổi hash
    ↓
window bắn 'hashchange'
    ↓
callback trong router.ts chạy
    ├─ current = parseHash(...)        ← dữ liệu mới
    └─ gọi tất cả listeners           ← React được thông báo
              ↓
    useSyncExternalStore thấy snapshot đổi
              ↓
    React render lại App
```



**Dòng 21** là **tuyên bố ý định** (defensive code): khẳng định đường dẫn gốc luôn là `'/'`. Nó **không đổi kết quả** nhưng bảo vệ trước thay đổi trong tương lai.

#### Dòng 23–31 — Phân tích query string

```ts
const query: Record<string, string> = {}
if (queryPart) {
  for (const pair of queryPart.split('&')) {
    if (!pair) continue
    const [key, value = ''] = pair.split('=')
    if (!key) continue
    query[decodeURIComponent(key)] = decodeURIComponent(value)
  }
}
```

| Dòng | Ý nghĩa |
|---|---|
| `const query: Record<string, string> = {}` | Tạo object rỗng, chỉ nhận chuỗi |
| `if (queryPart)` | Chỉ xử lý nếu có query |
| `queryPart.split('&')` | Tách theo `&` |
| `for (const pair of ...)` | Lặp từng cặp |
| `if (!pair) continue` | Bỏ qua phần tử rỗng |
| `const [key, value = ''] = pair.split('=')` | Tách `q=xfem` thành key/value |
| `if (!key) continue` | Bỏ qua nếu không có tên tham số |
| `query[decodeURIComponent(key)] = …` | **Giải mã** rồi lưu vào object |

**Mô phỏng đầy đủ:**

```
queryPart = 'q=xin%20chao&kind=master&page=2'
    │
    ├─ .split('&')  →  ['q=xin%20chao', 'kind=master', 'page=2']
    │
    ├─ Lần 1: pair = 'q=xin%20chao'
    │     .split('=')  →  ['q', 'xin%20chao']
    │     decodeURIComponent('q')           → 'q'
    │     decodeURIComponent('xin%20chao')  → 'xin chào'   (%20 = dấu cách)
    │     query = { q: 'xin chào' }
    │
    ├─ Lần 2: pair = 'kind=master'
    │     query = { q: 'xin chào', kind: 'master' }
    │
    └─ Lần 3: pair = 'page=2'
          query = { q: 'xin chào', kind: 'master', page: '2' }
```

**Tại sao cần `decodeURIComponent`?** Vì ký tự đặc biệt phải được mã hoá trong URL: dấu cách → `%20`, dấu `&` → `%26`, tiếng Việt có dấu → mã hoá UTF-8 dài dòng. Nếu không giải mã, tìm "bài toán" sẽ không khớp với dữ liệu "bài toán".

#### Dòng 33–38 — Trả về kết quả

```ts
return {
  path,
  segments: path.split('/').filter(Boolean),
  query,
  raw: rawHash,
}
```

**`path.split('/').filter(Boolean)`** là mấu chốt:

```ts
// [VÍ DỤ minh họa]
'/giang-vien'.split('/').filter(Boolean)     → ['giang-vien']         ✅
'/giang-vien/abc'.split('/').filter(Boolean) → ['giang-vien', 'abc']  ✅
'/'.split('/').filter(Boolean)               → []                       ✅
```

> **Vì sao `segments` của trang chủ là `[]` chứ không phải `['']`?** Vì `.filter(Boolean)` loại chuỗi rỗng. Đây chính là lý do `App.tsx` dùng `case undefined:` — `segments[0]` của mảng rỗng là `undefined`.
>
> ⚠️ **Nếu không có `.filter(Boolean)`**, `segments` sẽ là `['']`, `section` = `''`, `case undefined:` **không bao giờ chạy** → trang chủ không bao giờ hiện!


```ts
const withoutHash = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash
```

**Toán tử ba ngôi `? :`** — cú pháp rút gọn của if/else:

```ts
// [VÍ DỤ minh họa]
const ketQua = dieuKien ? giaTriNeuDung : giaTriNeuSai
```

Ở đây: nếu chuỗi **bắt đầu bằng `#`** → cắt bỏ ký tự đầu (`.slice(1)` = lấy từ vị trí 1 trở đi). Nếu không → giữ nguyên.

```ts
parseHash('#/lab')   → withoutHash = '/lab'
parseHash('/lab')    → withoutHash = '/lab'
```

> **Vì sao cần `startsWith('#')`?** Vì `navigate()` và `Link` đôi khi truyền giá trị **không có** dấu `#`, còn `window.location.hash` **luôn có**.


| `src/components/layout/HeaderSearch.tsx` | `buildPath`, `navigate` |
| `src/components/home/HeroSection.tsx` | `buildPath`, `navigate` |
| `src/components/pillars/PillarCard.tsx` | `buildPath` (chỉ ghép link) |
| `src/components/publications/PublicationCard.tsx` | `buildPath`, `navigate` |
| `src/components/publications/PublicationListItem.tsx` | `buildPath`, `navigate` |
| `src/pages/SearchPage.tsx` | `useRoute` từ `useRoute.ts` (đọc query) |

- **File này phụ thuộc vào đâu?** **Không import gì cả** — không React, không thư viện. Chỉ dùng API có sẵn của trình duyệt: `window.location` và `window.addEventListener`.
