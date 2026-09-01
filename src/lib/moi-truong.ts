/**
 * Xac dinh site dang chay o dau, va co CHO PHEP Google index hay khong.
 *
 * VAN DE THAT: domain dinhthepsg.com chua mua, nen ban deploy dau tien chay tren
 * *.vercel.app. Neu de Google index ban do:
 *  - canonical tro ve dinhthepsg.com (chua ton tai) -> tin hieu hong
 *  - khi mua domain that, ban vercel.app da duoc index se canh tranh voi domain
 *    that o dung nhung truy van minh nham toi (duplicate content, tu canh tranh)
 *  - go mot URL da index ra khoi Google mat hang tuan
 *
 * Cach xu ly: CHI cho index khi chay dung tren DOMAIN_THAT. Moi noi khac
 * (vercel.app, preview, local) deu noindex + robots.txt chan het.
 *
 * Khi mua domain xong: dat bien moi truong SITE_URL=https://dinhthepsg.com
 * tren Vercel, deploy lai, site tu dong mo index. Khong phai sua code.
 */

const DOMAIN_THAT = 'https://dinhthepsg.com';

/**
 * PHAI dung `process.env`, KHONG dung `import.meta.env`.
 *
 * Vite chi expose qua `import.meta.env` nhung bien co tien to PUBLIC_ hoac duoc
 * khai bao tuong minh. Bien he thong cua Vercel (VERCEL_PROJECT_PRODUCTION_URL)
 * KHONG nam trong do -> doc bang import.meta.env se ra undefined, va logic chan
 * index se im lang khong chay. Day la SSG nen chi chay luc build, `process.env` an toan.
 */
function docEnv(ten: string): string | undefined {
  if (typeof process === 'undefined' || !process.env) return undefined;
  const v = process.env[ten];
  return v && v.trim() ? v.trim() : undefined;
}

function tinhSiteUrl(): string {
  // 1. Bien tu dat - dung cai nay khi domain that san sang
  const tuDat = docEnv('SITE_URL') ?? docEnv('PUBLIC_SITE_URL');
  if (tuDat) return tuDat.replace(/\/$/, '');

  // 2. Dang chay tren Vercel nhung chua tro domain that
  const vercelProd = docEnv('VERCEL_PROJECT_PRODUCTION_URL');
  if (vercelProd) return `https://${vercelProd}`;
  const vercelDeploy = docEnv('VERCEL_URL');
  if (vercelDeploy) return `https://${vercelDeploy}`;

  // 3. Build o may local
  return DOMAIN_THAT;
}

export const SITE_URL = tinhSiteUrl();

/** Chi cho index khi dang o dung domain that. */
export const CHO_INDEX = SITE_URL === DOMAIN_THAT;

export { DOMAIN_THAT };
