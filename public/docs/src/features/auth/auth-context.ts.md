# `src/features/auth/auth-context.ts` — Hợp đồng trạng thái đăng nhập

> **Trạng thái:** ✅ Đầy đủ
> **File nguồn:** `src/features/auth/auth-context.ts` (37 dòng)

```ts
import { createContext, useContext } from 'react'
import type { RoleId } from '@/data/rbac'

export type AuthModalMode = 'login' | 'register'

export interface AuthUser {
  name: string
  email: string
  role: RoleId
}

export interface AuthContextValue {
  role: RoleId
  setRole: (role: RoleId) => void
  user: AuthUser | null
  isAuthenticated: boolean
  signIn: (payload: { name?: string; email: string; role: RoleId }) => void
  signOut: () => void
  authModal: AuthModalMode | null
  openAuthModal: (mode: AuthModalMode) => void
  closeAuthModal: () => void
  debugBarVisible: boolean
  hideDebugBar: () => void
  hasPermission: (permission: string) => boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>.')
  }
  return value
}

---

## B. GIẢI THÍCH CODE TỪ TRÊN XUỐNG DƯỚI

### B.1 — `import type { RoleId } from '@/data/rbac'`

Nhớ `RoleId` từ `src/data/rbac.ts`:
```ts
export type RoleId = 'guest' | 'student' | 'lecturer' | 'admin'
```

**Điểm kiến trúc đáng chú ý:** kiểu `RoleId` được định nghĩa trong **`data/`** chứ không phải trong `types/`.

> Có vẻ hơi lạ, nhưng hợp lý: `RoleId` đi cùng `roles` và `rolePermissions` — 3 thứ tạo nên một khối "phân quyền". Đặt cùng chỗ giúp người đọc thấy trọn khối. `types/index.ts` giữ những kiểu dùng **rộng rãi** nhiều nơi.

### B.2 — `export type AuthModalMode = 'login' | 'register'`

**Union type** — chỉ nhận đúng 2 giá trị này.

| Tình huống | Giá trị |
|---|---|
| Modal đóng | `null` |
| Đang mở tab đăng nhập | `'login'` |
| Đang mở tab đăng ký | `'register'` |

**Vì sao thêm `| null` ở `AuthContextValue` mà không đặt trong `AuthModalMode`?**
Vì `AuthModalMode` chỉ mô tả **chế độ khi đã mở**. Còn `authModal: AuthModalMode | null` phải mô tả cả trạng thái **đóng**. Đây là chữ "`| null` ở nơi sử dụng" — làm kiểu gốc gọn hơn.

### B.3 — `export interface AuthUser`

```ts
export interface AuthUser {
  name: string
  email: string
  role: RoleId
}
```

| Trường | Ý nghĩa |
|---|---|
| `name` | Tên hiển thị — dùng cho `Avatar` và header |
| `email` | Email — dùng hiển thị và đăng nhập |
| `role` | Vai trò — quyết định quyền truy cập |

**Dữ liệu mẫu** (từ `AuthProvider.tsx`):
```ts
{ name: 'Sinh viên MIM', email: 'student@hus.edu.vn', role: 'student' }
```

### B.4 — `export interface AuthContextValue` — hợp đồng

Đây là **interface quan trọng nhất của tính năng đăng nhập**: liệt kê **13 thành phần** mà bất kỳ nơi nào cần thông tin đăng nhập đều dùng được.

**Nhóm 1 — Vai trò & người dùng:**
```ts
role: RoleId                     // vai trò đang hoạt động
setRole: (role: RoleId) => void  // đổi vai trò (thanh debug)
### B.5 — `export const AuthContext = createContext<AuthContextValue | null>(null)`

**Đây là dòng quan trọng nhất của file.** Đọc từ trong ra:

| Phần | Ý nghĩa |
|---|---|
| `createContext` | Hàm của React tạo "kênh truyền dữ liệu" |
| `<AuthContextValue \| null>` | Kiểu của giá trị **bên trong** kênh |
| `(null)` | **Giá trị mặc định** — dùng khi chưa có Provider nào bọc ngoài |

**Vì sao giá trị mặc định là `null` chứ không phải object giả?**
Vì `null` là giá trị **"không có dữ liệu"** rõ ràng. Khi đó `useAuth()` phát hiện và **báo lỗi có thông điệp**. Nếu dùng object giả rỗng, component sẽ đọc được `undefined` mà không biết mình ở sai chỗ → lỗi khó truy.

