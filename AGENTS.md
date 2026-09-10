# AGENTS.md - hướng dẫn cho AI agent làm việc trên repo này

Đọc file này trước khi sửa bất cứ thứ gì. Nó không lặp lại những gì code đã nói -
code trong repo này chú thích rất dày, mọi quyết định không hiển nhiên đều có lý do
ghi ngay tại chỗ. File này chỉ chứa thứ **không nằm trong code**: luật làm việc,
trạng thái hiện tại, và những cái bẫy đã mắc rồi.

---

## 1. Dự án là gì

Website **Đinh Thép Sài Gòn** - nhà máy sản xuất đinh thép xây dựng.

Mục tiêu duy nhất, do chủ dự án chốt: **khách gõ tên quy cách đinh trên Google
(ví dụ "đinh chì 5p") thì ra web này, rồi gọi điện hoặc nhắn Zalo cho sale.**
Không phải bán online, không có giỏ hàng, không có thanh toán.

Hai việc được ưu tiên tuyệt đối:
1. Khách **tìm ra** web
2. Khách **liên hệ được** với sale

Mọi thứ khác là phụ.

## 2. Hai pháp nhân - đừng trộn làm một

Đây là chỗ dễ sai nhất trong repo.

| | |
|---|---|
| **Công ty mẹ** | Công ty TNHH TM XNK Thép Cường Phát - MST 0312168657, thành lập 2012, cuongphatsteel.com.vn |
| **Công ty con** | CÔNG TY ĐINH THÉP SÀI GÒN - vừa tách ra để tập trung vào đinh. **Website này là của nó** |

**MST và năm thành lập riêng của Đinh Thép Sài Gòn chưa có.** Trong
`cong-ty.yaml` hai trường đó **để trống có chủ ý**. Không được mượn tạm số của
công ty mẹ: đó là thông tin pháp lý sai, khách B2B tra mã số thuế trước khi đặt
đơn lớn, và với Google thì hai tổ chức dùng chung một `taxID` làm hỏng chính cái
thực thể đang xây.

Cách đã chốt: khai `parentOrganization` trong schema. Câu chữ là
*"thành viên Thép Cường Phát - đơn vị đã làm vật tư kim khí từ 2012"*, không phải
*"chúng tôi thành lập 2012"*. Đúng sự thật mà vẫn giữ nguyên sức nặng 14 năm.

NAP lấy theo **brochure giấy đang phát cho khách** (trụ sở Quận 7 KDC Him Lam,
nhà máy KCN Hiệp Phước Nhà Bè). 5 địa điểm khác thuộc công ty mẹ, có cờ
`thuocCongTyMe: true`, không đưa vào LocalBusiness schema.

## 3. Luật viết - bắt buộc

**Nội dung hiển thị cho người đọc:** tiếng Việt đầy đủ dấu.

**Chú thích trong code:** tiếng Việt **không dấu**. Xem bất kỳ file nào trong
`src/` để thấy quy ước.

**Chỉ dùng ký tự có trên bàn phím** trong nội dung giao cho người dùng:

| Dùng | Không dùng |
|---|---|
| `-` | gạch dài em dash / en dash |
| `"` `'` thẳng | nháy cong |
| `...` | ký tự ba chấm đơn |
| `->` | mũi tên |
| (không có) | emoji trang trí |

Luật này **không** có nghĩa là bỏ dấu tiếng Việt.

Script `scripts/kiem-tra-site.py` kiểm tra tự động việc này trên bản build và
**thoát mã 1 nếu vi phạm**. Chạy nó sau mỗi lần build.

## 4. Không được bịa

Đây là luật cứng, đã có tiền lệ vi phạm và phải xoá đi làm lại:

- Không bịa đánh giá, cảm nghĩ khách hàng
- Không bịa mã tiêu chuẩn (TCVN, JIS...) nếu chưa tra được
- Không trình bày số **tính ra** như số **đo được**. Ví dụ: bảng "số cây/kg" là
  số tính bằng công thức, bỏ qua khối lượng mũ - **không** được ghi là "đếm tại
  nhà máy"
- Không bịa tên tác giả bài viết. Byline ghi tên công ty
- Không bịa toạ độ GPS. Đã từng đoán và sai 30km
- Không có số lượng tìm kiếm nào là thật. Con số "950 long-tail" từng xuất hiện
  là bịa, đã xoá. Chỉ có **đúng một** SERP được quan sát thật

## 5. Đo, đừng đoán

