import type { SortType } from '@/pages/Shop/components/SortModal';

export function mapSortTypeToServer(sort: SortType) {
  switch (sort) {
    case 'LATEST':
      return 'LATEST';
    case 'OLDEST':
      return 'OLDEST';
    case 'RATING_DESC':
      return 'HIGHEST_RATING';
    case 'RATING_ASC':
      return 'LOWEST_RATING';
    default:
      return 'LATEST';
  }
}
