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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { useUpdateMoveScheduleList } from '@/features/myTravel/hooks/rquery/schedule/useUpdateMoveScheduleList';

interface ITravelScheduleDay {
  schedule: IScheduleResponse;
  selectMode: boolean;
}

export default function TravelScheduleDay({
  schedule,
  selectMode,
}: ITravelScheduleDay) {
  const scheduleList = schedule.scheduleList;

  const { selectedSchedules, toggleDayAll } = useSelectSchedules();
  const travelId = useGetTravelId();
  const { mutateAsync: updateScheduleList } =
    useUpdateMoveScheduleList(travelId);

  // 현재 일차의 list 아이템들이 모두 selectedSchedules에 포함되어 있는지 확인
  const isAllSelected =
    scheduleList.length > 0 &&
    scheduleList.every((item) =>
      selectedSchedules.some((selected) => selected.id === item.id),
    );

  const handleAllCheck = (checked: boolean | ILabelValue[]) => {
    toggleDayAll(scheduleList, !checked as boolean);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        tolerance: 5,
        delay: 200,
      },
    }),
  );

  /** 드래그 핸들링 */
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // 제자리에 놓았거나 유효하지 않은 곳에 놓으면 무시
    if (!over || active.id === over.id) return;

    const oldIndex = scheduleList.findIndex(
      (list) => list.id.toString() === active.id,
    );
    const newIndex = scheduleList.findIndex(
      (list) => list.id.toString() === over.id,
    );

    const newOrderedItems = arrayMove(scheduleList, oldIndex, newIndex);

    await updateScheduleList({
      scheduleId: schedule.id,
      newOrderedItems,
    });
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
        {scheduleList.length ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={scheduleList.map((item) => item.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              {scheduleList.map((_data, index) => (
                <TravelScheduleTimeline
                  key={_data.id}
                  timeLineData={_data}
                  dailyAllSchedule={scheduleList}
                  currentIndex={index}
                  selectMode={selectMode}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <TravelScheduleTimeline />
        )}
      </div>
    </div>
  );
}
