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
  }, [expenses]);

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

      if (!targetDay) return [];

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

  // = = = = = = = = = = = = = = = = = = = = = = = = = =
  // 정산. 통계
  // = = = = = = = = = = = = = = = = = = = = = = = = = =

  /** 멤버별 총 결제 금액 */
  const getTotalPaymentAmountByMember = useCallback(
    (id: string) => {
      const totalAmount = expenses.reduce((acc, day) => {
        const dayTotal = day.expenseList
          .filter((item) => item.payer.userId === id)
          .reduce((sum, item) => sum + item.calcExchangeAmount, 0);
        return acc + dayTotal;
      }, 0);

      return roundDecimal(totalAmount);
    },
    [expenses],
  );

  /** 멤버별 총 지출 금액 */
  const getTotalSpendAmountByMember = useCallback(
    (id: string) => {
      const total = expenses.reduce((acc, day) => {
        return (
          acc +
          day.expenseList.reduce((dayAcc, item) => {
            const mySpend = item.spender.find(
              (_spender) => _spender.member.userId === id,
            );
            return dayAcc + (mySpend ? mySpend.calcExchangeAmount : 0);
          }, 0)
        );
      }, 0);

      return roundDecimal(total);
    },
    [expenses],
  );

  /** 결제자, 지출자 리스트 */
  const getSettlementList = useMemo(() => {
    const settlementMap: Record<string, number> = {};

    expenses.forEach((day) => {
      day.expenseList.forEach((item) => {
        // 결제자 정보
        const payerInfo = {
          label: item.payer.name,
          value: item.payer.userId,
        };

        item.spender.forEach((spender) => {
          // 지출자 정보
          const spenderInfo = {
            label: spender.name,
            value: spender.member.userId,
          };

          if (payerInfo.value !== spenderInfo.value) {
            // 결제자와 지출자가 다르면 키 생성
            const key = `${spenderInfo.value}_${payerInfo.value}`;

            settlementMap[key] =
              (settlementMap[key] || 0) + spender.calcExchangeAmount;
          }
        });
      });
    });

    return Object.entries(settlementMap).map(([key, amount]) => {
      const [fromId, toId] = key.split('_');
      return {
        fromId,
        toId,
        amount: roundDecimal(amount),
      };
    });
  }, [expenses]);

  /** 최종 정산 내역 */
  const getFinalSettlement = useMemo(() => {
    const settlementMap: Record<string, number> = {};

    getSettlementList.forEach((_list) => {
      const { fromId, toId, amount } = _list;

      // 정렬 후 키 생성
      const sortedIds = [fromId, toId].sort();
      const key = `${sortedIds[0]}_${sortedIds[1]}`;

      if (!settlementMap[key]) settlementMap[key] = 0;

      // 정렬된 순서에서 맨앞과 보낼 사람이 같으면 더하고, 다르면 빼기
      if (fromId === sortedIds[0]) {
        settlementMap[key] += amount;
      } else {
        settlementMap[key] -= amount;
      }
    });

    return (
      Object.entries(settlementMap)
        .map(([key, finalAmount]) => {
          const [id1, id2] = key.split('_');

          return {
            // 결과값이 양수면 id1 -> id2 보냄
            // 결과값이 음수면 id2 -> id1 보냄
            sendId: finalAmount > 0 ? id1 : id2,
            receiveId: finalAmount > 0 ? id2 : id1,
            amount: Math.abs(roundDecimal(finalAmount)),
          };
        })
        // 0원인 경우는 제외
        .filter((item) => item.amount > 0)
    );
  }, []);

  /** 내가 받을 금액 구하기 */
  const getMyReceiveAmount = useCallback((id: string) => {
    const myReceiveAmount = getFinalSettlement
      .filter((settle) => settle.receiveId === id)
      .reduce((acc, item) => acc + item.amount, 0);

    return roundDecimal(myReceiveAmount);
  }, []);

  /** 내 순수 지출 구하기 */
  const getMyNetExpense = useCallback((id: string) => {
    const totalPayment = getTotalSpendAmountByMember(id);
    const receiveAmount = getMyReceiveAmount(id);

    const calcAmount = totalPayment - receiveAmount;

    return Math.max(0, roundDecimal(calcAmount));
  }, []);

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
    getTotalPaymentAmountByMember,
    getTotalSpendAmountByMember,
    getSettlementList,
    getFinalSettlement,
    getMyReceiveAmount,
    getMyNetExpense,
  };
};
