/**
 * @file: useAddPlaceModalStore.tsx
 * @author: chad
 * @since: 2026.06.04 ~
 * @description: 장소 추가 구글맵 비용 절감을 위한 모달 전역 상태 관리
 */

import { create } from 'zustand';
import { IScheduleResponse } from '@/features/myTravel/interfaces/schedule.interface';

interface ModalState {
  isOpen: boolean;
  hasMounted: boolean;
  scheduleList: IScheduleResponse[];
  open: (scheduleList: IScheduleResponse[]) => void;
  close: () => void;
}

export const useAddPlaceModalStore = create<ModalState>((set) => ({
  isOpen: false,
  hasMounted: false,
  scheduleList: [],
  open: (scheduleList) => set({ isOpen: true, hasMounted: true, scheduleList }),
  close: () => set({ isOpen: false }),
}));
