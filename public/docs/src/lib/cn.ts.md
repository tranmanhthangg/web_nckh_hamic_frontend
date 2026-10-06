# `src/lib/cn.ts` — Hàm ghép class CSS

> **Trạng thái:** ✅ Đầy đủ
> **File nguồn:** `src/lib/cn.ts` (8 dòng)

```ts
/**
 * Ghép class name có điều kiện mà không cần thêm dependency (clsx/tailwind-merge).
 */
export type ClassValue = string | number | null | undefined | false | ClassValue[]

export function cn(...values: ClassValue[]): string {
  return values.flat().filter(Boolean).join(' ')
}
```

---

## A. MỤC ĐÍCH CỦA FILE

- **Dùng để làm gì?** Ghép nhiều chuỗi class CSS (class Tailwind) thành **một chuỗi duy nhất**, bỏ qua các giá trị rỗng.
- **Nằm ở đâu trong kiến trúc?** Thư mục `lib/` — nơi chứa **hàm tiện ích dùng chung**, không thuộc về domain cụ thể nào (không phải component, không phải dữ liệu).
- **File nào sử dụng?** **28 file** trong dự án — gần như mọi component giao diện đều import:
  ```ts
  import { cn } from '@/lib/cn'

---

## B. GIẢI THÍCH CODE TỪ TRÊN XUỐNG DƯỚI

### B.1 — Chú thích JSDoc `/** ... */`

```ts
/**
 * Ghép class name có điều kiện mà không cần thêm dependency (clsx/tailwind-merge).
 */
```

Dấu `/** ... */` (hai dấu sao) gọi là **chú thích JSDoc**. Khác với `//` và `/* */`, nó được công cụ đọc để tạo tài liệu API. Trong VS Code, khi bạn gõ `cn(` nó hiện tooltip giải thích.

Dự án dùng JSDoc rất chặt chẽ — gần như mọi hàm đều có. Đây là **quy ước tốt** nên giữ.

### B.2 — `export type ClassValue = ...`

Đây là **type alias** — đặt tên cho một kiểu dữ liệu.

```ts
export type ClassValue =
  | string | number | null | undefined | false | ClassValue[]
```

Đọc bằng dấu `|` là **union type** (kiểu hợp nhất): "hoặc là A, hoặc là B, hoặc là C…"

| Thành phần | Ý nghĩa |
|---|---|
| `string` | Class bình thường: `'rounded-xl'` |
| `number` | Số được ép thành chuỗi |
| `null` | Rỗng (không có giá trị) |
| `undefined` | Chưa có giá trị — xuất hiện khi prop không được truyền |
| `false` | Biểu thức điều kiện trả `false` |
| `ClassValue[]` | **Mảng** của bất kỳ loại nào trên — có thể lồng nhau |

**Tại sao cần `ClassValue[]`?** Để cho phép truyền mảng:
```ts
cn('a', ['b', 'c'], 'd')
```

**Tại sao có `ClassValue[]` bên trong chính `ClassValue`?** Đây là **kiểu đệ quy** (recursive type): mảng chứa `ClassValue`, mà `ClassValue` lại có thể là mảng… Nhờ vậy mảng lồng bao nhiêu cấp cũng được.

**Tại sao có `false`?** Vì trong JSX hay viết điều kiện:
```tsx
// Nếu ClassValue không chứa false, dòng này báo lỗi kiểu:
<div className={cn('base', isActive && 'bg-brand')} />
```

> **Mẹo nhớ toán `&&` trong JSX:** `A && B` trả về:
> - `A` là `false` → trả `false`
> - `A` là `true` → trả `B`
>
> Nhờ `ClassValue` chứa `false`, `cn()` lọc bỏ được giá trị đó bằng `.filter(Boolean)`.

### B.3 — `export function cn(...values: ClassValue[]): string`

