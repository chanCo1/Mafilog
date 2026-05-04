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
            getTravelDayOfWeek(data.from, data.to).forEach((_day) => {
              state.expense.push({
                day: _day.day,
                date: _day.date,
                list: [],
                dailyExpense: 0,
              });
            });
          },
          false,
          'travel/setInitExpeneses',
        ),

      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getTravelInfo: () => get().expense,
    })),
  ),
);
