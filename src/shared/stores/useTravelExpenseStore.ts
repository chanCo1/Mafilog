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
  expenses: [],
};

export const useTravelExpenseListStore = create<ITravelExpenseStore>()(
  devtools(
    immer((set, get) => ({
      /**
       * @States
       */
      expenses: initialState['expenses'],

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

            state.expenses = [
              { day: 0, date: undefined, list: [], dailyExpense: 0 },
              ...newExpenses,
            ];
          },
          false,
          'travel/setInitExpeneses',
        ),

      /** 지출 추가 */
      setAddExpenseList: (data) =>
        set(
          (state) => {
            const targetDay = state.expenses.find(
              (expense: IExpense) => expense.day === data.day.value,
            );

            if (targetDay) {
              targetDay.list.push({
                id: crypto.randomUUID(),
                ...data,
              });
            }
          },
          false,
          'travel/setAddExpenseList',
        ),

      /** 지출 제거 */
      setDeleteExpenseList: (data) =>
        set(
          (state) => {
            const targetExpense = state.expenses.find(
              (schedule: IExpense) => schedule.day === data.day,
            );

            if (targetExpense) {
              targetExpense.list = targetExpense.list.filter(
                (_, index) => index !== data.index,
              );
            }
          },
          false,
          'travel/setDeleteExpenseList',
        ),

      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getTravelInfo: () => get().expenses,
    })),
    { name: 'expense' },
  ),
);
