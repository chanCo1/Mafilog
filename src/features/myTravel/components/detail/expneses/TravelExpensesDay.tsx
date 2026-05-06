/**
 * @file: TravelExpensesDay.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpensesDay 컴포넌트, 가계부 일차별 지출
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { convertFormattedDate, getDay } from '@/shared/lib/utils';
import TravelExpensesTimeline from '@/features/myTravel/components/detail/expneses/TravelExpensesTimeline';

interface ITravelExpensesDay {
  day?: number;
  date?: Date;
  isBefore?: boolean;
}

export default function TravelExpensesDay({
  day,
  date,
  isBefore,
}: ITravelExpensesDay) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className='flex justify-between'>
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold">
            {isBefore ? '여행전' : `${day}일차`}
          </span>
          {isBefore ? null : (
            <span className="text-text-secondary">
              {date && (
                <>
                  {convertFormattedDate(date, 'MM월 dd일')} {getDay(date)}
                </>
              )}
            </span>
          )}
        </div>
        <div className='flex items-end gap-1'>
          <span className='text-sm'>지출</span>
          <span className='font-bold'>{0}원</span>
        </div>
      </div>
      <div className="flex flex-col">
        <TravelExpensesTimeline />
      </div>
    </div>
  );
}
