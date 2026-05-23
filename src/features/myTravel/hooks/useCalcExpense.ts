import { useMemo, useCallback } from 'react';
import {
  IExpenseResponse,
  IExpenseList,
  ISpender,
} from '@/features/myTravel/interfaces/expense.interface';
import { roundDecimal } from '@/shared/lib/utils';
import { useSession } from 'next-auth/react';

export const useCalcExpense = (expenses: IExpenseResponse[]) => {
  const { data: userInfo } = useSession();

  /** 타겟 일정 찾기 */
  const findTargetDay = (expenses: IExpenseResponse[], day: number) => {
    return expenses.find((e) => e.day === day);
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

  /** 일정 별 내 지출 */
  const getDailyMySpend = useCallback((day: number) => {
    const targetDay = findTargetDay(expenses, day);
    if (!targetDay) return 0;

    const mySpendedList = getMySpendList(targetDay.expenseList);
    if (!mySpendedList.length) return 0;

    const dailyMySpend = mySpendedList.reduce(
      (sum, item) => sum + item?.calcExchangeAmount || 0,
      0,
    );

    return Math.max(0, roundDecimal(dailyMySpend));
  }, [expenses]);

  return {
    getDailyMySpend,
  };
};
