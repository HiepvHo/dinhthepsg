/**
 * Tien ich cho bai viet: nhan chuyen muc va ngay dang.
 *
 * ANH BIA KHONG con o day (file nay tung ten la `anh-bai.ts`).
 *
 * Truoc day file nay giu mot bang hardcode anh bia cho tung bai, kem 8 cau
 * `import`. Ly do luc do: truong `anhBia` trong schema khai la `z.string()`
 * nen anh khong duoc Astro toi uu, phai `import` moi co WebP va srcset.
 *
 * Nay `anhBia` dung `image()` nen anh nam thang trong frontmatter cua tung bai:
 * cung mot cho voi noi dung, CMS sua duoc, va go sai ten tep thi build hong
 * ngay thay vi den luc mo trang moi thay o anh vo.
 *
 * Doc anh cua mot bai: `bai.data.anhBia` / `anhBiaAlt` / `anhBiaKhop`.
 */

/**
 * NHAN CHUYEN MUC lay tu truong `cum` trong frontmatter.
 *
 * `cum` la ma trong topical map (A-dinh-danh, B-quy-cach...) - dung de quan ly
 * noi dung, khong phai de nguoi doc nhin. Bang nay doi sang chu doc duoc.
 * Nho vay nhan chuyen muc KHONG phai go tay cho tung bai: them bai moi voi
 * `cum` da co la nhan tu ra.
 */
const NHAN_CUM: Record<string, string> = {
  'A-dinh-danh': 'Định danh',
  'B-quy-cach': 'Quy cách',
  'C-khoi-luong': 'Khối lượng',
  'D-vat-lieu': 'Vật liệu',
  'E-ung-dung': 'Ứng dụng',
  'F-chon-dung': 'Chọn đúng',
  'G-san-xuat': 'Sản xuất',
  'H-so-sanh': 'So sánh',
};

export function nhanCum(cum: string): string {
  return NHAN_CUM[cum] ?? 'Kiến thức';
}

/** Ngay dang dang dd/mm/yyyy - dung chung cho moi noi hien bai viet */
export function ngayVn(d: Date): string {
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * SAP BAI: moi nhat truoc, HOA thi lay id lam trong tai.
 *
 * Vi sao phai co ve sau: bay bai hien tai deu cung `ngayDang: 2026-09-02`, nen
 * sap chi theo ngay la mot phep so sanh LUON TRA 0. Luc do thu tu cuoi cung phu
 * thuoc thu tu nap collection chu khong phu thuoc du lieu.
 *
 * Do duoc: khi doi anh bia sang `image()`, thu tu bai lien quan tren
 * /san-pham/dinh-du/ tu doi cho (ky-hieu-f va dinh-du-va-dinh-vit hoan vi) du
 * khong dong vao logic sap xep. Chi sua frontmatter cua bai ma thu tu hien thi
 * doi - dau hieu thu tu dang do thu tu nap quyet dinh.
 *
 * Hau qua: deploy sinh ra thay doi HTML khong do ai ca, va khong the diff hai
 * ban build de biet minh vua doi cai gi. Co ve sau nay thi build lap lai duoc
 * tung byte - da kiem: build hai lan lien tiep, `diff -rq` ra 0 khac biet.
 */
export function sapBaiMoiTruoc(
  a: { id: string; data: { ngayDang: Date } },
  b: { id: string; data: { ngayDang: Date } },
): number {
  return b.data.ngayDang.valueOf() - a.data.ngayDang.valueOf() || a.id.localeCompare(b.id);
}
