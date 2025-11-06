import { useQuery } from '@tanstack/react-query';
import { getRoadNameAddress } from '@/api/delivery';

const useRoadNameAddress = (keyword: string) => {
  return useQuery({
    queryKey: ['roadNameAddress', keyword],
    queryFn: () => {
      return getRoadNameAddress({ keyword, currentPage: '1', countPerPage: '10' });
    },
    enabled: false,
  });
};

export default useRoadNameAddress;
