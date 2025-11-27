import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportReview } from '@/api/shop';
import { ReportReviewRequest } from '@/api/shop/entity';

export default function useReportReview(shopId: number, reviewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reportReview', reviewId],
    mutationFn: (body: ReportReviewRequest) => reportReview(shopId, reviewId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopMyReview', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shopTotalReview', shopId] });
    },
  });
}
