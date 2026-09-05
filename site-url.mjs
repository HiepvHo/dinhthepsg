/**
 * NGUON SU THAT DUY NHAT ve site URL.
 *
 * Ca `astro.config.mjs` (de dat `site:` cho canonical + sitemap) va
 * `src/lib/moi-truong.ts` (de quyet dinh co cho index khong) deu doc tu day.
 *
 * Truoc day hai cho tu tinh rieng theo hai chuoi uu tien khac nhau -> khi chi co
 * VERCEL_URL thi canonical ra domain that con robots.txt ra URL vercel.
 * Hai nguon su that = som muon cung lech.
 *
 * File .mjs de astro.config (chay truoc khi Vite xu ly src) import duoc.
 */

/* DOMAIN CHINH THUC, user chot 05/09/2026.
   Truoc do la dinhthepsg.com; doi sang dinhthepsaigon.com vi day la ten in
   tren BROCHURE GIAY dang phat cho khach - khach go lai dung cai ho cam trong
   tay. dinhthepsg.com neu co mua thi de 301 ve day, khong chay song song.
   Doi mot dong o day la du: `astro.config.mjs` (canonical + sitemap) va
   `src/lib/moi-truong.ts` (quyet dinh cho index) deu doc tu bien nay. */
export const DOMAIN_THAT = 'https://dinhthepsaigon.com';

function doc(ten) {
  if (typeof process === 'undefined' || !process.env) return undefined;
  const v = process.env[ten];
  return v && String(v).trim() ? String(v).trim() : undefined;
}

/** Bien SITE_URL co duoc dat TUONG MINH khong. Quyet dinh viec cho index. */
export function siteUrlDuocDatTuongMinh() {
  return doc('SITE_URL') !== undefined || doc('PUBLIC_SITE_URL') !== undefined;
}

export function laySiteUrl() {
  const tuDat = doc('SITE_URL') ?? doc('PUBLIC_SITE_URL');
  if (tuDat) return tuDat.replace(/\/$/, '');

  const prod = doc('VERCEL_PROJECT_PRODUCTION_URL');
  if (prod) return `https://${prod}`;

  const deploy = doc('VERCEL_URL');
  if (deploy) return `https://${deploy}`;

  return DOMAIN_THAT;
}

/**
 * Chi cho index khi SITE_URL duoc dat tuong minh VA bang domain that.
 * Mac dinh la KHONG cho index - xem ly do trong src/lib/moi-truong.ts.
 */
export function choIndex() {
  return siteUrlDuocDatTuongMinh() && laySiteUrl() === DOMAIN_THAT;
}