Repo này có văn hoá đo đạc. Trước khi khẳng định điều gì về giao diện, kích
thước, tốc độ hay hành vi trình duyệt - **đo bằng Playwright hoặc curl**, đừng
suy từ việc đọc CSS.

Đã có nhiều lần đọc code rồi đoán và sai. Ví dụ trong `plans/` ghi lại đầy đủ.

## 6. Bảy cái bẫy đã mắc - đừng lặp lại

| Bẫy | Chi tiết |
|---|---|
| `npx serve -s dist` | Cờ `-s` bật SPA fallback, **mọi URL trả về `index.html`**. Một lượt audit đã đo trang chủ 30 lần rồi báo "sạch". Chạy `serve dist` không có `-s` |
| Lightning CSS | Nó đổi `display: -webkit-box` thành `display: flow-root` trên bản build, làm `-webkit-line-clamp` hỏng nửa vời: chèn dấu ba chấm ở dòng 2 nhưng vẫn cho dòng 3 hiện |
| `text-decoration` | Lan xuống mọi con **trong luồng** và con **không huỷ được**. Chỉ con `position: absolute` mới thoát |
| `alt=""` | Astro **xoá hẳn thuộc tính** khi truyền chuỗi rỗng. Phải để alt thật bên trong bọc `aria-hidden` |
| `aspect-ratio` | Nếu chiều cao đã xác định (do grid kéo giãn), nó suy **bề rộng từ chiều cao** - có thể vượt cột. Khai `width: 100%` tường minh |
| Google Maps nhúng | Truy vấn `?q=` thường chỉ ra chấm đỏ. Muốn có **ô địa chỉ ở góc** phải có `ftid`, mà `ftid` chỉ lấy được từ link chia sẻ của Maps |
| `loading="lazy"` trên iframe | **Không hoãn**. Đã đo ở khoảng cách 400px và 1741px, ~40 request tới Google vẫn chạy |
| **Build ở máy KHÁC build ở CI** | `robots.txt.ts` có hai nhánh theo `SITE_URL`. Máy không đặt biến này nên **luôn chạy nhánh chặn-index**; CI có đặt nên chạy nhánh cho-index. Một lỗi chỉ nằm ở nhánh kia thì build ở máy không bao giờ bắt được. Trước khi push thay đổi liên quan, chạy `SITE_URL=https://dinhthepsaigon.com npm run build` |
| Backtick trong `robots.txt.ts` | Nội dung robots nằm trong **template literal** của JS. Một dấu backtick trong lời chú thích đóng chuỗi sớm và làm build CI hỏng với `cgi is not defined` |
| `/cgi-sys/` không chặn được bằng `.htaccess` | Đó là ScriptAlias ở **cấp máy chủ**, nằm ngoài thư mục web. Chặn bằng `Disallow` trong robots.txt |

## 7. Trạng thái hiện tại

| | |
|---|---|
| Trang | 30, tĩnh hoàn toàn, **0 KB JavaScript** trên trang công khai |
| CSS | ~12,6 KB gzip cho toàn site |
| Ảnh | 104 thẻ `<img>`, tất cả có alt |
| Responsive | Đã đo 30 trang x 4 khổ (360/390/414/768) + 1440 kiểm hồi quy. 0 tràn ngang, 0 chữ dưới 14px |
| **Index** | **ĐANG CHẶN CÓ CHỦ Ý**: `<meta name="robots" content="noindex, nofollow">` + `robots.txt: Disallow: /` |

**Việc chặn index là cố ý, đừng tự ý mở.** Cơ chế: `site-url.mjs` chỉ cho index
khi biến `SITE_URL` được đặt tường minh VÀ bằng `DOMAIN_THAT`. Mở index = đặt
biến môi trường, không phải sửa code.

## 8. Hạ tầng đã mua (2026-09-10)

| | |
|---|---|
| Domain | **dinhthepsaigon.com**, 3 năm |
| Hosting | CloudFly, tuỳ chỉnh 2 CPU / 2GB RAM / 13GB / 3 addon, 3 năm |
| Đứng tên | Tài khoản của **khách hàng**, không phải của người làm web |
| Deploy | **Chưa dựng**. Chờ thông tin FTP |

Kế hoạch deploy: GitHub Actions build rồi đẩy `dist/` qua FTP lên `public_html`.
Mật khẩu FTP vào **GitHub Secrets**, tuyệt đối không vào git.

Bốn việc phải làm khi có FTP, vì Vercel đang làm hộ mà hosting thì không:

