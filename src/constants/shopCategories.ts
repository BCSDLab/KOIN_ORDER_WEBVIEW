const SHOP_CATEGORIES = new Map<number, string>([
  [1, '전체보기'],
  [2, '치킨'],
  [3, '피자/버거'],
  [7, '고깃집'],
  [4, '도시락/분식'],
  [9, '주점'],
  [8, '한식'],
  [6, '중국집'],
  [5, '족발'],
  [10, '카페'],
  [11, '콜밴'],
  [12, '기타'],
]);

export function getCategoryNameById(id?: number | null): string {
  return id ? (SHOP_CATEGORIES.get(id) ?? '전체보기') : '전체보기';
}
