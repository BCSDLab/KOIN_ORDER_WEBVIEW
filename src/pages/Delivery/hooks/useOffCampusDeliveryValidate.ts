import { useMutation } from '@tanstack/react-query';
import { postOffCampusDeliveryValidate } from '@/api/delivery';
import { CampusDeliveryValidateRequest } from '@/api/delivery/entity';

export const useOffCampusDeliveryValidate = () => {
  return useMutation({
    mutationKey: ['offCampusDeliveryValidate'],
    mutationFn: (addressData: CampusDeliveryValidateRequest) => postOffCampusDeliveryValidate(addressData),
  });
};
