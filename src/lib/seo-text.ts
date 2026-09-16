/**
 * Sinh title va meta description.
 *
 * Tach ra file rieng vi CA HAI cho deu can: trang (de dua vao BaseLayout) va
 * component (de dua vao JSON-LD description). Neu moi cho tu viet thi title
 * tren tab va description trong schema se lech nhau.
 *
 * Rang buoc do duoc tu SERP:
 *  - title <= 60 ky tu de khong bi cat. Doi thu #1 dung 34 ky tu
 *    ("Dinh chi coffa 5p - TRUNG NAM") va no khop chinh xac truy van
 *  - meta description <= 165 ky tu
 *  - dat QUY CACH ngay dau title, khong dat ten thuong hieu truoc
 */

import { tenChinh, quyDoi, coGia, khoangPhan, type QuyCach } from './quy-cach';

export const HIEU = 'Đinh Thép Sài Gòn';

/**
 * "Giá" khi trang CO gia that, "Báo giá" khi chua.
 *
 * Title cu ghi "Quy cách, giá" tren 24 trang trong khi 0/24 co gia: nguoi tim
 * "gia dinh chi 5p" bam vao, khong thay gia, bam quay lai - dung loai tin hieu
 * xau nhat cho trang ban hang. "Báo giá" van khop truy van co chu "gia" ma
 * khong hua thu trang khong co. Dien gia vao YAML la chu tu doi.
 */
export function chuGia(coGiaThat: boolean): string {
  return coGiaThat ? 'Giá' : 'Báo giá';
}

/**
 * Cat chuoi cho khong vuot toiDa ky tu, ke ca sau khi them dau "...".
 *
 * BUG DA SUA 01/09: ban dau viet `slice(0, toiDa - 1) + '...'` -> ket qua dai
 * toiDa + 2 ky tu, tuc VUOT chinh gioi han minh dat ra. Audit tren dist bat duoc
 * 3 title dai 63-65 ky tu du da goi catBot(62). Phai tru du 3 ky tu cua dau "...".
 */
export function catBot(s: string, toiDa: number): string {
  if (s.length <= toiDa) return s;
  return s.slice(0, toiDa - 3).trimEnd() + '...';
}

/** Title: gioi han 60 de khong bi cat tren SERP */
export const catTieuDe = (s: string) => catBot(s, 60);
/** Meta description: gioi han 160 */
export const catMoTa = (s: string) => catBot(s, 160);

/**
 * Mo ta = phan CHINH + phan PHU neu con vua 160 ky tu; khong vua thi bo HAN phan
 * phu. Cat ngang giua cau ("...đóng cốp pha, đóng gỗ, đóng...") te hon mot mo
 * ta ngan hon ma tron cau. Phan chinh phai tu no du nghia va chua hotline.
 */
export function moTaVua(chinh: string, phu: string): string {
  const day = `${chinh} ${phu}`;
  return catMoTa(day.length <= 160 ? day : chinh);
}

export function metaQuyCach(
  nhomTen: string,
  qc: QuyCach,
  ctx: { hotline: string; tenPhapDinh: string; noiNhaMay: string },
) {
  const ten = tenChinh(nhomTen, qc);
  const qd = quyDoi(qc);

  // Quy cach dung dau. Them mm trong ngoac de phu ca cach goi theo mm.
  const tieuDe = catTieuDe(`${ten} (${qc.daiMm}mm) - ${chuGia(coGia(qc))} nhà máy | ${HIEU}`);

  const boPhan = [
    `${ten}`,
    qd ? `: ${qd}` : '',
    qc.duongKinhMm !== undefined ? `, đường kính thân ${qc.duongKinhMm}mm` : '',
    `. Sản xuất trực tiếp tại nhà máy ${ctx.noiNhaMay}. Gọi ${ctx.hotline} để báo giá.`,
  ];
  const moTa = catMoTa(boPhan.join(''));

  return { tieuDe, moTa, ten };
}

export function metaNhom(
  ten: string,
  quyCach: readonly QuyCach[],
  moTaNgan: string,
  ctx: { hotline: string },
) {
  const soQuyCach = quyCach.length;
  const cg = chuGia(quyCach.some(coGia));
  // Nhom theo he phan (dinh chi 2p-12p) thi dat KHOANG PHAN vao title - dung
  // chu nguoi ta go. Nhom khong theo phan (dinh vit, day kem, dinh du...) thi
  // khoangPhan tra [Infinity, -Infinity], nen chi dung khi co it nhat hai co.
  const [pMin, pMax] = khoangPhan(quyCach);
  const coKhoang = Number.isFinite(pMin) && pMax > pMin;
  const tieuDe = catTieuDe(
    coKhoang
      ? `${ten} ${pMin}p-${pMax}p - ${cg} nhà máy | ${HIEU}`
      : `${ten} - ${soQuyCach} quy cách, ${cg.toLowerCase()} | ${HIEU}`,
  );
  // HOTLINE TRUOC mo ta ngan. Ban cu de hotline cuoi cau, dai 160+ ky tu nen
  // bi catMoTa cat dung vao so dien thoai - thu duy nhat tren doan trich nguoi
  // ta co the bam goi ngay. Neu con bi cat thi mat duoi mo ta ngan, khong mat so.
  // Chi noi "du chieu dai / duong kinh" khi du lieu THAT SU co. Ban truoc ghi
  // cung cho moi nhom: dinh du khong co duong kinh, day kem khong co chieu dai
  // (daiMm: 0) - mo ta khang dinh mot thu ma chinh bang thong so tren trang
  // khong co.
  const coDai = quyCach.some((q) => q.daiMm > 0);
  const coDk = quyCach.some((q) => q.duongKinhMm !== undefined);
  const thongSo = [coDai && 'chiều dài', coDk && 'đường kính thân'].filter(Boolean).join(' và ');
  const moTa = moTaVua(
    `${ten}: ${soQuyCach} quy cách${thongSo ? `, đủ ${thongSo}` : ''}, sản xuất tại nhà máy. Gọi ${ctx.hotline}.`,
    moTaNgan,
  );
  return { tieuDe, moTa };
}
