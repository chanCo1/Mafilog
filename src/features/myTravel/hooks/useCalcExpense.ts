/**
 * @file: useCalcExpense.tsx
 * @author: chad
 * @since: 2026.05.23 ~
 * @description: 가계부 지출 계산 커스텀훅
 */

import { useMemo, useCallback } from 'react';
import {
  IExpenseResponse,
  IExpenseList,
  ISpender,
} from '@/features/myTravel/interfaces/expense.interface';
import { roundDecimal } from '@/shared/lib/utils';
import { useSession } from 'next-auth/react';
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/expenseEnum';

export const useCalcExpense = (expenses: IExpenseResponse[]) => {
  const { data: userInfo } = useSession();

  /** 타겟 일정 찾기 */
  const findTargetDay = (_expenses: IExpenseResponse[], day: number) => {
    return _expenses.find((e) => e.day === day);
  };

  /** 내 지출 가져오기 */
  const getMySpendList = (_list: IExpenseList[]) => {
    let mySpendedList: ISpender[] = [];
    _list.forEach((list) => {
      const findMySpend = list.spender.find(
        (spender) => spender.member.userId === userInfo?.user?.id,
      );

      if (findMySpend) {
        mySpendedList.push(findMySpend);
      }
    });
    return mySpendedList;
  };

  // = = = = = = = = = = = = = = = = = = = = = = = = = =
  // 일정별
  // = = = = = = = = = = = = = = = = = = = = = = = = = =

  /** 일정 별 지출 총액 */
  const getDailyAllSpend = useCallback((day: number) => {
    const targetDay = findTargetDay(expenses, day);

    if (!targetDay) return 0;

    // const dailySpend = targetDay.expenseList.reduce(
    //   (sum, item) => sum + item.calcExchangeAmount,
    //   0,
    // );

    return Math.max(0, roundDecimal(targetDay.dailyExpense));
  }, []);

  /** 일정 별 내 지출 */
  const getDailyMySpend = useCallback(
    (day: number) => {
      const targetDay = findTargetDay(expenses, day);
      if (!targetDay) return 0;

      const mySpendedList = getMySpendList(targetDay.expenseList);
      if (!mySpendedList.length) return 0;

      const dailyMySpend = mySpendedList.reduce(
        (sum, item) => sum + item?.calcExchangeAmount || 0,
        0,
      );

      return Math.max(0, roundDecimal(dailyMySpend));
    },
    [expenses],
  );

  /** 일정 별, 통화 별 총 지출 */
  const getDailyAllSpendByCurrency = useCallback(
    (day: number) => {
      const targetDay = findTargetDay(expenses, day);

      if (!targetDay) return [];

      const reduceSpend = targetDay.expenseList.reduce(
        (acc, item) => {
          const currencyCode = item.currencyCode;
          const amount = item.amount;
          const calcExchangeAmount = item.calcExchangeAmount;

          if (!acc[currencyCode]) {
            acc[currencyCode] = { amount: 0, calcCurrencyAmount: 0 };
          }

          acc[currencyCode].amount += amount;
          acc[currencyCode].calcCurrencyAmount += calcExchangeAmount;
          return acc;
        },
        {} as Record<string, { amount: number; calcCurrencyAmount: number }>,
      );

      return Object.entries(reduceSpend).map(([currency, spend]) => ({
        currency,
        spend: roundDecimal(spend.amount),
        calcSpend: roundDecimal(spend.calcCurrencyAmount),
      }));
    },
    [expenses],
  );

  /** 일정 별, 통화 별 내 지출 */
  const getDailyMySpendByCurrency = useCallback(
    (day: number) => {
      const targetDay = findTargetDay(expenses, day);

      if (!targetDay) return 0;

      const mySpendedList = getMySpendList(targetDay.expenseList);

      if (!mySpendedList.length) return [];

      const reduceSpend = mySpendedList.reduce(
        (acc, item) => {
          const currencyLabel = item.currencyCode;
          const amount = item.amount;
          const calcExchangeAmount = item.calcExchangeAmount;

          if (!acc[currencyLabel]) {
            acc[currencyLabel] = { amount: 0, calcCurrencyAmount: 0 };
          }

          acc[currencyLabel].amount += amount;
          acc[currencyLabel].calcCurrencyAmount += calcExchangeAmount;
          return acc;
        },
        {} as Record<string, { amount: number; calcCurrencyAmount: number }>,
      );

      return Object.entries(reduceSpend).map(([currency, spend]) => ({
        currency,
        spend: roundDecimal(spend.amount),
        calcSpend: roundDecimal(spend.calcCurrencyAmount),
      }));
    },
    [expenses],
  );

  // = = = = = = = = = = = = = = = = = = = = = = = = = =
  // 카테고리별
  // = = = = = = = = = = = = = = = = = = = = = = = = = =

  /** 카테고리별 지출 총액 */
  const getCategorySpend = useCallback(
    (category: EXPENSES_CATEGORY_TYPE) => {
      let catergoryItems: IExpenseList[] = [];
      expenses.forEach((expense) =>
        expense.expenseList.forEach((list) => {
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
    [expenses],
  );

  /** 카테고리별 내 지출 총액 */
  const getCategoryMySpend = useCallback(
    (category: EXPENSES_CATEGORY_TYPE) => {
      let catergoryItems: IExpenseList[] = [];
      expenses.forEach((expense) =>
        expense.expenseList.forEach((list) => {
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
    [expenses],
  );

  /** 카테고리별, 통화 별 총 지출 */
  const getCategorySpendByCurrency = useCallback(
    (category: EXPENSES_CATEGORY_TYPE) => {
      let catergoryItems: IExpenseList[] = [];
      expenses.forEach((expense) =>
        expense.expenseList.forEach((list) => {
          if (list.category === category) {
            catergoryItems.push(list);
          }
        }),
      );

      const reduceSpend = catergoryItems.reduce(
        (acc, item) => {
          const category = item.category;
          const currencyLabel = item.currencyCode;
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
    [expenses],
  );

  /** 카테고리별, 통화별 내 지출 */
  const getCategoryMySpendByCurrency = useCallback(
    (category: EXPENSES_CATEGORY_TYPE) => {
      let catergoryItems: IExpenseList[] = [];
      expenses.forEach((expense) =>
        expense.expenseList.forEach((list) => {
          if (list.category === category) {
            catergoryItems.push(list);
          }
        }),
      );

      const mySpendedList = getMySpendList(catergoryItems);

      const reduceSpend = mySpendedList.reduce(
        (acc, item) => {
          const category = item.category;
          const currencyLabel = item.currencyCode;
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
    [expenses],
  );

  // = = = = = = = = = = = = = = = = = = = = = = = = = =
  // 모든날
  // = = = = = = = = = = = = = = = = = = = = = = = = = =

  /** 모든날 총 지출 */
  const getAllTotalSpend = useMemo(() => {
    const totalSpend = expenses.reduce((acc, cur) => acc + cur.dailyExpense, 0);

    return Math.max(0, roundDecimal(totalSpend));
  }, [expenses]);

  /** 모든날 총 내 지출 */
  const getAllTotalMySpend = useMemo(() => {
    const expensesRange = expenses.length;

    let totalSpend = 0;
    for (let i = 0; i < expensesRange; i++) {
      totalSpend += getDailyMySpend(i);
    }

    return Math.max(0, roundDecimal(totalSpend));
  }, [expenses]);

  /** 모든날 통화 별 지출 */
  const getAllTotalSpendByCurrency = useMemo(() => {
    const reduceTotalSpend = expenses.reduce(
      (acc, day) => {
        day.expenseList.forEach((item) => {
          const currencyLabel = item.currencyCode;
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
      {} as Record<string, { totalAmount: number; totalCalcAmount: number }>,
    );

    return Object.entries(reduceTotalSpend).map(([currency, data]) => ({
      currency,
      spend: roundDecimal(data.totalAmount),
      calcSpend: roundDecimal(data.totalCalcAmount),
    }));
  }, [expenses]);

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

  return {
    getDailyAllSpend,
    getDailyMySpend,
    getDailyAllSpendByCurrency,
    getDailyMySpendByCurrency,
    getCategorySpend,
    getCategoryMySpend,
    getCategorySpendByCurrency,
    getCategoryMySpendByCurrency,
    getAllTotalSpend,
    getAllTotalMySpend,
    getAllTotalSpendByCurrency,
  };
};
