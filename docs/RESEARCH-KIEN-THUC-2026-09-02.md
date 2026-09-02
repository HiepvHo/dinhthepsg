# Research: kiến thức về đinh thép để viết cụm A-H

Thực hiện 02/09/2026. Công cụ: WebSearch x4 + WebFetch x1 (không có `gemini` CLI trên máy).

## Tóm tắt điều hành

Ba kết quả đổi hướng viết:

1. **Không có TCVN riêng cho đinh.** TCVN 1651 là thép cốt bê tông và lưới thép
   hàn. JIS A5508 (Nhật) có phạm vi đinh 38-125mm. Không được gắn số hiệu TCVN
   nào lên trang đinh.
2. **"Đinh chì" không có định nghĩa tài liệu nào.** Tên gọi dân gian. Không được
   đoán lớp phủ, càng không được viết nó chứa chì.
3. **Đối thủ để hở một mảng lớn:** trang tên "Định mức đinh đóng coppha tiêu
   chuẩn" của satthepsaigon.vn / tonthepsangchinh.vn **không có một con số định
   mức nào**, và còn mô tả sai "3 phân - 10 phân" là đường kính (phân là chiều
   dài). Đây là chỗ ta chiếm được nếu có số thật.

Tìm được một quy tắc kỹ thuật có nguồn, đủ để dựng bảng chọn chiều dài đinh -
thứ chưa đối thủ nào công bố.

---

## 1. Đơn vị đo: phân, ly, tấc, thước

| Đơn vị | Quy đổi hiện nay | Ghi chú |
|---|---|---|
| 1 phân | **1 cm = 10 mm** | Dùng cho **chiều dài** cây đinh |
| 1 ly | **1 mm** | 1 phân = 10 ly. Dùng cho **đường kính** dây/sợi |
| 1 tấc | 10 cm | |
| 1 thước | 100 cm = 100 phân | |

**Phát hiện đáng dùng:** ngành vật tư dùng **hai đơn vị cho hai chiều khác nhau**
trên cùng một món hàng: `phân` cho chiều dài, `ly` cho đường kính. Nên "dây thép
buộc 1 ly" nghĩa là dây đường kính 1mm - trùng đúng quy cách dây kẽm hấp 1mm của
ta.

**Bẫy lịch sử:** theo hệ đo cổ, **1 phân = 4 ly = 4mm**, sau mới chuẩn hoá thành
1cm. Thợ lớn tuổi hoặc tài liệu cũ có thể hiểu khác. Đáng viết một đoạn cảnh báo.

Nguồn: meta.vn, quantrimang.com, dinhnghia.com.vn (nhóm trang quy đổi đơn vị,
đồng thuận với nhau).

---

## 2. Khối lượng và số cây trên 1kg - KHÔNG tìm được số đáng tin

Tra nhiều lần, kết quả nhiễu sang quy đổi vàng. Các trang vật tư có nhắc chủ đề
nhưng **không trang nào công bố bảng số cây/kg**.

Ý kiến chung của các nguồn: số cây trên 1kg phụ thuộc chiều dài, đường kính thân
và tỉ trọng thép, nên chênh nhau rất nhiều giữa các quy cách.

**Kết luận: giữ nguyên quyết định trong `CHOT-2026-08-24.md` - phải ĐẾM THẬT ở
cân nhà máy.** Không tính bằng công thức. Đây vừa là rào cản, vừa là cơ hội: chưa
ai công bố nên ai công bố trước và đúng thì chiếm.

Số cần xin xưởng: cân 1kg mỗi quy cách rồi đếm số cây. Ưu tiên 5F, 7F, 10F (ba
quy cách bán chạy nhất theo suy luận).

---

## 3. Quy cách đóng gói

Nguồn tonthepsangchinh.vn: đinh đóng cốp pha đóng **bao 50kg, chia túi nhỏ 5kg**.

**Chưa xác thực với xưởng ta.** Nếu quy cách đóng gói của ta khác thì phải sửa.
Đây là thông tin khách hỏi ngay khi đặt số lượng lớn, nên đáng xin xác nhận.

---

