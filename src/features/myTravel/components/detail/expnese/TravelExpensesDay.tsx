/**
 * @file: TravelExpensesDay.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpensesDay 컴포넌트, 가계부 일차별 지출
 */

import { convertFormattedDate, getDay, convertComma } from '@/shared/lib/utils';
import TravelExpensesTimeline from '@/features/myTravel/components/detail/expnese/TravelExpensesTimeline';
import { useSelectExpenses } from '@/features/myTravel/store/useSelectExpenses';
import { ILabelValue } from '@/shared/interfaces';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { IExpenseResponse } from '@/features/myTravel/interfaces/expense.interface';
import { useCalcExpense } from '@/features/myTravel/hooks/useCalcExpense';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { useGetTravelExpenses } from '@/features/myTravel/hooks/rquery/expense/useGetTravelExpense';
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
import { useUpdateMoveExpenseList } from '@/features/myTravel/hooks/rquery/expense/useUpdateMoveExpenseList';

interface ITravelExpensesDay {
  expense: IExpenseResponse;
  selectMode: boolean;
}

export default function TravelExpensesDay({
  expense,
  selectMode,
}: ITravelExpensesDay) {
  const expenseList = expense.expenseList;

  const travelId = useGetTravelId();
  /** 모든 일정의 지출 리스트 */
  const { data: expenseAllList } = useGetTravelExpenses(travelId);
  const { getDailyAllSpend } = useCalcExpense(expenseAllList ?? []);
  const { mutateAsync: updateExpenseList } =
      useUpdateMoveExpenseList(travelId);

  const { selectedExpenses, toggleDayAll } = useSelectExpenses();

  // 현재 일차의 list 아이템들이 모두 selectedSchedules에 포함되어 있는지 확인
  const isAllSelected =
    expenseList.length > 0 &&
    expenseList.every((item) =>
      selectedExpenses.some((selected) => selected.id === item.id),
    );

  const handleAllCheck = (checked: boolean | ILabelValue[]) => {
    toggleDayAll(expenseList, !checked as boolean);
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

    const oldIndex = expenseList.findIndex(
      (list) => list.id.toString() === active.id,
    );
    const newIndex = expenseList.findIndex(
      (list) => list.id.toString() === over.id,
    );

    const newOrderedItems = arrayMove(expenseList, oldIndex, newIndex);

    await updateExpenseList({
      expenseId: expense.id,
      newOrderedItems,
    });
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          {selectMode && (
            <Checkbox value={isAllSelected} onChange={handleAllCheck} />
          )}
          <span className="text-lg font-bold">
            {expense.day === 0 ? '여행전' : `${expense.day}일차`}
          </span>
          {expense.date ? (
            <span className="text-text-secondary">
              {convertFormattedDate(expense.date, 'MM월 dd일')}{' '}
              {getDay(expense.date)}
            </span>
          ) : null}
        </div>
        <div className="flex items-end gap-1">
          <span className="text-sm">지출</span>
          <span className="font-bold">
            {convertComma(getDailyAllSpend(expense.day))}원
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {expenseList.length ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={expenseList.map((item) => item.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              {expenseList.map((_data) => (
                <TravelExpensesTimeline
                  key={_data.id}
                  expense={_data}
                  selectMode={selectMode}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <TravelExpensesTimeline />
        )}
      </div>
    </div>
  );
}
