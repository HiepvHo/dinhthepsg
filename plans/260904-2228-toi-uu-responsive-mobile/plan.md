---
status: done
ngay: 2026-09-04
---

# Tối ưu responsive mobile - dinhthepsg.com

Đo thật bằng Playwright trên **30 trang x 4 khổ** (360/390/414/768), Chromium
`isMobile: true`, `hasTouch: true`, DPR 2, UA iPhone. Script:
`scratchpad/do-responsive.mjs` + `chup-mobile.mjs` + ảnh chụp `shot-390/`.

## Đã sạch, không sửa

| Mục | Số đo |
|---|---|
| Tràn ngang cấp document | **0/120** lần đo (30 trang x 4 khổ) |
| Ảnh tràn khung nhìn | 0 |
| Ảnh biến dạng tỉ lệ | 0 |
| Input dưới 16px (Safari iOS tự zoom) | 0 (site không có form) |
| Bảng không có vùng cuộn | 0 - mọi bảng đã nằm trong `.bang-cuon` |

209 kết quả "tràn" còn lại đều là slide banner nằm ngoài khung nhìn (`left = -vw`)
và skip-link ở `-9999px`. Đúng thiết kế, không phải lỗi.

## Bẫy đã mắc trong lúc đo, ghi lại để không lặp

`npx serve -s dist` bật chế độ SPA fallback: **mọi URL trả về `index.html`**.
Lượt audit đầu đo trang chủ 30 lần rồi báo "không có lỗi". Phát hiện được vì md5
của `trang-chu-01.png` và `bang-gia-01.png` giống hệt nhau. Phải chạy
`serve dist` không có `-s`.

Ngoài ra khi đo phải: tắt `transition`/`animation` (headless không chạy frame nên
đọc được trạng thái giữa đường), thêm class `da-hien` cho `.hien-dan` (scroll
reveal đặt `opacity: 0`), đổi `loading=lazy` thành `eager` rồi chờ ảnh load -
không thì phần lớn trang báo "sạch" chỉ vì nội dung đang ẩn.

## Lỗi thật, xếp theo tác động

| # | Lỗi | Số đo | Phạm vi |
|---|---|---|---|
| 1 | **Bảng quy cách hàng cao 131-157px** vì `min-width: 560px` bóp 2 cột cuối xuống 62-87px, chữ xuống 4-5 dòng. Vùng nhìn 390px chỉ thấy cột đầu 1 dòng nên đọc ra như bảng trống | 6/7 bảng | `/bang-gia-dinh-thep/`, trang nhóm |
| 2 | **Bảng địa điểm hàng cao 285px**, cột 1 chiếm 449px trong 795px | 1 bảng | `/lien-he/` |
| 3 | **Bảng cuộn ngang được nhưng không có dấu hiệu nào** báo là cuộn được. Cột "Đường kính" bị cắt giữa chữ -> khách tưởng thiếu dữ liệu | mọi bảng | toàn site |
| 4 | **Header mobile vỡ bố cục**: khối cam chỉ rộng 239px, hamburger đặt ở x=251 nằm trên nền trắng, còn **111px trắng chết** bên phải. Hàng nav `.dieu-huong` còn cao 1px nhưng vẫn chiếm chỗ | mọi trang | toàn site |
| 5 | `.hieu__phu` **9.5px** ở khổ 768px (ở 390px thì `display: none`) | 30 trang | toàn site |
| 6 | **Thẻ lật `.the-lat` chạy bằng `:hover`** - điện thoại không có hover, `.the-lat__mo` nằm ở `top: 100%` nên **mô tả sản phẩm không bao giờ hiện trên mobile**. Thẻ vẫn giữ `margin: 65px 0 25px` và `padding: 65px 30px 25px` tính cho bản desktop | 6 thẻ | `/san-pham/` |
| 7 | **713-717 vùng bấm dưới 24px** (WCAG 2.2 SC 2.5.8 Target Size Minimum). Link footer cao 18px, link nav 20px, breadcrumb 22px, link điện thoại 23px | mỗi khổ mobile | toàn site |
| 8 | Chữ **13.5px** ở footer, mega menu, `th`, ghi chú bảng, `time` | 1222 chỗ | toàn site |
| 9 | **Banner cao 920px trên màn 844px** -> H1 và cả 2 nút CTA nằm dưới màn đầu, phải cuộn mới thấy | 1 | `/` |
| 10 | **Thanh CTA cố định dưới che mất chữ cuối trang** - `body` không có `padding-bottom` bù | mọi trang | toàn site |
| 11 | Hai ảnh nhà máy đặt cạnh nhau ở 390px, mỗi ảnh chỉ **168x480** - tỉ lệ 0.35 hẹp tới mức không đọc được ảnh gì | 1 | `/` |
| 12 | Khoảng trắng **170px** giữa dải `DauMuc` và đoạn văn đầu tiên | 6 trang | trang dùng `DauMuc` |