**Minh hoạ Context hoạt động như thế nào:**

```
┌─ AuthProvider ────────────────────────────────────┐
│  const [role, setRole] = useState('guest')        │
│  const value = { role, setRole, user, … }         │
│                                                    │
│  <AuthContext.Provider value={value}>  ← ĐẶT GIÁ TRỊ
│       {children}                                  │
│  </AuthContext.Provider>                           │
└────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
   DebugRbacBar    SiteHeader   PublicationCard
   useContext()    useContext()  useContext()
         │              │              │
         └──────────────┴──────────────┘
             cùng đọc được `value` ← NHẬN GIÁ TRỊ
```

> **Quan sát quan trọng:** component **con sâu bao nhiêu tầng cũng đọc được** — không cần cha truyền `props` xuống từng bậc. React gọi hiện tượng cần truyền props qua nhiều tầng là **props drilling**, và Context là cách giải quyết.

### B.6 — `export function useAuth(): AuthContextValue`

```ts
export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>.')
  }
  return value
}
```

| Dòng | Ý nghĩa |
|---|---|
| `const value = useContext(AuthContext)` | Đọc giá trị từ Provider gần nhất phía trên |
| `if (!value) { throw … }` | Nếu không có Provider → **ném lỗi** kèm thông báo rõ |
| `return value` | Trả về kiểu `AuthContextValue` (không còn là `\| null`) |

**Tại sao cần dòng `throw`?**

Nhờ nó, **kiểu trả về được thu hẹp**: sau khi loại trừ `null`, TypeScript biết `value` chắc chắn là `AuthContextValue`. Nhờ vậy dùng `role`, `signIn`… **không cần dấu `?` hay `!`**.

**Vì sao ném lỗi chứ không `return null`?**
Trả `null` sẽ khiến **mọi** chỗ dùng `useAuth()` phải xử lý trường hợp `null` → code rối và dễ sót. Ném lỗi **dừng ứng dụng ngay** với thông báo dễ hiểu — đây là lỗi do **lập trình** (không bọc Provider), không phải lỗi người dùng.

> **Thông điệp lỗi rất tốt** — ghi rõ nguyên nhân và cách sửa: *"useAuth phải được dùng bên trong `<AuthProvider>`."*
### C.2 — Người dùng đổi vai trò ở thanh debug

```
Bấm nút "Sinh viên (Student)" trên thanh SWITCHMODE
    ▼
DebugRbacBar: onClick={() => setRole(item.id)}
    ▼
setRole('student') chạy trong AuthProvider:
    ├─ setRoleState('student')        ← role: 'guest' → 'student'
    └─ setUser(demoAccounts['student'])
         = { name:'Sinh viên MIM', email:'student@hus.edu.vn', role:'student' }
    ▼
AuthProvider render lại
    ├─ isAuthenticated = (user !== null) = true
    ├─ hasPermission('fulltext:read')
    │     rolePermissions['student'] = ['public:read','fulltext:read',…]
    │     .includes('fulltext:read') → true
    └─ useMemo tính lại value (vì role, user đổi)
    ▼
<AuthContext.Provider value={valueMỚI}>
    ▼
Mọi component dùng useAuth() render lại:
    • DebugRbacBar   → nút "student" được tô đậm
    • SiteHeader     → thay nút "Đăng nhập/Đăng ký" bằng tên + avatar + nút thoát
    • PublicationCard → nút "Xem PDF" giờ điều hướng thay vì mở modal
```

**Đây chính là sức mạnh của Context:** đổi state ở **một chỗ** → **toàn bộ cây** biết ngay, không cần truyền `props`.

### C.3 — Guest bấm "Xem PDF" trên thẻ công trình

```
PublicationCard render
    ├─ const { hasPermission, openAuthModal } = useAuth()
    ├─ const canReadFulltext = hasPermission('fulltext:read')
    │     rolePermissions['guest'] = ['public:read']
    │     ['public:read'].includes('fulltext:read') → false
    │     → canReadFulltext = false
    ▼
Người dùng bấm nút "Xem PDF" → openDetail() chạy:
    if (!canReadFulltext) {
      openAuthModal('login')      ← mở modal đăng nhập
      return                       ← KHÔNG điều hướng
    }
    navigate(buildPath(`/cong-trinh/${publication.id}`))
    ▼
authModal = 'login' trong AuthProvider
    ▼
AppShell luôn render <AuthModal /> → <Modal open={authModal !== null} …>
    → open = true → hiện hộp thoại đăng nhập
```

