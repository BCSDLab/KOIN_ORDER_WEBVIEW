// 2. useMutation 훅에서 객체를 넘기도록 설정
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItemQuantity } from '@/api/cart';

export default function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
