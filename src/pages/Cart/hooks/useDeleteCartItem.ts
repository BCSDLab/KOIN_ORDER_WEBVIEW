import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCartItem } from '@/api/cart';

export default function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartMenuItemId: number) => deleteCartItem(cartMenuItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
