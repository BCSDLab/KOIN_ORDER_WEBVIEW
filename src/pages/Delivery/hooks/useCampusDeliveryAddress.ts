import { useSuspenseQuery } from '@tanstack/react-query';
import { getCampusDeliveryAddress } from '@/api/delivery';
import { CampusDeliveryAddressRequest } from '@/types/api/deliveryCampus';

const useCampusDeliveryAddress = ({ filter }: CampusDeliveryAddressRequest) => {
  const { data } = useSuspenseQuery({
    queryKey: ['campusDeliveryAddress', filter],
    queryFn: () => getCampusDeliveryAddress({ filter }),
  });

  return {
    addresses: data.addresses,
    count: data.count,
  };
};

export default useCampusDeliveryAddress;
