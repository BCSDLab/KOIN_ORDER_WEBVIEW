import { useSuspenseQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart';
import { useOrderStore } from '@/stores/useOrderStore';

export default function useCart(orderType: 'DELIVERY' | 'TAKE_OUT') {
  const { setOrderType } = useOrderStore();

  const { data, error } = useSuspenseQuery({
    queryKey: ['cart', orderType],
    queryFn: async () => {
      try {
        return await getCart(orderType);
      } catch (e) {
        setOrderType(orderType === 'DELIVERY' ? 'TAKE_OUT' : 'DELIVERY');
        throw e;
      }
    },
  });
  return { data, error };
}
