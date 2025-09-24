import { useSuspenseQuery } from '@tanstack/react-query';
import { getInProgressOrder } from '@/api/order';

export default function useInProgressOrder() {
  return useSuspenseQuery({
    queryKey: ['inProgressOrder'],
    queryFn: () => getInProgressOrder(),
  });
}