| Ký hiệu | Là gì |
|---|---|
| `function` | Khai báo hàm |
| `...values: ClassValue[]` | **Rest parameter** — gom mọi tham số còn lại thành một mảng tên `values` |
| `: string` | **Kiểu trả về** — hàm luôn trả về chuỗi |

**Ví dụ về rest parameter:**

```ts
// [VÍ DỤ minh họa]
function tong(...so) {
  // gọi tong(1, 2, 3)  →  so = [1, 2, 3]
  return so.reduce((a, b) => a + b, 0)
}
tong(1, 2, 3)   // → 6
```

Vì vậy trong thân hàm dùng `values` (mảng) chứ không phải `value` (một giá trị).

**Vì sao khai báo kiểu trả về `: string`?** Bắt buộc người gọi biết chắc `cn` trả về chuỗi để dùng trong `className={}`. Vì `ClassValue` có thể là `null`, nếu không khai báo kiểu trả về, TypeScript sẽ không biết `cn()` cho ra gì.

### B.4 — `values.flat()`

`.flat()` làm phẳng mảng **một cấp** (mặc định `flat()` = `flat(1)`).

```ts
// [VÍ DỤ minh họa]
['a', ['b', 'c'], 'd'].flat()
// → ['a', 'b', 'c', 'd']

// Lồng 2 cấp:
['a', ['b', ['c']]].flat()
// → ['a', 'b', ['c']]      ← vẫn còn 1 mảng lồng bên trong
```

**Vì sao dùng `.flat()` mà không `.flat(Infinity)`?** Vì đệ quy trong `ClassValue` chỉ là **khả năng về mặt kiểu**, không phải yêu cầu thực tế. `.flat()` một cấp là đủ cho `cn('a', ['b','c'])`. Dùng `.flat(Infinity)` chậm hơn một chút mà không đem lại lợi ích.

### B.5 — `.filter(Boolean)`

`Boolean` là hàm ép về `true`/`false`. `filter(Boolean)` giữ lại những phần tử mà khi ép về boolean là `true`.

```ts
// [VÍ DỤ minh họa]
['rounded', false, undefined, null, 'border', '', 0, 'p-4'].filter(Boolean)
// → ['rounded', 'border', 'p-4']
```
---

## C. GIẢI THÍCH LUỒNG HOẠT ĐỘNG

### C.1 — Luồng gọi `cn()` trong một component

```
<LabsPage /> render lần đầu
    │
    ▼
<SearchInput className="max-w-[30rem]" ... />
    │              └──────┬──────┘
    │                     └── giá trị prop thực sự truyền vào
    ▼
Bên trong SearchInput.tsx:
    const finalClass = cn('relative w-full', className)
    │
    ▼
values = ['relative w-full', 'max-w-[30rem]']
    │
    ▼
values.flat()     → ['relative w-full', 'max-w-[30rem]']   (không đổi: không có mảng lồng)
    │
    ▼
.filter(Boolean)  → ['relative w-full', 'max-w-[30rem]']   (không bỏ gì: đều là chuỗi thật)
    │
    ▼
.join(' ')        → "relative w-full max-w-[30rem]"
    │
    ▼
<div className="relative w-full max-w-[30rem]">
    ▼
Trình duyệt áp dụng 3 class này theo thứ tự trong file CSS của Tailwind
```

### C.2 — `cn()` tạo điều kiện "class động"

Đây là **ứng dụng phổ biến nhất** của `cn()`, xuất hiện ở `MainNav.tsx`:

```tsx
className={cn(
  'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors',
  isActive
    ? 'bg-brand text-white'
    : 'text-slate-700 hover:bg-hover hover:text-brand',
)}
```

**Khi đang ở trang khác, bấm menu "5 Trụ cột":**