### C.4 — Đăng nhập thành công
### D.4 — `throw` trong React component

```ts
if (!value) throw new Error('useAuth phải được dùng bên trong <AuthProvider>.')
```

Ném lỗi ở đây **dừng render toàn bộ cây** và hiện màn hình đỏ trong môi trường phát triển, kèm stack trace chỉ đúng chỗ sai.

> ⚠️ **Chỉ dùng `throw` cho lỗi lập trình** (sai cấu trúc code), **không** cho lỗi người dùng (sai mật khẩu, mất mạng…). Lỗi người dùng nên hiển thị thông báo trong giao diện.

### D.5 — Kiểu hàm trong interface

```ts
signIn: (payload: { name?: string; email: string; role: RoleId }) => void
hasPermission: (permission: string) => boolean
```

Đọc từ trái sang phải:
1. Tên: `signIn`
2. Kiểu: **hàm**
3. Tham số: `payload` có kiểu `{ name?, email, role }`
4. Trả về: `void` (không có giá trị)

> **Vì sao khai báo kiểu hàm trong interface thay vì dùng `function` thật?**
> Vì `AuthContextValue` chỉ mô tả **hình dạng** — không chứa logic. Logic thật nằm trong `value` do `AuthProvider` tạo.
> Nếu không có khai báo này, TypeScript không biết `signIn` có tồn tại trong `value` hay không.

---

## E. VÍ DỤ THỰC TẾ

### E.1 — Bảng trạng thái theo 4 vai trò

Lấy từ `rolePermissions` (`src/data/rbac.ts`) và `demoAccounts` (`AuthProvider.tsx`):

| Vai trò | `user` | `isAuthenticated` | `hasPermission('fulltext:read')` |
|---|---|---|---|
| `guest` | `null` | `false` | `false` |
| `student` | Sinh viên MIM | `true` | `true` |
| `lecturer` | Giảng viên MIM | `true` | `true` |
| `admin` | Quản trị viên | `true` | `true` |

**Nhận xét:** chỉ `guest` bị chặn toàn văn — 3 vai trò còn lại đều có `fulltext:read`.

### E.2 — Mô phỏng `hasPermission` từng bước

**Kịch bản:** người dùng đang là `student`, bấm "Xem PDF".

