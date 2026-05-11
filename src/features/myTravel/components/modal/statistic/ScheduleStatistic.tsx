/**
 * @file: ScheduleStatistic.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: 통계 > 일정별 컴포넌트
 */

import { useState } from 'react';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { convertComma } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import CurrencySpend from '@/features/myTravel/components/detail/expnese/CurrencySpend';

interface IScheduleStatistic {
  isShowMySpend: boolean;
}

export default function ScheduleStatistic({
  isShowMySpend,
}: IScheduleStatistic) {
  const expenses = useTravelExpenseStore((state) => state.expenses);
  const {
    getDailyAllSpend,
    getDailyMySpend,
    getDailyAllSpendByCurrency,
    getDailyMySpendByCurrency,
  } = useTravelExpenseStore();

  const dailySpend = isShowMySpend ? getDailyMySpend : getDailyAllSpend;
  const dailySpendByCurrency = isShowMySpend
    ? getDailyMySpendByCurrency
    : getDailyAllSpendByCurrency;

  return (
    <div className="flex flex-col gap-3">
      {expenses.map((expense, index) => (
        <Card key={`${expense.day}-${index}`}>
          <div className="flex items-start justify-between">
            <div className='flex items-baseline gap-1'>
              <p className="font-bold">
                {expense.day === 0 ? '여행전' : `${expense.day}일차`}
              </p>
              <span className='text-text-secondary text-sm font-bold'>{0}%</span>
            </div>
            <div className="flex flex-col">
              <p className="text-state-error text-lg font-bold">
                {convertComma(dailySpend(expense.day))}원
              </p>
              {dailySpendByCurrency(expense.day).map((currency, index) => (
                <CurrencySpend
                  key={`${currency.currency}-${index}`}
                  currency={currency.currency}
                  spend={currency.spend}
                  calcExchangeRate={currency.calcSpend}
                />
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
