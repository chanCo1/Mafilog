/**
 * @file: TimelineStatistic.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 타임라인 지출 통계 컴포넌트
 */

'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/shared/lib/utils';
import { EXPENSE_CATEGORY_LIST } from '@/features/myTravel/constants/expense.constant';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import DoughnutChart from '@/shared/components/chart/DoughnutChart';
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/expenseEnum';
import { convertComma, getPercent, convertCategory } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';

interface ITimelineStatistic {
  title: string;
}

export default function TimelineStatistic({
  title,
}: ITimelineStatistic) {
  const getChartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [10, 20, 30, 20, 20, 0];
    const backgroundColor: string[] = [];

    const categoryExpense: Record<string, number> = {};

    EXPENSE_CATEGORY_LIST.forEach((list) => {
      labels.push(list.label);
      // data.push(
      //   getPercent({
      //     numer: categorySpend(list.value),
      //     deno: totalSpend(),
      //   }),
      // );

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

      // categoryExpense[list.value] = categorySpend(list.value);
    });

    // const mostCategory = Object.keys(categoryExpense).reduce(
    //   (a, b) => (categoryExpense[a] > categoryExpense[b] ? a : b),
    //   '0',
    // );

    return {
      labels,
      data,
      // mostCategory,
      backgroundColor,
    };
  }, []);

  return (
    <div className="desktop:sticky desktop:top-13 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-lg">{title ?? 'faefqefqef'}</p>
        <span className="text-state-error text-xxl font-bold">
          {convertComma(99999)}원
        </span>
      </div>
      <div>
        <DoughnutChart
          backgroundColor={getChartData.backgroundColor}
          data={getChartData.data}
          labels={getChartData.labels}
        />
        <div className="flex items-baseline justify-center">
          <span className="font-bold">
            {/* {convertCategory(
              getChartData.mostCategory as EXPENSES_CATEGORY_TYPE,
            )} */}
            {convertCategory('bus')}
          </span>
          <span className="text-sm">에 가장 많이 지출했어요</span>
        </div>
      </div>
      {EXPENSE_CATEGORY_LIST.map((list, index) => (
        <Card key={`${list.value}-${index}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1">
              <CategoryIcon variant={list.value} circled="none" size="sm" />
              <p className="font-bold">{list.label}</p>
              <span className="text-text-secondary">
                {
                  /* {getPercent({
                  numer: categorySpend(list.value),
                  deno: totalSpend(),
                })} */ 0
                }
                %
              </span>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-state-error text-lg font-bold">
                {/* {convertComma(categorySpend(list.value))}원 */}
                {0}원
              </p>
              {/* {categorySpendByCurrency(list.value).map((currency, index) => (
                <CurrencySpend
                  key={`${currency.currency}-${index}`}
                  currency={currency.currency}
                  spend={currency.spend}
                  calcExchangeRate={currency.calcSpend}
                />
              ))} */}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
