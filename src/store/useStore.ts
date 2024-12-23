import { create } from 'zustand';
import { Gift, WeddingInfo } from '../types';

interface Store {
  gifts: Gift[];
  weddingInfo: WeddingInfo;
  isAdmin: boolean;
  setGifts: (gifts: Gift[]) => void;
  setWeddingInfo: (info: WeddingInfo) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  gifts: [],
  weddingInfo: {
    date: '',
    time: '',
    venue: '',
    address: '',
    dressCode: '',
    additionalInfo: '',
  },
  isAdmin: false,
  setGifts: (gifts) => set({ gifts }),
  setWeddingInfo: (info) => set({ weddingInfo: info }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));