/**
 * Sinh JSON-LD.
 *
 * Nguyen tac ap tu skill `seo-schema`:
 *  - Chi JSON-LD, khong Microdata (Google noi ro uu tien JSON-LD)
 *  - URL phai TUYET DOI
 *  - Chi dua du kien CO THAT va kiem chung duoc. Khong placeholder, khong bia
 *  - KHONG lam AggregateRating gia. Doi thu trungnamcons dang de 5 sao / 1 review
 *    do chinh ho viet, noi dung review copy y nguyen meta description - khong lap lai
 *  - FAQPage da bi bo rich result tu 07/05/2026, van giu markup vi no giup
 *    AI Mode nhan dien thuc the, nhung dung ky vong ngoi sao tren SERP
 */

import { SITE_URL } from './moi-truong';

const GOC = SITE_URL;

export function tuyetDoi(duongDan: string): string {
  if (duongDan.startsWith('http')) return duongDan;
  return new URL(duongDan, GOC).toString();
}

type DiaDiem = {
  id: string;
  ten: string;
  vaiTro: string;
  diaChi: string;
  phuong?: string;
  quanHuyen: string;
  tinhThanh: string;
  dienThoai?: string;
  hotline?: string;
  lienQuanDenDinh: boolean;
};

type CongTy = {
  tenPhapDinh: string;
  tenThuongHieu: string;
  maSoThue: string;
  namThanhLap: number;
  websiteMe: string;
  hotline: string;
  hotlineTel: string;
  email: string;
  diaDiem: DiaDiem[];
};

function diaChiSchema(d: DiaDiem) {
  return {
    '@type': 'PostalAddress',
    streetAddress: [d.diaChi, d.phuong].filter(Boolean).join(', '),
    addressLocality: d.quanHuyen,
    addressRegion: d.tinhThanh,
    addressCountry: 'VN',
  };
}

/**
 * Organization - dat tren MOI trang.
 * `foundingDate` va `taxID` la tin hieu thuc the that, dung de Google noi
 * website nay voi mot doanh nghiep co dang ky.
 */
export function schemaToChuc(ct: CongTy) {
  const tru = ct.diaDiem.find((d) => d.id === 'van-phong-chinh');
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${GOC}/#to-chuc`,
    name: ct.tenPhapDinh,
    alternateName: ct.tenThuongHieu,
    url: GOC,
    foundingDate: String(ct.namThanhLap),
    taxID: ct.maSoThue,
    vatID: ct.maSoThue,
    email: ct.email,
    telephone: ct.hotlineTel,
    ...(tru ? { address: diaChiSchema(tru) } : {}),
    // Website cong ty me - lien ket hai thuc the voi nhau
    sameAs: [ct.websiteMe],
  };
}

export function schemaWebSite(ct: CongTy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${GOC}/#website`,
    name: ct.tenThuongHieu,
    url: GOC,
    inLanguage: 'vi-VN',
    publisher: { '@id': `${GOC}/#to-chuc` },
  };
}

/**
 * LocalBusiness - CHI cho dia diem lien quan den dinh (nha may Long An va
 * van phong chinh Quan 5). Bon xuong can tole khong dua vao: chung khong ban dinh,
 * dua vao chi lam nhieu tin hieu dia phuong.
 *
 * KHONG khai `geo` va `openingHours` vi chua co toa do va gio mo cua that.
 * Thieu thi bo, khong bia.
 */
export function schemaDiaDiem(ct: CongTy, d: DiaDiem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${GOC}/#${d.id}`,
    name: `${ct.tenThuongHieu} - ${d.ten}`,
    description: d.vaiTro,
    url: GOC,
    telephone: d.hotline ?? d.dienThoai ?? ct.hotline,
    address: diaChiSchema(d),
    parentOrganization: { '@id': `${GOC}/#to-chuc` },
  };
}

export function schemaBreadcrumb(muc: { ten: string; duongDan: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: muc.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.ten,
      item: tuyetDoi(m.duongDan),
    })),
  };
}

