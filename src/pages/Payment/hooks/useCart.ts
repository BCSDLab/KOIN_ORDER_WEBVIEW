import { useSuspenseQuery } from '@tanstack/react-query';
import type { CartResponse } from '@/api/cart/entity';
import { getCart } from '@/api/cart';
import { useOrderStore } from '@/stores/useOrderStore';

const dummyCart: CartResponse = {
  shop_name: '',
  shop_thumbnail_image_url: '',
  orderable_shop_id: 0,
  is_delivery_available: false,
  is_takeout_available: false,
  shop_minimum_order_amount: 0,
  items: [],
  total_amount: 0,
  items_amount: 0,
  delivery_fee: 0,
  final_payment_amount: 0,
};

function isErrorWithStatus(error: unknown, statusCode: number): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as Record<string, unknown>).status === 'number' &&
    (error as Record<string, unknown>).status === statusCode
  );
}

export default function useCart(orderType: 'DELIVERY' | 'TAKE_OUT') {
  const { setOrderType } = useOrderStore();

  const { data } = useSuspenseQuery<CartResponse>({
    queryKey: ['cart', orderType],
    queryFn: async () => {
      try {
        return await getCart(orderType);
      } catch (e: unknown) {
        if (isErrorWithStatus(e, 401)) {
          return dummyCart;
        }

        setOrderType(orderType === 'DELIVERY' ? 'TAKE_OUT' : 'DELIVERY');
        throw e;
      }
    },
  });

  return { data };
}
