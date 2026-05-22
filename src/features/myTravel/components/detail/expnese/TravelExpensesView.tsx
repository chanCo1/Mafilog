/**
 * @file: TravelExpenses.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpenses 컴포넌트, 여행 가계부탭 하위 내용
 */

import { memo, useState } from 'react';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import { Chip } from '@/shared/components/ui/Chip';
import TravelExpensesDay from '@/features/myTravel/components/detail/expnese/TravelExpensesDay';
import { Card } from '@/shared/components/ui/Card';
import TravelExpensesSpendCard from '@/features/myTravel/components/detail/expnese/TravelExpensesSpendCard';
import AddExpenseModal from '@/features/myTravel/components/modal/AddExpenseModal';
import { TRAVEL_EXPENSES_BEFORE_LIST } from '@/features/myTravel/constants/expense.constant';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { useSelectExpenses } from '@/features/myTravel/store/useSelectExpenses';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import Dropdown from '@/shared/components/ui/Dropdown';
import { ILabelValue } from '@/shared/interfaces';
import { TRAVEL_EXPENSE_BEFORE } from '@/features/myTravel/constants/expense.constant';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { toast } from 'sonner';
import { convertComma } from '@/shared/lib/utils';
import CurrencySpend from '@/features/myTravel/components/detail/expnese/CurrencySpend';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { useGetTravelExpenses } from '@/features/myTravel/hooks/rquery/expense/useGetTravelExpense';
import { getTravelDayList } from '@/shared/lib/utils';

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

  const travelId = useGetTravelId();
  const { data: expenseList } = useGetTravelExpenses(travelId);
  const {
    setDeleteSelectedExpense,
    setMoveSelectedExpense,
    getAllTotalSpend,
    getAllTotalSpendByCurrency,
  } = useTravelExpenseStore();
  const selectedExpenses = useSelectExpenses((state) => state.selectedExpenses);
  const { clearSelectedExpenses } = useSelectExpenses();

  const { openDialog } = useDialogStore();

  /** 선택 수정 모드인지에 따라 핸들링 */
  const handleModifyMode = () => {
    if (selectModifyMode) {
      setSelectModifyMode(false);
      clearSelectedExpenses();
    } else {
      setSelectModifyMode(true);
    }
  };

  /** 선택 이동 */
  const handelMoveSelectedExpense = (day: ILabelValue) => {
    const getExpenseId = selectedExpenses.map((expense) => expense.id);
    setMoveSelectedExpense({ day: day.value as number, id: getExpenseId });
    clearSelectedExpenses();
  };

  /** 선택 삭제 */
  const handleDeleteSelectedExpense = () => {
    const getExpenseId = selectedExpenses.map((expense) => expense.id);

    openDialog({
      message: '선택된 지출을 삭제할까요?',
      type: 'confirm',
      okLabel: '삭제',
      onOk: () => {
        setDeleteSelectedExpense({ id: getExpenseId });
        toast.success(`지출을 삭제했어요`);
        clearSelectedExpenses();
      },
    });
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
                    {[
                      TRAVEL_EXPENSE_BEFORE,
                      ...getTravelDayList(expenseList),
                    ].map((list) => (
                      <span
                        key={list.value}
                        className="hover:bg-gray-1 text-text-secondary cursor-pointer rounded-md p-1.5"
                        onClick={() => handelMoveSelectedExpense(list)}
                      >
                        {list.label}
                      </span>
                    ))}
                  </Dropdown>
                  <Button
                    variant="redOutline"
                    size="sm"
                    onClick={() => handleDeleteSelectedExpense()}
                  >
                    선택 삭제
                  </Button>
                </>
              ) : (
                <Button
                  className="w-35"
                  // className="w-35 bg-linear-to-r from-secondary to-primary"
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
            {expenseList?.map((expense, index) => (
              <TravelExpensesDay
                key={`${expense.day}-${index}`}
                expense={expense}
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
            {expenseList?.map((_day, index) => {
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
                <div className="text-state-error text-h3 max-mobile:text-xxl flex justify-end font-bold">
                  <span>{convertComma(getAllTotalSpend())}원</span>
                </div>
              </div>
              {getAllTotalSpendByCurrency().map((currency, index) => (
                <CurrencySpend
                  key={`${currency.currency}-${index}`}
                  currency={currency.currency}
                  spend={currency.spend}
                  calcExchangeRate={currency.calcSpend}
                />
              ))}
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
