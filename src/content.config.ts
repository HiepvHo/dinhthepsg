import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { readFile } from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';

/**
 * Content collections.
 *
 * Du lieu nam o YAML/Markdown chu KHONG hardcode trong file .astro, de sau nay
 * cam CMS (Sveltia/Decap - chay tinh, khong can server) vao sua duoc ma khong
 * phai viet lai gi.
 *
 * Zod schema o day khong chi de co type. No la HANG RAO CHAT LUONG: neu ai do
 * sua YAML sai kieu hoac thieu truong bat buoc thi BUILD SE HONG, phat hien ngay
 * luc build thay vi de trang loi len production.
 */

async function docYaml<T>(duongDan: string): Promise<T> {
  return parseYaml(await readFile(duongDan, 'utf-8')) as T;
}

/* --------------------------------------------------------------- cong ty ---- */

const diaDiemSchema = z.object({
  id: z.string(),
  ten: z.string(),
  vaiTro: z.string(),
  diaChi: z.string(),
  phuong: z.string().optional(),
  quanHuyen: z.string(),
  tinhThanh: z.string(),
  dienThoai: z.string().optional(),
  fax: z.string().optional(),
  hotline: z.string().optional(),
  /** Chi dia diem lienQuanDenDinh moi duoc dua vao LocalBusiness schema */
  lienQuanDenDinh: z.boolean(),
  /**
   * Dia diem nay thuoc CONG TY ME chu khong phai Dinh Thep Sai Gon.
   * Van liet ke de the hien quy mo that cua nhom, nhung phai ghi ro chu
   * so huu - noi gop la noi sai, va khach goi nham vao xuong tole hoi mua
   * dinh la goi sai cho.
   */
  thuocCongTyMe: z.boolean().default(false),
});

const congTy = defineCollection({
  loader: async () => {
    const d = await docYaml<Record<string, unknown>>('src/content/du-lieu/cong-ty.yaml');
    return [{ id: 'cong-ty', ...d }];
  },
  schema: z.object({
    tenPhapDinh: z.string(),
    tenPhapDinhHoa: z.string(),
    tenThuongHieu: z.string(),
    tenNhaMay: z.string(),
    /**
     * MST va nam thanh lap CUA CHINH cong ty nay. CA HAI DEU OPTIONAL vi Dinh
     * Thep Sai Gon moi tach ra tu cong ty me va chua cung cap so rieng.
     *
     * VI SAO KHONG MUON TAM SO CUA CONG TY ME: do la thong tin phap ly SAI.
     * Khach B2B tra ma so thue truoc khi dat don lon; tra ra khong khop la mat
     * don. Va voi Google, hai to chuc dung chung mot taxID lam hong chinh cai
     * thuc the dang xay. Chua co thi de trong, khong bia.
     */
    maSoThue: z.string().optional(),
    namThanhLap: z.number().int().min(1900).max(2100).optional(),
    /**
     * CONG TY ME. Dinh Thep Sai Gon tach ra tu Thep Cuong Phat de tap trung
     * vao dinh (user xac nhan 06/09/2026); truoc do chinh cong ty me ban dinh.
     *
     * Khai o day chu khong tron vao cong ty nay de:
     *  1. Kinh nghiem tu 2012 VAN duoc noi ra, nhung noi DUNG chu the
     *  2. `parentOrganization` trong schema noi hai thuc the lai voi nhau -
     *     Google hieu quan he me-con, va uy tin cua me chay sang con
     *  3. MST 0312168657 gan dung ten cong ty so huu no
     */
    congTyMe: z.object({
      tenPhapDinh: z.string(),
      tenPhapDinhHoa: z.string(),
      maSoThue: z.string(),
      namThanhLap: z.number().int().min(1900).max(2100),
      website: z.string().url(),
    }),
    hotline: z.string(),
    hotlineTel: z.string(),
    /**
     * URL nhung ban do Google, lay tu Maps: Chia se -> Nhung ban do -> copy
     * gia tri `src` trong the iframe. Dang cua no la
     *   https://www.google.com/maps/embed?pb=...
     *
     * VI SAO CAN TRUONG NAY chu khong ghep tu dia chi: da do bon dang truy van
     * `?q=<dia chi>&output=embed` va KHONG dang nao ra ghim do lan o dia chi,
     * lai con roi sai quan (Phu Nhuan, Quan 3, vung trong). Chuoi `pb` cua
     * Maps chua place ID va toa do da giai san - do moi la thu ve ra ghim.
     * Chuoi do khong the tu sinh, phai lay tu giao dien Maps.
     *
     * Bo trong thi trang lien he tu quay ve dang `?q=<dia chi>` - hien dung
     * khu vuc nhung khong co ghim.
     */
    banDoNhung: z.string().url().optional(),
    /**
     * GIO LAM VIEC. Dung cho `openingHoursSpecification` trong LocalBusiness
     * schema va hien tren trang lien he.
     *
     * `ngay` dung ten tieng Anh vi do la gia tri schema.org doi (DayOfWeek).
     * Ten tieng Viet de hien thi duoc suy ra trong `lib/gio-lam-viec.ts` -
     * mot nguon su that, khong go hai lan.
     */
    gioLamViec: z
      .array(
        z.object({
          ngay: z.array(
            z.enum([
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ]),
          ),
          mo: z.string().regex(/^\d{2}:\d{2}$/),
          dong: z.string().regex(/^\d{2}:\d{2}$/),
        }),
      )
      .default([]),
    zalo: z.string(),
    email: z.string().email(),
    emailPhu: z.string().email(),
    thietBi: z.array(z.object({ ten: z.string(), loai: z.string(), xuatXu: z.string() })),
    /** Logo doi tac. `anh` la ten file trong src/assets/doi-tac/ */
    doiTac: z
      .array(z.object({ ten: z.string(), anh: z.string() }))
      .default([]),
    diaDiem: z.array(diaDiemSchema).min(1),
  }),
});

