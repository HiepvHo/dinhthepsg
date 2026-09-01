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

import { tenChinh, quyDoi, type QuyCach } from './quy-cach';

const HIEU = 'Đinh Thép Sài Gòn';

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

export function metaQuyCach(
  nhomTen: string,
  qc: QuyCach,
  ctx: { hotline: string; tenPhapDinh: string; quanHuyen: string; tinhThanh: string },
) {
  const ten = tenChinh(nhomTen, qc);
  const qd = quyDoi(qc);

  // Quy cach dung dau. Them mm trong ngoac de phu ca cach goi theo mm.
  const tieuDe = catTieuDe(`${ten} (${qc.daiMm}mm) - Quy cách, giá | ${HIEU}`);

  const boPhan = [
    `${ten}`,
    qd ? `: ${qd}` : '',
    qc.duongKinhMm !== undefined ? `, đường kính thân ${qc.duongKinhMm}mm` : '',
    `. Sản xuất trực tiếp tại nhà máy ${ctx.quanHuyen}, ${ctx.tinhThanh}. Gọi ${ctx.hotline} để báo giá.`,
  ];
  const moTa = catMoTa(boPhan.join(''));

  return { tieuDe, moTa, ten };
}

export function metaNhom(
  ten: string,
  soQuyCach: number,
  moTaNgan: string,
  ctx: { hotline: string },
) {
  const tieuDe = catTieuDe(`${ten} - ${soQuyCach} quy cách | ${HIEU}`);
  const moTa = catMoTa(
    `${ten}: ${soQuyCach} quy cách, công bố đầy đủ chiều dài và đường kính thân. ${moTaNgan} Nhà máy sản xuất trực tiếp, gọi ${ctx.hotline}.`,
  );
  return { tieuDe, moTa };
}
