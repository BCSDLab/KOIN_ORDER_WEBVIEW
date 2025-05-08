import { useMutation } from '@tanstack/react-query';
import { getRoadNameAddress } from '@/api/delivery';

const useRoadNameAddress = () => {
  const { mutate, data, isSuccess, isPending } = useMutation({
    mutationKey: ['roadNameAddress'],
    mutationFn: async (keyword: string) => {
      const response = await getRoadNameAddress({ keyword });
      return response.results;
    },
  });

  return { mutate, data, isSuccess, isPending };
};

export default useRoadNameAddress;
