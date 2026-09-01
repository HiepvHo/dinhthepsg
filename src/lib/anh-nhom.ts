import anhRaMay from '../assets/anh/dinh-ra-khoi-may.jpg';
import anhSoiThep from '../assets/anh/cuon-soi-thep-nguyen-lieu.jpg';
import anhKho from '../assets/anh/kho-bao-dinh.jpg';
import anhNenTrang1 from '../assets/anh/dinh-tren-nen-trang-01.jpg';
import anhNenTrang2 from '../assets/anh/dinh-tren-nen-trang-02.jpg';
import anhCan from '../assets/anh/can-dinh-tai-xuong.jpg';

/**
 * Anh dai dien cho tung nhom san pham - MOT NGUON DUY NHAT.
 *
 * Truoc day bang nay nam trong index.astro, nen trang chu, trang /san-pham/ va
 * trang nhom co the hien ba anh khac nhau cho cung mot san pham.
 *
 * CANH BAO - DAY LA ANH TAM.
 * Trong 9 anh nha may hien co, KHONG anh nao chup rieng tung loai dinh tren nen
 * sach. Cac anh duoi day chi la anh gan dung nhat trong so da co:
 *   - dinh-chi, dinh-thep-trang: anh dinh tren nen trang, nhung chua xac nhan
 *     do la loai nao
 *   - dinh-thep-vang, dinh-du, dinh-vit: dung tam anh canh xuong, KHONG dung loai
 *   - day-kem-hap: cuon soi thep nguyen lieu, gan dung nhat trong so da co
 *
 * Khi nhan duoc anh chup that theo tung loai (xem TU-LIEU-CAN.md), thay o day la
 * ca ba noi tu cap nhat.
 */
export interface AnhNhom {
  src: ImageMetadata;
  alt: string;
  /** true = anh dung loai; false = anh tam, chua chup rieng loai nay */
  dungLoai: boolean;
}

export const ANH_NHOM: Record<string, AnhNhom> = {
  'dinh-chi': {
    src: anhNenTrang1,
    alt: 'Đinh chì thân trơn do nhà máy Đinh Thép Sài Gòn sản xuất',
    dungLoai: false,
  },
  'dinh-thep-trang': {
    src: anhNenTrang2,
    alt: 'Đinh thép trắng thân trơn, bề mặt sáng',
    dungLoai: false,
  },
  'dinh-thep-vang': {
    src: anhRaMay,
    alt: 'Đinh thép vừa ra khỏi máy dập tại xưởng Đinh Thép Sài Gòn',
    dungLoai: false,
  },
  'dinh-du': {
    src: anhCan,
    alt: 'Đinh thành phẩm được cân tại xưởng Đinh Thép Sài Gòn',
    dungLoai: false,
  },
  'dinh-vit': {
    src: anhKho,
    alt: 'Bao đinh thành phẩm xếp trong kho nhà máy Đinh Thép Sài Gòn',
    dungLoai: false,
  },
  'day-kem-hap': {
    src: anhSoiThep,
    alt: 'Cuộn sợi thép nguyên liệu tại nhà máy Đinh Thép Sài Gòn',
    dungLoai: false,
  },
};

const MAC_DINH: AnhNhom = {
  src: anhNenTrang1,
  alt: 'Đinh thép do nhà máy Đinh Thép Sài Gòn sản xuất',
  dungLoai: false,
};

export function anhCuaNhom(id: string): AnhNhom {
  return ANH_NHOM[id] ?? MAC_DINH;
}
