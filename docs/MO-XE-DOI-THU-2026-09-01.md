# Mổ xẻ đối thủ tham chiếu - 01/09/2026

> Đo bằng browser thật (Playwright), trích computed styles và fetch sitemap trực tiếp.
> Mọi con số dưới đây là đo được, không suy đoán. Chỗ nào không lấy được thì ghi rõ.

---

## 1. Đính chính: đây KHÔNG phải one page SEO

User hỏi: "họ có rất nhiều tab, dạng one page SEO nhỉ?"

Không. Ngược lại hẳn. Cái đang thấy là **mega menu** trỏ sang **hàng trăm URL riêng biệt**.

| | One page SEO | baogiathep.net thực tế |
|---|---|---|
| Số trang | 1 | **464 URL** (đếm từ sitemap) |
| Menu để làm gì | cuộn tới anchor `#section` | link sang URL khác |
| Mỗi từ khóa | chen chung 1 trang | có trang riêng, title riêng |
| Liên kết nội bộ | không có gì để liên kết | **99 link trong nav**, xuất hiện trên mọi trang |

Tên đúng: **programmatic SEO với modifier pages**. Mega menu không chỉ là điều hướng,
nó là **thiết bị internal linking**: mọi trang tiền chỉ cách nhau 1 cú nhảy từ bất kỳ đâu.

---

## 2. baogiathep.net - số đo

### 2.1. Quy mô và kiến trúc

| Chỉ số | Giá trị |
|---|---|
| Platform | WordPress 6.9.7 |
| **Tổng URL trong sitemap** | **464** |
| - bài viết (post) | 304 (200 + 104, Yoast cắt file ở mốc 200) |
| - sản phẩm (product) | 152 |
| - trang (page) | 8 |
| Link trên trang chủ | 292 tổng, 114 nội bộ duy nhất |
| **Link trong mega menu** | **99** |
| Độ sâu URL | 92 trang ở cấp 1, 21 ở cấp 2. Gần như phẳng |
| Sitemap cập nhật gần nhất | 29/08/2026 (3 ngày trước khi đo) |

### 2.2. Ba trục nhân trang của họ

Đọc mẫu URL trong sitemap thấy rõ 3 trục, không phải 1:

| Trục | Mẫu URL thật |
|---|---|
| **Thương hiệu** | `/bao-gia-ton-doctor/` · `/bao-gia-ton-viet-my/` · `/bao-gia-ton-olympic/` · `/gia-thep-han-quoc/` |
| **Địa phương** | `/bao-gia-cu-larsen-hau-giang/` · `/bao-gia-cu-larsen-binh-phuoc/` · `/bao-gia-cu-larsen-ba-ria-vung-tau/` |
| **Hướng dẫn / tra cứu** | `/bang-tra-thep-hinh/` · `/kinh-nghiem-bo-tri-thep-dam/` · `/huong-dan-cach-son-tinh-dien-thu-cong/` |

Danh mục sản phẩm thì phân cấp 2 tầng: `/thep-hinh/thep-h/`, `/thep-hop/vuong/`,
`/thep-ong/duc/`, `/thep-xay-dung/thanh-van/`.

### 2.3. On-page trang chủ

| Chỉ số | Giá trị |
|---|---|
| Title | `Đại Lý Thép MTP, Chuyên: Tôn, Thép, Inox Chính Hãng Rẻ Nhất` (59 ký tự) |
| Meta description | có, 126 ký tự |
| H1 | `Công Ty TNHH Sản Xuất Tôn Thép MTP` - là **tên thương hiệu, không phải từ khóa** |
| H1/H2/H3 | 1 / 5 / 3 |
| **JSON-LD** | **0. Không có schema nào cả** |
| Ảnh | 109, thiếu alt 9 |
| Script / CSS | 14 / 4 |

**Kết luận quan trọng: họ rank mà KHÔNG có structured data.** Nghĩa là schema không phải
lý do họ rank. Đừng nghĩ cứ thêm schema là vượt được họ.

### 2.4. LỖ HỔNG LỚN NHẤT - bảng tra là ẢNH JPEG

