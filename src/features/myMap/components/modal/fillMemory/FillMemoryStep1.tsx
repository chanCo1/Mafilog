/**
 * @file: FillMemoryStep1.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: FillMemoryStep1 컴포넌트
 */

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Selectbox from '@/shared/components/ui/Selectbox';
import { Chip } from '@/shared/components/ui/Chip';
import { MAP_MOCK_DATA } from '@/features/myMap/data/mockData';
import MemoryScheduleDay from '@/features/myMap/components/modal/fillMemory/MemoryScheduleDay';
import { useGetMyTimelineList } from '@/features/myPage/hooks/rquery/timeline/useGetMyTimelineList';
import { ILabelValue } from '@/shared/interfaces';
import { useGetTravelSchedules } from '@/features/myTravel/hooks/rquery/schedule/useGetTravelSchedules';

interface IFillMemoryStep1 {
  selectedTravel: ILabelValue;
  setSelectedTravel: Dispatch<SetStateAction<ILabelValue>>;
}

export default function FillMemoryStep1({
  selectedTravel,
  setSelectedTravel,
}: IFillMemoryStep1) {
  const [selectedDay, setSelectedDay] = useState(1);

  const { data: timelineList } = useGetMyTimelineList();
  const { data: travelSchedule } = useGetTravelSchedules(
    selectedTravel.value ? selectedTravel.value.toString() : '',
  );

  /** 여행 불러오기 옵션 */
  const loadTravelOptions = useMemo(() => {
    const _timelineList = timelineList?.map((list) => ({
      label: list.title,
      value: list.id,
    }));

    return [{ label: '선택 안함', value: 0 }, ..._timelineList];
  }, [timelineList]);

  const filteredSchedule = travelSchedule?.filter(
    (schedule) => schedule.day === selectedDay,
  );

  return (
    <div className="flex h-full flex-col gap-3">
      <Selectbox
        label="여행 불러오기"
        options={loadTravelOptions}
        isRequired
        value={selectedTravel}
        description="여행 일정을 선택해주세요"
        onChange={(value) => setSelectedTravel(value)}
      />

      {travelSchedule?.length ? (
        <div className="flex h-full flex-col gap-3">
          <h3 className="text-lg font-bold">{MAP_MOCK_DATA.title}</h3>
          <div className="scrollbar-hide flex shrink-0 gap-1 overflow-x-auto">
            {travelSchedule.map((_day, index) => (
              <Chip
                key={`${_day.day}-${index}`}
                size="md"
                className="shrink-0"
                variant={
                  selectedDay === _day.day ? 'primary' : 'primaryOutline'
                }
                onClick={() => setSelectedDay(_day.day)}
              >{`${_day.day}일차`}</Chip>
            ))}
          </div>
          <div className="scrollbar-hide flex flex-col gap-3 overflow-auto">
            {filteredSchedule?.map((schedule, index) => (
              <MemoryScheduleDay
                key={`${schedule.day}-${index}`}
                schedule={schedule}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-text-secondary">일정 선택 없이 추억을 채울게요</p>
      )}
    </div>
  );
}
