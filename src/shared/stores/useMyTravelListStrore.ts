import { create } from 'zustand';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';

interface IMyTravelList {
  progressTravel: IMyTravelListResponse[];
  setProgressTravel: (list: IMyTravelListResponse[]) => void;
  upcomingTravel: IMyTravelListResponse[];
  setUpcomingTravel: (list: IMyTravelListResponse[]) => void;
  lastTravel: IMyTravelListResponse[];
  setLastTravel: (list: IMyTravelListResponse[]) => void;
}

export const useMyTravelListStore = create<IMyTravelList>((set) => ({
  progressTravel: [],
  upcomingTravel: [],
  lastTravel: [],
  setProgressTravel: (list) => set({ progressTravel: list }),
  setUpcomingTravel: (list) => set({ upcomingTravel: list }),
  setLastTravel: (list) => set({ lastTravel: list }),

  clearTravelLists: () =>
    set({ progressTravel: [], upcomingTravel: [], lastTravel: [] }),
}));