| Bước | `isActive` | Giá trị | Kết quả |
|---|---|---|---|
| — | `false` | `values` = `['inline-flex … transition-colors', false]` | — |
| 1 | | `.flat()` | `['inline-flex … transition-colors', false]` |
| 2 | | `.filter(Boolean)` | `['inline-flex … transition-colors']` ⚠️ `false` bị loại |
| 3 | | `.join(' ')` | `"inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors"` |

**Sau khi chuyển sang trang "5 Trụ cột" (đã render lại):**

| Bước | `isActive` | Giá trị | Kết quả |
|---|---|---|---|
| — | `true` | `values` = `['inline-flex … transition-colors', 'bg-brand text-white']` | — |
| 1 | | `.flat()` | giữ nguyên |
| 2 | | `.filter(Boolean)` | cả 2 giữ lại |
| 3 | | `.join(' ')` | `"inline-flex … transition-colors bg-brand text-white"` |

---

## E. VÍ DỤ THỰC TẾ — Mô phỏng từng bước

### E.1 — Trường hợp 1: chuỗi + điều kiện

**Đầu vào:**
```ts
cn('rounded-xl border', false, undefined, null, 'bg-white shadow-xs')
```

| Bước | Giá trị |
|---|---|
| — | `values` = `['rounded-xl border', false, undefined, null, 'bg-white shadow-xs']` |
| 1 | `.flat()` → `['rounded-xl border', false, undefined, null, 'bg-white shadow-xs']` (không có mảng lồng) |
| 2 | `.filter(Boolean)` → `['rounded-xl border', 'bg-white shadow-xs']` |
| 3 | `.join(' ')` → `"rounded-xl border bg-white shadow-xs"` |

**Kết quả cuối:** `<div class="rounded-xl border bg-white shadow-xs">`

### E.2 — Trường hợp 2: có mảng lồng

**Đầu vào:** `cn('base', ['flex', 'items-center'], [['gap-2']])`

| Bước | Giá trị |
|---|---|
| `values` | `['base', ['flex','items-center'], [['gap-2']]]` |
| `.flat()` | `['base', 'flex', 'items-center', ['gap-2']]` ⚠️ `['gap-2']` **vẫn lồng** |
| `.filter(Boolean)` | `['base','flex','items-center', ['gap-2']]` — `['gap-2']` là mảng truthy → giữ lại |
| `.join(' ')` | `"base flex items-center gap-2"` ✅ |

> **Vẫn đúng** vì `Array.prototype.join()` tự gọi `toString()` trên phần tử mảng con (`['gap-2'].toString()` → `"gap-2"`). Nhưng đây là trường hợp biên — thực tế tránh lồng 2 cấp.

### E.3 — Trường hợp 3: sử dụng thật trong `Card.tsx`

```tsx
export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white shadow-xs', className)}>
      {children}
    </div>
  )
}
```

**Gọi từ `HomePage.tsx`:** `<Card className="p-6">`

| Bước | Giá trị | Kết quả |
|---|---|---|
| 1 | `className` = `"p-6"` | `cn('rounded-xl …', 'p-6')` |
| 2 | `.flat()` + `.filter(Boolean)` | không đổi |
| 3 | `.join(' ')` | `"rounded-xl border border-slate-200 bg-white shadow-xs p-6"` |

**Điểm mấu chốt:** class mặc định của `Card` **luôn luôn có mặt**. Người gọi chỉ **bổ sung**, không xóa được class nào. Đây gọi là **composition** (kết hợp) thay vì **override** (ghi đè).

### E.4 — So sánh khi KHÔNG dùng `cn()`

```tsx
// Cách 1: nối chuỗi thủ công
<div className={'base ' + className}>
// Nếu className = undefined → class="base undefined"  ← class rác trong HTML

// Cách 2: template literal
<div className={`base ${className ?? ''}`}>
// ✅ an toàn hơn, nhưng không xử lý được mảng và false

// Cách 3: dùng cn() — gọn và xử lý mọi trường hợp
<div className={cn('base', className)}>
```

---

## F. TỔNG KẾT

