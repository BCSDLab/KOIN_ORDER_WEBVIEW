import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetCart } from '@/api/cart';
import { useTokenStore } from '@/stores/auth';

export default function useResetCart() {
  const queryClient = useQueryClient();
  const token = useTokenStore.getState().token;

  return useMutation({
    mutationFn: resetCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', token] });
    },
  });
}