```
hasPermission('fulltext:read')
    ▼
role = 'student'
    ▼
rolePermissions['student']
    = ['public:read', 'fulltext:read', 'topic:register', 'mentor:follow']
    ▼
.includes('fulltext:read')  → tìm thấy ở index 1
    ▼
→ true
    ▼
canReadFulltext = true
    ▼
---

## F. TỔNG KẾT

### F.1 — Kiến thức quan trọng cần nhớ

1. **File này chỉ định nghĩa, không giữ state.** State thật nằm ở `AuthProvider.tsx`.
2. **`createContext<T | null>(null)`** — giá trị mặc định `null` là để phát hiện dùng sai chỗ.
3. **`useAuth()` ném lỗi nếu không có Provider** — nhờ vậy kiểu trả về được thu hẹp, không cần `?.` ở mọi nơi.
4. **Context chỉ đọc được Provider ở phía trên** → `AuthProvider` phải bọc ngoài `App` trong `main.tsx`.
5. **`hasPermission` là hàm** → kiểm tra quyền gọn 1 dòng ở mọi nơi.
6. **`isAuthenticated` là derived value** — rút gọn của `user !== null`.
7. **Context ≠ state toàn cục.** Biến module (`router.ts`) không tự render lại; Context thì có.

### F.2 — Các thành phần quan trọng

| Tên | Loại | Nhiệm vụ |
|---|---|---|
| `AuthContext` | Context | Kênh truyền trạng thái đăng nhập |
| `useAuth()` | Hook | Đọc trạng thái đăng nhập; ném lỗi nếu thiếu Provider |
| `AuthContextValue` | Interface | Hợp đồng: 13 thành phần (state + hành động) |
| `AuthUser` | Interface | Hình dạng người dùng: `name`, `email`, `role` |
| `AuthModalMode` | Type | Union: `'login' \| 'register'` |

### F.3 — File có liên quan

| File | Quan hệ |
|---|---|
| `src/main.tsx` | Bọc `<AuthProvider>` quanh `<App />` — điều kiện tiên quyết để `useAuth()` hoạt động |
| `src/features/auth/AuthProvider.tsx` | Tạo giá trị thật cho `AuthContext` (giữ state) |
| `src/features/auth/AuthModal.tsx` | Dùng `authModal`, `openAuthModal`, `closeAuthModal`, `signIn` |
| `src/components/layout/SiteHeader.tsx` | Dùng `user`, `openAuthModal`, `signOut`; tìm `roleLabel` qua `roles.find()` |
| `src/components/layout/DebugRbacBar.tsx` | Dùng `role`, `setRole`, `debugBarVisible`, `hideDebugBar` |
| `src/components/publications/PublicationCard.tsx` | Dùng `hasPermission('fulltext:read')`, `openAuthModal` |
| `src/components/publications/PublicationListItem.tsx` | Cùng logic trên |
| `src/data/rbac.ts` | Cung cấp `RoleId`, `roles`, `rolePermissions` |

### F.4 — Câu hỏi tự kiểm tra

1. Nếu bỏ `<AuthProvider>` khỏi `main.tsx`, lỗi hiện ra ở đâu? Thông điệp nói lên điều gì?
2. `RoleId` định nghĩa trong `data/rbac.ts` chứ không phải `types/index.ts` — lý do có thể là gì?
3. Vì sao `hasPermission` là hàm thay vì thuộc tính kiểu `string[]`?
4. Nếu đổi thành `createContext<AuthContextValue>(…)`, dòng `if (!value) throw` còn cần không?
5. `AuthModalMode` khác gì `AuthModalMode | null`?
6. Giải thích bằng lời tại sao Context "không phải state toàn cục", dù người ta hay gọi nó là global state.
7. Component nào sâu nhất trong cây đọc `useAuth()`? Nó cách `AuthProvider` bao nhiêu tầng?

---

**Xem tiếp:** [`./AuthProvider.tsx.md`](./AuthProvider.tsx.md) — nơi thực sự giữ state đăng nhập

openDetail(): if (!true) { … }  → KHÔNG vào nhánh mở modal
    → navigate(buildPath('/cong-trinh/pub-transformer-vi'))
    → window.location.hash = '/cong-trinh/pub-transformer-vi'
    ▼
Trình duyệt bắn hashchange → renderPage → <PublicationDetailPage id="pub-transformer-vi" />
    ▼
publications.find(item => item.id === 'pub-transformer-vi') → tìm thấy
    → <PlaceholderPage title={publication.title} … />
```

**Nếu là `guest`:**
```
rolePermissions['guest'] = ['public:read']
    → .includes('fulltext:read') → false
    → canReadFulltext = false
    → openDetail(): if (!false) → VÀO nhánh → openAuthModal('login')
    → KHÔNG gọi navigate → vẫn ở trang hiện tại
```

### E.3 — TypeScript thu hẹp kiểu sau `throw`

```ts
export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  //    ↑ TypeScript: AuthContextValue | null

  if (!value) {
    throw new Error('…')
  }
  //    ↑ sau dòng này: AuthContextValue  (đã loại null)

  return value
}
```

**Nếu bỏ dòng `throw`**, mọi nơi gọi `useAuth()` phải viết:
```tsx
const auth = useAuth()
if (!auth) return null          // 😢 lặp lại ở 7 file
auth.role
```
Sau khi có `throw`, chỉ cần:
```tsx
const { role, signIn } = useAuth()   // ✅ sạch sẽ
```



```
Người dùng điền email + mật khẩu → nhấn nút
    ▼
AuthModal form onSubmit:
    event.preventDefault()               ← chặn tải lại trang
    signIn({ email, role: isLogin ? 'student' : audience })
    ▼
signIn chạy trong AuthProvider:
    ├─ fallbackName = payload.email.split('@')[0] || 'Người dùng MIM'
    ├─ setRoleState(payload.role)
    ├─ setUser({ name: …, email, role })
    └─ setAuthModal(null)               ← đóng modal
    ▼
value được useMemo tính lại → Provider cấp lại
    ▼
AuthModal render lại: mode = authModal ?? 'login' = 'login'
                      open = (authModal !== null) = false
                      → <Modal> trả về null → hộp thoại biến mất ✅
SiteHeader render lại: user có giá trị → hiện tên + avatar + nút thoát
```

