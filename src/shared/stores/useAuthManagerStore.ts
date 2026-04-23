import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthManager {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthManagerStore = create<IAuthManager>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    { name: 'auth-storage' },
  ),
);