## 4. Xử lý bề mặt - có từ vựng chuẩn, chưa có ánh xạ

Tài liệu quốc tế phân loại theo lớp phủ:

| Loại | Bản chất | Dùng ở đâu |
|---|---|---|
| Mạ kẽm (galvanized) | Phủ kẽm chống gỉ. Nhúng nóng thì lớp dày hơn | Ngoài trời, môi trường ẩm |
| Phốt phát đen (black phosphate) | Lớp phốt phát, màu xám hoặc đen | Trong nhà. Bám sơn và bột trét tốt |
| Thép trần (bright) | Không xử lý | Chỉ dùng trong nhà |

**Ánh xạ sang ba nhóm của ta: CHƯA LÀM ĐƯỢC.**

| Nhóm của ta | Suy đoán | Trạng thái |
|---|---|---|
| Đinh chì | tên dân gian, có thể chỉ màu xám | **Không nguồn nào định nghĩa. Phải hỏi xưởng** |
| Đinh thép trắng | yaml ghi "bề mặt sáng màu" | Chưa rõ là thép trần hay mạ kẽm |
| Đinh thép vàng | bề mặt vàng | Chưa rõ, có thể là thụ động hoá cromat vàng |

**Không được viết cụm D cho tới khi xưởng xác nhận.** Viết sai lớp phủ là sai
thông tin kỹ thuật với đúng nhóm khách đọc kỹ nhất.

---

## 5. Chọn chiều dài đinh - CÓ quy tắc nguồn, dùng được ngay

Quy tắc từ tài liệu nghề mộc/khung gỗ:

- **Ít nhất 2/3 chiều dài cây đinh phải ăn vào lớp nền** (lớp bị đóng vào)
- **Chiều dài đinh khoảng 2,5 đến 3 lần độ dày tấm cần cố định**

Đây là quy tắc kiểm chứng được, không phải cảm tính. Ghép với dải quy cách của ta
ra được bảng tra sau (bảng do ta tính từ quy tắc, sẽ ghi rõ là suy ra từ quy tắc
chứ không phải số đo nhà máy):

| Độ dày tấm cần đóng | Chiều dài cần (2,5-3x) | Quy cách của ta |
|---|---|---|
| 10 mm | 25-30 mm | 3F (30mm) |
| 15 mm | 38-45 mm | 4F (40mm) |
| 18 mm (ván cốp pha phổ biến) | 45-54 mm | **5F (50mm)** |
| 20 mm | 50-60 mm | 5F hoặc 6F |
| 25 mm | 63-75 mm | 7F (70mm) |
| 30 mm | 75-90 mm | 8F (80mm) |
| 40 mm | 100-120 mm | 10F hoặc 12F |
| 50 mm | 125-150 mm | 12F hoặc 15F |

Nguồn: finehomebuilding.com, spikeel.com, nailerguy.com (đồng thuận về quy tắc
2/3 và hệ số 2,5-3x).

**Lưu ý khi viết:** phải nói rõ đây là quy tắc chung của nghề mộc, và với cốp pha
thép hoặc nền bê tông thì không áp dụng.

---

## 6. Khoảng trống của đối thủ - chỗ chiếm được

| Chỗ hở | Bằng chứng | Ta làm gì |
|---|---|---|
| Trang "định mức" rỗng ruột | satthepsaigon.vn và tonthepsangchinh.vn đặt tiêu đề "Định mức đinh đóng coppha tiêu chuẩn: 3 phân, 5 phân..." nhưng **không có bảng định mức nào** | Công bố định mức thật khi có số từ xưởng |
| Nhầm phân là đường kính | Cùng trang trên mô tả "3 phân - 10 phân" là đường kính 3-10mm | Bài ký hiệu F đã viết, sửa thẳng hiểu nhầm này |
| Không ai công bố số cây/kg | Tra 4 lần không ra bảng nào | Đếm thật rồi công bố |
| Không ai giải thích ngoại lệ mã | Đinh dù 3F = 33mm, đinh vàng 1F6 = 16mm | Đã có trong bài 1 |
| Không ai có bảng chọn dài theo độ dày ván | Không thấy trang VN nào | Bảng ở mục 5 |

