# Port giao diện Industro vào dinhthepsg.com

Trạng thái: **đã chốt, sẵn sàng thực thi**
Lập ngày: 02/09/2026 | Sửa lần cuối: 03/09/2026

## Mục tiêu

Đưa ngôn ngữ thị giác của template Industro (HTML Codex) vào dự án Astro hiện có,
giữ nguyên framework, font tiếng Việt và trạng thái audit sạch.

## Phạm vi

**Từ header xuống đến trước footer.** Footer hiện tại giữ nguyên - user thấy ổn.

## Nguồn

`dinh-thep-saigon/Industro/` - Bootstrap 5 + 8,3KB CSS riêng + jQuery/wow/waypoints.

**Toàn bộ giá trị thiết kế nằm trong `css/style.css` (8,3KB).** 164KB còn lại là
Bootstrap gốc không sửa.

## Quyết định đã chốt với user

| Việc | Chốt |
|---|---|
| Attribution "Designed By HTML Codex" | **Gỡ** - user quyết, đã được nêu rõ ràng buộc giấy phép trước khi quyết |
| Framework | **Giữ Astro.** Không đổi sang trang HTML tĩnh của họ |
| CSS của họ | **Copy nguyên văn `style.css`** |
| Bootstrap 5 CSS | **KHÔNG dùng.** Đổi lại sau khi đo - lý do ở mục "Vì sao bỏ Bootstrap" |
| jQuery | **KHÔNG.** Bootstrap 5 đã bỏ phụ thuộc jQuery. `main.js` của họ chỉ dùng `$()` cho 3 việc, viết vanilla khoảng 15 dòng là xong |
| Màu | **Lấy cam `#FF5E14` + navy `#02245B` của họ.** User xác nhận không có màu thương hiệu; đỏ `#C4161C` cũ là do tôi tự suy từ ảnh bao bì, và nó trùng hệt màu baogiathep.net |
| Số ảnh banner tải ngay | **Giữ 3 như hiện tại.** User chốt làm như template trước, tối ưu dung lượng sau |
| Ảnh demo của họ (`img/`, 724KB) | **Không dùng** - giấy phép ghi rõ ảnh stock không được phân phối kèm |

### Ghi nhận rủi ro giấy phép

`LICENSE.txt` và comment trong `index.html` dòng 618-620 ghi rõ không được gỡ
attribution ở bản miễn phí; bản Pro tại `htmlcodex.com/downloading/?item=2628`
mới cho phép gỡ. Giấy phép cho phép "convert/port for use for any CMS" nhưng
**vẫn kèm điều kiện giữ ghi công**, nên việc chuyển sang Astro không gỡ được
ràng buộc. User đã được thông báo và quyết định gỡ. Rủi ro: HTML Codex có thể
khiếu nại và thu hồi giấy phép sử dụng.

## Đo lại bằng số nén - sửa lại kết luận trước

Ban đầu tôi so bằng dung lượng raw rồi kết luận Bootstrap quá nặng. **Sai.**
Server nào cũng bật gzip/brotli, phải so bằng số sau nén:

| Thư viện | Raw | Sau nén |
|---|---|---|
| bootstrap.min.css | 160 KB | **22 KB** |
| style.css của template | 8 KB | **1 KB** |
| animate.css | 16 KB | 2 KB |
| jQuery | 86 KB | ~30 KB |
| Bootstrap JS bundle | 78 KB | ~23 KB |
| wow + easing + waypoints | 17 KB | 4 KB |
| **Tổng cả bộ** | ~365 KB | **~82 KB** |

Bỏ jQuery thì còn **khoảng 52 KB nén**.

### Trang thật đang nặng bao nhiêu

Đo trên `dinhthepsg.vercel.app` ngày 03/09/2026:

| | Số đo |
|---|---|
| Tổng trang | **993 KB** |
| Ảnh | 742 KB |
| Font | **230 KB** |
| CSS qua đường truyền | 10 KB |
| TTFB | **51 ms** |
| DOMContentLoaded | 369 ms |
| Load | 833 ms |

Thêm 82 KB trên nền 993 KB là **+8%**.

TTFB 51ms nghĩa là CDN đang phục vụ rất nhanh - đổi sang server riêng ở Việt Nam
chỉ rút thêm được vài chục ms, không đáng so với 742 KB ảnh. Chỗ nghẽn nằm ở
**số byte phải tải cho từng người**, không nằm ở máy chủ. Lượng truy cập đồng
thời (user ước chừng vài chục người) không phải vấn đề với trang tĩnh chạy CDN.

### Đối thủ đang xếp top nặng bao nhiêu

| Trang | Tổng | Request | Tên miền ngoài |
|---|---|---|---|
| **dinhthepsg (ta)** | **993 KB** | 25 | 0 |
| thegioididong.com | 616 KB | 129 | 20 |
| vnexpress.net | 909 KB | 189 | 53 |
| dayluoithep.com | 1.940 KB | 77 | 12 |
| thegioithepvn.com | 4.382 KB | 114 | 15 |

