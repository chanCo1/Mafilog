/**
 * @file: TravelScheduleDay.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelScheduleDay 컴포넌트, 일차 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import TravelScheduleTimeline from '@/features/myTravel/components/detail/schedule/TravelScheduleTimeline';
import { convertFormattedDate, getDay } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { ISchedule } from '@/shared/interfaces';
import { useSelectSchedules } from '@/features/myTravel/store/useSelectSchedules';
import { ILabelValue } from '@/shared/interfaces';

interface ITravelScheduleDay {
  day: number;
  date: Date;
  list: ISchedule['list'];
  selectMode: boolean;
}

export default function TravelScheduleDay({
  day,
  date,
  list,
  selectMode,
}: ITravelScheduleDay) {
  const { selectedSchedules, toggleDayAll } = useSelectSchedules();

  // 현재 일차의 list 아이템들이 모두 selectedSchedules에 포함되어 있는지 확인
  const isAllSelected =
    list.length > 0 &&
    list.every((item) =>
      selectedSchedules.some((selected) => selected.id === item.id),
    );

  const handleAllCheck = (checked: boolean | ILabelValue[]) => {
    toggleDayAll(list, !checked as boolean);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1">
        {selectMode && (
          <Checkbox value={isAllSelected} onChange={handleAllCheck} />
        )}
        <span className="text-lg font-bold">{`${day}일차`}</span>
        <span className="text-text-secondary">
          {convertFormattedDate(date, 'MM월 dd일')} ({getDay(date)})
        </span>
      </div>
      <div className="flex flex-col">
        {list.length ? (
          <>
            {list.map((_data, index) => (
              <TravelScheduleTimeline
                key={`${_data.place?.id}-${index}`}
                timeLineData={_data}
                dailyAllSchedule={list}
                currentIndex={index}
                day={day}
                selectMode={selectMode}
              />
            ))}
          </>
        ) : (
          <TravelScheduleTimeline />
        )}
      </div>
    </div>
  );
}