Trang `/bang-tra-thep-hinh/`, title "Bảng tra thép hình chữ I, H, U, L, V chi tiết đầy đủ nhất":

| Chỉ số | Giá trị |
|---|---|
| Số từ | 1.312 |
| Heading hứa hẹn có bảng | 5 (H2 "Bảng tra kích thước trọng lượng thép hình H", "... U", "... L - V") |
| **Số thẻ `<table>` HTML** | **0** |
| Số ảnh | 8, trong đó **7 ảnh là bảng chụp** |
| Tên file ảnh | `bang-tra-thep-hinh-chu-i.jpg`, `-chu-h.jpg`, `-chu-u.jpg`, `-chu-l.jpg`, `-chu-v.jpg` |
| JSON-LD | 0 |

**Toàn bộ dữ liệu bảng tra bị khoá trong ảnh JPEG.** Hệ quả:

- Google không đọc được số trong ảnh để trả lời truy vấn cụ thể
- AI Overview và LLM không trích dẫn được
- Người dùng không copy được, không tìm trong trang được (Ctrl+F vô dụng)
- Screen reader không đọc được
- Không responsive: bảng rộng trên điện thoại thành ảnh bé tí

Đây là chỗ ta ăn được ngay, không cần tuổi domain, không cần backlink.

---

## 3. dayluoithep.com - đây mới là đối thủ TRỰC TIẾP về đinh

Trang `/dinh-thep-5cm/` mạnh hơn hẳn baogiathep về chủ đề đinh:

| Chỉ số | Giá trị |
|---|---|
| Title | `Bảng báo giá Đinh Thép 3,5,7,10, 12 Đinh đóng gỗ ( 06/2026 ) 💖` (63 ký tự) |
| Số từ | **2.084** |
| **Bảng HTML thật** | **2 bảng, 26 dòng + 6 dòng** |
| Giá trong bảng | có số thật: `Đinh gỗ 3 - 18.500`, `Đinh gỗ 5 + 7 - 17.500` |
| JSON-LD | **đầy đủ**: Article, WebPage, ImageObject, BreadcrumbList, WebSite, Organization, Person, CreativeWorkSeries |
| Trả lời "1kg bao nhiêu cái" | **có** - H2 riêng + H3 "Số lượng đinh thép 1kg theo kích thước phổ biến" |

Ba điều đáng học và một điều đáng cảnh giác:

1. **Họ để tháng/năm trong title** `( 06/2026 )` - tín hiệu nội dung mới, tăng CTR
2. **Bảng giá là HTML thật**, không phải ảnh. Khác hẳn baogiathep
3. **Một trang phủ TẤT CẢ quy cách.** URL là `dinh-thep-5cm` nhưng title nhắm 3,5,7,10,12
   và meta description nhắm 2cm, 3cm, 4cm, 5cm, 6cm, 7cm, 10cm, 12cm
4. Cảnh giác: họ nhét emoji 💖 vào title để câu CTR. Không nên bắt chước - Google thường
   cắt bỏ, và với trang thương mại thì trông rẻ tiền

**Và họ dùng "cm", không dùng "p".** Trong khi trungnamcons dùng "5p" (`dinh-chi-coffa-5p`).
Nghĩa là hai cách gọi đều có trang đang rank -> ta phải phủ cả hai.

---

## 4. MÂU THUẪN KIẾN TRÚC - phải quyết

Hai đối thủ đang rank bằng hai kiến trúc NGƯỢC NHAU:

| | trungnamcons.vn | dayluoithep.com |
|---|---|---|
| Kiến trúc | **1 trang / 1 quy cách** (`/dinh-chi-coffa-5p/`) | **1 trang / TẤT CẢ quy cách** (`/dinh-thep-5cm/`) |
| Nội dung | mỏng, ~300 từ | **2.084 từ** |
| Bảng | không có | 2 bảng HTML, 32 dòng |
| Schema | Product + Offer + AggregateRating | Article + 7 loại khác |
| Rank cho | `đinh chì 5p` (exact match) - **#1** | cụm `bảng báo giá đinh thép` |
| Điểm yếu | chỉ có 1/10 quy cách, 9 cái còn trống | không tối ưu cho truy vấn quy cách cụ thể |

