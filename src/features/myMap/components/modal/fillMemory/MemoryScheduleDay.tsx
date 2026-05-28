/**
 * @file: MemoryScheduleDay.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: MemoryScheduleDay 컴포넌트
 */

import { convertFormattedDate, getDay } from '@/shared/lib/utils';
import MemoryScheduleTimeline from '@/features/myMap/components/modal/fillMemory/MemoryScheduleTimeline';
import { IMemoryScheduleResponse } from '@/features/myMap/interfaces/memory.interface';
import { IHandleUpdateSchedule } from '@/features/myMap/interfaces/memory.interface';

interface IMemoryScheduleDay {
  schedule: IMemoryScheduleResponse;
  onUpdateSchedule?: ({
    day,
    key,
    listId,
    value,
  }: IHandleUpdateSchedule) => void;
  readonly?: boolean; 
}

export default function MemoryScheduleDay({
  schedule,
  onUpdateSchedule,
  readonly,
}: IMemoryScheduleDay) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold">{`${schedule.day}일차`}</span>
        <span className="text-text-secondary">
          {convertFormattedDate(schedule.date, 'MM월 dd일')} (
          {getDay(schedule.date)})
        </span>
      </div>
      <div className="flex flex-col">
        {schedule.scheduleList.length ? (
          <>
            {schedule.scheduleList.map((_data, index) => (
              <MemoryScheduleTimeline
                key={`${_data.place?.id}-${index}`}
                timeLineData={_data}
                dailyAllSchedule={schedule.scheduleList}
                currentIndex={index}
                onUpdateSchedule={onUpdateSchedule}
                readonly={readonly}
              />
            ))}
          </>
        ) : (
          <p className="text-text-secondary">등록된 일정이 없어요</p>
        )}
      </div>
    </div>
  );
}
