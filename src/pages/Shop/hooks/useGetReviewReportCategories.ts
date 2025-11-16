import { useSuspenseQuery } from '@tanstack/react-query';
import type { ReviewReportCategoriesResponse } from '@/api/shop/entity';
import { getReviewReportCategories } from '@/api/shop';

export const useGetReviewReportCategories = () => {
  const { data } = useSuspenseQuery<ReviewReportCategoriesResponse>({
    queryKey: ['reviewReportCategories'],
    queryFn: getReviewReportCategories,
  });

  return { data };
};
