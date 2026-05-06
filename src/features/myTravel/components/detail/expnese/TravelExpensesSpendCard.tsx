/**
 * @file: TravelExpensesSpendCard.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpensesSpendCard 컴포넌트, 지출 내역 노출 카드
 */

import { Card } from '@/shared/components/ui/Card';

interface ITravelExpensesSpendCard {
  selectedDay: string | number;
  isMySpend?: boolean;
}

export default function TravelExpensesSpendCard({
  selectedDay,
  isMySpend,
}: ITravelExpensesSpendCard) {
  return (
    <Card className="w-1/2">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-bold">
            {selectedDay} {isMySpend && '내'} 지출
          </p>
          <TravelExpensesSubSpend currency="KRW" />
        </div>
        <div className="text-state-error flex justify-end pt-2.5 text-xl font-bold">
          <span>{0}원</span>
        </div>
      </div>
    </Card>
  );
}

const TravelExpensesSubSpend = ({ currency }: { currency: string }) => (
  <div className="flex items-start justify-between font-bold">
    <p className="pt-1">{currency}</p>
    <div className="flex flex-col items-end">
      <span className="text-state-error text-lg">{0}원</span>
      <span className="text-text-secondary text-sm">{0}원</span>
    </div>
  </div>
);