## Hướng sửa

### Nhóm A - Bảng (lỗi 1, 2, 3)

**Lỗi 1:** đổi `.bang { min-width: 560px }` thành `min-width: max-content`.
Đo trước khi sửa: hàng 131-157px. Đo với `max-content`: **hàng 55px đều**, bảng
rộng 407-825px. Cuộn ngang xa hơn nhưng đó là hành vi đúng của bảng số trên
mobile, và mọi hàng về 1 dòng.

**Lỗi 2:** bảng địa điểm ở `max-content` phình lên **1554px** = 4 lần khung nhìn,
cuộn ngang không dùng được. Bảng này là địa chỉ chứ không phải số nên đổi sang
**xếp thành thẻ dọc** dưới 620px: mỗi địa điểm một thẻ, nhãn cột thành nhãn
trong thẻ. Giữ `<table>` trong HTML để Google vẫn đọc quan hệ hàng-cột.

**Lỗi 3:** thêm dấu hiệu cuộn cho `.bang-cuon`: gradient mờ ở mép phải khi còn
nội dung chưa hiện, tắt bằng JS khi cuộn tới cuối. Kèm một dòng chữ nhỏ
"Cuộn ngang để xem hết" chỉ hiện dưới 760px.

### Nhóm B - Header (lỗi 4, 5)

Dưới 980px bỏ hẳn kiểu hai dải vát của desktop:
- `.hieu` giãn hết chiều rộng, hamburger nằm **trong** dải cam ở mép phải
- bỏ `.dieu-huong` khỏi luồng (`display: none`) thay vì để cao 1px
- `.hieu__phu`: ẩn hẳn dưới 900px thay vì thu về 9.5px ở 768px

### Nhóm C - Thẻ sản phẩm (lỗi 6)

Dưới 760px bỏ cơ chế lật, đổi sang thẻ tĩnh xếp dọc: ảnh trên, tiêu đề, mô tả
hiện sẵn, nút bám đáy thẻ. Giữ nguyên `.the-lat` cho desktop - không đụng tới
bản đã duyệt.

### Nhóm D - Vùng bấm và cỡ chữ (lỗi 7, 8)

Vùng bấm: đặt `min-height: 24px` + `padding-block` cho link trong **danh sách**
(footer, nav, breadcrumb, cột bên) và link điện thoại. **Không** áp cho link
nằm trong câu văn - SC 2.5.8 có ngoại lệ "inline" cho link trong khối văn bản,
và nong chúng lên sẽ phá nhịp dòng.

Cỡ chữ: dưới 760px nâng `--cs-micro` từ 13.5px lên 15px. Đây là biến nên sửa
một chỗ, mọi nơi theo.

### Nhóm E - Trang chủ và bố cục chung (lỗi 9, 10, 11, 12)

