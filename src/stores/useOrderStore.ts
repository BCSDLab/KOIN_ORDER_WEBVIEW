import { create } from 'zustand';

interface State {
  postAddress: PostAddressObjType;
  deliveryRequest: string;
  orderType: 'DELIVERY' | 'TAKE_OUT';
}

export interface PostAddressObjType {
  zip_number: string;
  si_do: string;
  si_gun_gu: string;
  eup_myeon_dong: string;
  road: string;
  building: string;
  detail_address: string;
  full_address: string;
}

interface Action {
  setDeliveryRequest: (request: string) => void;
  setPostAddress: (addressData: PostAddressObjType) => void;
  setOrderType: (type: 'DELIVERY' | 'TAKE_OUT') => void;
}

export const useOrderStore = create<State & Action>((set) => ({
  postAddress: {
    zip_number: '',
    si_do: '',
    si_gun_gu: '',
    eup_myeon_dong: '',
    road: '',
    building: '',
    detail_address: '',
    full_address: '',
  },
  deliveryRequest: '',
  orderType: 'DELIVERY',
  setDeliveryRequest: (request) => set({ deliveryRequest: request }),
  setPostAddress: (addressData) => set({ postAddress: addressData }),
  setOrderType: (type) => set({ orderType: type }),
}));