> **Điểm hay ở dòng `const mode: AuthModalMode = authModal ?? 'login'`:**
> Khi modal đóng (`authModal = null`), biến `mode` vẫn là `'login'` — nên form vẫn dựng được nội dung mà không lỗi. Chỉ khi `open` mới quyết định có hiện hay không.

---

## D. KIẾN THỨC LẬP TRÌNH LIÊN QUAN

### D.1 — Context là gì?

**Context** cho phép truyền dữ liệu từ component cha xuống **component con ở bất kỳ đâu trong cây**, mà không cần truyền qua `props` từng bậc.

```tsx
// Bước 1: tạo kênh (thường để trong file riêng)
const AuthContext = createContext<Value | null>(null)

// Bước 2: bọc Provider ở gốc cây
<AuthContext.Provider value={data}>{children}</AuthContext.Provider>

// Bước 3: đọc ở bất kỳ đâu bên trong
const data = useContext(AuthContext)
```

**Khi nào dùng Context (không dùng props)?**
- Dữ liệu **dùng ở nhiều nơi** xuyên suốt cây (đăng nhập, theme, ngôn ngữ).
- Dữ liệu **thay đổi thường xuyên** (vì props sẽ khiến mọi component phía dưới render lại).
- Dữ liệu mà bạn **không muốn** truyền qua nhiều tầng.

> **Nguyên tắc vàng của React:** **"Đừng truyền props quá xa"**. Nếu phải truyền một prop qua 5 tầng component chỉ để component sâu nhất dùng → cân nhắc Context.

### D.2 — `useContext` hoạt động thế nào?

React duyệt cây component và ghi nhớ "tôi đang ở trong `AuthContext.Provider` nào". Khi gặp `<AuthContext.Provider value={X}>`, nó ghi `AuthContext` → `X` vào stack. Khi bất kỳ component nào gọi `useContext(AuthContext)`, React đọc giá trị **gần nhất** trong stack.

> **Quan trọng:** Context chỉ đọc được Provider **ở phía trên** (cha). Không đọc được Provider ở phía dưới (con) — đó là lý do `AuthProvider` phải bọc ngoài `App` trong `main.tsx`.

### D.3 — Context có phải state toàn cục không?

**Không hẳn.** Đây là điểm gây hiểu nhầm nhiều nhất:

| | Context | State toàn cục (biến module) |
|---|---|---|
| Truy cập từ đâu | Chỉ component trong cây Provider | Mọi nơi trong ứng dụng |
| Render lại | Có — đổi `value` → render lại cây con | Không — biến JS không tự render |
| Quản lý bởi | React | Bạn |

> **Trong `router.ts` chính là ví dụ của "state toàn cục":** `let current` là biến module-level, nhưng nó **không tự** làm React render lại — vì vậy phải có `subscribeRouter` + `useSyncExternalStore` để kết nối.
>
> Ngược lại, Context **tích hợp sẵn** cơ chế render lại của React.



**Vì sao bọc `useAuth()` trong hàm riêng thay vì gọi `useContext` trực tiếp ở mọi nơi?**
① Kiểm tra `null` chỉ viết **một lần**.
② Đổi cách lưu trữ trạng thái sau này chỉ sửa **1 file**.
③ Có thêm kiểm tra (logging, kiểm tra phiên bản) dễ dàng.

---

## C. GIẢI THÍCH LUỒNG HOẠT ĐỘNG

### C.1 — Khởi tạo lúc ứng dụng chạy

```
main.tsx
    ▼
<AuthProvider>                      ← thực thi AuthProvider.tsx
    ├─ useState → role = 'guest'
    ├─ useState → user = null
    ├─ useState → authModal = null
    ├─ useState → debugBarVisible = true
    │
    └─ value = {
         role: 'guest',
         setRole, user: null,
         isAuthenticated: false,        ← user !== null = false
         signIn, signOut,
         authModal: null,
         openAuthModal, closeAuthModal,
         debugBarVisible: true,
         hideDebugBar,
         hasPermission: (p) => rolePermissions['guest'].includes(p)
       }                               ← hasPermission đóng lại biến `role`
    ▼
<AuthContext.Provider value={value}>
    └─ {children} = <App />
            ▼
    App → AppShell → DebugRbacBar, SiteHeader, PublicationCard…
            mỗi component gọi useAuth() → đọc `value` ✅
```