### F.1 — Kiến thức quan trọng cần nhớ

1. **`cn()` chỉ nối chuỗi — KHÔNG giải quyết xung đột Tailwind.** `cn('p-2','p-4')` → `"p-2 p-4"`. Thư viện `tailwind-merge` mới làm việc đó.
2. **`.filter(Boolean)`** là linh hồn của hàm — loại bỏ `false`, `null`, `undefined`, `''`.
3. **`ClassValue` chứa `false`** để hỗ trợ mẹo `isActive && 'bg-brand'` trong JSX.
4. **`.join(' ')` cần dấu cách** vì HTML phân tích `class` theo khoảng trắng.
5. **Class mặc định + class ghi đè = composition**, không phải override.
6. **`0` cũng bị filter bỏ** — cần class `"0"` thì truyền chuỗi `'0'`.

### F.2 — Hàm và kiểu quan trọng

| Tên | Loại | Nhiệm vụ |
|---|---|---|
| `cn(...values)` | Hàm | Nối nhiều chuỗi class, bỏ giá trị rỗng |
| `ClassValue` | Kiểu | Kiểu hợp lệ mà `cn()` chấp nhận |

### F.3 — File có liên quan

| File | Quan hệ |
|---|---|
| `src/components/ui/Card.tsx` | Mẫu chuẩn nhất: class mặc định + `className` từ props |
| `src/components/ui/button-variants.ts` | Gọi `cn()` để ghép 3 lớp class của nút |
| `src/components/layout/MainNav.tsx` | Ví dụ rõ nhất về `cn()` + điều kiện 3 nhánh |
| `src/components/publications/PublicationCard.tsx` | Dùng `cn()` với `className={saved ? … : undefined}` |

### F.4 — Câu hỏi tự kiểm tra

1. `cn('a', 0, 'b')` trả về gì? Tại sao?
2. `cn('a', ['b', ['c']])` trả về gì? `.flat()` đã làm phẳng hết chưa?
3. Nếu bỏ `false` khỏi `ClassValue`, dòng nào trong dự án sẽ báo lỗi TypeScript?
4. `cn('p-2', 'p-4')` — class nào thắng? Vì sao cần `tailwind-merge`?
5. Vì sao JSX dùng `className` chứ không phải `class`?
6. Tại sao `cn()` nằm ở `lib/` chứ không đặt trong `components/ui/`?
7. `...values` là rest hay spread? Kể 4 vị trí khác dùng dấu `...` trong JS.

---

**Xem tiếp:** [`../router/router.ts.md`](../router/router.ts.md) — bộ đọc URL quyết định trang nào hiện


> **Kết luận quan trọng:** `false` trong danh sách chính là "cơ chế báo cho `cn` biết **bỏ qua nhánh này**". Nếu `ClassValue` không chứa `false`, dòng `isActive ? 'a' : 'b'` vẫn OK, nhưng dòng `isActive && 'bg-brand'` sẽ **báo lỗi TypeScript**.

### C.3 — `cn()` có gây render lại không?

**Không.** `cn()` là hàm thuần túy (pure function): cùng đầu vào → luôn cùng đầu ra, không tác dụng phụ. Nó chỉ tính chuỗi class trong lúc render, không lưu state, không đăng ký listener.

---

## D. KIẾN THỨC LẬP TRÌNH LIÊN QUAN

### D.1 — Rest parameter `...values`

```ts
// [VÍ DỤ minh họa]
function cn(...values) {
  console.log(values)         // luôn là mảng
  console.log(values.length)
}
cn('a', 'b', 'c')   // values = ['a','b','c'], length = 3
cn()                // values = [], length = 0
```

**Phân biệt 4 vị trí dùng dấu `...`:**

