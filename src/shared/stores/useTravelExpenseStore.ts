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
  ISpenderWithAmount,
} from '@/shared/interfaces/travelExpenseStore.interface';
import { getTravelDayOfWeek } from '@/shared/lib/utils';
import {
  IExpense,
  IExpenseList,
} from '@/shared/interfaces/travelExpenseStore.interface';
import { nanoid } from 'nanoid';
import { roundDecimal } from '@/shared/lib/utils';

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

      /** 내 지출 가져오기 */
      const getMySpendList = (_list: IExpenseList[]) => {
        let mySpendedList: ISpenderWithAmount[] = [];
        _list.forEach((list) => {
          const findMySpend = list.spender.find(
            // TODO: 내 지출 찾을 때 '나'가 아닌 로그인한 id로 찾을 것
            // (spender) => spender.value === userId,
            (spender) => spender.label === '나',
          );

          if (findMySpend) {
            mySpendedList.push(findMySpend);
          }
        });
        return mySpendedList;
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

        // = = = = = = = = = = = = = = = = = = = = = = = = = = 일정별
        /** 일정 별 지출 총액 */
        getDailyAllSpend: (day) => {
          const { expenses } = get();
          const targetDay = findTargetDay({ expenses }, day);

          if (!targetDay) return 0;

          const dailySpend = targetDay.list.reduce(
            (sum, item) => sum + item.calcExchangeAmount,
            0,
          );

          return Math.max(0, roundDecimal(dailySpend));
        },

        /** 일정 별 내 지출 */
        getDailyMySpend: (day) => {
          const { expenses } = get();
          const targetDay = findTargetDay({ expenses }, day);

          if (!targetDay) return 0;

          const mySpendedList = getMySpendList(targetDay.list);

          if (!mySpendedList.length) return 0;

          const dailyMySpend = mySpendedList.reduce(
            (sum, item) => sum + item?.calcExchangeAmount || 0,
            0,
          );

          return Math.max(0, roundDecimal(dailyMySpend));
        },

        /** 일정 별, 통화 별 총 지출 */
        getDailyAllSpendByCurrency: (day) => {
          const { expenses } = get();
          const targetDay = findTargetDay({ expenses }, day);

          if (!targetDay) return [];

          const reduceSpend = targetDay.list.reduce(
            (acc, item) => {
              const currencyLabel = item.exchangeRate.currencyCode.label;
              const amount = item.amount;
              const calcExchangeAmount = item.calcExchangeAmount;

              if (!acc[currencyLabel]) {
                acc[currencyLabel] = { amount: 0, calcCurrencyAmount: 0 };
              }

              acc[currencyLabel].amount += amount;
              acc[currencyLabel].calcCurrencyAmount += calcExchangeAmount;
              return acc;
            },
            {} as Record<
              string,
              { amount: number; calcCurrencyAmount: number }
            >,
          );

          return Object.entries(reduceSpend).map(([currency, spend]) => ({
            currency,
            spend: roundDecimal(spend.amount),
            calcSpend: roundDecimal(spend.calcCurrencyAmount),
          }));
        },

        /** 일정 별, 통화 별 내 지출 */
        getDailyMySpendByCurrency: (day) => {
          const { expenses } = get();
          const targetDay = findTargetDay({ expenses }, day);

          if (!targetDay) return 0;

          const mySpendedList = getMySpendList(targetDay.list);

          if (!mySpendedList.length) return [];

          const reduceSpend = mySpendedList.reduce(
            (acc, item) => {
              const currencyLabel = item.currencyCode.label;
              const amount = item.amount;
              const calcExchangeAmount = item.calcExchangeAmount;

              if (!acc[currencyLabel]) {
                acc[currencyLabel] = { amount: 0, calcCurrencyAmount: 0 };
              }

              acc[currencyLabel].amount += amount;
              acc[currencyLabel].calcCurrencyAmount += calcExchangeAmount;
              return acc;
            },
            {} as Record<
              string,
              { amount: number; calcCurrencyAmount: number }
            >,
          );

          return Object.entries(reduceSpend).map(([currency, spend]) => ({
            currency,
            spend: roundDecimal(spend.amount),
            calcSpend: roundDecimal(spend.calcCurrencyAmount),
          }));
        },

        // = = = = = = = = = = = = = = = = = = = = = = = = = = 카테고리별
        /** 카테고리별 지출 총액 */
        getCategorySpend: (category) => {
          const { expenses } = get();

          let catergoryItems: IExpenseList[] = [];
          expenses.forEach((expense) =>
            expense.list.forEach((list) => {
              if (list.category === category) {
                catergoryItems.push(list);
              }
            }),
          );

          const categorySpendAmount = catergoryItems.reduce(
            (sum, item) => sum + item.calcExchangeAmount,
            0,
          );

          return Math.max(0, roundDecimal(categorySpendAmount));
        },

        /** 카테고리별 내 지출 총액 */
        getCategoryMySpend: (category) => {
          const { expenses } = get();

          let catergoryItems: IExpenseList[] = [];
          expenses.forEach((expense) =>
            expense.list.forEach((list) => {
              if (list.category === category) {
                catergoryItems.push(list);
              }
            }),
          );

          const mySpendedList = getMySpendList(catergoryItems);

          const categorySpendAmount = mySpendedList.reduce(
            (sum, item) => sum + item.calcExchangeAmount,
            0,
          );

          return Math.max(0, roundDecimal(categorySpendAmount));
        },

        /** 카테고리별, 통화 별 총 지출 */
        getCategorySpendByCurrency: (category) => {
          const { expenses } = get();

          let catergoryItems: IExpenseList[] = [];
          expenses.forEach((expense) =>
            expense.list.forEach((list) => {
              if (list.category === category) {
                catergoryItems.push(list);
              }
            }),
          );

          const reduceSpend = catergoryItems.reduce(
            (acc, item) => {
              const category = item.category;
              const currencyLabel = item.exchangeRate.currencyCode.label;
              const amount = item.amount;
              const calcExchangeAmount = item.calcExchangeAmount;

              if (!acc[currencyLabel]) {
                acc[currencyLabel] = {
                  category: '',
                  amount: 0,
                  calcCurrencyAmount: 0,
                };
              }

              acc[currencyLabel].category = category;
              acc[currencyLabel].amount += amount;
              acc[currencyLabel].calcCurrencyAmount += calcExchangeAmount;
              return acc;
            },
            {} as Record<
              string,
              { category: string; amount: number; calcCurrencyAmount: number }
            >,
          );

          return Object.entries(reduceSpend).map(([currency, spend]) => ({
            category,
            currency,
            spend: roundDecimal(spend.amount),
            calcSpend: roundDecimal(spend.calcCurrencyAmount),
          }));
        },

        /** 카테고리별, 통화별 내 지출 */
        getCategoryMySpendByCurrency: (category) => {
          const { expenses } = get();

          let catergoryItems: IExpenseList[] = [];
          expenses.forEach((expense) =>
            expense.list.forEach((list) => {
              if (list.category === category) {
                catergoryItems.push(list);
              }
            }),
          );

          const mySpendedList = getMySpendList(catergoryItems);

          const reduceSpend = mySpendedList.reduce(
            (acc, item) => {
              const category = item.category;
              const currencyLabel = item.currencyCode.label;
              const amount = item.amount;
              const calcExchangeAmount = item.calcExchangeAmount;

              if (!acc[currencyLabel]) {
                acc[currencyLabel] = {
                  category: '',
                  amount: 0,
                  calcCurrencyAmount: 0,
                };
              }

              acc[currencyLabel].category = category;
              acc[currencyLabel].amount += amount;
              acc[currencyLabel].calcCurrencyAmount += calcExchangeAmount;
              return acc;
            },
            {} as Record<
              string,
              { category: string; amount: number; calcCurrencyAmount: number }
            >,
          );

          return Object.entries(reduceSpend).map(([currency, spend]) => ({
            category,
            currency,
            spend: roundDecimal(spend.amount),
            calcSpend: roundDecimal(spend.calcCurrencyAmount),
          }));
        },

        // = = = = = = = = = = = = = = = = = = = = = = = = = = 모든날
        /** 모든날 총 지출 */
        getAllTotalSpend: () => {
          const expensesRange = get().expenses.length;

          let totalSpend = 0;
          for (let i = 0; i < expensesRange; i++) {
            totalSpend += get().getDailyAllSpend(i);
          }

          return Math.max(0, roundDecimal(totalSpend));
        },

        /** 모든날 총 내 지출 */
        getAllTotalMySpend: () => {
          const expensesRange = get().expenses.length;

          let totalSpend = 0;
          for (let i = 0; i < expensesRange; i++) {
            totalSpend += get().getDailyMySpend(i);
          }

          return Math.max(0, roundDecimal(totalSpend));
        },

        /** 모든날 통화 별 지출 */
        getAllTotalSpendByCurrency: () => {
          const { expenses } = get();

          const reduceTotalSpend = expenses.reduce(
            (acc, day) => {
              day.list.forEach((item) => {
                const currencyLabel = item.exchangeRate.currencyCode.label;
                const amount = item.amount;
                const calcAmount = item.calcExchangeAmount;

                if (!acc[currencyLabel]) {
                  acc[currencyLabel] = { totalAmount: 0, totalCalcAmount: 0 };
                }

                acc[currencyLabel].totalAmount += amount;
                acc[currencyLabel].totalCalcAmount += calcAmount;
              });

              return acc;
            },
            {} as Record<
              string,
              { totalAmount: number; totalCalcAmount: number }
            >,
          );

          return Object.entries(reduceTotalSpend).map(([currency, data]) => ({
            currency,
            spend: roundDecimal(data.totalAmount),
            calcSpend: roundDecimal(data.totalCalcAmount),
          }));
        },

        // /** 모든날 통화 별 내 지출 */
        // getAllTotalMySpendByCurrency: () => {
        //   const { expenses } = get();

        //   const reduceTotalSpend = expenses.reduce(
        //     (acc, day) => {
        //       day.list.forEach((item) => {
        //         if (item.payer.value !== '나') return;

        //         const currencyLabel = item.exchangeRate.currencyCode.label;
        //         const amount = item.amount;
        //         const calcAmount = item.calcExchangeAmount;

        //         if (!acc[currencyLabel]) {
        //           acc[currencyLabel] = { totalAmount: 0, totalCalcAmount: 0 };
        //         }

        //         acc[currencyLabel].totalAmount += amount;
        //         acc[currencyLabel].totalCalcAmount += calcAmount;
        //       });

        //       return acc;
        //     },
        //     {} as Record<
        //       string,
        //       { totalAmount: number; totalCalcAmount: number }
        //     >,
        //   );

        //   return Object.entries(reduceTotalSpend).map(([currency, data]) => ({
        //     currency,
        //     spend: roundDecimal(data.totalAmount),
        //     calcSpend: roundDecimal(data.totalCalcAmount),
        //   }));
        // },

        // = = = = = = = = = = = = = = = = = = = = = = = = = = 정산 관련
        /** 멤버별 총 결제 금액 */
        getTotalPaymentAmountByMember: (id) => {
          const { expenses } = get();

          const totalAmount = expenses.reduce((acc, day) => {
            const dayTotal = day.list
              .filter((item) => item.payer.value === id)
              .reduce((sum, item) => sum + item.calcExchangeAmount, 0);
            return acc + dayTotal;
          }, 0);

          return roundDecimal(totalAmount);
        },

        /** 멤버별 총 지출 금액 */
        getTotalSpendAmountByMember: (id: string) => {
          const { expenses } = get();

          const total = expenses.reduce((acc, day) => {
            return (
              acc +
              day.list.reduce((dayAcc, item) => {
                const mySpend = item.spender.find((s) => s.value === id);
                return dayAcc + (mySpend ? mySpend.calcExchangeAmount : 0);
              }, 0)
            );
          }, 0);

          return roundDecimal(total);
        },
      };
    }),
    { name: 'expenses' },
  ),
);