---

## 7. Cụm nào viết được sau research

| Cụm | Trước research | Sau research | Đổi vì |
|---|---|---|---|
| A - Định danh | Được | **Được** | Thêm phần phân biệt phân với ly |
| B - Quy cách | Được | **Được, mạnh hơn** | Thêm bẫy lịch sử 1 phân = 4 ly |
| C - Khối lượng | Chưa | **Vẫn chưa** | Xác nhận không nguồn nào có. Phải cân |
| D - Vật liệu | Một nửa | **Vẫn chưa** | Có từ vựng chuẩn nhưng không ánh xạ được sang tên nhóm của ta |
| E - Ứng dụng | Một nửa | **Được một phần** | Bảng chọn dài theo độ dày ván dùng được ngay |
| F - Chọn đúng | Được | **Được, mạnh hơn** | Quy tắc 2/3 và 2,5-3x có nguồn |
| G - Sản xuất | Chưa | **Vẫn chưa** | Không tra được từ ngoài, phải hỏi xưởng |
| H - So sánh | Được | **Được** | So từ bảng thông số của ta |

Viết được ngay: **A, B, E (một phần), F, H**. Khoảng 8-9 bài.

---

## 8. Câu hỏi chưa giải quyết - cần xưởng trả lời

1. **Đếm số cây trên 1kg** cho ít nhất 5F, 7F, 10F. Mở khoá cả cụm C.
2. **Lớp phủ bề mặt của ba nhóm** đinh chì / thép trắng / thép vàng là gì. Mở
   khoá cụm D.
3. **Quy cách đóng gói của ta**: bao bao nhiêu kg, có chia túi nhỏ không.
4. **Vì sao đinh dù 3F là 33mm** chứ không phải 30mm. Đã ghi `canXacNhan` trong
   `nhom-san-pham.yaml` từ trước, vẫn treo.
5. **Đinh thép vàng mã 1F6/1F9/2F3 đọc thế nào** theo cách xưởng gọi.
6. **Giá** - chưa có quy cách nào có giá. Mục tiêu "khách thấy sản phẩm cùng giá"
   không chạm được nếu ô này còn trống.

---

## Nguồn

Đơn vị đo: [meta.vn](https://meta.vn/hotro/1-phan-bang-bao-nhieu-cm-16562),
[quantrimang.com](https://quantrimang.com/cuoc-song/1-tac-1-li-1-phan-1-thuoc-bang-bao-nhieu-met-cm-164754),
[dinhnghia.com.vn](https://www.dinhnghia.com.vn/1-phan-bang-bao-nhieu-cm-mm-dm-m-km-thuoc-tac-ly/)

Tiêu chuẩn: [TCVN 1651-2018 (thép cốt bê tông)](https://thepbaotin.com/tieu-chuan-thep-xay-dung-viet-nam-tcvn-1651-2018/),
[JIS A5508 (đinh, Nhật)](https://www.intertekinform.com/en-us/standards/jis-a-5508-2009-631928_saig_jsa_jsa_1456449/)

Xử lý bề mặt: [congcutot.vn - 30 loại đinh](https://congcutot.vn/dinh-c1008/30-loai-dinh-khac-nhau-kich-co-va-cong-dung-303.html),
[Đinh - Wikipedia tiếng Việt](https://vi.wikipedia.org/wiki/%C4%90inh)

Chọn chiều dài: [Fine Homebuilding - How it Works: Nails](https://www.finehomebuilding.com/project-guides/framing/how-it-works-nails),
[spikeel.com - nail length and diameter guide](https://www.spikeel.com/right-nail-length-diameter-guide/)

Khoảng trống đối thủ: [satthepsaigon.vn](https://satthepsaigon.vn/dinh-muc-dinh-dong-coppha-tieu-chuan-3-phan-5-phan-7-phan-10-phan/),
[tonthepsangchinh.vn](https://tonthepsangchinh.vn/dinh-muc-dinh-dong-coppha-tieu-chuan-3-phan-5-phan-7-phan-10-phan/)
