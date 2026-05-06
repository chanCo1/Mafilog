/**
 * @file: ExpensesCard.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: ExpensesCard 컴포넌트, 지출 내역 카드
 */

import { useMemo } from 'react';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { ICON_TYPE } from '@/shared/types/Enum';
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/expenseEnum';
import { TIconList } from '@/shared/types/expenseEnum';

interface IExpensesCard {
  type: string;
  name: string;
  payer: string; // 결제자
  spender: string; // 지줄차
  paymentMethod: string; // 결제 방식
  currency: string;
}

export default function ExpensesCard({
  name,
  type,
  currency,
  payer,
  paymentMethod,
  spender,
}: IExpensesCard) {
  /** 아이콘 타입 가져오기 */
  const getCategoryType = useMemo(() => {
    switch (type) {
      case EXPENSES_CATEGORY_TYPE.BUS:
        return ICON_TYPE.BUS;
      case EXPENSES_CATEGORY_TYPE.HOUSE:
        return ICON_TYPE.HOUSE;
      case EXPENSES_CATEGORY_TYPE.TOUR:
        return ICON_TYPE.TOUR;
      case EXPENSES_CATEGORY_TYPE.SHOPPING:
        return ICON_TYPE.SHOPPING;
      case EXPENSES_CATEGORY_TYPE.FOOD:
        return ICON_TYPE.FOOD;
      case EXPENSES_CATEGORY_TYPE.ETC:
        return ICON_TYPE.ETC;
      default:
        return ICON_TYPE.ETC;
    }
  }, [type]);

  return (
    <div className="flex w-full gap-3">
      <div className="flex items-center justify-center">
        <div className="shrink-0">
          <CategoryIcon variant={getCategoryType as TIconList} />
        </div>
      </div>
      <div className="w-full">
        <Card
          variant="shadowedWhite"
          className="flex flex-col items-start justify-center"
        >
          <span className="text-sm">{currency}</span>
          <p className="text-lg font-bold">{name}</p>
          <div className="text-text-secondary text-sm">
            {payer && (
              <>
                <span>결제: {payer}</span>&nbsp;&#8226;&nbsp;
              </>
            )}
            {paymentMethod && <span>{paymentMethod}</span>}
            {spender && <span> / 지출: {spender}</span>}
          </div>
        </Card>
      </div>
    </div>
  );
}