| Vị trí | Tên | Ý nghĩa |
|---|---|---|
| `function f(...args)` | **Rest parameter** | Gom tham số thành mảng |
| `f(...mang)` | **Spread operator** | Truyền mảng ra nhiều tham số |
| `[...mang]` | **Spread trong mảng** | Sao chép + nối mảng |
| `{...obj}` | **Spread trong object** | Sao chép + gộp thuộc tính |

Ở `cn.ts` có **hai** loại: `...values` (rest) trong khai báo hàm, và `[...filtered]` trong `SearchPage.tsx` (spread trong mảng).

### D.2 — Union type `|`

```ts
type TraiCay = 'cam' | 'xoai' | 'le'

const x: TraiCay = 'cam'    // ✅
const y: TraiCay = 'chuoi'  // ❌ Lỗi: '"chuoi"' không thuộc TraiCay
```

> **Lợi ích thật trong dự án:** `data/domains.ts` có
> ```ts
> export type DomainCode = 'MATH' | 'MECH' | 'CS' | 'DS-AI' | 'OPT'
> ```
> Nếu bạn viết `domainCode: 'Khoa học Máy tính'` thay vì `'CS'`, TypeScript báo lỗi **ngay lúc viết**, thay vì lúc chạy mới phát hiện dữ liệu sai.

### D.3 — Kiểu đệ quy (recursive type)

```ts
type ClassValue = string | ClassValue[]
```

Kiểu tự tham chiếu chính nó. TypeScript chấp nhận vì mảng làm giới hạn độ sâu.

### D.4 — Ba phương thức mảng dùng trong file

| Phương thức | Việc làm | Trả về |
|---|---|---|
| `arr.flat()` | Làm phẳng mảng 1 cấp | Mảng mới |
| `arr.filter(Boolean)` | Giữ phần tử thoả điều kiện | Mảng mới |
| `arr.join(' ')` | Nối thành chuỗi | Chuỗi |

Cả ba đều **không sửa mảng gốc**.

### D.5 — `className` trong JSX

`class` là **từ khóa** của JavaScript, nên JSX **không dùng được**, phải viết `className`. React tự chuyển `className` thành `class` khi tạo HTML thật.

```tsx
<div className="p-4" />   // → HTML: <div class="p-4">
```



| Giá trị | `Boolean(x)` | Giữ lại? |
|---|---|---|
| `'rounded'` | `true` | ✅ |
| `false` | `false` | ❌ bỏ |
| `undefined` | `false` | ❌ bỏ |
| `null` | `false` | ❌ bỏ |
| `''` (chuỗi rỗng) | `false` | ❌ bỏ |
| `0` | `false` | ❌ **bỏ** ⚠️ |
| `1` | `true` | ✅ → `"1"` |

> ⚠️ **Điểm cần nhớ:** `0` cũng bị lọc bỏ. Nếu muốn class là `"0"`, phải truyền chuỗi `'0'`. May là trong Tailwind, class `"0"` không hữu ích nên không gây vấn đề.

### B.6 — `.join(' ')`

Nối các phần tử thành chuỗi, ngăn cách bằng **một dấu cách**.

```ts
// [VÍ DỤ minh họa]
['rounded-xl', 'border', 'bg-white'].join(' ')
// → "rounded-xl border bg-white"
```

**Vì sao phải có dấu cách?** Vì HTML phân tích `class` bằng khoảng trắng. Nếu nối không có dấu cách: `"rounded-xlborderbg-white"` → trình duyệt hiểu là **một** tên class vô nghĩa, không phải ba class.


  ```
- **File này phụ thuộc vào đâu?** **Không phụ thuộc gì cả.** Không import React, không import thư viện. Đây là file `.ts` thuần JavaScript có kiểu.

> **Vì sao viết tay thay vì cài `clsx`?** Thư viện `clsx` làm đúng việc này (~200 byte). Dự án chọn tự viết để **tránh thêm dependency** — README ghi rõ điều này. Với 1 hàm 8 dòng, viết tay hoàn toàn hợp lý.
