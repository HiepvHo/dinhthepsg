import { getCollection } from 'astro:content';

/**
 * Anh dai dien cho tung nhom san pham - MOT NGUON DUY NHAT.
 *
 * DU LIEU nam o `src/content/du-lieu/nhom-san-pham.yaml` (truong `anh`,
 * `anhAlt`, `anhDungLoai`), KHONG con nam trong file nay nua.
 *
 * VI SAO CHUYEN: bang anh cu la mot object hardcode trong .ts kem theo cac cau
 * `import`. CMS khong sua duoc file .ts - doi mot tam anh phai sua code va
 * deploy lai. De trong YAML thi nguoi quan tri noi dung tu doi duoc.
 *
 * Doi lai phai tra gia: ham nay thanh ASYNC. Do la gia dung, vi `image()` chi
 * bien doi duong dan khi entry co `filePath`, ma muon co filePath thi loader
 * phai la dang object - xem ghi chu trong `content.config.ts`.
 *
 * `image()` con lam hang rao: go sai ten tep thi BUILD HONG ngay voi
 * `ImageNotFound`, thay vi den luc mo trang moi thay o anh vo.
 */
export interface AnhNhom {
  src: ImageMetadata;
  alt: string;
  /** true = anh dung loai; false = anh tam, chua chup rieng loai nay */
  dungLoai: boolean;
}

export async function anhCuaNhom(id: string): Promise<AnhNhom> {
  const n = (await getCollection('nhomSanPham')).find((x) => x.id === id);
  if (!n) throw new Error(`Khong co nhom san pham id "${id}" trong nhom-san-pham.yaml`);
  return { src: n.data.anh, alt: n.data.anhAlt, dungLoai: n.data.anhDungLoai };
}
