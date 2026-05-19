/**
 * @file: TravelScheduleDay.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelScheduleDay 컴포넌트, 일차 컴포넌트
 */

import TravelScheduleTimeline from '@/features/myTravel/components/detail/schedule/TravelScheduleTimeline';
import { convertFormattedDate, getDay } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { useSelectSchedules } from '@/features/myTravel/store/useSelectSchedules';
import { ILabelValue } from '@/shared/interfaces';
import { IScheduleResponse } from '@/features/myTravel/interfaces/schedule.interface';

interface ITravelScheduleDay {
  schedule: IScheduleResponse;
  selectMode: boolean;
}

export default function TravelScheduleDay({
  schedule,
  selectMode,
}: ITravelScheduleDay) {
  const { selectedSchedules, toggleDayAll } = useSelectSchedules();

  // 현재 일차의 list 아이템들이 모두 selectedSchedules에 포함되어 있는지 확인
  const isAllSelected =
    schedule.scheduleList.length > 0 &&
    schedule.scheduleList.every((item) =>
      selectedSchedules.some((selected) => selected.id === item.id),
    );

  const handleAllCheck = (checked: boolean | ILabelValue[]) => {
    toggleDayAll(schedule.scheduleList, !checked as boolean);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1">
        {selectMode && (
          <Checkbox value={isAllSelected} onChange={handleAllCheck} />
        )}
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
              <TravelScheduleTimeline
                key={`${_data.place?.id}-${index}`}
                timeLineData={_data}
                dailyAllSchedule={schedule.scheduleList}
                currentIndex={index}
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
