import { useMutation } from '@tanstack/react-query';
import { postUserDeliveryAddress } from '@/api/delivery';
import { OutsideAddress } from '@/stores/useOrderStore';

const useUserDeliveryAddress = () => {
  return useMutation({
    mutationFn: (addressData: OutsideAddress) => postUserDeliveryAddress(addressData),
  });
};
export default useUserDeliveryAddress;
