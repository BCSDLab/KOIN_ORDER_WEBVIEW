import { useSuspenseQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart';

export default function useCart(type: string) {
  return useSuspenseQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(type),
  });
}
