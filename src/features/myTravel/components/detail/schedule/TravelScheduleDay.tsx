/**
 * @file: TravelScheduleDay.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelScheduleDay 컴포넌트, 일차 컴포넌트
 */

import { useEffect, useState } from 'react';
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

  // 임시 state
  const [items, setItems] = useState(schedule.scheduleList);

  useEffect(() => {
    setItems(schedule.scheduleList);
  }, [schedule.scheduleList]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  /** 드래그 핸들링 */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // 제자리에 놓았거나 유효하지 않은 곳에 놓으면 무시
    if (!over || active.id === over.id) return;

    setItems((items) => {
      const oldIndex = items.findIndex(
        (item) => item.id.toString() === active.id,
      );
      const newIndex = items.findIndex(
        (item) => item.id.toString() === over.id,
      );

      // 배열 순서 변경
      const newOrderedItems = arrayMove(items, oldIndex, newIndex);
      console.log('newOrderedItems >> ', newOrderedItems)

      // api 전달
      const updatePayload = newOrderedItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));

      return newOrderedItems;
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
        {items.length ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              {items.map((_data, index) => (
                <TravelScheduleTimeline
                  key={_data.id}
                  timeLineData={_data}
                  dailyAllSchedule={items}
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
