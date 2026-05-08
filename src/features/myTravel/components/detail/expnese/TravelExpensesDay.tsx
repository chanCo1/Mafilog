/**
 * @file: TravelExpensesDay.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpensesDay 컴포넌트, 가계부 일차별 지출
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { convertFormattedDate, getDay } from '@/shared/lib/utils';
import TravelExpensesTimeline from '@/features/myTravel/components/detail/expnese/TravelExpensesTimeline';
import { IExpense } from '@/shared/interfaces/travelExpenseStore.interface';
import { useSelectExpenses } from '@/features/myTravel/store/useSelectExpenses';
import { ILabelValue } from '@/shared/interfaces';
import { Checkbox } from '@/shared/components/ui/Checkbox';

interface ITravelExpensesDay {
  day?: number;
  date?: Date;
  selectMode: boolean;
  list: IExpense['list'];
}

export default function TravelExpensesDay({
  day,
  date,
  list,
  selectMode,
}: ITravelExpensesDay) {
  const { selectedExpenses, toggleDayAll } = useSelectExpenses();

  // 현재 일차의 list 아이템들이 모두 selectedSchedules에 포함되어 있는지 확인
  const isAllSelected =
    list.length > 0 &&
    list.every((item) =>
      selectedExpenses.some((selected) => selected.id === item.id),
    );

  const handleAllCheck = (checked: boolean | ILabelValue[]) => {
    toggleDayAll(list, !checked as boolean);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          {selectMode && (
            <Checkbox value={isAllSelected} onChange={handleAllCheck} />
          )}
          <span className="text-lg font-bold">
            {day === 0 ? '여행전' : `${day}일차`}
          </span>
          {date ? (
            <span className="text-text-secondary">
              {convertFormattedDate(date, 'MM월 dd일')} {getDay(date)}
            </span>
          ) : null}
        </div>
        <div className="flex items-end gap-1">
          <span className="text-sm">지출</span>
          <span className="font-bold">{0}원</span>
        </div>
      </div>
      <div className="flex flex-col">
        {list.length ? (
          <>
            {list.map((_data, index) => (
              <TravelExpensesTimeline
                key={`${_data?.id}-${index}`}
                timeLineData={_data}
                // dailyAllSchedule={list}
                currentIndex={index}
                day={day}
                selectMode={selectMode}
              />
            ))}
          </>
        ) : (
          <TravelExpensesTimeline />
        )}
      </div>
    </div>
  );
}
