import { useMutation } from '@tanstack/react-query';
import { getTemporaryTakeout } from '@/api/payments';
import { TakeoutTemporaryRequest } from '@/api/payments/entity';

export default function useTemporaryTakeout() {
  return useMutation({
    mutationFn: (body: TakeoutTemporaryRequest) => getTemporaryTakeout(body),
  });
}
