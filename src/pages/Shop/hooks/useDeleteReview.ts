import { useMutation } from '@tanstack/react-query';
import { deleteShopReview } from '@/api/shop';

export function DeleteReview(shopId: number, reviewId: number) {
  return useMutation({
    mutationFn: () => deleteShopReview(shopId, reviewId),
  });
}
