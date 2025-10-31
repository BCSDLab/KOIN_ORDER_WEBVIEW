const SHOP_CATEGORIES = [
  { id: 1, name: '전체보기' },
  { id: 2, name: '치킨' },
  { id: 3, name: '피자/버거' },
  { id: 7, name: '고깃집' },
  { id: 4, name: '도시락/분식' },
  { id: 9, name: '주점' },
  { id: 8, name: '한식' },
  { id: 6, name: '중국집' },
  { id: 5, name: '족발' },
  { id: 10, name: '카페' },
  { id: 11, name: '콜밴' },
  { id: 12, name: '기타' },
] as const;

export function getCategoryNameById(id?: number | null): string {
  if (!id) return '전체보기';
  return SHOP_CATEGORIES.find((c) => c.id === id)?.name ?? '전체보기';
}
