/**
 * @file: TravelExpenses.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpenses 컴포넌트, 여행 가계부탭 하위 내용
 */

import { memo, useState } from 'react';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import { getTravelDay } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import TravelExpensesDay from '@/features/myTravel/components/detail/expnese/TravelExpensesDay';
import { Card } from '@/shared/components/ui/Card';
import TravelExpensesSpendCard from '@/features/myTravel/components/detail/expnese/TravelExpensesSpendCard';
import AddExpenseModal from '@/features/myTravel/components/modal/AddExpenseModal';
import { TRAVEL_EXPENSES_BEFORE_LIST } from '@/features/myTravel/constants/expense.constant';
import { useTravelExpenseListStore } from '@/shared/stores/useTravelExpenseStore';
import { useSelectExpenses } from '@/features/myTravel/store/useSelectExpenses';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import Dropdown from '@/shared/components/ui/Dropdown';

interface ITravelExpensesView {
  from: Date;
  to: Date;
}

function TravelExpensesView({ from, to }: ITravelExpensesView) {
  /** 지출일 선택 */
  const [selectedDay, setSelectedDay] = useState<string | number>(
    TRAVEL_EXPENSES_BEFORE_LIST[0].value,
  );
  /** 선택 수정 모드 */
  const [selectModifyMode, setSelectModifyMode] = useState(false);
  const [isOpenAddExpenseModal, setIsOpenAddExpneseModal] = useState(false);

  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const expense = useTravelExpenseListStore((state) => state.expense);
  const { clearSelectedExpenses } = useSelectExpenses();

  const travelDaysList = useTravelDaysList({
    from: travelInfo.from,
    to: travelInfo.to,
  });

  const handleModifyMode = () => {
    if (selectModifyMode) {
      setSelectModifyMode(false);
      clearSelectedExpenses();
    } else {
      setSelectModifyMode(true);
    }
  };

  return (
    <>
      <TravelDetailTemplate
        handleButtons={
          <>
            <Button variant="gray" size="sm" onClick={handleModifyMode}>
              {selectModifyMode ? '돌아가기' : '선택 수정'}
            </Button>
            <div className="flex gap-1">
              {selectModifyMode ? (
                <>
                  <Dropdown
                    trigger={
                      <Button variant="gray" size="sm">
                        선택 날짜 이동
                      </Button>
                    }
                  >
                    {travelDaysList.map((list) => (
                      <span
                        key={list.value}
                        className="hover:bg-gray-1 text-text-secondary cursor-pointer rounded-md p-1.5"
                        onClick={() => console.log(list)}
                      >
                        {list.label}
                      </span>
                    ))}
                  </Dropdown>
                  <Button variant="redOutline" size="sm">
                    선택 삭제
                  </Button>
                </>
              ) : (
                <Button
                  className="w-35"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsOpenAddExpneseModal(true)}
                >
                  지출 추가
                </Button>
              )}
            </div>
          </>
        }
        dayTimelines={
          <>
            {expense.map((_day, index) => (
              <TravelExpensesDay
                key={`${_day.day}-${index}`}
                day={_day.day}
                date={_day.date}
                list={_day.list}
                selectMode={selectModifyMode}
              />
            ))}
          </>
        }
        dayButtons={
          <>
            {TRAVEL_EXPENSES_BEFORE_LIST.map((list, index) => (
              <Chip
                key={index}
                size="md"
                variant={
                  selectedDay === list.value ? 'primary' : 'primaryOutline'
                }
                onClick={() => setSelectedDay(list.value)}
              >
                {list.label}
              </Chip>
            ))}
            {expense.map((_day, index) => {
              if (_day.day === 0) return;
              return (
                <Chip
                  key={index}
                  size="md"
                  variant={selectedDay === index ? 'primary' : 'primaryOutline'}
                  onClick={() => setSelectedDay(index)}
                >{`${index}일차`}</Chip>
              );
            })}
          </>
        }
        stautsArea={
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <TravelExpensesSpendCard selectedDay={selectedDay} />
              <TravelExpensesSpendCard selectedDay={selectedDay} isMySpend />
            </div>
            <Card className="">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">여행 총 지출</p>
                <div className="text-state-error text-h3 flex justify-end font-bold">
                  <span>{0}원</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex flex-col items-end">
                  <div className="flex items-end gap-2">
                    <p>KRW</p>
                    <span className="text-state-error text-lg font-bold">
                      {0}원
                    </span>
                  </div>
                  <span className="text-text-secondary text-sm">{0}원</span>
                </div>
              </div>
            </Card>
          </div>
        }
      />
      <AddExpenseModal
        isOpen={isOpenAddExpenseModal}
        handleClose={() => setIsOpenAddExpneseModal(false)}
      />
    </>
  );
}

export default memo(TravelExpensesView);
