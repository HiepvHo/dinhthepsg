/**
 * Xac dinh site dang chay o dau, va co CHO PHEP Google index hay khong.
 *
 * VAN DE THAT: domain dinhthepsaigon.com chua mua, nen ban deploy dau tien chay tren
 * *.vercel.app. Neu de Google index ban do:
 *  - canonical tro ve mot domain chua ton tai -> tin hieu hong
 *  - khi mua domain that, ban vercel.app da duoc index se canh tranh voi domain
 *    that o dung nhung truy van minh nham toi (duplicate, tu canh tranh)
 *  - go mot URL da index ra khoi Google mat hang tuan
 *
 * MAC DINH LA KHONG CHO INDEX. Chi mo khi bien SITE_URL duoc dat TUONG MINH
 * va bang domain that.
 *
 * Vi sao doi hoi tuong minh chu khong suy ra: sai theo huong "lo cho index" rat kho
 * sua (phai cho Google go URL). Sai theo huong "lo noindex" thi sua trong 2 phut
 * (dat bien roi deploy lai). Mac dinh phai nga ve phia de sua.
 *
 * KHI MUA DOMAIN XONG: vao Vercel dat bien moi truong
 *   SITE_URL = https://dinhthepsaigon.com
 * roi deploy lai. Site tu mo index, khong phai sua code.
 *
 * Logic that nam o `site-url.mjs` o goc project - dung chung voi astro.config.mjs
 * de canonical, sitemap va robots.txt khong bao gio lech nhau.
 */
import { laySiteUrl, choIndex, DOMAIN_THAT } from '../../site-url.mjs';

export const SITE_URL: string = laySiteUrl();
export const CHO_INDEX: boolean = choIndex();
export { DOMAIN_THAT };
