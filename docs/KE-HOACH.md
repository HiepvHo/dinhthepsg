# Kế hoạch triển khai - dinhthepsg.com

> Mục tiêu bạn đặt: các từ khóa vào **top 5** Google.
> File này gồm 3 phần: lưu ý phải đọc trước, kế hoạch theo phase, và định nghĩa thành công.

---

## PHẦN A - MƯỜI LƯU Ý PHẢI ĐỌC TRƯỚC

### A1. Về mục tiêu "top 5" - điều tôi cam kết được và không cam kết được

Tôi phải nói thẳng chỗ này một lần, rồi làm việc.

| Tôi kiểm soát được | Tôi không kiểm soát được |
|---|---|
| Kiến trúc URL, silo, internal linking | Thuật toán Google và các bản cập nhật |
| Title, meta, heading, nội dung, độ sâu spec | Đối thủ phản ứng thế nào sau khi ta lên |
| JSON-LD schema đầy đủ hơn đối thủ | Tuổi domain - ta bắt đầu từ 0 ngày |
| Core Web Vitals, page weight, 0 KB JS | Backlink tự nhiên và tín hiệu thương hiệu |
| Phủ hết cụm đồng nghĩa p/phân/cm/mm | Thời điểm Google index và xếp lại |

Nghĩa là: **không ai cam kết được top 5 theo ngày.** Ai cam kết chắc chắn top 5 trong X tuần
là đang bán niềm tin, không bán kỹ thuật.

Điều tôi cam kết được: làm đúng và đủ mọi thứ trong cột trái, ở mức cao hơn cả 4 đối thủ
đã đo. Và nói thật với bạn tiến độ thực tế thay vì báo cáo cho đẹp.

### A2. Domain mới = 0 authority. Hệ quả là đổi thứ tự tấn công

`vtpducnhan.com` đã 2,3 năm với 311 URL được index. `trungnamcons.vn` có rich result giá
đang chạy. Ta bắt đầu với 0 URL, 0 backlink, 0 ngày tuổi.

Nên **đừng đánh `đinh chì 5p` trước.** Đó là truy vấn duy nhất đối thủ đã chiếm chắc.

Đánh 9 quy cách còn lại trước: `2p` `3p` `4p` `6p` `7p` `8p` `10p` `12p` `15p`.
Ở đó **không đối thủ nào có trang sản phẩm chuyên biệt** - cả sitemap 63 sản phẩm của
trungnamcons chỉ có đúng 1 trang đinh chì. Thắng ở 9 truy vấn dễ trước để site có tín hiệu,
rồi mới quay lại 5p.

### A3. Cơ hội backlink tốt nhất đang nằm ngay trong quan hệ kinh doanh

Các web đang xếp trên ta đều **mua hàng qua công ty bạn**. Một dòng "Nhà sản xuất:
Đinh Thép Sài Gòn" kèm link trên trang sản phẩm của họ là backlink cực đúng chủ đề,
từ domain đã có tuổi và đã rank.

Đây là tài sản không ai khác có được. Xin được vài link như vậy có giá trị hơn hàng tháng
làm content. Nhưng nó là việc kinh doanh, bạn làm, tôi không làm thay.

### A4. Chưa có số search volume - thứ tự ưu tiên đang là suy luận

Toàn bộ thứ tự ưu tiên từ khóa hiện tại dựa trên: ma trận 42 quy cách, hệ đồng nghĩa đã
xác thực, một SERP thật, và lỗ hổng phủ của đối thủ. **Không có volume.**

Rủi ro cụ thể: tôi dựng 42 trang cho truy vấn có thể gần như không ai gõ, và bỏ sót truy vấn
thật sự có người tìm. Cách vá: Google Keyword Planner (miễn phí khi có tài khoản Ads,
không cần chạy quảng cáo). Chưa có thì vẫn làm được, chỉ là xếp lại sau.

### A5. Nội dung mỏng là rủi ro số 1 của mô hình 42 trang

Google siết Scaled Content Abuse rất mạnh từ 2025. 42 trang không chạm ngưỡng cảnh báo
(100 trang), nhưng điều kiện phải giữ:

- Mỗi trang qua được **standalone value test**: trang này có đáng publish nếu không tồn tại
  trang tương tự nào khác?
- Nội dung độc nhất giữa 2 trang cùng mẫu **>= 30-40%**, không phải chỉ đổi con số trong
  cùng một đoạn văn (mad-libs)
