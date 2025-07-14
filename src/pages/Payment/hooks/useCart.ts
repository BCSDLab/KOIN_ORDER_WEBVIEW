import { useSuspenseQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart';
import { useTokenStore } from '@/stores/auth';
import { useOrderStore } from '@/stores/useOrderStore';

export default function useCart(orderType: 'DELIVERY' | 'TAKE_OUT') {
  const { setOrderType } = useOrderStore();
  const token = useTokenStore.getState().token;

  const { data } = useSuspenseQuery({
    queryKey: ['cart', orderType, token],
    queryFn: async () => {
      try {
        return await getCart(orderType);
      } catch (e) {
        setOrderType(orderType === 'DELIVERY' ? 'TAKE_OUT' : 'DELIVERY');
        throw e;
      }
    },
  });
  return { data };
}
