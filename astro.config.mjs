// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { laySiteUrl } from './site-url.mjs';

// Site tinh hoan toan (SSG). Deploy: build ra thu muc dist/ roi day len VPS,
// nginx phuc vu file tinh. Khong co Node chay thuong truc tren server.
// Site URL va quyet dinh cho index deu doc tu site-url.mjs - NGUON SU THAT DUY NHAT,
// dung chung voi src/lib/moi-truong.ts de canonical, sitemap va robots.txt khong lech nhau.
const SITE_URL = laySiteUrl();

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  output: 'static',

  build: {
    // moi trang thanh mot thu muc co index.html -> URL ket thuc bang /
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  image: {
    // Anh nha may la JPEG 1280x960 tu dien thoai. Astro sinh WebP responsive.
    responsiveStyles: true,
  },

  integrations: [
    sitemap({
      // Trang tien uu tien cao hon bai viet
      serialize(item) {
        const url = item.url;
        if (url === SITE_URL + '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (url.includes('/bang-gia')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (url.includes('/san-pham/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],

  // Khong dung prefetch: site nho, moi trang chi vai chuc KB,
  // them prefetch la them JS ma khong duoc gi.
  prefetch: false,
});