- **Publish theo lô 10-15 trang**, theo dõi index và thứ hạng 2-4 tuần, rồi mới mở rộng.
  Không đẩy 42 trang một lần

### A6. Ba thứ tuyệt đối không làm

1. **Không bịa review.** Đối thủ #1 có `AggregateRating` 5 sao / 1 review do chính họ viết,
   nội dung review copy y nguyên meta description. Không copy nước đi đó
2. **Không ghi mã tiêu chuẩn nếu không chắc.** Ghi sai TCVN/JIS trên trang thương mại
   tệ hơn không ghi. Tôi không copy mã từ đối thủ
3. **Không publish số tính như số đếm.** Số cây/kg phải cân và đếm thật. Công thức tính bỏ
   khối lượng mũ đinh nên lệch khoảng 10%

### A7. Giá cần người chăm, vĩnh viễn

Đã chốt công bố giá thật. Đó là đòn mạnh nhất so với đối thủ #3 (để "Liên hệ" nên không có
rich result). Nhưng nó sinh nghĩa vụ:

- Giá trong HTML và giá trong `Offer` schema phải **luôn khớp nhau**
- `priceValidUntil` phải gia hạn. Đối thủ #1 để hết hạn từ 2025-10-10
- Giá sai trên web tệ hơn không có giá: khách gọi tới, báo giá khác, mất niềm tin ngay

Cần một người trong công ty nhận việc này. Nếu không có ai nhận thì nói tôi biết để thiết kế
cách khác (ví dụ ghi "giá tham khảo, cập nhật tháng MM/YYYY").

### A8. Đường chuyển đổi phải sống

SEO đưa khách tới, nhưng nếu số điện thoại không ai bắt hoặc link Zalo sai thì toàn bộ
công sức bằng 0. Trước khi publish phải test thật: gọi vào số đó, bấm link Zalo trên điện thoại,
gửi thử form.

### A9. Chọn VPS nghĩa là mình chịu uptime

Không có nhân sự IT nên phải bù bằng thiết lập, không bằng con người:

- **Cloudflare free đặt trước VPS** - khách lấy file từ edge, VPS ẩn sau proxy, đỡ bị quét
- **TLS tự gia hạn** (certbot timer), không gia hạn tay
- **Backup tự động** hàng tuần, và phải thử restore một lần cho biết là nó chạy
- **Uptime monitoring miễn phí** báo về email/Zalo khi site sập
- Deploy theo cấu trúc release + symlink để rollback tức thì

### A10. Local SEO là kênh đối thủ đang bỏ, và nó miễn phí

Với truy vấn `mua đinh ở đâu tphcm`, `bán đinh quận 7` thì **Google Business Profile thắng
trang web**, vì nó lên local pack nằm trên kết quả thường. Văn phòng chính Quận 5 và nhà máy đinh Long An
đều lập được profile.

Chưa kiểm đối thủ có làm GBP chưa. Việc này miễn phí, làm nhanh, và độc lập với website -
nên làm song song ngay từ đầu chứ không chờ web xong.

---

## PHẦN B - KẾ HOẠCH THEO PHASE

### Phase 0 - Hạ tầng

| Việc | Ai làm | Chặn bởi |
|---|---|---|
| Mua `dinhthepsg.com` + `dinhthepsaigon.com` (trỏ 301) | bạn | - |
| Thuê VPS 1 vCPU / 2 GB / 20-25 GB / Ubuntu 24.04 | bạn | - |
| Cloudflare free: DNS + proxy + TLS | tôi | domain |
| nginx + certbot + ufw + cấu trúc release symlink | tôi | VPS + SSH |
| Repo git + script deploy | tôi | - |
| Google Search Console + GA4 | tôi | domain |
| **Google Business Profile** nhà máy đinh Đức Hòa Long An + VP chính Quận 5 | bạn (cần xác minh chủ sở hữu) | - |

### Phase 1 - Bộ khung

Không chặn bởi tư liệu, tôi làm được ngay:

- Scaffold Astro + design system (chờ web tham khảo của bạn để chốt hệ thị giác)
- Content collection từ bảng 42 SKU trong `NGUON-DU-LIEU.md`
- Kiến trúc URL + breadcrumb + sitemap + robots.txt + llms.txt
- Template trang sản phẩm, trang danh mục, trang chủ
- JSON-LD: `Product` + `Offer` + `BreadcrumbList` + `Organization` + `LocalBusiness` 2 địa điểm
- Bảng tra đối chiếu `p` / `phân` / `cm` / `mm` (dùng lại trên mọi trang)
- Bản vẽ kỹ thuật SVG từ số đo

