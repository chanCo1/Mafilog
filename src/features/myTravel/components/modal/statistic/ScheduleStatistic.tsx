/**
 * @file: ScheduleStatistic.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: 통계 > 일정별 컴포넌트
 */

import { useState, useMemo } from 'react';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { convertComma, getPercent } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import CurrencySpend from '@/features/myTravel/components/detail/expnese/CurrencySpend';
import BarChart from '@/shared/components/chart/BarChart';

interface IScheduleStatistic {
  isShowMySpend: boolean;
}

export default function ScheduleStatistic({
  isShowMySpend,
}: IScheduleStatistic) {
  const expenses = useTravelExpenseStore((state) => state.expenses);
  const {
    getAllTotalSpend,
    getAllTotalMySpend,
    getDailyAllSpend,
    getDailyMySpend,
    getDailyAllSpendByCurrency,
    getDailyMySpendByCurrency,
  } = useTravelExpenseStore();

  const totalSpend = isShowMySpend ? getAllTotalMySpend : getAllTotalSpend;
  const dailySpend = isShowMySpend ? getDailyMySpend : getDailyAllSpend;
  const dailySpendByCurrency = isShowMySpend
    ? getDailyMySpendByCurrency
    : getDailyAllSpendByCurrency;

  const getBarChartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    const dayMap: Record<number, number> = {};

    expenses.forEach((expense) => {
      labels.push(expense.day === 0 ? '여행전' : `${expense.day}일차`);
      data.push(dailySpend(expense.day));

      dayMap[expense.day] = dailySpend(expense.day);
    });

    const maxDay = Object.keys(dayMap).reduce(
      (a, b) => (dayMap[Number(a)] > dayMap[Number(b)] ? a : b),
      '0',
    );

    return {
      labels,
      data,
      maxDay,
    };
  }, [dailySpend, expenses]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <BarChart labels={getBarChartData.labels} data={getBarChartData.data} />
        <div className="flex items-baseline justify-center">
          {totalSpend() ? (
            <>
              <span className="font-bold">
                {getBarChartData.maxDay === '0'
                  ? '여행전'
                  : `${getBarChartData.maxDay}일차`}
              </span>
              <span className="text-sm">에 가장 많이 지출했어요</span>
            </>
          ) : (
            <span className="text-sm text-text-secondary">아직 지출 내역이 없어요</span>
          )}
        </div>
      </div>
      {expenses.map((expense, index) => (
        <Card key={`${expense.day}-${index}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-baseline gap-1">
              <p className="font-bold">
                {expense.day === 0 ? '여행전' : `${expense.day}일차`}
              </p>
              <span className="text-text-secondary">
                {getPercent({
                  numer: dailySpend(expense.day),
                  deno: totalSpend(),
                })}
                %
              </span>
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
