import anhRaMay from '../assets/anh/dinh-ra-khoi-may.jpg';
import anhSoiThep from '../assets/anh/cuon-soi-thep-nguyen-lieu.jpg';
import anhKho from '../assets/anh/kho-bao-dinh.jpg';
import anhNenTrang1 from '../assets/anh/dinh-tren-nen-trang-01.jpg';
import anhNenTrang2 from '../assets/anh/dinh-tren-nen-trang-02.jpg';
import anhCan from '../assets/anh/can-dinh-tai-xuong.jpg';
import anhDongBao from '../assets/anh/dong-bao-dinh-sai-gon.jpg';
import anhDayChuyen from '../assets/anh/day-chuyen-dap-dinh.jpg';

/**
 * ANH BIA cho tung bai viet - MOT NGUON DUY NHAT.
 *
 * Vi sao dat o day chu khong o frontmatter: truong `anhBia` trong schema la
 * chuoi, ma anh muon duoc Astro toi uu (sinh WebP, sinh srcset) thi phai la
 * `import`. Dat trong file TS nay thi vua co import that vua chi sua mot cho -
 * cung cach da lam voi `anh-nhom.ts`.
 *
 * CANH BAO - PHAN LON LA ANH TAM.
 * Trong 9 anh nha may hien co, khong tam nao chup rieng cho mot bai viet nao.
 * Cot `khop` duoi day ghi that tung truong hop:
 *
 *   khop = true  : anh THAT SU minh hoa dung noi dung bai
 *   khop = false : chi la anh nha may gan chu de nhat trong so da co
 *
 * Khi co anh chup rieng cho tung bai thi thay o day, ca trang chu va trang
 * /kien-thuc/ tu cap nhat.
 */
export interface AnhBai {
  src: ImageMetadata;
  alt: string;
  /** true = anh minh hoa dung noi dung bai; false = anh tam */
  khop: boolean;
}

const BANG: Record<string, AnhBai> = {
  /* KHOP: bai noi ve ma F in tren bao, va day dung la anh bao dinh co nhan */
  'ky-hieu-f-tren-bao-dinh': {
    src: anhDongBao,
    alt: 'Bao đinh Đinh Thép Sài Gòn in mã quy cách theo phân trên nhãn',
    khop: true,
  },

  /* KHOP: bai ve quy doi don vi do, anh can dinh la thao tac do luong */
  '1-phan-bang-bao-nhieu-cm': {
    src: anhCan,
    alt: 'Cân đinh tại xưởng để kiểm khối lượng theo quy cách',
    khop: true,
  },

  /* Anh tam: dinh tren nen trang cho thay ro than va mui, nhung bai nay noi ve
     phan loai nen can anh dat canh nhau nhieu loai */
  'cac-loai-dinh-trong-xay-dung': {
    src: anhNenTrang1,
    alt: 'Đinh thép do nhà máy Đinh Thép Sài Gòn sản xuất',
    khop: false,
  },

  /* Anh tam: bai ve chon chieu dai theo do day van, can anh dinh dong vao van */
  'chon-chieu-dai-dinh-theo-do-day-van': {
    src: anhNenTrang2,
    alt: 'Đinh thép thân trơn nhiều chiều dài khác nhau',
    khop: false,
  },

  /* Anh tam: bai doi chieu hai loai, can anh hai loai dat canh nhau */
  'dinh-chi-va-dinh-thep-trang-khac-nhau': {
    src: anhRaMay,
    alt: 'Đinh thép vừa ra khỏi máy dập tại xưởng',
    khop: false,
  },

  /* Anh tam: bai ve dong cop pha, can anh dinh dong tren cop pha that */
  'dinh-dong-cop-pha-chon-loai-nao': {
    src: anhKho,
    alt: 'Bao đinh thành phẩm xếp trong kho nhà máy',
    khop: false,
  },

  /* Anh tam: bai ve dinh du va dinh vit lop ton, can anh hai loai do */
  'dinh-du-va-dinh-vit-lop-ton': {
    src: anhDayChuyen,
    alt: 'Dây chuyền máy dập đinh tại nhà máy',
    khop: false,
  },
};

/** Anh du phong cho bai chua co trong bang - khong bao gio de trong o anh */
const DU_PHONG: AnhBai = {
  src: anhSoiThep,
  alt: 'Cuộn sợi thép nguyên liệu tại xưởng Đinh Thép Sài Gòn',
  khop: false,
};

export function anhCuaBai(id: string): AnhBai {
  return BANG[id] ?? DU_PHONG;
}

/**
 * NHAN CHUYEN MUC lay tu truong `cum` trong frontmatter.
 *
 * `cum` la ma trong topical map (A-dinh-danh, B-quy-cach...) - dung de quan ly
 * noi dung, khong phai de nguoi doc nhin. Bang nay doi sang chu doc duoc.
 * Nho vay nhan chuyen muc KHONG phai go tay cho tung bai: them bai moi voi
 * `cum` da co la nhan tu ra.
 */
const NHAN_CUM: Record<string, string> = {
  'A-dinh-danh': 'Định danh',
  'B-quy-cach': 'Quy cách',
  'C-khoi-luong': 'Khối lượng',
  'D-vat-lieu': 'Vật liệu',
  'E-ung-dung': 'Ứng dụng',
  'F-chon-dung': 'Chọn đúng',
  'G-san-xuat': 'Sản xuất',
  'H-so-sanh': 'So sánh',
};

export function nhanCum(cum: string): string {
  return NHAN_CUM[cum] ?? 'Kiến thức';
}

/** Ngay dang dang dd/mm/yyyy - dung chung cho moi noi hien bai viet */
export function ngayVn(d: Date): string {
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
