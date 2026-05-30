/**
 * @file: FillMemoryStep1.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: 추억 만들기 스텝1 컴포넌트
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
import { RefreshCcw } from 'lucide-react';
import { useGetTravelSchedules } from '@/features/myTravel/hooks/rquery/schedule/useGetTravelSchedules';
import { toast } from 'sonner';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

interface IFillMemoryStep1 {
  selectedTravel: ILabelValue;
  setSelectedTravel: Dispatch<SetStateAction<ILabelValue>>;
  setSeletedDate: Dispatch<SetStateAction<DateRange | undefined>>;
  loadSchedules: IMemoryScheduleResponse[];
  setLoadSchedules: Dispatch<SetStateAction<IMemoryScheduleResponse[]>>;
  isModify: boolean;
}

export default function FillMemoryStep1({
  selectedTravel,
  setSelectedTravel,
  setSeletedDate,
  loadSchedules,
  setLoadSchedules,
  isModify,
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
    })) || [];

    return [{ label: '선택 안함', value: 0 }, ..._timelineList];
  }, [timelineList]);

  const filteredSchedule = loadSchedules?.filter(
    (schedule) => schedule.day === selectedDay,
  );

  /** 여행 선택 핸들링 */
  const handleSelectedTravel = (selected: ILabelValue) => {
    const finedTimeline = timelineList?.find(
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

  /** 최신 일정으로 동기화 */
  const handleSyncSchedule = () => {
    if (!travelSchedule?.length) return;

    const syncedSchedules = travelSchedule.map((latestDay) => {
      // 일정 찾기
      const existingDay = loadSchedules.find(
        (day) => String(day.day) === String(latestDay.day)
      );

      // 세부 일정 비교
      const mergedScheduleList = latestDay.scheduleList.map((latestItem) => {
        const extractList = existingDay?.scheduleList.find((item) => {
          const isMatchedList = item.type === latestItem.type && item.order === latestItem.order;

          if (!isMatchedList) return false;

          // 구글의 고유 placeId로 같은지 비교
          if (latestItem.type === SCHEDULE_TYPE.PLACE) {
            return item.place?.placeId === latestItem.place?.placeId;
          }

          // 작성한 메모로 비교
          if (latestItem.type === SCHEDULE_TYPE.MEMO) {
            return item.memo === latestItem.memo;
          }

          return false;
        });

        if (extractList) {
          return {
            ...latestItem,
            rating: extractList.rating !== undefined ? extractList.rating : 0,
          };
        } else {
          return {
            ...latestItem,
            rating: 0,
          };
        }
      });

      return {
        ...latestDay,
        scheduleList: mergedScheduleList,
      };
    });

    setLoadSchedules(syncedSchedules);
    toast.success('일정을 다시 불러왔습니다')
  };

  return (
    <div className="flex h-full flex-col gap-3">
      {isModify && loadSchedules.length ? (
        <div
          className="text-primary flex cursor-pointer items-center gap-1"
          onClick={handleSyncSchedule}
        >
          <RefreshCcw size={20} />
          <span>일정 다시 불러오기</span>
        </div>
      ) : (
        <Selectbox
          label="여행 불러오기"
          options={loadTravelOptions}
          isRequired
          value={selectedTravel}
          description="여행 일정을 선택해주세요"
          onChange={(value) => handleSelectedTravel(value)}
          disabled={isModify}
        />
      )}

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
