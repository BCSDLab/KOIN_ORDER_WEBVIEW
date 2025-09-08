import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface OutsideAddress {
  zip_number: string;
  si_do: string;
  si_gun_gu: string;
  eup_myeon_dong: string;
  road: string;
  building: string;
  address: string;
  detail_address: string;
}

export interface CampusAddress {
  id: number;
  full_address: string;
  short_address: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface State {
  orderType: 'DELIVERY' | 'TAKE_OUT';
  deliveryType: 'CAMPUS' | 'OUTSIDE';
  outsideAddress: OutsideAddress;
  campusAddress?: CampusAddress;
  deliveryRequest: string;
  ownerRequest: string;
  isCutleryDeclined: boolean;
  userPhoneNumber: string;
}
interface Action {
  setOrderType: (type: 'DELIVERY' | 'TAKE_OUT') => void;
  setDeliveryType: (type: 'CAMPUS' | 'OUTSIDE') => void;
  setOutsideAddress: (addressData: OutsideAddress) => void;
  setCampusAddress: (address: CampusAddress) => void;
  setDeliveryRequest: (request: string) => void;
  setOwnerRequest: (request: string) => void;
  setIsCutleryDeclined: (isDeclined: boolean) => void;
  setUserPhoneNumber: (phoneNumber: string) => void;
}

export const useOrderStore = create<State & Action>()(
  persist(
    (set) => ({
      orderType: 'DELIVERY',
      deliveryType: 'CAMPUS',
      outsideAddress: {
        zip_number: '',
        si_do: '',
        si_gun_gu: '',
        eup_myeon_dong: '',
        road: '',
        building: '',
        address: '',
        detail_address: '',
      },
      campusAddress: undefined,
      deliveryRequest: '',
      ownerRequest: '',
      isCutleryDeclined: true,
      userPhoneNumber: '',
      setOrderType: (type) => set({ orderType: type }),
      setDeliveryType: (type) => set({ deliveryType: type }),
      setOutsideAddress: (addressData) => set({ outsideAddress: addressData }),
      setCampusAddress: (address) => set({ campusAddress: address }),
      setDeliveryRequest: (request) => set({ deliveryRequest: request }),
      setOwnerRequest: (request) => set({ ownerRequest: request }),
      setIsCutleryDeclined: (isDeclined) => set({ isCutleryDeclined: isDeclined }),
      setUserPhoneNumber: (phoneNumber) => set({ userPhoneNumber: phoneNumber }),
    }),
    {
      name: 'order-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => {
        const base = {
          userPhoneNumber: state.userPhoneNumber,
          deliveryRequest: state.deliveryRequest,
          ownerRequest: state.ownerRequest,
          isCutleryDeclined: state.isCutleryDeclined,
          orderType: state.orderType,
          deliveryType: state.deliveryType,
        };

        if (state.deliveryType === 'CAMPUS') {
          return {
            ...base,
            campusAddress: state.campusAddress ?? null,
          };
        } else {
          return {
            ...base,
            outsideAddress: state.outsideAddress,
          };
        }
      },
    },
  ),
);
