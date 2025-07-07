import { useSuspenseQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart';

export default function useCart(orderType: 'DELIVERY' | 'TAKE_OUT') {
  return useSuspenseQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(orderType),
}
