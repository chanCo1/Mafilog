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

interface ITravelExpensesDay {
  expense: IExpenseResponse
  selectMode: boolean;
}

export default function TravelExpensesDay({
  expense,
  selectMode,
}: ITravelExpensesDay) {
  const { selectedExpenses, toggleDayAll } = useSelectExpenses();

  // 현재 일차의 list 아이템들이 모두 selectedSchedules에 포함되어 있는지 확인
  const isAllSelected =
    expense.expenseList.length > 0 &&
    expense.expenseList.every((item) =>
      selectedExpenses.some((selected) => selected.id === item.id),
    );

  const handleAllCheck = (checked: boolean | ILabelValue[]) => {
    toggleDayAll(expense.expenseList, !checked as boolean);
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
              {convertFormattedDate(expense.date, 'MM월 dd일')} {getDay(expense.date)}
            </span>
          ) : null}
        </div>
        <div className="flex items-end gap-1">
          <span className="text-sm">지출</span>
          <span className="font-bold">
            {convertComma(expense.dailyExpense)}원
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {expense.expenseList.length ? (
          <>
            {expense.expenseList.map((_data, index) => (
              <TravelExpensesTimeline
                key={`${_data?.id}-${index}`}
                expense={_data}
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
