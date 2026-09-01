# Kiểm kê ảnh đã có - `img_dinhthepsg/`

> Xem toàn bộ 61 ảnh JPEG + 3 video ngày 01/09/2026 qua contact sheet.
> Contact sheet ở `_contact-sheet/contact-1.png` đến `contact-3.png`, kèm bảng
> đối chiếu số thứ tự với tên file gốc ở `_contact-sheet/danh-sach-anh.txt`.

## 1. Đánh giá chung

Bộ ảnh **mạnh hơn dự đoán**. Đây là ảnh nhà máy thật, chụp tại chỗ, có công nhân mặc
đồng phục công ty, có bao bì thương hiệu. Đúng loại tài sản mà đại lý không có.

Chất lượng kỹ thuật: 1280x960 hoặc 960x1280, 100-680 KB. Đủ dùng cho web sau khi
qua `astro:assets` chuyển WebP. Cạnh dài 1280px thấp hơn mốc 1200px của Google Shopping
một chút nhưng vẫn đạt.

## 2. Những gì ĐÃ CÓ

| Nhóm | Số lượng ước tính | Dùng cho |
|---|---|---|
| **Dây chuyền sản xuất**, máy dập đinh (máy sơn xanh lá) | 6-8 ảnh | trang Nhà máy, cụm nội dung Sản xuất |
| Đinh rơi từ máy vào máng/thùng chứa | 3-4 ảnh | chứng minh sản xuất thật |
| **Đống đinh lớn**, nhiều loại khác nhau | 15+ ảnh | ảnh nền, ảnh nhóm sản phẩm |
| **Công nhân đóng bao**, đồng phục `THÉP CƯỜNG PHÁT` / `NHÀ MÁY TÔN CƯỜNG PHÁT` | 5-6 ảnh | tín hiệu doanh nghiệp thật |
| **Bao bì thương hiệu `ĐINH SÀI GÒN`** logo đỏ | 8+ ảnh | trang sản phẩm, quy cách đóng gói |
| Bao `ĐINH THÉP LOẠI N` | 2-3 ảnh | phân loại sản phẩm |
| **Ảnh cân** - bao đặt trên cân đồng hồ | 1 ảnh | cụm "1kg bao nhiêu cây" |
| Cuộn sợi thép nguyên liệu | 6-8 ảnh | cụm Vật liệu, quy trình sản xuất |
| Dây kẽm cuộn | 3-4 ảnh | trang dây kẽm hấp |
| **Lưới thép hàn** cuộn, xếp kho | 10+ ảnh | dòng sản phẩm thứ hai, chưa nằm trong scope |
| Đinh trong lòng bàn tay | 4 ảnh | cảm nhận kích thước |
| **Đinh xếp hàng trên nền giấy trắng** | 4 ảnh | gần nhất với ảnh sản phẩm chuẩn |
| Kho hàng, bao xếp chồng | 5-6 ảnh | trang Hệ thống |
| Video MP4 dọc 480x854 | 3 video | mạng xã hội, không dùng cho web chính |

## 3. VẤN ĐỀ CHẶN - không biết ảnh nào là quy cách nào

Đây là vấn đề lớn nhất, và nó chặn việc gán ảnh cho trang sản phẩm.

Có hơn 15 ảnh đống đinh, nhưng **không có cách nào biết đống nào là 3p, đống nào là 5p,
đống nào là 10p**. Tên file toàn chuỗi hash không mang nghĩa. Trong ảnh không có thước,
không có nhãn, không có gì để tham chiếu kích thước.

Hệ quả: không thể đặt ảnh vào trang `/dinh-chi-5p/` mà nói đó là đinh 5p. Làm vậy là
đưa thông tin sai, đúng cái ta đã cam kết không làm.

**Cách giải, chọn một:**

1. Bạn xem contact sheet rồi ghi cho tôi: ảnh số mấy là quy cách nào. Chỉ cần
   những ảnh rõ nhất, không cần hết
2. Hoặc chụp lại bộ ảnh mới có nhãn, xem mục 4

## 4. Những gì CÒN THIẾU so với brief

| # | Thiếu | Vì sao cần | Thay thế được không |
|---|---|---|---|
| 1 | **Ảnh đinh đặt cạnh thước, đọc được vạch** | Ảnh có giá trị SEO cao nhất. Chứng minh chiều dài thật, trả lời trực quan câu "5p là bao nhiêu cm" | Không. Bắt buộc chụp mới |
| 2 | **Ảnh dàn hàng**: tất cả quy cách trên cùng một cây thước | Một ảnh dùng lại cho cả 10 trang quy cách + danh mục + trang chủ. Không đối thủ nào có | Không. Bắt buộc chụp mới |
| 3 | Ảnh từng quy cách **có nhãn biết chắc** | Để gán đúng ảnh cho đúng trang | Giải được bằng cách 1 mục 3 |
| 4 | **Ảnh banner ngang** chừa 45% bên trái trống | Ảnh hiện tại đều kín khung, không có chỗ đặt tiêu đề và nút gọi | Có thể crop tạm từ ảnh dây chuyền, nhưng ảnh dàn hàng thước làm banner sẽ tốt hơn nhiều |
| 5 | Ảnh mặt cân **đọc được số** + số cây đếm được | Ảnh cân hiện có không đọc rõ số trên mặt cân | Chụp lại, dễ |
| 6 | Ảnh bảng hiệu / mặt tiền nhà máy | Tín hiệu địa điểm thật cho Google Business Profile | Chụp lại, dễ |

**Bốn ảnh ưu tiên chụp thêm, một buổi là xong:**

1. Dàn hàng 10 quy cách đinh chì trên cùng cây thước, mũ thẳng hàng vạch 0, chụp vuông góc
2. Ba ảnh riêng cho 3p, 5p, 10p - mỗi ảnh có thước nằm cạnh
3. Mặt cân đọc rõ số, kèm 1kg đinh đã đếm
4. Bảng hiệu nhà máy

## 5. Phát hiện phụ đáng lưu ý

**Bao bì mang thương hiệu `ĐINH SÀI GÒN`**, không phải SJK như brochure. Nghĩa là công ty
đã có nhận diện riêng cho dòng đinh, và nó khớp với tên miền `dinhthepsg.com` đã chọn.
Logo trên bao là chữ đỏ - thống nhất với tông đỏ của hệ thị giác định dùng.

**Lưới thép hàn xuất hiện rất nhiều trong ảnh.** Đây là dòng sản phẩm thứ hai của nhà máy
(tên nhà máy là "Nhà Máy Sản Xuất Đinh Thép Sài Gòn - Lưới Thép Hàn"). Hiện **nằm ngoài
topical border** đã chốt. Ghi lại để cân nhắc mở cụm riêng ở giai đoạn sau - và lưu ý
`dayluoithep.com` chính là đối thủ ở mảng đó.
