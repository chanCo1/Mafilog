import { create } from 'zustand';

interface IAuthManager {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthManagerStore = create<IAuthManager>((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
}));