**Quan sát quan trọng về `hasPermission`:**
```ts
hasPermission: (permission: string) => rolePermissions[role].includes(permission)
```
Đây là **arrow function đóng lại biến `role`**. Vì `value` được `useMemo` tính lại khi `role` đổi, hàm mới luôn tham chiếu `role` **mới nhất**.


user: AuthUser | null            // null nếu chưa đăng nhập
isAuthenticated: boolean         // rút gọn: user !== null
```

> **Vì sao có cả `user` lẫn `isAuthenticated`?**
> Vì `isAuthenticated` **tiện hơn**: `if (!isAuthenticated)` dễ hiểu hơn `if (!user)`. Đây là **derived value** — tính từ giá trị khác, không lưu riêng.

**Nhóm 2 — Hành động đăng nhập/đăng xuất:**
```ts
signIn: (payload: { name?: string; email: string; role: RoleId }) => void
signOut: () => void
```

Cú pháp `(payload: { … }) => void` là **kiểu của tham số hàm**: "nhận tham số tên `payload` có kiểu object gồm `name?`, `email`, `role`; không trả về gì".

> **`name?` có dấu `?`** = **tuỳ chọn**. Đúng với thực tế: đăng nhập không cần nhập tên (lấy từ email), đăng ký thì có.

**Nhóm 3 — Điều khiển modal:**
```ts
authModal: AuthModalMode | null      // null = đang đóng
openAuthModal: (mode: AuthModalMode) => void
closeAuthModal: () => void
```

**Nhóm 4 — Thanh debug & phân quyền:**
```ts
debugBarVisible: boolean
hideDebugBar: () => void
hasPermission: (permission: string) => boolean
```

> **`hasPermission` là hàm, không phải mảng quyền.** Nhờ vậy kiểm tra quyền **gọn 1 dòng**:
> ```tsx
> const canReadFulltext = hasPermission('fulltext:read')
> ```
> thay vì phải viết `rolePermissions[role].includes('fulltext:read')` ở mọi nơi.


```

---

## A. MỤC ĐÍCH CỦA FILE

- **Dùng để làm gì?** Khai báo **"hợp đồng"** cho trạng thái đăng nhập và cung cấp **hook `useAuth()`** để mọi component đọc được.
- **Nằm ở đâu trong kiến trúc?** `src/features/auth/`. Đây là **tầng định nghĩa** — file này **không chứa JSX** và **không chứa state**.

**Chia 3 tầng của tính năng đăng nhập:**

| File | Vai trò | Có JSX? | Có state? |
|---|---|---|---|
| `auth-context.ts` **(file này)** | Định nghĩa kiểu + tạo Context + hook đọc | ❌ | ❌ |
| `AuthProvider.tsx` | **Giữ state**, cung cấp cho toàn cây | ✅ | ✅ |
| `AuthModal.tsx` | Giao diện hộp thoại đăng nhập | ✅ | ✅ |

> **Vì sao tách 3 file?**
> `AuthModal.tsx` cần `useAuth()` → `useAuth()` lấy từ `AuthContext` → `AuthContext` do `AuthProvider` cấp.
> Nếu gộp tất cả vào 1 file, file đó sẽ vừa định nghĩa vừa cung cấp vừa tiêu thụ → dễ gây **vòng import** (A import B, B import A).

- **File nào sử dụng?** 7 file gọi `useAuth()`:

| File | Dùng để làm gì |
|---|---|
| `src/components/layout/DebugRbacBar.tsx` | Đổi vai trò, ẩn thanh debug |
| `src/components/layout/SiteHeader.tsx` | Hiện tên/avatar, nút đăng nhập/đăng xuất |
| `src/components/publications/PublicationCard.tsx` | `hasPermission('fulltext:read')` để quyết định mở modal hay điều hướng |
| `src/components/publications/PublicationListItem.tsx` | Cùng logic trên |
| `src/features/auth/AuthModal.tsx` | Đọc `authModal`, `signIn`, `closeAuthModal` |
| `src/features/auth/AuthProvider.tsx` | Tạo giá trị `value` để cấp xuống |

- **File này phụ thuộc vào đâu?** `react` (`createContext`, `useContext`) và **kiểu** `RoleId` từ `@/data/rbac`.

