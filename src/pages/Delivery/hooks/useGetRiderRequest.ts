import { useSuspenseQuery } from '@tanstack/react-query';
import { getRiderRequestMessages } from '@/api/delivery';

export default function useGetRiderRequest() {
  return useSuspenseQuery({
    queryKey: ['riderRequest'],
    queryFn: async () => getRiderRequestMessages(),
  });
}
