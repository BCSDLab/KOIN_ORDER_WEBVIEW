import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteShopReview } from '@/api/shop';

export function useDeleteReview(shopId: number, reviewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteShopReview(shopId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopMyReview', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shopTotalReview', shopId] });
    },
  });
}