Hai đối thủ ngành thép nặng gấp 2-4 lần ta mà vẫn xếp top. Nặng không phải thứ
chặn họ.

### SEO có bị ảnh hưởng không

| Sự thật | Ghi chú |
|---|---|
| CWV chiếm **10-15%** tín hiệu xếp hạng, đóng vai trò **phá hoà** khi nội dung ngang nhau | nghiên cứu 2026 |
| Từ "kém" lên "tốt" cả 3 chỉ số đổi được **1-2 vị trí** | |
| Ngưỡng: LCP **dưới 2,5s**, INP **dưới 200ms**, CLS **dưới 0,1** | |
| Thủ phạm chính của INP kém là **main thread bị chặn**, không phải số byte | |
| Ví dụ INP 620ms xuống 89ms là do gỡ **1,4 MB** JS, không phải 82 KB | |

**Kết luận: 82 KB không đủ để đẩy qua ngưỡng nào.** Điều kiện duy nhất là giữ
LCP dưới 2,5s và INP dưới 200ms.

## Vì sao bỏ Bootstrap (sửa lại khuyến nghị lần hai)

Tôi từng khuyên dùng Bootstrap. Số liệu dung lượng vẫn đúng - 82 KB nén không
hại SEO. Nhưng dung lượng chưa bao giờ là câu hỏi thật. Câu hỏi đúng là
**Bootstrap có mang thêm thiết kế nào của họ không**, và đo được là không.

### Đếm rule trong `style.css`

| Loại | Số rule | Gồm những gì |
|---|---|---|
| **Chạy độc lập, không cần Bootstrap** | **37** | Cạnh vát topbar, dải số liệu navy, thẻ dịch vụ lật khi rê, ảnh dự án nhô, bóng toả, nút vuông |
| Chỉ mượn tên lớp Bootstrap | 17 | `.btn`, `.navbar`, `.carousel-*`, `.footer .btn-link` - phần lớn thuộc mục ta không lấy |

**Cả bảy thủ pháp chữ ký đều nằm trong nhóm 37.** Bootstrap không giữ thủ pháp
nào của họ.

### Bootstrap Reboot đụng `base.css`

`base.css` của ta đã làm đủ việc của Reboot nhưng buộc theo token dự án:

| Việc | base.css | Bootstrap Reboot |
|---|---|---|
| Font body | `var(--font)` Be Vietnam Pro | system font stack riêng |
| Cỡ chữ body | `var(--cs-than)` 16,5px | `1rem` = 16px |
| h1-h4 | Barlow + thang token, margin 0 | thang riêng, `margin-bottom: .5rem` |
| `ul, ol` | `list-style: none` | giữ bullet |
| `img` | `display: block` | không đụng |
| Token | 1 hệ (`--cam-*`, `--k*`) | thêm hệ `--bs-*` song song |

Nạp Bootstrap sẽ dựng **hai hệ chữ, hai hệ token, hai thang khoảng cách** chạy
song song trên cả 30 trang. Đó là thứ DRY cấm, và là rủi ro thật chứ không phải
lo xa.

### Chốt

Port nguyên văn `style.css`, bố cục dùng token sẵn có. Được toàn bộ thiết kế
của họ, không thêm KB nào, không có hệ nào chạy song song.

## Những gì KHÔNG lấy

| Của họ | Không lấy vì |
|---|---|
| **Bootstrap 5** (22 KB nén) | Không giữ thủ pháp nào của họ (37/54 rule chạy độc lập), lại đụng `base.css`. Xem mục trên |
| jQuery (~30 KB nén) | Chỉ dùng `$()` cho spinner, sticky nav, nút lên đầu trang - 15 dòng vanilla là xong |
| Font Awesome + Bootstrap Icons (2 CDN) | Ta dùng SVG nội tuyến, nhẹ hơn và không thêm tên miền |
| Open Sans + **Rubik** | **Rubik không có bộ ký tự tiếng Việt** |
| Tải từ CDN | Self-host hết. Mỗi tên miền ngoài thêm một vòng DNS + TLS trước khi về |
| `#spinner` | Màn chờ quay trên site tĩnh là điện, lại làm chậm LCP |
| Mục **"Our Team / Dedicated Team Members"** | **User chốt xóa.** 3 ảnh chân dung stock + tên bịa (Rob Miller, Adam Crew, Peter Farel) - không có dữ liệu nhân sự thật để thay vào |
| Mục Contact trên trang chủ | Liên hệ đã có trang riêng |
| Ảnh demo `img/` (724 KB) | Giấy phép ghi rõ ảnh stock không được phân phối kèm |

## Bảy thủ pháp sẽ copy nguyên văn

Trích từ `css/style.css`:

1. **Cạnh vát chéo** - `transform: skewX(-30deg)` cho topbar và khối logo,
   `skewY(-12deg)` / `skewY(-5deg)` cho thẻ. Đây là chữ ký của template.