1. `src/pages/404.astro` - **chưa có**
2. `.htaccess`: cache header cho `/_astro/*` (không có thì mỗi lượt tải lại 1,8 MB),
   `ErrorDocument 404`, bật nén (HTML 77 KB so với 14 KB), redirect http->https và www
3. Mở index bằng biến `SITE_URL`
4. Đo lại tốc độ trên máy chủ thật, so với Vercel

**Không dựng site staging.** Đã cân nhắc và loại: build hỏng thì Zod chặn từ
trước, quay lui thì chạy lại workflow cũ, xem trước thì chạy trên máy. Staging
chỉ thêm một bản sao có nguy cơ bị index trùng lặp.

## 9. Đang chờ khách cung cấp

Đây là những thứ chặn tiến độ, không phải việc chưa làm:

| Cần | Chặn việc gì |
|---|---|
| **Giá thật cho 24 quy cách** | Hiện 0/24 có giá. Chặn `Offer` trong Product schema, tức chặn product snippet trên SERP |
| **File ảnh gốc** 6 tấm sản phẩm trong brochure | Hiện 6 nhóm dùng chung ảnh nhà máy. Kèm tên chủ sở hữu bản quyền để khai `copyrightHolder` |
| MST + năm thành lập của Đinh Thép Sài Gòn | Xem mục 2 |
| Toạ độ GPS nhà máy và trụ sở | `geo` trong LocalBusiness schema |
| Link chia sẻ Maps của trụ sở Quận 7 | Để có `ftid`, xem mục 6 |
| Hồ sơ khác của công ty (Facebook, Zalo OA, danh bạ) | `sameAs` hiện chỉ có 1 link |
| Số Zalo thứ hai | Hiện chỉ 1 số đã xác minh |
| Xác nhận 4 số điện thoại nào nhận đơn đinh | 4/6 địa điểm là xưởng cán tole, gọi vào đó hỏi mua đinh là sai chỗ |

Chưa có thì **để trống**, đừng điền tạm.

## 10. Kiến thức thật nằm ở đâu

| Nơi | Nội dung |
|---|---|
| `docs/TOPICAL-MAP.md` | Bản đồ chủ đề, cụm A-H |
| `docs/NGUON-DU-LIEU.md` | Bảng SKU + NAP, trích từ brochure in |
| `docs/MO-XE-DOI-THU-2026-09-01.md` | Mổ xẻ đối thủ, đo computed styles thật |
| `docs/DOANH-NGHIEP.md` | Thông tin doanh nghiệp |
| `docs/TU-LIEU-CAN.md` | Danh sách tư liệu cần, kèm brief chụp ảnh |
| `plans/*/plan.md` | Hai kế hoạch lớn đã hoàn thành, ghi cả số đo trước/sau và những chỗ tôi đo sai rồi tự sửa |
| **Chú thích trong code** | Nguồn dày nhất. Mỗi con số kỳ lạ đều có lý do ghi ngay trên nó |

## 11. Quy ước kỹ thuật

- **Astro 5 SSG**, `output: 'static'`, `trailingSlash: 'always'`, `format: 'directory'`
- Dependency giữ tối thiểu **có chủ ý**: astro, @astrojs/sitemap, sharp, yaml,
  2 gói font. **Không React, không Vue, không Tailwind, không Bootstrap**
- `src/content.config.ts` là **hàng rào**: Zod schema, sai kiểu hoặc thiếu
  trường thì **build hỏng ngay**. Đây là tính năng, không phải phiền toái
- `src/content/du-lieu/*.yaml` là **nguồn sự thật duy nhất**. Để YAML để sau này
  cắm CMS vào sửa được mà không phải lập trình
- CSS: `tokens` -> `base` -> `patterns` -> `industro`. Sửa token là sửa một chỗ,
  cả site đổi theo
- Chạy `python scripts/kiem-tra-site.py` sau mỗi lần build

## 12. Cách làm việc mà chủ dự án mong đợi

- **Tự commit và push**, không cần hỏi
- **Không commit thông tin bí mật**: file dotenv, API key, mật khẩu
- Ngắn gọn, thẳng. Đưa **khuyến nghị**, không đưa danh sách lựa chọn
- Dùng **bảng markdown** khi so sánh số liệu
- **Phản biện lại** khi có căn cứ, đừng gật theo
- Giữ thuật ngữ kỹ thuật bằng tiếng Anh trong câu tiếng Việt
- Báo cáo trung thực: test hỏng thì nói hỏng kèm output; bỏ bước nào thì nói rõ
