import { useSuspenseQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart';

export default function useCart() {
  return useSuspenseQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });
}
