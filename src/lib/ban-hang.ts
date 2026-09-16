/**
 * DU KIEN BAN HANG - dong bao, don toi thieu, khu vuc va phi giao hang.
 *
 * Vi sao co: AI Overview cho "mua dinh thep sai gon" (16/09/2026) tra loi bang
 * dung loai du kien nay - quy cach dong goi, gia si - va trich tu doi thu co
 * ghi. Site co 10 bai kien thuc nhung 0 du kien ban hang nen khong co gi de trich.
 *
 * TRUONG TRONG THI KHONG HIEN. Khong co dong nao thi khong hien gi ca - khong
 * "dang cap nhat", khong so tam. Dien so that vao cong-ty.yaml la tu hien.
 */
export type BanHang = {
  dongBao?: string;
  donToiThieu?: string;
  khuVucGiao?: string;
  phiGiao?: string;
};

/* Thu tu va nhan co dinh: nguoi mua hoi theo dung thu tu nay - mua theo bao
   gi, it nhat bao nhieu, co giao toi cho minh khong, mat phi bao nhieu. */
const NHAN: [keyof BanHang, string][] = [
  ['dongBao', 'Đóng bao'],
  ['donToiThieu', 'Đơn tối thiểu'],
  ['khuVucGiao', 'Giao hàng'],
  ['phiGiao', 'Phí giao hàng'],
];

export function dongBanHang(b: BanHang): { nhan: string; giaTri: string }[] {
  return NHAN.filter(([k]) => b[k]).map(([k, nhan]) => ({ nhan, giaTri: b[k] as string }));
}
