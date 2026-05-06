/**
 * @file: AddExpenseModal.tsx
 * @author: chad
 * @since: 2026.05.06 ~
 * @description: AddExpenseModal 컴포넌트, 지출내역 추가 모달
 */

import { useState, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import {
  SPENDER_TYPE_LIST,
  PAYMENT_TYPE_LIST,
  EXPENSE_CATEGORY_LIST,
} from '@/features/myTravel/constants/expense.constant';
import { Input } from '@/shared/components/ui/Input';
import { TIconList } from '@/shared/types/expenseEnum';
import ExpenseCategoryList from '@/features/myTravel/components/modal/addExpense/ExpenseCategoryList';
import TimePicker from '@/shared/components/ui/TimePicker';
import Selectbox from '@/shared/components/ui/Selectbox';
import { ILabelValue } from '@/shared/interfaces';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import { Textarea } from '@/shared/components/ui/Textarea';

interface IAddExpenseModal {
  isModify?: boolean;
  isOpen: boolean;
  handleClose: () => void;
}

export default function AddExpenseModal({
  isModify = false,
  isOpen,
  handleClose,
}: IAddExpenseModal) {
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const travelDaysList = useTravelDaysList({
    from: travelInfo.from,
    to: travelInfo.to,
  });

  /** 지출 방식 */
  const [selectedSpender, setSelectedSpender] = useState(
    SPENDER_TYPE_LIST[0].value,
  );
  /** 결제 방식 */
  const [selectedPayment, setSelectedPayment] = useState(
    PAYMENT_TYPE_LIST[0].value,
  );
  /** 카테고리 선택 */
  const [selectedCategory, setSelectedCategory] = useState<TIconList>(
    EXPENSE_CATEGORY_LIST[2].value,
  );
  /** 일정 */
  const [selectedDay, setSelectedDay] = useState<ILabelValue>(
    travelDaysList?.[0],
  );
  /** 시간 */
  const [selectedTime, setSelectedTime] = useState('');
  /** 메모 */
  const [inputMemo, setInputMemo] = useState('');

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    // dataReset();
  };

  const resetData = () => {
    // if (day) {
    //   setSelectedDay(travelDaysList[day - 1]);
    // }
    // setSelectedTime(data?.time ?? '');
    // setInputMemo(data?.memo ?? '');
  };

  return (
    <SideModal
      isOpen={isOpen}
      title="지출 내역 추가"
      handleClose={onClickCloseBtn}
      footer={
        <>
          <Button variant="gray" onClick={onClickCloseBtn}>
            취소
          </Button>
          <Button disabled={false} onClick={() => null}>
            지출 추가
          </Button>
        </>
      }
    >
      <div className="flex h-full flex-col gap-2">
        <div className="scrollbar-hide flex flex-1 flex-col gap-3 overflow-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {SPENDER_TYPE_LIST.map((type, index) => (
                <Chip
                  key={`${type}-${index}`}
                  variant={
                    selectedSpender === type.value
                      ? 'primary'
                      : 'primaryOutline'
                  }
                  onClick={() => setSelectedSpender(type.value)}
                >
                  {type.label}
                </Chip>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {PAYMENT_TYPE_LIST.map((type, index) => (
                <Chip
                  key={`${type}-${index}`}
                  variant={
                    selectedPayment === type.value
                      ? 'primary'
                      : 'primaryOutline'
                  }
                  onClick={() => setSelectedPayment(type.value)}
                >
                  {type.label}
                </Chip>
              ))}
            </div>
          </div>

          <Input label="지출명" isRequired />

          <ExpenseCategoryList
            isRequired
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="flex items-center gap-1">
            <Selectbox
              label="지출일 선택"
              isRequired
              options={travelDaysList}
              className="w-3/5"
              value={selectedDay}
              onChange={(value) => setSelectedDay(value)}
            />
            <TimePicker
              label="지출 시간"
              placeholder="-- : --"
              className="w-2/5"
              value={selectedTime}
              onChange={(value) => setSelectedTime(value)}
            />
          </div>

          <Textarea
            label="메모"
            onChange={(e) => setInputMemo(e.target.value)}
            value={inputMemo}
          />
        </div>
        <div></div>
      </div>
    </SideModal>
  );
}
