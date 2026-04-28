/**
 * @file: TravelDetailDay.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelDetailDay 컴포넌트, 일차 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import TravelDetailTimeline from '@/features/myTravel/components/TravelDetailTimeline';
import { convertFormattedDate, getDay } from '@/shared/lib/utils';

interface ITravelDetailDay {
  day: number;
  date: Date;
}

export default function TravelDetailDay({ day, date }: ITravelDetailDay) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold">{`${day}일차`}</span>
        <span className="text-text-secondary">
          {convertFormattedDate(date, 'MM월 dd일')} {getDay(date)}
        </span>
      </div>
      <TravelDetailTimeline type={'location'} />
    </div>
  );
}
