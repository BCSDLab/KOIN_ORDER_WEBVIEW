import { useQuery } from '@tanstack/react-query';
import type { CartResponse } from '@/api/cart/entity';
import { getCart } from '@/api/cart';
import { useOrderStore } from '@/stores/useOrderStore';
import { getCookie } from '@/util/ts/cookie';

export default function useCart(orderType: 'DELIVERY' | 'TAKE_OUT') {
  const { setOrderType } = useOrderStore();
  const accessToken = getCookie('access_token');

  const { data, error } = useQuery<CartResponse>({
    queryKey: ['cart', orderType],
    queryFn: async () => {
      try {
        return await getCart(orderType);
      } catch (e) {
        // 에러 발생 시 orderType 반전 (예: 401, 404, 기타 네트워크 에러 등 모두 포함)
        setOrderType(orderType === 'DELIVERY' ? 'TAKE_OUT' : 'DELIVERY');
        throw e;
      }
    },
    enabled: !!accessToken,
  });

  return { data, error };
}
