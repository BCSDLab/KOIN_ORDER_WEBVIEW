import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetCart } from '@/api/cart';

export default function useResetCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
