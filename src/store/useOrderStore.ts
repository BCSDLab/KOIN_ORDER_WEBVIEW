import { create } from 'zustand';

interface State {
  mainAddress: string;
  detailAddress: string;
  deliveryRequest: string;
}

interface Action {
  setMainAddress: (address: string) => void;
  setDetailAddress: (detail: string) => void;
  setDeliveryRequest: (request: string) => void;
}

export const useOrderStore = create<State & Action>((set) => ({
  mainAddress: '',
  detailAddress: '',
  deliveryRequest: '',
  setMainAddress: (address) => set({ mainAddress: address }),
  setDetailAddress: (detail) => set({ detailAddress: detail }),
  setDeliveryRequest: (request) => set({ deliveryRequest: request }),
}));
