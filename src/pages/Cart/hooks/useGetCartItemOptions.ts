import { useQuery } from '@tanstack/react-query';
import { getCartItemOptions } from '@/api/cart';

export default function useGetCartItemOptions(cartItemId: number, enabled: boolean) {
  return useQuery({
    queryKey: ['cartItemOptions', cartItemId],
    queryFn: () => getCartItemOptions(cartItemId),
    enabled,
  });
}