**Cả hai đều hiệu quả, cho hai loại truy vấn khác nhau.** Nên đề xuất trước đây của tôi
(42 trang riêng, phẳng) là chưa đủ tốt. Sửa lại thành **hub + spoke**:

- **1 hub mạnh**: "Bảng giá đinh thép đầy đủ quy cách" - bảng HTML thật đủ 42 SKU,
  2.000+ từ, trả lời cả cụm câu hỏi. Đây là trang cạnh tranh với dayluoithep
- **10 spoke** cho đinh chì: mỗi quy cách một trang, tối ưu exact-match, có Product + Offer
  + giá. Đây là trang cạnh tranh với trungnamcons ở 9 quy cách họ đang bỏ trống
- Hub trỏ xuống mọi spoke, mọi spoke trỏ ngược lên hub và trỏ ngang sang quy cách liền kề

Nhóm còn lại (đinh vít, thép trắng, thép vàng, đinh dù, dây kẽm, bu lông) chỉ làm trang
nhóm trước, chưa tách quy cách, cho tới khi có dữ liệu Search Console.

---

## 5. HỆ THỊ GIÁC baogiathep.net - số để port

User muốn làm UI/UX theo site này. Đây là số đo thật:

| Thuộc tính | Đo được |
|---|---|
| **Font** | `Roboto` (247 phần tử) + `Roboto Condensed` (61). **2 họ font** |
| **Cỡ chữ** | 16px áp đảo (206 lần), rồi 16.56 / 14.4 / 12.8 / 11.2 / 18 / 25.6 / 20 |
| **Cỡ lớn nhất** | **25.6px** |
| **Weight** | 700 (156) và 400 (148). Chỉ 2 weight |
| **Line-height** | 16px/25.6px (tức 1.6) và 16px/20.8px (1.3) |
| **Màu chữ** | xám `rgba(102,102,102,.85)` (76 lần), `#F1F1F1` (66), `#222` (54), **đỏ thuần `#FF0000` (40)**, `#444` (29), **đỏ brand `#C4161C` (18)** |
| **Nền vùng lớn** | trắng (8), **`#C4161C` đỏ (5)**, `#F58634` cam (3), `#0F7CB6` xanh (3), `#262626`, đen |
| **Bo góc** | 50%, 25px, 20px, 999px, 5px, 100%, 99px - **7 giá trị** |
| **Shadow** | `rgba(0,0,0,.15) 1px 1px 15px` |
| **Container** | **1140px** (nội dung), 1425px (wrapper full) |
| **Header** | cao **132px**, gồm top bar đỏ + hàng logo/menu |
| Chiều cao trang chủ | 5.408px |

### 5.1. Thẳng thắn: UI của họ yếu về mặt kỹ thuật

- **Không có phân cấp typography.** Chữ lớn nhất 25.6px trong khi thân bài 16px. Tỉ lệ
  1,6 lần - gần như không có tiêu đề nào nổi bật
- **Hai màu đỏ khác nhau** dùng lẫn lộn: `#C4161C` và `#FF0000`. Đỏ thuần trên nền trắng
  chỉ đạt khoảng 4:1, sát ngưỡng
- **Chữ phụ màu xám** `rgba(102,102,102,.85)` - màu xám vô hướng
- **7 giá trị bo góc** và **2 họ font** - thiếu nhất quán
- **4 hue** (2 đỏ + cam + xanh) không có hệ thống rõ

### 5.2. Nhưng cái gì của họ THẬT SỰ hiệu quả với khách Việt

Đây mới là phần đáng copy, và nó không nằm ở màu sắc:

1. **Mật độ liên hệ cực cao.** 6 nút điện thoại xếp dọc bên trái + 3 nút Zalo bên phải,
   luôn hiện. Với ngành vật tư, khách gọi chứ không điền form. Đây là quyết định UX đúng
2. **Ảnh thật, không ảnh stock.** Hero là ảnh công nhân bốc thép, xe tải, cuộn thép ở kho -
   chụp bằng điện thoại, có logo công ty trong khung. Tạo cảm giác "công ty có thật, có kho"
