/**
 * @file: TravelExpneses.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpneses 컴포넌트, 여행 가계부탭 하위 내용
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import { getTravelDay } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';

interface ITravelExpneses {
  from: Date;
  to: Date;
}

export default function TravelExpneses({ from, to }: ITravelExpneses) {
  const [selectedDay, setSelectedDay] = useState(1);

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
          {Array.from({ length: getTravelDay(from, to) }).map((_, index) => {
            const _day = index + 1;
            const dupDate = new Date(from);
            dupDate.setDate(from.getDate() + index);

            return (
              // <TravelDetailScheduleDay
              //   key={`${dupDate}-${index}`}
              //   day={_day}
              //   date={dupDate}
              //   // schedule={TRAVEL_DETAIL_MOCK_DATA.schedule}
              // />
              <>ㅁㄴㅇ</>
            );
          })}
        </>
      }
      dayButtons={
        <>
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
      stautsArea={<>asd</>}
    />
  );
}
