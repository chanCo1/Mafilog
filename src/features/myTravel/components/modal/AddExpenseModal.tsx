/**
 * @file: AddExpenseModal.tsx
 * @author: chad
 * @since: 2026.05.06 ~
 * @description: AddExpenseModal 컴포넌트, 지출내역 추가 모달
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
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
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/expenseEnum';
import ExpenseCategoryList from '@/features/myTravel/components/modal/addExpense/ExpenseCategoryList';
import TimePicker from '@/shared/components/ui/TimePicker';
import Selectbox from '@/shared/components/ui/Selectbox';
import { ILabelValue } from '@/shared/interfaces';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import { Textarea } from '@/shared/components/ui/Textarea';
import Calculator from '@/shared/components/ui/Calculator';
import { IExpenseList } from '@/shared/interfaces/travelExpenseStore.interface';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { toast } from 'sonner';
import SelectSpenderType from '@/features/myTravel/components/modal/addExpense/SelectSpenderType';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { TRAVEL_EXPENSE_BEFORE } from '@/features/myTravel/constants/expense.constant';
interface IAddExpenseModal {
  isModify?: boolean;
  isOpen: boolean;
  timeLineData?: IExpenseList;
  handleClose: () => void;
}

export default function AddExpenseModal({
  isModify = false,
  isOpen,
  handleClose,
  timeLineData,
}: IAddExpenseModal) {
  /** 지출 명 */
  const [expenseName, setExpenseName] = useState('');
  /** 지출 방식 */
  const [selectedSpenderType, setSelectedSpenderType] = useState(
    SPENDER_TYPE_LIST[0].value,
  );
  /** 결제 방식 */
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    PAYMENT_TYPE_LIST[0].value,
  );
  /** 카테고리 선택 */
  const [selectedCategory, setSelectedCategory] =
    useState<EXPENSES_CATEGORY_TYPE>(EXPENSE_CATEGORY_LIST[2].value);
  /** 지출 일 */
  const [selectedDay, setSelectedDay] = useState<ILabelValue>({
    label: '',
    value: '',
  });
  /** 지출 시간 */
  const [selectedTime, setSelectedTime] = useState('');
  /** 메모 */
  const [inputMemo, setInputMemo] = useState('');
  /** 결제자 */
  const [selectedPayer, setSelectPayer] = useState<ILabelValue>({
    label: '',
    value: '',
  });
  /** 지출자 */
  const [selectedSepnder, setSelectedSepnder] = useState<ILabelValue[]>([]);
  /** 환율 정보 */
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<
    IExpenseList['exchangeRate']
  >({
    currencyCode: { label: '', value: '' },
    amount: 0,
  });
  /** 지출 금액 */
  const [expenseAmount, setExpenseAmount] = useState(0);
  /** 지출 환율 금액 */
  const [calcExchangeAmount, setCalcExchangeAmount] = useState(0);
  /** 계산 수식 */
  const [calcFormula, setCalcFormula] = useState('');

  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const travelDaysList = useTravelDaysList({
    from: travelInfo.from,
    to: travelInfo.to,
  });

  const { setAddExpenseList, setUpdateExpense, setDeleteExpenseList } =
    useTravelExpenseStore();

  const { openDialog } = useDialogStore();

  /** 지출 추가 핸들링 */
  const handleExpense = () => {
    if (isModify && !timeLineData) return;
    if (!expenseName) return;

    const saveData = {
      id: isModify ? timeLineData!.id : '',
      name: expenseName,
      spenderType: selectedSpenderType,
      category: selectedCategory,
      day: selectedDay.value as number,
      time: selectedTime,
      memo: inputMemo,
      spender: selectedSepnder,
      payer: selectedPayer,
      paymentType: selectedPaymentType,
      amount: expenseAmount,
      calcExchangeAmount: calcExchangeAmount,
      exchangeRate: selectedExchangeRate,
      calcFormula: calcFormula,
    };

    if (isModify) {
      setUpdateExpense(saveData);
    } else {
      setAddExpenseList(saveData);
    }

    onClickCloseBtn();
    toast.success(`지출을 ${isModify ? '수정' : '추가'}했어요`);
  };

  /** 지출 삭제 핸들러 */
  const handleDeleteExpense = () => {
    if (!isModify) return;

    if (timeLineData?.day === undefined) return;

    openDialog({
      message: '지출을 삭제할까요?',
      type: 'confirm',
      okLabel: '삭제',
      onOk: () => {
        setDeleteExpenseList({
          day: timeLineData.day,
          id: timeLineData?.id as string,
        });
        toast.success(`지출을 삭제했어요`);
      },
    });
  };

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    resetData();
  };

  /** 지출 추가 모달 리셋 */
  const resetData = useCallback(() => {
    if (travelInfo) {
      setExpenseName('');
      setSelectedSpenderType(SPENDER_TYPE_LIST[0].value);
      setSelectedPaymentType(PAYMENT_TYPE_LIST[0].value);
      setSelectedCategory(EXPENSE_CATEGORY_LIST[2].value);
      setSelectedTime('');
      setInputMemo('');
      setSelectedExchangeRate({
        currencyCode: { label: '', value: '' },
        amount: 0,
      });
      setExpenseAmount(0);
      setCalcExchangeAmount(0);
      setCalcFormula('');
      setSelectedDay(travelDaysList?.[0]);
      setSelectPayer({
        label: travelInfo.member[0].name,
        value: travelInfo.member[0].id,
      });
      setSelectedSepnder([
        {
          label: travelInfo.member[0].name,
          value: travelInfo.member[0].id,
        },
      ]);
    }
  }, [travelInfo, travelDaysList]);

  /** 계산기에서 계산 된 값 가져오기 */
  const handleCalcChange = useCallback(
    (data: {
      amount: number;
      calcAmount: number;
      currencyCode: ILabelValue;
      exchangeRate: number;
      formula: string;
    }) => {
      setExpenseAmount(data.amount);
      setCalcExchangeAmount(data.calcAmount);
      setSelectedExchangeRate({
        currencyCode: data.currencyCode,
        amount: data.exchangeRate,
      });
      setCalcFormula(data.formula);
    },
    [],
  );

  /** 버튼 비활성화 상태 */
  const isDisabled =
    !expenseName ||
    !selectedPayer.value ||
    !selectedSepnder.length ||
    !expenseAmount;

  /** 지출 모든날 */
  const travelAllDays = useMemo(() => {
    return [TRAVEL_EXPENSE_BEFORE, ...travelDaysList];
  }, [travelDaysList]);

  /** 계산기에 보낼 기본 값 */
  const calculatorDefaultValue = useMemo(() => {
    if (isModify && timeLineData?.calcFormula) {
      return {
        inputNumber: timeLineData.calcFormula,
        selectedCurrency: timeLineData.exchangeRate.currencyCode,
      };
    }
    return undefined;
  }, [isModify, timeLineData]);

  /** 초기값 대입 */
  useEffect(() => {
    if (!isOpen) return;

    if (isModify && timeLineData) {
      setExpenseName(timeLineData.name);
      setSelectedSpenderType(timeLineData.spenderType);
      setSelectedPaymentType(timeLineData.paymentType);
      setSelectedCategory(timeLineData.category);
      setSelectedDay(travelAllDays[timeLineData.day]);
      setSelectedTime(timeLineData.time || '');
      setInputMemo(timeLineData.memo || '');
      setSelectPayer(timeLineData.payer);
      setSelectedSepnder(timeLineData.spender);
      setSelectedExchangeRate(timeLineData.exchangeRate);
      setExpenseAmount(timeLineData.amount);
      setCalcExchangeAmount(timeLineData.calcExchangeAmount);
      setCalcFormula(timeLineData.calcFormula);
    } else {
      resetData();
    }
  }, [isOpen, isModify, resetData, timeLineData, travelAllDays]);

  return (
    <SideModal
      isOpen={isOpen}
      title={`지출 내역 ${isModify ? '수정' : '추가'}`}
      handleClose={onClickCloseBtn}
      footer={
        <div
          className={cn(
            'flex w-full',
            isModify ? 'justify-between' : 'justify-end',
          )}
        >
          {isModify && (
            <Button variant="redOutline" onClick={handleDeleteExpense}>
              삭제
            </Button>
          )}
          <div className="flex gap-1">
            <Button variant="gray" onClick={onClickCloseBtn}>
              취소
            </Button>
            <Button disabled={isDisabled} onClick={handleExpense}>
              {isModify ? '수정' : '지출 추가'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-2">
        <div className="scrollbar-hide flex flex-1 flex-col gap-4 overflow-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {SPENDER_TYPE_LIST.map((type, index) => (
                <Chip
                  key={`${type}-${index}`}
                  variant={
                    selectedSpenderType === type.value
                      ? 'primary'
                      : 'primaryOutline'
                  }
                  onClick={() => setSelectedSpenderType(type.value)}
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
                    selectedPaymentType === type.value
                      ? 'primary'
                      : 'primaryOutline'
                  }
                  onClick={() => setSelectedPaymentType(type.value)}
                >
                  {type.label}
                </Chip>
              ))}
            </div>
          </div>

          <Input
            label="지출 명"
            isRequired
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <ExpenseCategoryList
            isRequired
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <SelectSpenderType
            selectedPayer={selectedPayer}
            selectedSepnder={selectedSepnder}
            selectedSpenderType={selectedSpenderType}
            setSelectPayer={setSelectPayer}
            setSelectedSepnder={setSelectedSepnder}
          />

          <div className="flex items-center gap-2">
            <Selectbox
              label="지출 일"
              isRequired
              options={travelAllDays}
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
        <Calculator
          onChangeValue={handleCalcChange}
          defaultValue={calculatorDefaultValue}
          isModify={isModify}
          isOpen={isOpen}
        />
      </div>
    </SideModal>
  );
}
