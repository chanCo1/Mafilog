/**
 * @file: CategoryStatistic.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: 통계 모달 > 카테고리별 컴포넌트
 */

import { useMemo } from 'react';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { convertComma, getPercent, convertCategory } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import CurrencySpend from '@/features/myTravel/components/detail/expnese/CurrencySpend';
import { EXPENSE_CATEGORY_LIST } from '@/features/myTravel/constants/expense.constant';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import DoughnutChart from '@/shared/components/chart/DoughnutChart';
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/expenseEnum';

interface ICategoryStatistic {
  isShowMySpend: boolean;
}

export default function CategoryStatistic({
  isShowMySpend,
}: ICategoryStatistic) {
  const {
    expenses,
    getAllTotalSpend,
    getAllTotalMySpend,
    getCategorySpend,
    getCategorySpendByCurrency,
    getCategoryMySpend,
    getCategoryMySpendByCurrency,
  } = useTravelExpenseStore();

  const totalSpend = isShowMySpend ? getAllTotalMySpend : getAllTotalSpend;
  const categorySpend = isShowMySpend ? getCategoryMySpend : getCategorySpend;
  const categorySpendByCurrency = isShowMySpend
    ? getCategoryMySpendByCurrency
    : getCategorySpendByCurrency;

  const getChartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [];

    const categoryExpense: Record<string, number> = {};

    EXPENSE_CATEGORY_LIST.forEach((list) => {
      labels.push(list.label);
      data.push(
        getPercent({
          numer: categorySpend(list.value),
          deno: totalSpend(),
        }),
      );

      switch (list.value) {
        case EXPENSES_CATEGORY_TYPE.BUS:
          backgroundColor.push('rgba(129,226,226)');
          break;
        case EXPENSES_CATEGORY_TYPE.HOUSE:
          backgroundColor.push('rgba(97,228,197)');
          break;
        case EXPENSES_CATEGORY_TYPE.FOOD:
          backgroundColor.push('rgba(255,212,101)');
          break;
        case EXPENSES_CATEGORY_TYPE.SHOPPING:
          backgroundColor.push('rgba(128,178,255)');
          break;
        case EXPENSES_CATEGORY_TYPE.TOUR:
          backgroundColor.push('rgba(255,150,146)');
          break;
        case EXPENSES_CATEGORY_TYPE.ETC:
          backgroundColor.push('rgba(103,103,103)');
          break;
      }

      categoryExpense[list.value] = categorySpend(list.value);
    });

    const mostCategory = Object.keys(categoryExpense).reduce(
      (a, b) => (categoryExpense[a] > categoryExpense[b] ? a : b),
      '0',
    );

    return {
      labels,
      data,
      mostCategory,
      backgroundColor,
    };
  }, [expenses, categorySpend]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <DoughnutChart
          backgroundColor={getChartData.backgroundColor}
          data={getChartData.data}
          labels={getChartData.labels}
        />
        <div className="flex items-baseline justify-center">
          {totalSpend() ? (
            <>
              <span className="font-bold">
                {convertCategory(
                  getChartData.mostCategory as EXPENSES_CATEGORY_TYPE,
                )}
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
      {EXPENSE_CATEGORY_LIST.map((list, index) => (
        <Card key={`${list.value}-${index}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1">
              <CategoryIcon variant={list.value} circled="none" size="sm" />
              <p className="font-bold">{list.label}</p>
              <span className="text-text-secondary">
                {getPercent({
                  numer: categorySpend(list.value),
                  deno: totalSpend(),
                })}
                %
              </span>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-state-error text-lg font-bold">
                {convertComma(categorySpend(list.value))}원
              </p>
              {categorySpendByCurrency(list.value).map((currency, index) => (
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
