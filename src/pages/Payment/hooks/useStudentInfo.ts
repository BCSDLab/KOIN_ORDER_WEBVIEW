import { useSuspenseQuery } from '@tanstack/react-query';
import { getStudentInfo } from '@/api/auth';

export default function useStudentInfo() {
  return useSuspenseQuery({
    queryKey: ['studentInfo'],
    queryFn: () => getStudentInfo(),
  });
}
