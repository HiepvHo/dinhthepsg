/**
 * Ham thuan cho he quy cach. KHONG chua du lieu - du lieu nam o
 * `src/content/du-lieu/nhom-san-pham.yaml` de CMS sua duoc.
 *
 * He quy doi nganh: 1 phan = 1 cm = 10 mm. Ma "F" tren catalogue doc la "phan",
 * nguoi tim kiem go la "p".
 */

export type QuyCach = {
  ma: string;
  phan?: number;
  daiMm: number;
  duongKinhMm?: number;
  slug: string;
  cayTrenKg?: number;
  gia?: number;
  donViGia?: string;
  dungSai?: string;
};

export type NhomTom = {
  ten: string;
  tenNgan: string;
  slug: string;
  tenGoiKhac: string[];
};

/**
 * Sinh toan bo cach goi cua mot quy cach, de phu het cum dong nghia trong
 * title, heading, noi dung va alt text.
 *
 * Doi thu chia doi quy uoc: trungnamcons dung "5p", dayluoithep dung "5cm".
 * Ta phu ca hai nen an duoc ca hai nhom truy van.
 *
 * Vi du nhom "Dinh chi", quy cach 5F ->
 *   ["dinh chi 5p", "dinh chi 5 phan", "dinh chi 5cm", "dinh chi 50mm"]
 */
export function cachGoi(tenNhom: string, qc: QuyCach): string[] {
  const ten = tenNhom.toLowerCase();
  const ra: string[] = [];
  if (qc.phan !== undefined) {
    ra.push(`${ten} ${qc.phan}p`, `${ten} ${qc.phan} phân`, `${ten} ${qc.phan}cm`);
  } else {
    ra.push(`${ten} ${qc.ma}`);
  }
  ra.push(`${ten} ${qc.daiMm}mm`);
  return ra;
}

/** Cach goi chinh, dung cho H1 va title. Vi du "Đinh chì 5p" */
export function tenChinh(tenNhom: string, qc: QuyCach): string {
  return qc.phan !== undefined ? `${tenNhom} ${qc.phan}p` : `${tenNhom} ${qc.ma}`;
}

/** Nhan ngan kem mm, dung trong bang. Vi du "5p (50mm)" hoac "1F6 (16mm)" */
export function nhan(qc: QuyCach): string {
  return qc.phan !== undefined ? `${qc.phan}p (${qc.daiMm}mm)` : `${qc.ma} (${qc.daiMm}mm)`;
}

/** Chuoi quy doi day du, dung cho bang tra va cau tra loi AI. */
export function quyDoi(qc: QuyCach): string | null {
  if (qc.phan === undefined) return null;
  return `${qc.phan} phân = ${qc.phan}cm = ${qc.daiMm}mm`;
}

/** Dinh dang gia kieu Viet Nam. Tra chuoi rong neu chua co gia. */
export function dinhDangGia(qc: QuyCach): string {
  if (qc.gia === undefined || qc.donViGia === undefined) return '';
  return `${qc.gia.toLocaleString('vi-VN')}đ/${qc.donViGia}`;
}

/** Da co du du lieu de hien gia va sinh Offer schema chua */
export function coGia(qc: QuyCach): boolean {
  return qc.gia !== undefined && qc.donViGia !== undefined;
}

/**
 * Mo ta spec mot dong, dung cho meta description va doan mo dau.
 * Chi ghep nhung truong THAT SU co - khong bia so.
 */
export function motaSpec(tenNhom: string, qc: QuyCach): string {
  const phan: string[] = [];
  phan.push(`${tenChinh(tenNhom, qc)}`);
  const qd = quyDoi(qc);
  if (qd) phan.push(`(${qd})`);
  if (qc.duongKinhMm !== undefined) phan.push(`đường kính thân ${qc.duongKinhMm}mm`);
  return phan.join(' ');
}

/** URL tuyet doi cua mot trang quy cach */
export function urlQuyCach(qc: QuyCach): string {
  return `/san-pham/${qc.slug}/`;
}

/** URL tuyet doi cua mot trang nhom */
export function urlNhom(slug: string): string {
  return `/${slug}/`;
}

/**
 * Hai quy cach lien ke, dung cho internal linking ngang giua cac trang quy cach.
 * Muc dich: nguoi dung dang xem 5p thuong phan van giua 4p va 6p, va crawler
 * di duoc theo chuoi thay vi phai quay ve hub moi lan.
 */
export function lienKe(ds: QuyCach[], slugHienTai: string): { truoc?: QuyCach; sau?: QuyCach } {
  const i = ds.findIndex((q) => q.slug === slugHienTai);
  if (i < 0) return {};
  return { truoc: i > 0 ? ds[i - 1] : undefined, sau: i < ds.length - 1 ? ds[i + 1] : undefined };
}
