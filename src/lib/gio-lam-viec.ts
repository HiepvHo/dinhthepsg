/**
 * GIO LAM VIEC - doi tu du lieu sang chu tieng Viet doc duoc.
 *
 * Mot nguon su that: `gioLamViec` trong cong-ty.yaml dung ten ngay TIENG ANH vi
 * do la gia tri schema.org doi (DayOfWeek). Cho nguoi doc thi doi sang tieng
 * Viet o day, khong go song song hai ban - go hai ban thi som muon lech nhau.
 */
export type Khung = {
  ngay: readonly string[];
  mo: string;
  dong: string;
};

const TEN_VN: Record<string, string> = {
  Monday: 'Thứ 2',
  Tuesday: 'Thứ 3',
  Wednesday: 'Thứ 4',
  Thursday: 'Thứ 5',
  Friday: 'Thứ 6',
  Saturday: 'Thứ 7',
  Sunday: 'Chủ nhật',
};

const THU_TU = Object.keys(TEN_VN);

/** "08:00" -> "8:00". Bo so 0 dau cho gon, gio Viet Nam khong viet 08:00. */
function gio(s: string): string {
  return s.replace(/^0/, '');
}

/**
 * Gom day ngay LIEN TIEP thanh khoang: [T2,T3,T4,T5,T6] -> "Thứ 2 - Thứ 6".
 * Ngay le hoac hai ngay canh nhau thi liet ke bang dau phay - "Thứ 2 - Thứ 3"
 * doc ra nhu mot khoang dai trong khi no chi co hai ngay.
 */
function gomNgay(ngay: readonly string[]): string {
  const sap = [...ngay].sort((a, b) => THU_TU.indexOf(a) - THU_TU.indexOf(b));
  const doan: string[][] = [];
  for (const n of sap) {
    const cuoi = doan[doan.length - 1];
    if (cuoi && THU_TU.indexOf(n) === THU_TU.indexOf(cuoi[cuoi.length - 1]) + 1) cuoi.push(n);
    else doan.push([n]);
  }
  return doan
    .map((d) => (d.length > 2 ? `${TEN_VN[d[0]]} - ${TEN_VN[d[d.length - 1]]}` : d.map((x) => TEN_VN[x]).join(', ')))
    .join(', ');
}

/** Mot dong cho moi khung: "Thứ 2 - Thứ 6: 8:00 - 17:00" */
export function dongGio(k: Khung): string {
  return `${gomNgay(k.ngay)}: ${gio(k.mo)} - ${gio(k.dong)}`;
}

/** Ca lich tren mot dong, dung cho meta description va footer */
export function gioMotDong(ds: readonly Khung[]): string {
  return ds.map(dongGio).join(' · ');
}

/**
 * `openingHoursSpecification` cua schema.org.
 * Gio phai dang HH:MM 24h - dung `mo`/`dong` nguyen van, khong qua `gio()`.
 */
export function schemaGio(ds: readonly Khung[]) {
  return ds.map((k) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: k.ngay.map((n) => `https://schema.org/${n}`),
    opens: k.mo,
    closes: k.dong,
  }));
}
