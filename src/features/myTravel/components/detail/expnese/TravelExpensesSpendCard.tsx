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
import CurrencySpend from '@/features/myTravel/components/detail/expnese/CurrencySpend';

const ALL_DAY = 'all'; // 모든날

interface ITravelExpensesSpendCard {
  selectedDay: string | number;
  isMySpend?: boolean;
}

export default function TravelExpensesSpendCard({
  selectedDay,
  isMySpend,
}: ITravelExpensesSpendCard) {
  const {
    getDailyAllSpend,
    getAllTotalSpend,
    getDailyMySpend,
    getAllTotalMySpend,
    // getAllTotalSpendByCurrency,
    // getDailyAllSpendByCurrency,
    // getAllTotalMySpendByCurrency,
    // getDailyMySpendByCurrency,
  } = useTravelExpenseStore();

  /** 일정별 지출 */
  const dailySpend =
    selectedDay === ALL_DAY
      ? getAllTotalSpend()
      : getDailyAllSpend(selectedDay as number);

  /** 일정별 내 지출 */
  const mySpend =
    selectedDay === ALL_DAY
      ? getAllTotalMySpend()
      : getDailyMySpend(selectedDay as number);

  // /** 모든날 통화별 지출 */
  // const dailySpendByCurrency =
  //   selectedDay === ALL_DAY
  //     ? getAllTotalSpendByCurrency()
  //     : getDailyAllSpendByCurrency(selectedDay as number);

  // /** 일정별 통화별 내 지출 */
  // const mySpendByCurrency =
  //   selectedDay === ALL_DAY
  //     ? getAllTotalMySpendByCurrency()
  //     : getDailyMySpendByCurrency(selectedDay as number);

  const getExpenseName = useMemo(() => {
    if (selectedDay === ALL_DAY) {
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
          {/* {isMySpend ? (
            <>
              {mySpendByCurrency.map((currency, index) => (
                <CurrencySpend
                  key={`${currency.currency}-${index}`}
                  currency={currency.currency}
                  spend={currency.spend}
                  calcExchangeRate={currency.calcSpend}
                />
              ))}
            </>
          ) : (
            <>
              {dailySpendByCurrency.map((currency, index) => (
                <CurrencySpend
                  key={`${currency.currency}-${index}`}
                  currency={currency.currency}
                  spend={currency.spend}
                  calcExchangeRate={currency.calcSpend}
                />
              ))}
            </>
          )} */}
        </div>
        <div className="flex items-baseline justify-between font-bold">
          <span className="max-mobile:text-sm">KRW</span>
          <span className="text-state-error max-mobile:text-lg text-xl">
            {convertComma(isMySpend ? mySpend : dailySpend)}원
          </span>
        </div>
      </div>
    </Card>
  );
}