- Banner: dưới 760px giảm `height` để H1 + CTA vào được màn đầu
- `body`: thêm `padding-bottom` bằng chiều cao thanh CTA cố định, chỉ dưới 760px
- Hai ảnh nhà máy: xếp dọc dưới 620px
- `DauMuc`: giảm khoảng cách dưới dải ở mobile

## Thứ tự thực hiện

| Phase | Nội dung | File |
|---|---|---|
| 01 | Bảng: `max-content`, thẻ dọc cho địa điểm, dấu hiệu cuộn | `patterns.css`, `lien-he.astro` |
| 02 | Header mobile | `Header.astro` |
| 03 | Thẻ sản phẩm mobile | `industro.css`, `san-pham/index.astro` |
| 04 | Vùng bấm + cỡ chữ | `patterns.css`, `Footer.astro`, `base.css` |
| 05 | Banner, padding đáy, ảnh, `DauMuc` | `BannerSlider.astro`, `base.css`, `index.astro`, `DauMuc.astro` |
| 06 | Đo lại toàn bộ, so số trước/sau | script |

## Tiêu chí xong

| Chỉ số | Trước | Đích |
|---|---|---|
| Tràn ngang document | 0 | 0 (giữ) |
| Hàng bảng cao nhất | 285px | dưới 70px |
| Bảng không có dấu hiệu cuộn | 8 | 0 |
| Trắng chết bên phải header | 111px | 0 |
| Vùng bấm dưới 24px (trừ link trong câu) | ~700/khổ | 0 |
| Chữ dưới 14px | 1222 | 0 |
| Mô tả sản phẩm hiện được trên mobile | Không | Có |
| H1 + CTA trang chủ trong màn đầu 844px | Không | Có |

## Kết quả đo lại (04/09/2026)

| Khổ | Tràn document | Tràn thật | Chữ dưới 14px | Vùng bấm dưới 24px |
|---|---|---|---|---|
| 360 | 0 -> 0 | 3 -> **0** | 298 -> **0** | 713 -> 64 |
| 390 | 0 -> 0 | 0 -> 0 | 298 -> **0** | 716 -> 67 |
| 414 | 0 -> 0 | 0 -> 0 | 298 -> **0** | 717 -> 69 |
| 768 | 0 -> 0 | 0 -> 0 | 328 -> **0** | 666 -> 79 |

Hàng bảng: 131-157px (bảng số) và 285px (bảng địa điểm) -> **55-62px** đều.
Bề rộng bảng ở `max-content`: 407-825px. Bảng địa điểm 1554px -> **348px** sau khi xếp thẻ.

Trắng chết bên phải header: **111px -> 0**. Mô tả sản phẩm trên mobile: **không hiện -> hiện**.

64-79 vùng bấm còn lại **là kết quả có chủ đích**, không phải việc chưa làm: toàn bộ là
link nằm trong câu văn (`p.chan__mo-ta`, link trong thân bài). WCAG 2.2 SC 2.5.8 miễn trừ
"Inline", và nong chúng lên sẽ phá nhịp dòng. Số điện thoại là ngoại lệ duy nhất đã nong
(28px inline, 44px trong khối liên hệ) vì đó là đường chuyển đổi.

Khổ 1440 đo kèm để kiểm hồi quy: 0 tràn document, 0 lỗi bảng/ảnh. 300 kết quả "tràn" ở
khổ này là chữ trong cột liên hệ cố định đang bị `max-width: 0; overflow: hidden` clip -
trạng thái nghỉ của hiệu ứng trượt, không phải lỗi.

## BA PHÁT HIỆN BAN ĐẦU SAI - đã kiểm lại và bỏ

Tôi đọc ảnh chụp DPR 2 như thể là CSS px, nên ba con số trong bảng lỗi ban đầu bị nhân đôi:

