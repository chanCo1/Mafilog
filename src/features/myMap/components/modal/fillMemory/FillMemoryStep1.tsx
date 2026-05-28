/**
 * @file: FillMemoryStep1.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: FillMemoryStep1 컴포넌트
 */

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import Selectbox from '@/shared/components/ui/Selectbox';
import { Chip } from '@/shared/components/ui/Chip';
import MemoryScheduleDay from '@/features/myMap/components/modal/fillMemory/MemoryScheduleDay';
import { useGetMyTimelineList } from '@/features/myPage/hooks/rquery/timeline/useGetMyTimelineList';
import { ILabelValue } from '@/shared/interfaces';
import { DateRange } from 'react-day-picker';
import { IHandleUpdateSchedule } from '@/features/myMap/interfaces/memory.interface';
import { IMemoryScheduleResponse } from '@/features/myMap/interfaces/memory.interface';

interface IFillMemoryStep1 {
  selectedTravel: ILabelValue;
  setSelectedTravel: Dispatch<SetStateAction<ILabelValue>>;
  setSeletedDate: Dispatch<SetStateAction<DateRange | undefined>>;
  loadSchedules: IMemoryScheduleResponse[];
  setLoadSchedules: Dispatch<SetStateAction<IMemoryScheduleResponse[]>>;
}

export default function FillMemoryStep1({
  selectedTravel,
  setSelectedTravel,
  setSeletedDate,
  loadSchedules,
  setLoadSchedules,
}: IFillMemoryStep1) {
  const [selectedDay, setSelectedDay] = useState(1);

  const { data: timelineList } = useGetMyTimelineList();

  /** 여행 불러오기 옵션 */
  const loadTravelOptions = useMemo(() => {
    const _timelineList = timelineList?.map((list) => ({
      label: list.title,
      value: list.id,
    }));

    return [{ label: '선택 안함', value: 0 }, ..._timelineList];
  }, [timelineList]);

  const filteredSchedule = loadSchedules?.filter(
    (schedule) => schedule.day === selectedDay,
  );

  /** 여행 선택 핸들링 */
  const handleSelectedTravel = (selected: ILabelValue) => {
    const finedTimeline = timelineList.find(
      (list) => list.id === selected.value,
    );

    setSelectedTravel(selected);
    if (finedTimeline) {
      setSeletedDate({
        from: new Date(finedTimeline.from),
        to: new Date(finedTimeline.to),
      });
    } else {
      setSeletedDate(undefined);
    }
  };

  /** 일정 수정(별점, 메모) */
  const handleUpdateSchedule = ({
    day,
    key,
    listId,
    value,
  }: IHandleUpdateSchedule) => {
    setLoadSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.day !== day) return schedule;

        return {
          ...schedule,
          scheduleList: schedule.scheduleList.map((list) => {
            if (list.id !== listId) return list;
            return { ...list, [key]: value };
          }),
        };
      }),
    );
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <Selectbox
        label="여행 불러오기"
        options={loadTravelOptions}
        isRequired
        value={selectedTravel}
        description="여행 일정을 선택해주세요"
        onChange={(value) => handleSelectedTravel(value)}
      />

      {loadSchedules?.length ? (
        <div className="flex h-full flex-col gap-3">
          <h3 className="text-lg font-bold">{selectedTravel.label}</h3>
          <div className="scrollbar-hide flex shrink-0 gap-1 overflow-x-auto">
            {loadSchedules.map((_day, index) => (
              <Chip
                key={`${_day.day}-${index}`}
                size="md"
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
                onUpdateSchedule={handleUpdateSchedule}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-text-secondary">일정 선택 없이 추억이 채워져요</p>
      )}
    </div>
  );
}
