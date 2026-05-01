/**
 * @file: TravelExpenses.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpenses 컴포넌트, 여행 가계부탭 하위 내용
 */

import { memo, useState } from 'react';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import { getTravelDay } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import TravelExpensesDay from '@/features/myTravel/components/detail/expneses/TravelExpensesDay';
import { Card } from '@/shared/components/ui/Card';
import TravelExpensesSpendCard from '@/features/myTravel/components/detail/expneses/TravelExpensesSpendCard';

interface ITravelExpensesView {
  from: Date;
  to: Date;
}

const TRAVEL_EXPENSES_BEFORE_LIST = [
  { label: '모든날', value: 'all' },
  { label: '여행전', value: 'before' },
];

function TravelExpensesView({ from, to }: ITravelExpensesView) {
  const [selectedDay, setSelectedDay] = useState<string | number>(
    TRAVEL_EXPENSES_BEFORE_LIST[0].value,
  );

  return (
    <TravelDetailTemplate
      handleButtons={
        <>
          <Button variant="gray" size="sm">
            선택 수정
          </Button>
          <Button variant="secondary" size="sm">
            지출 추가
          </Button>
        </>
      }
      dayTimelines={
        <>
          <TravelExpensesDay isBefore />
          {Array.from({ length: getTravelDay(from, to) }).map((_, index) => {
            const _day = index + 1;
            const dupDate = new Date(from);
            dupDate.setDate(from?.getDate() + index);

            return (
              <TravelExpensesDay
                key={`${dupDate}-${index}`}
                day={_day}
                date={dupDate}
                // schedule={TRAVEL_DETAIL_MOCK_DATA.schedule}
              />
            );
          })}
        </>
      }
      dayButtons={
        <>
          {TRAVEL_EXPENSES_BEFORE_LIST.map((list, index) => (
            <Chip
              key={index}
              size="md"
              className="shrink-0"
              variant={
                selectedDay === list.value ? 'primary' : 'primaryOutline'
              }
              onClick={() => setSelectedDay(list.value)}
            >
              {list.label}
            </Chip>
          ))}
          {Array.from({ length: getTravelDay(from, to) }).map((_, index) => (
            <Chip
              key={index}
              size="md"
              className="shrink-0"
              variant={selectedDay === index + 1 ? 'primary' : 'primaryOutline'}
              onClick={() => setSelectedDay(index + 1)}
            >{`${index + 1}일차`}</Chip>
          ))}
        </>
      }
      stautsArea={
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2.5">
            <TravelExpensesSpendCard selectedDay={selectedDay} />
            <TravelExpensesSpendCard selectedDay={selectedDay} isMySpend />
          </div>
          <Card className="">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">여행 총 지출</p>
              <div className="text-state-error text-h3 flex justify-end font-bold">
                <span>{0}원</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex flex-col items-end">
                <div className="flex items-end gap-2">
                  <p>KRW</p>
                  <span className="text-state-error text-lg font-bold">
                    {0}원
                  </span>
                </div>
                <span className="text-text-secondary text-sm">{0}원</span>
              </div>
            </div>
          </Card>
        </div>
      }
    />
  );
}

export default memo(TravelExpensesView);
