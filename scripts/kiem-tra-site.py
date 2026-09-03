# -*- coding: utf-8 -*-
"""
Kiem tra toan bo site sau khi build. Chay: python scripts/kiem-tra-site.py

Doc thu muc dist/ va bat cac loi da tung mac trong du an nay:
  - the <img> mat alt (Astro BO thuoc tinh alt khi truyen chuoi rong)
  - ky tu ngoai ban phim (Astro tung tu doi nhay thang thanh nhay cong)
  - link noi bo gay
  - tieu de / mo ta trung nhau giua cac trang
  - nhieu hon mot H1 tren mot trang
  - script hoac CSS tai tu ten mien ngoai

Tra ve ma thoat 1 neu co bat ky loi nao - dung duoc trong CI.
"""
import io
import os
import re
import sys
from collections import defaultdict

DIST = 'dist'

# Ky tu ngoai ban phim. Dau tieng Viet KHONG nam trong danh sach nay - chi
# cac ky tu do cong cu tu thay the.
KY_TU_LA = {
    '—': 'em dash (dung -)',
    '–': 'en dash (dung -)',
    '‘': 'nhay don cong trai',
    '’': 'nhay don cong phai',
    '“': 'nhay kep cong trai',
    '”': 'nhay kep cong phai',
    '…': 'dau ba cham (dung ...)',
    '→': 'mui ten (dung ->)',
}


def cac_trang():
    for goc, _, fs in os.walk(DIST):
        for f in fs:
            if f.endswith('.html'):
                yield os.path.join(goc, f)


def duong_dan(tep):
    """dist/san-pham/index.html -> /san-pham/"""
    d = os.path.relpath(tep, DIST).replace(os.sep, '/')
    d = d[: -len('index.html')] if d.endswith('index.html') else d
    return '/' + d.lstrip('/')


def bo_the(h):
    """Bo <script> va <style> truoc khi quet ky tu la - JSON-LD khong tinh."""
    h = re.sub(r'<script[^>]*>.*?</script>', '', h, flags=re.S)
    return re.sub(r'<style[^>]*>.*?</style>', '', h, flags=re.S)


def main():
    if not os.path.isdir(DIST):
        print('Khong thay thu muc dist/. Chay `npm run build` truoc.')
        return 1

    trang = {}
    for t in cac_trang():
        trang[duong_dan(t)] = io.open(t, encoding='utf-8').read()

    loi = []
    tieu_de = defaultdict(list)
    mo_ta = defaultdict(list)
    so_anh = 0

    for d, h in sorted(trang.items()):
        # --- alt ---
        for the in re.findall(r'<img[^>]*>', h):
            so_anh += 1
            if 'alt=' not in the:
                loi.append('%s: the <img> mat alt -> %s' % (d, the[:90]))

        # --- ky tu ngoai ban phim ---
        sach = bo_the(h)
        for k, ten in KY_TU_LA.items():
            if k in sach:
                loi.append('%s: co %s (%d lan)' % (d, ten, sach.count(k)))

        # --- H1 ---
        n = len(re.findall(r'<h1[\s>]', h))
        if n != 1:
            loi.append('%s: co %d the H1, phai co dung 1' % (d, n))

        # --- tieu de va mo ta trung ---
        m = re.search(r'<title>(.*?)</title>', h, re.S)
        if m:
            tieu_de[m.group(1).strip()].append(d)
        m = re.search(r'<meta name="description" content="(.*?)"', h, re.S)
        if m:
            mo_ta[m.group(1).strip()].append(d)

        # --- tai tu ten mien ngoai ---
        for the in re.findall(r'<script[^>]+src="(https?://[^"]+)"', h):
            loi.append('%s: script tu ten mien ngoai -> %s' % (d, the))
        for the in re.findall(r'<link[^>]+rel="stylesheet"[^>]+href="(https?://[^"]+)"', h):
            loi.append('%s: CSS tu ten mien ngoai -> %s' % (d, the))

    for t, ds in tieu_de.items():
        if len(ds) > 1:
            loi.append('Tieu de trung tren %d trang: %s -> %s' % (len(ds), t[:50], ', '.join(ds)))
    for t, ds in mo_ta.items():
        if len(ds) > 1:
            loi.append('Mo ta trung tren %d trang: %s' % (len(ds), ', '.join(ds)))

    # --- link noi bo gay ---
    co = set(trang)
    tep_tinh = set()
    for goc, _, fs in os.walk(DIST):
        for f in fs:
            tep_tinh.add('/' + os.path.relpath(os.path.join(goc, f), DIST).replace(os.sep, '/'))

    so_link = 0
    for d, h in sorted(trang.items()):
        for href in re.findall(r'<a[^>]+href="([^"]+)"', h):
            if href.startswith(('http', 'mailto:', 'tel:', '#', 'javascript:')):
                continue
            so_link += 1
            dich = href.split('#')[0].split('?')[0]
            if dich and dich not in co and dich not in tep_tinh:
                loi.append('%s: link gay -> %s' % (d, href))

    print('So trang            : %d' % len(trang))
    print('So the <img>        : %d' % so_anh)
    print('So link noi bo      : %d' % so_link)
    print('Tieu de khac nhau   : %d' % len(tieu_de))
    print()

    if loi:
        print('CO %d LOI:' % len(loi))
        for x in loi[:40]:
            print('  - ' + x)
        if len(loi) > 40:
            print('  ... con %d loi nua' % (len(loi) - 40))
        return 1

    print('Khong co loi nao.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