| Ban đầu ghi | Số thật đo được | Kết luận |
|---|---|---|
| Banner cao 920px trên màn 844px, H1 và CTA dưới màn đầu | Banner **450px**. H1 ở top=399, nút ở 490-543, khung nhìn 800-844 | **Cả H1 và 2 nút đều trong màn đầu.** Không sửa |
| `body` thiếu `padding-bottom`, thanh CTA che chữ cuối trang | `body:has(.thanh-day) { padding-bottom: 52px }` đã có, khớp đúng 52px chiều cao thanh | Đã xử lý từ trước. Không sửa. Chỗ chữ bị che trong ảnh là giữa trang - thanh cố định che nội dung khi cuộn là hành vi bình thường |
| Khoảng trắng 170px dưới dải đầu trang | **84px** (bang-gia), **100px** (lien-he) | 170 là số DPR 2 của 85. Ở mức thật thì chấp nhận được. Không sửa |
| Hai ảnh nhà máy 168x480 | **152x228** (360px), **167x251** (390px), tỉ lệ 0.67 | Vẫn đúng là hẹp, đã sửa (xếp dọc, bỏ tấm thứ hai) |

## BỐN LỖI PHÁT SINH TRONG LÚC SỬA - đo ra và đã sửa

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| Topbar phình 46 -> 60px, lệch mất quãng đường animation ẩn topbar | Luật vùng bấm 44px cho hotline cộng với `padding: 8px 16px` của khối bao nó | `padding-block: 0` + link cao bằng cả dải. Thêm token `--dai-tren` dùng cho cả `min-height` và `top` của animation để không lệch lại |
| Toàn bộ chữ trong thẻ sản phẩm bị gạch chân | `text-decoration` lan xuống mọi con TRONG LUỒNG và con không huỷ được. Bản desktop tình cờ thoát vì `.the-lat__dau/__mo` đều `position: absolute` (ngoài luồng). Đưa về luồng thường là gạch ăn xuống hết | `text-decoration: none` trên `.the-lat` |
| Nút lên đầu trang che ký tự đầu dòng | `left: 16px` mà cột nội dung bắt đầu ở x=20 | Chuyển sang `right: 16px` - ở khổ này `.bn__lai` đã ẩn nên bên phải trống, và lề phải luôn rách nên che ít hơn |
| Ảnh thẻ tin tức bị cắt 24-35px ở 360px | `.tt__cot { grid-template-rows: 1fr 1fr }` làm chiều cao ô ảnh thành xác định, `aspect-ratio: 16/9` suy bề rộng TỪ chiều cao: 194 x 16/9 = 344px trong cột 320px | `width: 100%` để bề rộng xác định trước, aspect-ratio suy chiều cao |

## Việc KHÔNG làm được như plan

Dòng chữ "Cuộn ngang để xem hết" dưới bảng: bỏ. `.bang-cuon` là vùng cuộn nên `::after`
của nó cuộn theo nội dung, còn thêm chữ thật thì phải sửa 10 trang có bảng. Thay bằng
**bóng cuộn tự ẩn** (4 lớp background, hai lớp `local` hai lớp `scroll`) - không cần JS,
tự hiện khi còn nội dung và tự tắt ở hai đầu. Đây là dấu hiệu cuộn được công nhận và
gọn hơn về mặt DRY.

## Rủi ro

| Rủi ro | Cách chặn |
|---|---|
| `max-content` làm một bảng nào đó phình quá xa | Đã đo cả 8 bảng. Bảng duy nhất vượt ngưỡng là địa điểm (1554px), đã tách hướng riêng |
| Sửa CSS mobile làm vỡ desktop | Mọi thay đổi đặt trong media query. Đo lại cả khổ 1440 sau khi xong |
| Nâng `--cs-micro` làm tràn chỗ khác | Chạy lại audit tràn ngang sau bước 04 |
| Bỏ thẻ lật ở mobile làm lệch thiết kế đã duyệt | Chỉ đổi dưới 760px, desktop giữ nguyên |
