import type { APIRoute } from 'astro';
import { SITE_URL, CHO_INDEX } from '../lib/moi-truong';

/**
 * robots.txt sinh dong theo moi truong.
 *
 * Khi CHUA o domain that (dang chay tren *.vercel.app hoac preview):
 *   chan toan bo crawler. Ly do: neu de Google index ban vercel.app, sau nay
 *   mua domain that thi hai ban tu canh tranh nhau o dung nhung truy van minh
 *   nham toi, va go URL da index ra khoi Google mat hang tuan.
 *
 * Khi DA o domain that:
 *   mo cho tat ca, KE CA AI crawler. Chien luoc GEO cua site nay la MUON duoc
 *   AI trich dan cho cac truy van nhu "1 phan bang bao nhieu cm" - hien AI Overview
 *   dang tra loi mau thuan vi khong co nguon chuan. La nha san xuat, ta co quyen
 *   la nguon chuan do. Chan crawler la tu bo co hoi.
 *
 * Luu y ky thuat: chan Google-Extended chi ngan Gemini dung de train, KHONG anh
 * huong Google Search hay AI Overviews (hai cai do dung Googlebot).
 */
export const GET: APIRoute = () => {
  const noiDung = CHO_INDEX
    ? `# ${SITE_URL}
# Cho phep toan bo crawler, ke ca AI crawler - xem ghi chu trong src/pages/robots.txt.ts

User-agent: *
Allow: /

Disallow: /_astro/
Disallow: /*?*fbclid=
Disallow: /*?*utm_

Sitemap: ${SITE_URL}/sitemap-index.xml
`
    : `# ${SITE_URL}
# BAN CHUA CHINH THUC - chan toan bo crawler.
# Day KHONG phai domain that (dinhthepsaigon.com). Cho index ban nay se tao duplicate
# canh tranh voi domain that sau khi mua.
#
# De mo index: mua domain, tro ve Vercel, dat bien moi truong
#   SITE_URL=https://dinhthepsaigon.com
# roi deploy lai. File nay tu doi sang cho phep, khong phai sua code.

User-agent: *
Disallow: /
`;

  return new Response(noiDung, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