type QuyCachSchema = {
  ma: string;
  daiMm: number;
  duongKinhMm?: number;
  slug: string;
  gia?: number;
  donViGia?: string;
};

/**
 * Product + Offer cho mot trang quy cach.
 *
 * Chi sinh `offers` khi CO gia that. Neu chua co gia thi bo han khoi schema -
 * khai Offer rong hoac gia 0 la sai du lieu, te hon la khong khai.
 *
 * `priceValidUntil` phai duoc gia han. Doi thu trungnamcons de het han tu
 * 2025-10-10 ma van con hien gia tren SERP - la hygiene, khong phai don bay,
 * nhung khong co ly do gi de ta cung be.
 */
export function schemaSanPham(opts: {
  tenDayDu: string;
  moTa: string;
  duongDan: string;
  thuongHieu: string;
  qc: QuyCachSchema;
  anh?: string[];
  hanGia?: string;
}) {
  const { tenDayDu, moTa, duongDan, thuongHieu, qc, anh, hanGia } = opts;

  const thuocTinh: Record<string, unknown>[] = [
    { '@type': 'PropertyValue', name: 'Chiều dài', value: `${qc.daiMm} mm`, unitCode: 'MMT' },
  ];
  if (qc.duongKinhMm !== undefined) {
    thuocTinh.push({
      '@type': 'PropertyValue',
      name: 'Đường kính thân',
      value: `${qc.duongKinhMm} mm`,
      unitCode: 'MMT',
    });
  }
  thuocTinh.push({ '@type': 'PropertyValue', name: 'Mã quy cách', value: qc.ma });

  const coGia = qc.gia !== undefined && qc.donViGia !== undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tenDayDu,
    description: moTa,
    url: tuyetDoi(duongDan),
    sku: qc.slug,
    mpn: qc.ma,
    brand: { '@type': 'Brand', name: thuongHieu },
    manufacturer: { '@id': `${GOC}/#to-chuc` },
    ...(anh && anh.length ? { image: anh.map(tuyetDoi) } : {}),
    additionalProperty: thuocTinh,
    ...(coGia
      ? {
          offers: {
            '@type': 'Offer',
            price: qc.gia,
            priceCurrency: 'VND',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            url: tuyetDoi(duongDan),
            ...(hanGia ? { priceValidUntil: hanGia } : {}),
            seller: { '@id': `${GOC}/#to-chuc` },
          },
        }
      : {}),
  };
}

/**
 * ProductGroup cho trang nhom - type nay dang ACTIVE theo skill seo-schema.
 * Dung de noi voi Google rang 10 trang quy cach la BIEN THE cua cung mot san pham,
 * chu khong phai 10 san pham trung lap. Day la cach chong cannibalization o cap schema.
 */
export function schemaNhomSanPham(opts: {
  ten: string;
  moTa: string;
  duongDan: string;
  thuongHieu: string;
  bienThe: { ten: string; duongDan: string; qc: QuyCachSchema }[];
}) {
  const { ten, moTa, duongDan, thuongHieu, bienThe } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: ten,
    description: moTa,
    url: tuyetDoi(duongDan),
    brand: { '@type': 'Brand', name: thuongHieu },
    manufacturer: { '@id': `${GOC}/#to-chuc` },
    productGroupID: duongDan.replace(/\//g, ''),
    variesBy: ['https://schema.org/size'],
    hasVariant: bienThe.map((v) => ({
      '@type': 'Product',
      name: v.ten,
      url: tuyetDoi(v.duongDan),
      sku: v.qc.slug,
      mpn: v.qc.ma,
      ...(v.qc.gia !== undefined && v.qc.donViGia !== undefined
        ? {
            offers: {
              '@type': 'Offer',
              price: v.qc.gia,
              priceCurrency: 'VND',
              availability: 'https://schema.org/InStock',
              url: tuyetDoi(v.duongDan),
            },
          }
        : {}),
    })),
  };
}
