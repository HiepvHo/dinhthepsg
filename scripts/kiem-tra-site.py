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

# Console Windows mac dinh la cp1252, khong in duoc dau tieng Viet: script
# NEM LOI ngay khi in thong bao loi dau tien, nen chinh thong bao bi mat.
# CI chay Ubuntu UTF-8 nen khong lo ra o do. Ep UTF-8 cho ca hai may.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

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


# Nhung cum chi dung de ta tu ghi no voi chinh minh. Chung DA TUNG lot ra site
# that: bon ghi chu kieu "CAN XAC NHAN GAP: dinh du ghi 3F = 33mm... Anh huong
# ca URL lan noi dung" nam tren trang bang gia va bon trang nhom. Khach doc
# duoc nha san xuat tu noi khong chac catalogue cua minh co loi in hay khong.
# Hong nhu the khong co cong cu SEO nao bao, chi co nguoi doc moi thay - nen
# chan o day.
GHI_CHU_NOI_BO = [
    'Dang doi chieu',
    'Đang đối chiếu',
    'CAN XAC NHAN',
    'CẦN XÁC NHẬN',
    'can xac nhan voi nha may',
    'TODO',
    'CAN USER CUNG CAP',
    'loi in catalogue',
    'lỗi in catalogue',
]


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


# ------------------------------------------------ bang quy cach vs du lieu --
# VI SAO: bang quy cach duoc GO LAI BANG TAY trong 5 bai viet. Ngay 16/09/2026
# doi duong kinh 4 ma theo bao bi va bo ma 15F trong YAML - va 5 bai do van ghi
# so cu, ke ca nhung cau TINH RA tu so cu ("day hon 0.7 mm"). Trang san pham noi
# 5F than 2.7mm, bai viet noi 2.8mm: hai trang cua cung mot nha may cai nhau.
#
# CACH KIEM: moi dong <tr> tren site co mot o DUNG BANG ma quy cach (5F, 2.5F,
# 1F6...) va co so thap phan kem "mm" thi so do phai la duong kinh THAT cua ma
# do trong nhom-san-pham.yaml. Chi xet so thap phan vi chieu dai viet so nguyen
# (50 mm) - va bang dinh du co cot "30 mm (sai 3mm)" co y ghi so sai de so sanh.
#
# Mot ma co the thuoc nhieu nhom (2F dinh chi 1.6mm, 2F thep trang 3.5mm) nen
# so sanh voi TAP gia tri cua ma do tren moi nhom.
YAML_NHOM = 'src/content/du-lieu/nhom-san-pham.yaml'


def doc_duong_kinh():
    """Doc tu dong `- { ma: 5F, ..., duongKinhMm: 2.7, ... }`. Khong dung PyYAML
    vi may CI khong cai san - va file nay viet mot kieu co dinh."""
    bang = defaultdict(set)
    so_dong = 0
    for dong in io.open(YAML_NHOM, encoding='utf-8'):
        m = re.match(r'\s*-\s*\{(.*)\}\s*$', dong)
        if not m:
            continue
        truong = dict(
            (k.strip(), v.strip()) for k, v in
            (cap.split(':', 1) for cap in m.group(1).split(',') if ':' in cap)
        )
        if 'ma' in truong:
            so_dong += 1
            bang[truong['ma']]  # ma khong co duong kinh van la ma CO THAT
            if 'duongKinhMm' in truong:
                bang[truong['ma']].add(float(truong['duongKinhMm']))
    return bang, so_dong


def kiem_bang_quy_cach(trang, loi):
    dk, so_dong = doc_duong_kinh()
    # Hong o day ro hon im lang: doi cach viet YAML ma regex khong doc duoc thi
    # hang rao nay thanh vo dung ma khong ai biet. Dem DONG quy cach (24), khong
    # dem ma: nhieu nhom dung chung ma (2F, 3F...) nen so ma khac nhau chi 17.
    if so_dong < 20:
        loi.append('Doc duoc %d dong quy cach tu %s - it bat thuong, kiem lai regex' % (so_dong, YAML_NHOM))
        return
    for d, h in sorted(trang.items()):
        for hang in re.findall(r'<tr[\s>].*?</tr>', h, re.S):
            o = [re.sub(r'\s+', ' ', bo_the(x)).strip()
                 for x in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', hang, re.S)]
            ma = [x for x in o if re.fullmatch(r'\d+(?:\.\d+)?F\d*', x)]
            so = [float(x) for c in o for x in re.findall(r'(\d+\.\d+)\s*mm', c)]
            if len(ma) != 1 or not so:
                continue
            ma = ma[0]
            if ma not in dk:
                loi.append('%s: bang ghi ma %s - ma nay KHONG co trong %s' % (d, ma, YAML_NHOM))
                continue
            for x in so:
                if x not in dk[ma]:
                    loi.append('%s: ma %s ghi %.1f mm, du lieu la %s' % (
                        d, ma, x, ' / '.join('%.1f' % v for v in sorted(dk[ma]))))


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

        # --- ghi chu noi bo lot ra trang cong khai ---
        for cum in GHI_CHU_NOI_BO:
            if cum.lower() in sach.lower():
                loi.append('%s: GHI CHU NOI BO lot ra trang -> "%s"' % (d, cum))

        # --- title qua dai hoac bi tu cat ---
        # Site tung tu cat title o ky tu 57 kem '...' tren 6 bai viet ma khong
        # ai thay. Them nhom co trang quy cach rieng (dinh thep trang 2p...) la
        # title vuot 60 va bi cat lai y het - chan o day.
        mt = re.search(r'<title>(.*?)</title>', h, re.S)
        if mt:
            tt = mt.group(1).strip()
            if len(tt) > 60:
                loi.append('%s: title dai %d ky tu (> 60)' % (d, len(tt)))
            if tt.endswith('...'):
                loi.append('%s: title bi cat ngang: %s' % (d, tt))

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

    kiem_bang_quy_cach(trang, loi)

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
