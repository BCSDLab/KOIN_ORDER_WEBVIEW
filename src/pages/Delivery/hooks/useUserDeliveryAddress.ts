import { useMutation } from '@tanstack/react-query';
import { postUserDeliveryAddress } from '@/api/delivery';
import { OutsideAddress } from '@/stores/useOrderStore';

const useUserDeliveryAddress = () => {
  return useMutation({
    mutationFn: (addressData: OutsideAddress) => postUserDeliveryAddress(addressData),
    onError: (error) => {
      console.error('배달 주소 서버 저장 실패:', error);
    },
    onSuccess: (data) => {
      console.log('배달 주소 서버 저장 성공:', data);
    },
  });
};
export default useUserDeliveryAddress;
