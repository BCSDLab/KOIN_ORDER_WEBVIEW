import { useMutation } from '@tanstack/react-query';
import type { CreateReviewRequest } from '@/api/shop/entity';
import { postShopReview } from '@/api/shop/index';

export default function useCreateReview(shopId: number) {
  return useMutation({
    mutationFn: (body: CreateReviewRequest) => postShopReview(shopId, body),
  });
}
