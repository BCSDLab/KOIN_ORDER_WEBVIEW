import { useMutation } from '@tanstack/react-query';
import { updateCartItemOptions } from '@/api/cart';
import { UpdateCartItemRequest } from '@/api/cart/entity';
import { useTokenStore } from '@/stores/auth';

export default function useUpdateCartItemOptions(cartItemId: number) {
  const token = useTokenStore.getState().token;
  return useMutation({
    mutationKey: ['cartItemOptions', cartItemId, token],
    mutationFn: (option: UpdateCartItemRequest) => updateCartItemOptions(cartItemId, option),
  });
}
