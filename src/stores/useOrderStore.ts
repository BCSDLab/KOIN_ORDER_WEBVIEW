import { create } from 'zustand';

export interface OutsideAddress {
  zip_number: string;
  si_do: string;
  si_gun_gu: string;
  eup_myeon_dong: string;
  road: string;
  building: string;
  detail_address: string;
  full_address: string;
}

export interface CampusAddress {
  id: number;
  full_address: string;
  short_address: string;
  latitude: number;
  longitude: number;
}

interface State {
  orderType: 'DELIVERY' | 'TAKE_OUT';
  deliveryType: 'CAMPUS' | 'OUTSIDE';
  outsideAddress: OutsideAddress;
  campusAddress?: CampusAddress;
  deliveryRequest: string;
  userPhoneNumber: string;
}
interface Action {
  setOrderType: (type: 'DELIVERY' | 'TAKE_OUT') => void;
  setDeliveryType: (type: 'CAMPUS' | 'OUTSIDE') => void;
  setOutsideAddress: (addressData: OutsideAddress) => void;
  setCampusAddress: (address: CampusAddress) => void;
  setDeliveryRequest: (request: string) => void;
  setUserPhoneNumber: (phoneNumber: string) => void;
}

export const useOrderStore = create<State & Action>((set) => ({
  orderType: 'DELIVERY',
  deliveryType: 'CAMPUS',
  outsideAddress: {
    zip_number: '',
    si_do: '',
    si_gun_gu: '',
    eup_myeon_dong: '',
    road: '',
    building: '',
    detail_address: '',
    full_address: '',
  },
  campusAddress: undefined,
  deliveryRequest: '',
  userPhoneNumber: '',
  setOrderType: (type) => set({ orderType: type }),
  setDeliveryType: (type) => set({ deliveryType: type }),
  setOutsideAddress: (addressData) => set({ outsideAddress: addressData }),
  setCampusAddress: (address) => set({ campusAddress: address }),
  setDeliveryRequest: (request) => set({ deliveryRequest: request }),
  setUserPhoneNumber: (phoneNumber) => set({ userPhoneNumber: phoneNumber }),
}));
