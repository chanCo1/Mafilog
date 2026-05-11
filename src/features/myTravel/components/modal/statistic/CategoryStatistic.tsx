/**
 * @file: CategoryStatistic.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: 통계 모달 > 카테고리별 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { convertComma } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import CurrencySpend from '@/features/myTravel/components/detail/expnese/CurrencySpend';
import { EXPENSE_CATEGORY_LIST } from '@/features/myTravel/constants/expense.constant';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';

interface ICategoryStatistic {}

export default function CategoryStatistic() {
  const { getCategorySpend, getCategorySpendByCurrency } =
    useTravelExpenseStore();

  return (
    <div className="flex flex-col gap-3">
      {EXPENSE_CATEGORY_LIST.map((list, index) => (
        <Card key={`${list.value}-${index}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1">
              <CategoryIcon variant={list.value} circled="none" size="sm" />
              <p className="font-bold">{list.label}</p>
              <span className="text-text-secondary">{0}%</span>
            </div>
            <div className="flex flex-col">
              <p className="text-state-error text-lg font-bold">
                {convertComma(getCategorySpend(list.value))}원
              </p>
              {getCategorySpendByCurrency(list.value).map((currency, index) => (
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