2. **Bóng toả rộng** - `0 0 45px rgba(0,0,0,.07)` và `.09`
3. **Dải số liệu** - nền navy, ô viền `rgba(255,255,255,.1)`, số cỡ display
4. **Thẻ dịch vụ lật khi rê** - tiêu đề trượt lên, panel mô tả trượt vào kèm
   mép vát trắng `skewY(-12deg)`
5. **Thẻ dự án** - ảnh nhô lên `margin-top: -60px`, thanh tiêu đề dâng
6. **Mũi tên carousel tròn** - `3.5rem` + `border: 15px solid`
7. **Nav 18px weight 500**, dropdown mở khi rê

## Ánh xạ mục của họ sang trang của ta

| Industro | Trang chủ hiện tại | Việc |
|---|---|---|
| Topbar | dải đỏ 34px | Đổi nền navy, khối liên hệ bên phải có cạnh vát cam |
| Navbar | header trắng 76px | Khối logo nền cam có cạnh vát, nav lên 18px |
| Carousel | băng trượt hé lộ, không chữ | **Giữ không chữ** (user đã bỏ), **giữ 5 ảnh, 3 ảnh tải ngay**. Chỉ lấy kiểu mũi tên tròn |
| About | mục giới thiệu, 1 ảnh | Dựng lại: 2 ảnh so le + khối "14 năm" nền cam |
| Facts | **chưa có** | Thêm dải số liệu navy |
| Features | dải lý do (băng trượt 6 mục) | Giữ băng trượt, áp kiểu icon tròn của họ |
| Service | lưới 6 nhóm sản phẩm | Áp hiệu ứng lật thẻ |
| Project | mục nhà máy 4 ảnh | Áp hiệu ứng ảnh nhô + thanh dâng |
| Footer | mega footer navy | **GIỮ NGUYÊN** - user thấy ổn, không đụng vào |

## Các giai đoạn

| # | Giai đoạn | Rủi ro |
|---|---|---|
| 01 | Token: đổi palette sang cam+navy, thêm biến cạnh vát và bóng toả | Trung bình - đụng mọi trang |
| 02 | Port `style.css` sang `industro.css`, bố cục bằng token sẵn có | Thấp |
| 03 | Topbar + Navbar cạnh vát | Trung bình - header vừa sửa nhiều vòng |
| 04 | Hero: mũi tên tròn | Thấp |
| 05 | Giới thiệu: 2 ảnh so le + khối số | Thấp |
| 06 | Dải số liệu navy (mới) | Thấp |
| 07 | Thẻ sản phẩm lật khi rê | Trung bình - đụng cả trang danh mục |
| 08 | Mục nhà máy: ảnh nhô | Thấp |
| 09 | Hiệu ứng cuộn + nút lên đầu trang (vanilla, không jQuery) | Thấp |
| 10 | Áp sang trang sản phẩm, kiến thức, bảng giá | **Cao** - 30 trang |
| 11 | Audit, đo lại, dọn CSS thừa | Thấp |

**Footer không có trong danh sách** - user chốt giữ nguyên.

## Ngưỡng phải giữ

Sau khi xong, các số này không được xấu đi so với hiện tại:

```
Tổng trang           993 KB  -> không quá 1.100 KB
Script ngoài         0       -> 0
Link CSS/font ngoài  0       -> 0
TTFB                 51 ms   -> không quá 100 ms
Số trang             30      -> 30
Link gãy             0       -> 0
Ảnh thiếu alt        0       -> 0
Ký tự ngoài bàn phím 0       -> 0
Tràn ngang 390px     không   -> không
Tương phản chữ       đạt AA  -> đạt AA
```

## Để dành tối ưu sau

User chốt làm như template trước, có vấn đề về load thì tối ưu sau.

| Chỗ | Hiện tại | Giảm được |
|---|---|---|
| Font 14 file, 7 weight | 230 KB | ~90 KB nếu bỏ bớt weight ít dùng |
| 3 ảnh banner `loading="eager"` | ~450 KB tải ngay | ~300 KB nếu chỉ để 1 ảnh eager |
| Ảnh đang là WebP | 742 KB | 20-30% nếu đổi sang AVIF (một dòng cấu hình Astro) |

**Đã xác nhận: toàn bộ 97 file ảnh trong `dist/_astro/` ĐÃ là WebP.** Astro tự
chuyển, không còn PNG/JPG nào. Đòn bẩy đó đã kéo hết cỡ.

## Việc còn chờ user

Không chặn refactor này, nhưng chặn mục tiêu bán hàng:

- Giá bán (0/24 quy cách đã có)
- Ảnh thật từng loại đinh (6 nhóm đang dùng ảnh tạm)
- Số đinh trên mỗi kg theo số liệu nhà máy
- Xử lý bề mặt của ba nhóm đinh chì / trắng / vàng
- Quy cách đóng gói
- Mua tên miền dinhthepsg.com