3. **Top bar đỏ** có email + điện thoại + icon mạng xã hội, luôn nằm trên cùng
4. **Mega menu dày.** Vừa là điều hướng vừa là internal linking
5. **Nội dung dày đặc, ít khoảng trắng.** Đúng gu công nghiệp, không phải gu SaaS

### 5.3. Đề xuất: copy cấu trúc, sửa các lỗi đo được

Giữ: container 1140px, header 2 tầng có top bar, mega menu, cột nút gọi/Zalo cố định,
mật độ thông tin cao, ảnh thật, tông đỏ làm màu thương hiệu.

Sửa: 1 họ font thay vì 2, thang chữ có phân cấp thật (thân 16-17px, tiêu đề nhảy lên
32-40px thay vì 25.6px), **một** màu đỏ thay vì hai, 3 bán kính thay vì 7, chữ phụ mang
sắc thương hiệu thay vì xám.

---

## 6. VÌ SAO HỌ RANK - xếp theo mức đóng góp

Dựa trên bằng chứng đo được, không phải phỏng đoán:

| # | Yếu tố | Bằng chứng | Ta copy được? |
|---|---|---|---|
| 1 | **Khối lượng trang chủ đề liên quan** | 464 URL, 304 bài viết | **Được**, nhưng cần thời gian |
| 2 | **Mega menu 99 link trên mọi trang** | đo trực tiếp | **Được ngay** |
| 3 | **Ba trục nhân trang** (brand, địa phương, hướng dẫn) | mẫu URL sitemap | **Được** - ta đổi trục thành quy cách |
| 4 | **Cập nhật thường xuyên** | sitemap lastmod 3 ngày trước | **Được**, cần người |
| 5 | Tuổi domain + backlink tích luỹ | không đo được | **Không** |
| 6 | Schema | **họ KHÔNG có** | ta làm tốt hơn miễn phí |

Điểm quan trọng: 3 trong 6 yếu tố hàng đầu ta làm được ngay, và yếu tố số 6 thì họ đang bỏ trống.

---

## 7. HƯỚNG ĐÁNH BẠI

| # | Hướng | Vì sao thắng được |
|---|---|---|
| 1 | **Bảng tra HTML thật** thay vì ảnh JPEG | baogiathep khoá toàn bộ bảng trong ảnh. Ta publish bảng HTML đọc được, copy được, AI trích được. Ăn ngay cụm "bảng tra", "bao nhiêu mm", "1kg bao nhiêu cây" |
| 2 | **Hub + spoke** thay vì chọn một | Hub cạnh tranh dayluoithep ở cụm "bảng giá đinh", spoke cạnh tranh trungnamcons ở 9 quy cách họ bỏ trống |
| 3 | **Product + Offer schema có giá** | baogiathep có 0 schema. trungnamcons có nhưng `priceValidUntil` hết hạn từ 10/2025 |
| 4 | **Số liệu nhà sản xuất** | dung sai theo lô, số cây/kg cân thật, nguồn sợi thép. Đại lý không có |
| 5 | **Tốc độ** | trang sản phẩm của trungnamcons 748KB/53 request. Astro của ta: 0 KB JS, 1 file CSS 31KB |
| 6 | **Mega menu theo quy cách** | copy đúng vũ khí của họ, đổi trục sang thứ ta có |

---

## 8. KHÔNG XÁC THỰC ĐƯỢC - đừng dùng làm căn cứ

- **Thứ hạng thật của cả 3 site.** Chưa có công cụ rank tracking. Mọi phát biểu về
  "họ đang top mấy" ngoài truy vấn `đinh chì 5p` (user quan sát trực tiếp) đều không có nguồn
- **Backlink và Domain Rating.** Cần công cụ trả phí, chưa có
- **Tuổi domain của baogiathep.net.** Chưa tra
- **Search volume.** Vẫn chưa có. Toàn bộ thứ tự ưu tiên từ khóa vẫn là suy luận
- **vattugiaxuong.com** chưa mổ trong lần này, để lần sau
