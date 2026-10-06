# 📚 Tài liệu giải thích mã nguồn — web-nckh_hamic_frontend

Thư mục này chứa **một file `.md` cho mỗi file nguồn** của dự án, giúp tra cứu lại sau này.

## Cách dùng

1. **Mở trên trình duyệt** (máy chủ dev đang chạy ở `npm run dev`):
   - Bảng tra cứu: <http://localhost:5173/docs/INDEX.md>
   - Báo cáo tổng quan: <http://localhost:5173/docs/00-BAO-CAO-KHAO-SAT.md>
   - Một file nguồn bất kỳ: <http://localhost:5173/docs/src/router/router.ts.md>

2. **Mở bằng trình soạn thảo**: `public/docs/` trong VS Code (định dạng Markdown sẽ tô màu).

## Cấu trúc

```
public/docs/
├── README.md              ← BẠN ĐANG ĐỌC FILE NÀY
├── INDEX.md               ← Bảng tra cứu: file nguồn ↔ file tài liệu
├── 00-BAO-CAO-KHAO-SAT.md ← Báo cáo khảo sát toàn bộ dự án (Giai đoạn 1)
├── root/                  ← File gốc dự án (package.json, vite.config.ts...)
└── src/                   ← MIRROR CHÍNH XÁC cấu trúc thư mục src/
    ├── main.tsx.md
    ├── App.tsx.md
    ├── index.css.md
    ├── lib/cn.ts.md
    ├── types/index.ts.md
    ├── router/…
    ├── data/…
    ├── features/auth/…
    ├── pages/…
    └── components/…
```

> **Nguyên tắc đặt tên:** `<đường dẫn file nguồn>.md`
> Ví dụ `src/router/router.ts` → `public/docs/src/router/router.ts.md`
> Nhờ vậy tìm tài liệu của một file = thêm đuôi `.md` vào đường dẫn file đó.

## Cấu trúc mỗi file tài liệu

Mọi tài liệu chi tiết tuân theo cùng một bộ khung:

| Mục | Nội dung |
|---|---|
| **A. MỤC ĐÍCH CỦA FILE** | File dùng để làm gì, nằm ở đâu trong kiến trúc, ai import nó |
| **B. GIẢI THÍCH CODE TỪ TRÊN XUỐNG** | Đi từng dòng, giải thích từng import/biến/hàm/JSX/CSS |
| **C. GIẢI THÍCH LUỒNG HOẠT ĐỘNG** | Sơ đồ mũi tên: điều gì xảy ra trước, sau, dữ liệu đi qua đâu |
| **D. KIẾN THỨC LẬP TRÌNH LIÊN QUAN** | Giải thích khái niệm xuất hiện trong file (chỉ những cái thật sự dùng) |
| **E. VÍ DỤ THỰC TẾ** | Mô phỏng từng bước với dữ liệu đầu vào cụ thể |
| **F. TỔNG KẾT** | Kiến thức cần nhớ, file liên quan, câu hỏi tự kiểm tra |

## Trạng thái tài liệu

| Ký hiệu | Ý nghĩa |
|---|---|
| ✅ **Đầy đủ** | Đã giải thích chi tiết theo bộ khung A–F |
| 🟡 **Sơ lược** | Đã có phần giải thích cơ bản, sẽ bổ sung chi tiết ở Giai đoạn 2 |
| ⬜ **Chờ giải thích** | Khung đã tạo, nội dung sẽ bổ sung khi học đến file này |

Xem cột **Trạng thái** trong [INDEX.md](./INDEX.md).

## Phân biệt mã thật và ví dụ minh hoạ

Trong tài liệu luôn quy ước:

- **Code thật của dự án** — nằm trong khối ```` ``` ```` thường, có tên file thực tế kèm số dòng.
- **Ví dụ minh hoạ** — nằm trong khối ```` ``` ```` **đánh dấu `[VÍ DỤ]`**, dùng dữ liệu giả đặt tên `A`, `B`, `C`.

Tài liệu này **chỉ mô tả** code hiện có. Không tự sửa code và không khẳng định những điều không kiểm chứng được từ mã nguồn.
