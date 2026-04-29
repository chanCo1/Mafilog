/**
 * @file: TravelDetailScheduleDay.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelDetailScheduleDay 컴포넌트, 일차 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import TravelDetailTimeline from '@/features/myTravel/components/detail/schedule/TravelDetailSchduleTimeline';
import { convertFormattedDate, getDay } from '@/shared/lib/utils';

interface ITravelDetailScheduleDay {
  day: number;
  date: Date;
}

export default function TravelDetailScheduleDay({ day, date }: ITravelDetailScheduleDay) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold">{`${day}일차`}</span>
        <span className="text-text-secondary">
          {convertFormattedDate(date, 'MM월 dd일')} {getDay(date)}
        </span>
      </div>
      <div className='flex flex-col'>
        <TravelDetailTimeline type={'location'} />
        <TravelDetailTimeline type={'memo'} />
        <TravelDetailTimeline />
      </div>
    </div>
  );
}
