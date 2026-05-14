/** TODO: 임시 여행 리스트 스토어 */

import { create } from 'zustand';

interface IMyTravelList {
  progressTravel: any[];
  setProgressTravel: (value: any) => void;
  upcomingTravel: any[];
  setUpcomingTravel: (value: any) => void;
  lastTravel: any[];
  setLastTravel: (value: any) => void;
}

export const useMyTravelListStore = create<IMyTravelList>((set) => ({
  progressTravel: [],
  setProgressTravel: (value) =>
    set((state) => {
      return { progressTravel: [...state.progressTravel, value] };
    }),
  upcomingTravel: [],
  setUpcomingTravel: (value) =>
    set((state) => {
      return { upcomingTravel: [...state.upcomingTravel, value] };
    }),
  lastTravel: [],
  setLastTravel: (value) =>
    set((state) => {
      return { lastTravel: [...state.lastTravel, value] };
    }),
}));
