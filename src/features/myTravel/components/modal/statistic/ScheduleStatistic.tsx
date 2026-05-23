/**
 * @file: ScheduleStatistic.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: 통계 > 일정별 컴포넌트
 */

import { useMemo } from 'react';
import { convertComma, getPercent } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import CurrencySpend from '@/features/myTravel/components/detail/expnese/CurrencySpend';
import BarChart from '@/shared/components/chart/BarChart';
import { useCalcExpense } from '@/features/myTravel/hooks/useCalcExpense';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { useGetTravelExpenses } from '@/features/myTravel/hooks/rquery/expense/useGetTravelExpense';

interface IScheduleStatistic {
  isShowMySpend: boolean;
}

export default function ScheduleStatistic({
  isShowMySpend,
}: IScheduleStatistic) {
  const travelId = useGetTravelId();
  const { data: expenseList } = useGetTravelExpenses(travelId);
  const {
    getAllTotalMySpend,
    getAllTotalSpend,
    getDailyMySpend,
    getDailyAllSpend,
    getDailyMySpendByCurrency,
    getDailyAllSpendByCurrency,
  } = useCalcExpense(expenseList ?? []);

  const totalSpend = isShowMySpend ? getAllTotalMySpend : getAllTotalSpend;
  const dailySpend = isShowMySpend ? getDailyMySpend : getDailyAllSpend;
  const dailySpendByCurrency = isShowMySpend
    ? getDailyMySpendByCurrency
    : getDailyAllSpendByCurrency;

  const getBarChartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    const dailyExpense: Record<number, number> = {};

    expenseList?.forEach((expense) => {
      labels.push(expense.day === 0 ? '여행전' : `${expense.day}일차`);
      data.push(dailySpend(expense.day));

      dailyExpense[expense.day] = dailySpend(expense.day);
    });

    const mostDay = Object.keys(dailyExpense).reduce(
      (a, b) => (dailyExpense[Number(a)] > dailyExpense[Number(b)] ? a : b),
      '0',
    );

    return {
      labels,
      data,
      mostDay,
    };
  }, [dailySpend, expenseList]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        {totalSpend ? (
          <BarChart
            labels={getBarChartData.labels}
            data={getBarChartData.data}
          />
        ) : null}
        <div className="flex items-baseline justify-center">
          {totalSpend ? (
            <>
              <span className="font-bold">
                {getBarChartData.mostDay === '0'
                  ? '여행전'
                  : `${getBarChartData.mostDay}일차`}
              </span>
              <span className="text-sm">에 가장 많이 지출했어요</span>
            </>
          ) : (
            <span className="text-text-secondary text-sm">
              아직 지출 내역이 없어요
            </span>
          )}
        </div>
      </div>
      {expenseList?.map((expense, index) => (
        <Card key={`${expense.day}-${index}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-baseline gap-1">
              <p className="font-bold">
                {expense.day === 0 ? '여행전' : `${expense.day}일차`}
              </p>
              <span className="text-text-secondary">
                {getPercent({
                  numer: dailySpend(expense.day),
                  deno: totalSpend,
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
                  currencyCountry={currency.currencyCountry}
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
