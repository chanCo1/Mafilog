/**
 * @file: useTravelExpenseListStore.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 여행 가계부 전역 관리
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ITravelExpenseState,
  ITravelExpenseActions,
  ITravelExpenseGetters,
} from '@/shared/interfaces/travelExpenseStore.interface';
import { getTravelDayOfWeek } from '@/shared/lib/utils';
import { IExpense } from '@/shared/interfaces/travelExpenseStore.interface';

type ITravelExpenseStore = ITravelExpenseState &
  ITravelExpenseActions &
  ITravelExpenseGetters;

const initialState = {
  expense: [],
};

export const useTravelExpenseListStore = create<ITravelExpenseStore>()(
  devtools(
    immer((set, get) => ({
      /**
       * @States
       */
      expense: initialState['expense'],

      /**
       * @Actions
       */
      /** 가계부 리스트 초기값 설정 */
      setInitExpense: (data) =>
        set(
          (state) => {
            const newExpenses = getTravelDayOfWeek(data.from, data.to).map(
              (_day) => ({
                day: _day.day,
                date: _day.date,
                list: [],
                dailyExpense: 0,
              }),
            );

            state.expense = [
              { day: 0, date: undefined, list: [], dailyExpense: 0 },
              ...newExpenses,
            ];
          },
          false,
          'travel/setInitExpeneses',
        ),

      /** 지출 추가 */
      setAddExpenseList: (data) =>
        set((state) => {
          const targetDay = state.expense.find(
            (expense: IExpense) => expense.day === data.day.value,
          );

          if (targetDay) {
            targetDay.list.push({
              id: `${data.day.value}-${data.name}`,
              ...data,
            });
          }
        }),

      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getTravelInfo: () => get().expense,
    })),
    { name: 'expense' },
  ),
);
