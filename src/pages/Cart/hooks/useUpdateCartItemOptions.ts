import { useMutation } from '@tanstack/react-query';
import { updateCartItemOptions } from '@/api/cart';
import { UpdateCartItemRequest } from '@/api/cart/entity';

export default function useUpdateCartItemOptions(cartItemId: number) {
  return useMutation({
    mutationKey: ['cartItemOptions', cartItemId],
    mutationFn: (option: UpdateCartItemRequest) => updateCartItemOptions(cartItemId, option),
  });
}