### Phase 2 - Lô đầu, 10-15 trang

Chặn bởi: giá đinh chì, tên pháp định + MST + hotline, 5 ảnh tối thiểu.

- 10 trang quy cách đinh chì, **publish 9 quy cách chưa ai chiếm trước, để 5p sau**
- 1 trang danh mục đinh chì
- Trang chủ
- Trang liên hệ + báo giá
- Submit sitemap, xin index

### Phase 3 - Theo dõi, 2-4 tuần

Không viết thêm trang. Chỉ đo:

- Bao nhiêu trang được index, bao nhiêu bị loại và vì sao
- Truy vấn nào bắt đầu có impression trong Search Console (đây là lúc **có dữ liệu thật**
  thay cho suy luận ở mục A4)
- Rich result giá có hiện không
- CWV thực địa

Rồi xếp lại thứ tự ưu tiên theo số thật trước khi mở rộng.

### Phase 4 - Mở rộng

- 32 SKU còn lại: đinh thép trắng, vàng, đinh dù, đinh vít, dây kẽm, bu lông
- Trang so sánh: đinh chì khác đinh thép, thép trắng khác thép vàng
- Bổ sung ảnh phase 2

### Phase 5 - Cụm câu hỏi + Local

- Bài trả lời trực tiếp các câu AI Overview đang trả lời mâu thuẫn
  (`1 phân bằng bao nhiêu cm`, `đinh chì 1kg bao nhiêu cây`, `đinh 5 phân dài bao nhiêu`)
- Đây là chỗ ta có quyền là nguồn chuẩn, vì là nhà sản xuất
- Hoàn thiện GBP: ảnh, giờ mở cửa, sản phẩm, đánh giá thật từ khách

### Phase 6 - Sỉ, làm nhẹ

Một trang báo giá sỉ / tuyển đại lý, cộng một đường dẫn nhỏ ở cuối mỗi trang sản phẩm.
Đúng như bạn yêu cầu: khách lẻ là chính.

---

## PHẦN C - MỐC THỜI GIAN THỰC TẾ

Không phải cam kết, là khoảng thời gian thường thấy với domain mới:

| Mốc | Khi nào |
|---|---|
| Site live, được index | 1-2 tuần sau khi có domain + VPS + tư liệu tối thiểu |
| Bắt đầu có impression trong Search Console | 2-6 tuần |
| Thứ hạng bắt đầu động thật | 4-8 tuần |
| Top 5 cho các quy cách long-tail chưa ai chiếm | 2-4 tháng |
| Top 5 cho `đinh chì 5p` (đối thủ đang giữ chắc) | 6-12 tháng, và cần thêm backlink + GBP |

Thứ **rút ngắn** được các mốc này, theo thứ tự hiệu quả:
1. Backlink từ chính các đại lý mua hàng (mục A3)
2. Google Business Profile hoạt động thật, có đánh giá
3. Ảnh và số liệu thật mà đối thủ không có
4. Đủ tư liệu để publish sớm thay vì chờ

---

## PHẦN D - VỀ VIỆC BẠN SẼ ĐƯA WEB THAM KHẢO

Bài học từ dự án robotics trước, để lần này không lặp lại:

**Tham khảo nghĩa là đo, không phải cảm nhận.** Khi bạn đưa link, tôi sẽ render bằng browser
thật và trích computed styles ra số: bảng màu và số lượng hue, type scale, bán kính, shadow,
nhịp nền từng section, page weight. Rồi port theo số đó. Không "nhìn thấy đẹp rồi tự làm
theo cảm giác" - đó là cách đã làm dự án trước phải sửa 7 vòng.

**Lấy gì và không lấy gì:**

| Lấy | Không lấy |
|---|---|
| Hệ thị giác đo được: màu, type scale, spacing, shadow | Ảnh, logo, minh họa của họ |
| Kiến trúc nội dung: thứ tự section, khối nào đặt đâu | Câu chữ nguyên văn |
| Cách họ tổ chức bảng quy cách, cách hiện giá | Bảo chứng ta không có |

Bạn cứ đưa 2-4 link. Càng nhiều thì tôi càng thấy được điểm chung, và điểm chung mới là
quy luật đáng học, còn một site đơn lẻ có thể chỉ là gu riêng.
