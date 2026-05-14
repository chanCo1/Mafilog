import { create } from 'zustand';
import { IScheduleList } from '@/shared/interfaces/travelScheduleStore.interface';

interface ISelectSchedules {
  /** 선택된 일정 리스트 */
  selectedSchedules: IScheduleList[];
  /** 개별 선택/해제 */
  toggleSelect: (item: IScheduleList) => void;
  /** 일차별 전체 선택/해제 */
  toggleDayAll: (dayItems: IScheduleList[], isAllSelected: boolean) => void;
  /** 초기화 */
  clearSelectedSchedules: () => void;
}

export const useSelectSchedules = create<ISelectSchedules>((set) => ({
  selectedSchedules: [],
  clearSelectedSchedules: () => {
    set({ selectedSchedules: [] });
  },
  toggleDayAll: (dayItems, isAllSelected) =>
    set((state) => {
      if (isAllSelected) {
        // 이미 다 선택된 상태라면 해당 일차 아이템들만 제거
        const dayIds = dayItems.map((item) => item.id);
        return {
          selectedSchedules: state.selectedSchedules.filter(
            (s) => !dayIds.includes(s.id),
          ),
        };
      } else {
        // 선택되지 않은 아이템들 합치기 (중복 방지)
        const combined = [...state.selectedSchedules, ...dayItems];
        const filteredItems = combined.filter(
          (value, index, array) =>
            array.findIndex((item) => item.id === value.id) === index,
        );
        return { selectedSchedules: filteredItems };
      }
    }),
  toggleSelect: (item) =>
    set((state) => {
      const isExist = state.selectedSchedules.some(
        (shedule) => shedule.id === item.id,
      );
      return {
        selectedSchedules: isExist
          ? state.selectedSchedules.filter((s) => s.id !== item.id)
          : [...state.selectedSchedules, item],
      };
    }),
}));
