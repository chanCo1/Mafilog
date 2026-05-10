/**
 * @file: useTravelExpenseStore.ts
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
import {
  IExpense,
  IExpenseList,
} from '@/shared/interfaces/travelExpenseStore.interface';
import { nanoid } from 'nanoid';

type ITravelExpenseStore = ITravelExpenseState &
  ITravelExpenseActions &
  ITravelExpenseGetters;

const initialState = {
  expenses: [],
};

export const useTravelExpenseStore = create<ITravelExpenseStore>()(
  devtools(
    immer((set, get) => {
      /** 타겟 일정 찾기 */
      const findTargetDay = (state: ITravelExpenseState, day: number) => {
        return state.expenses.find((e) => e.day === day);
      };

      return {
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
                { day: 0, date: undefined, list: [], dailyExpense: 0 }, // 여행전
                ...newExpenses,
              ];
            },
            false,
            'expense/setInitExpeneses',
          ),

        /** 지출 추가 */
        setAddExpenseList: (data) =>
          set(
            (state) => {
              const targetDay = findTargetDay(state, data.day);

              if (targetDay) {
                targetDay.list.push({
                  ...data,
                  id: nanoid(),
                });
              }
            },
            false,
            'expense/setAddExpenseList',
          ),

        /** 지출 제거 */
        setDeleteExpenseList: (data) =>
          set(
            (state) => {
              const targetDay = findTargetDay(state, data.day);

              if (targetDay) {
                targetDay.list = targetDay.list.filter(
                  (list) => list.id !== data.id,
                );
              }
            },
            false,
            'expense/setDeleteExpenseList',
          ),

        /** 지출 수정 */
        setUpdateExpense: (data) =>
          set(
            (state) => {
              state.expenses.forEach((expense) => {
                expense.list = expense.list.filter(
                  (item) => item.id !== data.id,
                );
              });

              const targetDay = findTargetDay(state, data.day);

              if (targetDay) {
                targetDay.list.push(data);
              }
            },
            false,
            'expense/setUpdateExpense',
          ),

        /** 지출 선택 이동 */
        setMoveSelectedExpense: (data) =>
          set(
            (state) => {
              const targetDay = findTargetDay(state, data.day);

              if (!targetDay) return;

              const movingItems: IExpenseList[] = [];

              state.expenses.forEach((expense) => {
                // 해당 날짜의 리스트에서 선택된 id들만 필터링
                const itemsToMove = expense.list.filter((item) =>
                  data.id.includes(item.id),
                );

                movingItems.push(...itemsToMove);

                // 선택된 id 제거
                expense.list = expense.list.filter(
                  (item) => !data.id.includes(item.id),
                );
              });

              const updatedItems = movingItems.map((item) => ({
                ...item,
                day: data.day,
              }));

              targetDay.list.push(...updatedItems);
            },
            false,
            'expense/setMoveSelectedExpense',
          ),

        /** 지출 선택 삭제 */
        setDeleteSelectedExpense: (data) =>
          set(
            (state) => {
              state.expenses.forEach((expense) => {
                // 선택된 id 제거
                expense.list = expense.list.filter(
                  (item) => !data.id.includes(item.id),
                );
              });
            },
            false,
            'expense/setDeleteSelectedExpense',
          ),

        /** 리셋 */
        reset: () => set(initialState),

        /**
         * @Getters
         */
        getTravelInfo: () => get().expenses,

        /** 일차 별 지출 총액 */
        getDailyTotalAmount: (day) => {
          const expenses = get().expenses;
          const targetDay = findTargetDay({ expenses }, day);

          if (!targetDay) return 0;
          return targetDay.list.reduce(
            (sum, item) => sum + item.calcExchangeAmount,
            0,
          );
        },

        /** 모든날 총 지출 */
        getAllTotalAmount: () => {
          const expensesRange = get().expenses.length;

          let totalAmount = 0;
          for (let i = 0; i < expensesRange; i++) {
            totalAmount += get().getDailyTotalAmount(i);
          }

          return Math.max(0, totalAmount);
        },
      };
    }),
    { name: 'expenses' },
  ),
);
