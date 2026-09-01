# dinhthepsg

Website **Đinh Thép Sài Gòn** - nhà máy sản xuất đinh thép xây dựng,
thuộc Công ty TNHH TM XNK Thép Cường Phát (MST 0312168657, thành lập 2012).

## Stack

Astro 5 SSG. Không React, không Vue, không Tailwind. Output là HTML tĩnh,
**0 KB JavaScript** trên trang công khai.

| Thư mục | Nội dung |
|---|---|
| `src/content/du-lieu/` | Dữ liệu YAML - nguồn sự thật, sau này cắm CMS vào sửa được |
| `src/content.config.ts` | Zod schema, sai dữ liệu thì build hỏng ngay |
| `src/lib/` | Hàm thuần: quy cách, JSON-LD schema, SEO text, môi trường |
| `src/styles/` | tokens - base - patterns, 1 file CSS |
| `src/pages/` | Trang. `san-pham/[slug].astro` sinh cả trang nhóm lẫn trang quy cách |
| `docs/` | Nghiên cứu SEO, mổ xẻ đối thủ, topical map, kế hoạch |

## Chạy

```
npm install
npm run dev      # http://localhost:4321
npm run build    # ra dist/
npm run preview
```

## Biến môi trường

| Biến | Khi nào cần |
|---|---|
| `SITE_URL` | Đặt `https://dinhthepsg.com` **sau khi mua domain**. Trước đó site tự chặn index để bản vercel.app không cạnh tranh với domain thật |

## Quy tắc nội dung

1. Mỗi trang phải mang ít nhất một dữ kiện mà đối thủ không có
2. Không bịa: chưa có giá thì không sinh `Offer` schema, chưa đếm thì ghi "đang cân đếm"
3. Số cây trên kg phải **cân và đếm thật**, không tính bằng công thức
4. Chỉ dùng ký tự bàn phím trong nội dung