/* --------------------------------------------------------- nhom san pham ---- */

const quyCachSchema = z.object({
  /** Ma tren catalogue, vi du "5F" */
  ma: z.string(),
  /** So phan (= cm). Khong co neu nhom khong theo he phan (vi du dinh vit 4x30) */
  phan: z.number().optional(),
  daiMm: z.number(),
  duongKinhMm: z.number().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug chi duoc chua chu thuong, so va dau gach ngang'),

  /**
   * So cay tren 1kg. PHAI CAN VA DEM THAT tai nha may.
   * TUYET DOI khong dien bang cong thuc pi*r^2*L*7.85 - cong thuc coi than dinh
   * la tru dac va bo qua khoi luong mu (mu chiem 8-12% o co nho), lech khoang 10%.
   */
  cayTrenKg: z.number().optional(),

  /** Gia - user cung cap sau. Bat buoc di kem donViGia neu co gia. */
  gia: z.number().optional(),
  donViGia: z.string().optional(),

  /** Dung sai, vi du "+/- 0.05mm" - chi ghi khi nha may xac nhan */
  dungSai: z.string().optional(),
}).refine((q) => (q.gia === undefined) === (q.donViGia === undefined), {
  message: 'Co gia thi phai co donViGia. Doi thu ghi "19.000d" ma khong ghi /kg hay /bao - do la lo hong ta khong duoc lap lai.',
});

const nhomSanPham = defineCollection({
  loader: async () => {
    const d = await docYaml<{ nhom: Array<Record<string, unknown>> }>(
      'src/content/du-lieu/nhom-san-pham.yaml',
    );
    return d.nhom.map((n) => ({ ...n, id: n.id as string }));
  },
  schema: z.object({
    ten: z.string(),
    tenNgan: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    /** Cac cach nguoi mua goi nhom nay - dung cho noi dung va internal linking */
    tenGoiKhac: z.array(z.string()).default([]),
    moTaNgan: z.string(),
    /** Co tach trang rieng cho tung quy cach khong. Lo 1 chi tach dinh chi. */
    tachTrangQuyCach: z.boolean(),
    /** Ghi chu can xac nhan voi nha may truoc khi publish */
    canXacNhan: z.string().optional(),
    quyCach: z.array(quyCachSchema).min(1),
  }),
});

/* -------------------------------------------------------------- bu long ----- */

const buLong = defineCollection({
  loader: async () => {
    const d = await docYaml<{ buLong: Array<Record<string, number | string>> }>(
      'src/content/du-lieu/nhom-san-pham.yaml',
    );
    return d.buLong.map((b) => ({ ...b, id: String(b.d) }));
  },
  schema: z.object({
    /** Duong kinh ren, vi du "M10" */
    d: z.string(),
    /** Buoc ren, mm */
    P: z.number(),
    /** Chieu cao dau, mm */
    k: z.number(),
    /** Kich thuoc chia khoa, mm */
    s: z.number(),
  }),
});

/* --------------------------------------------------------------- bai viet --- */

const baiViet = defineCollection({
  // Bo qua README va file bat dau bang _ (ban nhap) - chung khong phai bai viet
  loader: glob({ pattern: ['**/*.md', '!**/README.md', '!**/_*.md'], base: './src/content/bai-viet' }),
  schema: z.object({
    tieuDe: z.string(),
    moTa: z.string().min(50).max(165, 'Meta description dai qua 165 ky tu se bi cat tren SERP'),
    /** Cum thuoc tinh trong topical map: A dinh danh, B quy cach, C khoi luong... */
    cum: z.enum(['A-dinh-danh', 'B-quy-cach', 'C-khoi-luong', 'D-vat-lieu', 'E-ung-dung', 'F-chon-dung', 'G-san-xuat', 'H-so-sanh']),
    ngayDang: z.coerce.date(),
    ngayCapNhat: z.coerce.date().optional(),
    /**
     * Du kien ma trang nay mang lai - luat cua du an: moi trang phai co it nhat
     * MOT du kien ma ca 4 doi thu deu khong co. Bo trong = chua du dieu kien publish.
     */
    duKienDocQuyen: z.string().min(10),
    truyVanChinh: z.string(),
    nhomLienQuan: z.array(z.string()).default([]),
    anhBia: z.string().optional(),
    nhap: z.boolean().default(false),
  }),
});

/* -------------------------------------------------------------- cam nghi ---- */

/**
 * Cam nghi khach hang. Mac dinh RONG - trang chu tu an muc nay khi rong.
 * Khong dat min(1): du an chap nhan chua co cam nghi, KHONG chap nhan cam nghi bia.
 */
const camNghi = defineCollection({
  loader: async () => {
    const d = await docYaml<{ danhSach?: unknown[] }>('src/content/du-lieu/cam-nghi.yaml');
    return [{ id: 'cam-nghi', danhSach: d.danhSach ?? [] }];
  },
  schema: z.object({
    danhSach: z
      .array(
        z.object({
          ten: z.string(),
          vaiTro: z.string(),
          noiDung: z.string().min(20, 'Cam nghi qua ngan thi doc ra nhu chu bia'),
          diaDiem: z.string().optional(),
          sanPham: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { congTy, nhomSanPham, buLong, baiViet, camNghi };
