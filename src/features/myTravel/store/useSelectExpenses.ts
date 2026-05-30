import { create } from 'zustand';
import { IExpenseList } from '@/features/myTravel/interfaces/expense.interface';

interface ISelectExpenses {
  /** 선택된 일정 리스트 */
  selectedExpenses: IExpenseList[];
  /** 개별 선택/해제 */
  toggleSelect: (item: IExpenseList) => void;
  /** 일차별 전체 선택/해제 */
  toggleDayAll: (dayItems: IExpenseList[], isAllSelected: boolean) => void;
  /** 초기화 */
  clearSelectedExpenses: () => void;
}

export const useSelectExpenses = create<ISelectExpenses>((set) => ({
  selectedExpenses: [],
  clearSelectedExpenses: () => {
    set({ selectedExpenses: [] });
  },
  toggleDayAll: (dayItems, isAllSelected) =>
    set((state) => {
      if (isAllSelected) {
        // 이미 다 선택된 상태라면 해당 일차 아이템들만 제거
        const dayIds = dayItems.map((item) => item.id);
        return {
          selectedExpenses: state.selectedExpenses.filter(
            (s) => !dayIds.includes(s.id),
          ),
        };
      } else {
        // 선택되지 않은 아이템들 합치기 (중복 방지)
        const combined = [...state.selectedExpenses, ...dayItems];
        const filteredItems = combined.filter(
          (value, index, array) =>
            array.findIndex((item) => item.id === value.id) === index,
        );
        return { selectedExpenses: filteredItems };
      }
    }),
  toggleSelect: (item) =>
    set((state) => {
      const isExist = state.selectedExpenses.some(
        (shedule) => shedule.id === item.id,
      );
      return {
        selectedExpenses: isExist
          ? state.selectedExpenses.filter((s) => s.id !== item.id)
          : [...state.selectedExpenses, item],
      };
    }),
}));
