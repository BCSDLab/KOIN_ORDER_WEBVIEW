import { useSuspenseQuery } from '@tanstack/react-query';
import { getCampusDeliveryAddress } from '@/api/delivery';
import { CampusDeliveryAddressRequest } from '@/types/api/deliveryCampus';

const useCampusDeliveryAddress = ({ filter }: CampusDeliveryAddressRequest) => {
  return useSuspenseQuery({
    queryKey: ['campusDeliveryAddress', filter],
    queryFn: async () => {
      const { count, addresses } = await getCampusDeliveryAddress({ filter });
      return { count, addresses };
    },
  });
};

export default useCampusDeliveryAddress;
