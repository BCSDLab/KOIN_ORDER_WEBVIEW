import { useMemo } from 'react';
import type { ReviewCardProps } from '../components/ReviewCard';
import type { SortType } from '../components/SortModal';

function compareReviews(sort: SortType, a: ReviewCardProps, b: ReviewCardProps): number {
  switch (sort) {
    case 'LATEST':
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    case 'OLDEST':
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    case 'RATING_DESC':
      return (b.rating ?? 0) - (a.rating ?? 0);
    case 'RATING_ASC':
      return (a.rating ?? 0) - (b.rating ?? 0);
    default:
      return 0;
  }
}

export function useSortedReviews(reviews: ReviewCardProps[] = [], sort: SortType = 'LATEST', showMineOnly = false) {
  return useMemo(() => {
    const filtered = showMineOnly ? reviews.filter((r) => r.is_mine) : reviews;
    return [...filtered].sort((a, b) => compareReviews(sort, a, b));
  }, [reviews, sort, showMineOnly]);
}
