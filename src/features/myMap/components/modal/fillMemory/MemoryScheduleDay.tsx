/**
 * @file: MemoryScheduleDay.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: MemoryScheduleDay 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { convertFormattedDate, getDay } from '@/shared/lib/utils';
import MemoryScheduleTimeline from '@/features/myMap/components/modal/fillMemory/MemoryScheduleTimeline';
import { ISchedule } from '@/shared/interfaces/travelScheduleStore.interface';

interface IMemoryScheduleDay {
  day: number;
  date: Date;
  list: ISchedule['list'];
}

export default function MemoryScheduleDay({
  day,
  date,
  list,
}: IMemoryScheduleDay) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold">{`${day}일차`}</span>
        <span className="text-text-secondary">
          {convertFormattedDate(date, 'MM월 dd일')} ({getDay(date)})
        </span>
      </div>
      <div className="flex flex-col">
        {list.length ? (
          <>
            {list.map((_data, index) => (
              <MemoryScheduleTimeline
                key={`${_data.place?.id}-${index}`}
                timeLineData={_data}
                dailyAllSchedule={list}
                currentIndex={index}
              />
            ))}
          </>
        ) : (
          <p className='text-text-secondary'>등록된 일정이 없습니다</p>
        )}
      </div>
    </div>
  );
}