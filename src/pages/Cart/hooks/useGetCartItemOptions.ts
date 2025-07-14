import { useQuery } from '@tanstack/react-query';
import { getCartItemOptions } from '@/api/cart';
import { useTokenStore } from '@/stores/auth';

export default function useGetCartItemOptions(cartItemId: number, enabled: boolean) {
  const token = useTokenStore.getState().token;
  return useQuery({
    queryKey: ['cartItemOptions', cartItemId, token],
    queryFn: () => getCartItemOptions(cartItemId),
    enabled,
  });
}
