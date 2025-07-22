import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCart } from '@/api/cart';
import { AddCartRequest } from '@/api/cart/entity';

export default function useAddCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuInfo: AddCartRequest) => addCart(menuInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
