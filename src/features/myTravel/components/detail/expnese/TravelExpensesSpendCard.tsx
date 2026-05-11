/**
 * @file: TravelExpensesSpendCard.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpensesSpendCard 컴포넌트, 지출 내역 노출 카드
 */

import { Card } from '@/shared/components/ui/Card';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { useMemo } from 'react';
import { convertComma } from '@/shared/lib/utils';

interface ITravelExpensesSpendCard {
  selectedDay: string | number;
  isMySpend?: boolean;
}

export default function TravelExpensesSpendCard({
  selectedDay,
  isMySpend,
}: ITravelExpensesSpendCard) {
  const {
    getDailyTotalSpend,
    getAllTotalSpend,
    getDailyMySpend,
    getAllTotalMySpend,
  } = useTravelExpenseStore();

  const dailySpend =
    selectedDay === 'all'
      ? getAllTotalSpend()
      : getDailyTotalSpend(selectedDay as number);
  const mySpend =
    selectedDay === 'all'
      ? getAllTotalMySpend()
      : getDailyMySpend(selectedDay as number);

  const getExpenseName = useMemo(() => {
    if (selectedDay === 'all') {
      return '모든날';
    }

    if (selectedDay === 0) {
      return '여행전';
    }

    return `${selectedDay}일차`;
  }, [selectedDay]);

  return (
    <Card className="w-1/2">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-bold">
            {getExpenseName} {isMySpend && '내'} 지출
          </p>
          <TravelExpensesSubSpend currency="KRW" />
        </div>
        <div className="text-state-error flex justify-end pt-2.5 text-xl font-bold">
          <span>{convertComma(isMySpend ? mySpend : dailySpend)}원</span>
        </div>
      </div>
    </Card>
  );
}

const TravelExpensesSubSpend = ({ currency }: { currency: string }) => (
  <div className="flex items-start justify-between">
    <p className="pt-1">{currency}</p>
    <div className="flex flex-col items-end font-bold">
      <span className="text-state-error text-lg">{0}원</span>
      {/* <span className="text-text-secondary text-sm">{0}원</span> */}
    </div>
  </div>
);
