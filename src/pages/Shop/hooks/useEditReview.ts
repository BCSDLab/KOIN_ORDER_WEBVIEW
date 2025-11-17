import { useMutation } from '@tanstack/react-query';
import type { CreateReviewRequest } from '@/api/shop/entity';
import { updateShopReview } from '@/api/shop';

export function useEditReview(shopId: number, reviewId: number) {
  return useMutation({
    mutationFn: (body: CreateReviewRequest) => updateShopReview(shopId, reviewId, body),
  });
}
