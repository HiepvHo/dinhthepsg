/**
 * NHA MAY SAN XUAT DINH - mot nguon cho moi cau "san xuat tai nha may X".
 *
 * Truoc 16/09/2026 ca site coi `diaDiem[0]` la nha may duy nhat, rai o khoang
 * 25 cho. Nay co HAI nha may chay song song (Nha Be va Can Duoc - bao bi dinh in
 * dia chi Can Duoc), nen doc co `sanXuatDinh` trong cong-ty.yaml.
 *
 * Them hay bot mot nha may: sua cong-ty.yaml, moi cau tren site tu doi theo.
 */
type DiaDiem = {
  diaChi: string;
  quanHuyen: string;
  tinhThanh: string;
  sanXuatDinh: boolean;
};

export function cacNhaMay<T extends DiaDiem>(ds: readonly T[]): T[] {
  const nm = ds.filter((d) => d.sanXuatDinh);
  // Khong co nha may nao thi moi cau "san xuat tai nha may ..." thanh cau cut.
  // Hong build o day ro hon de lot ra trang.
  if (nm.length === 0) throw new Error('cong-ty.yaml: khong co dia diem nao `sanXuatDinh: true`');
  return nm;
}

/** Noi kieu tieng Viet: "A", "A và B", "A, B và C". */
export function noiVa(ds: readonly string[]): string {
  if (ds.length <= 1) return ds[0] ?? '';
  return `${ds.slice(0, -1).join(', ')} và ${ds[ds.length - 1]}`;
}

/** "Nhà Bè, TP. Hồ Chí Minh và Cần Đước, Long An" */
export function noiNhaMay(ds: readonly DiaDiem[]): string {
  return noiVa(cacNhaMay(ds).map((d) => `${d.quanHuyen}, ${d.tinhThanh}`));
}

/**
 * "Nhà Bè và Cần Đước" - ban NGAN cho meta description va tieu de. Ban day du
 * dai them ~30 ky tu, du de `catMoTa` cat mat so hotline o cuoi doan trich
 * tren SERP - ma so hotline la ly do nguoi ta bam.
 */
export function noiNhaMayNgan(ds: readonly DiaDiem[]): string {
  return noiVa(cacNhaMay(ds).map((d) => d.quanHuyen));
}

/** Tinh thanh cua cac nha may, khong trung lap: ["TP. Hồ Chí Minh", "Long An"] */
export function tinhNhaMay(ds: readonly DiaDiem[]): string[] {
  return [...new Set(cacNhaMay(ds).map((d) => d.tinhThanh))];
}

/** Ten tinh viet gon cho cho chat cho (tieu de banner): "TP. Hồ Chí Minh" -> "TP.HCM". */
export function tinhNgan(t: string): string {
  return t === 'TP. Hồ Chí Minh' ? 'TP.HCM' : t;
}

export function diaChiDayDu(d: DiaDiem): string {
  return `${d.diaChi}, ${d.quanHuyen}, ${d.tinhThanh}`;
}
