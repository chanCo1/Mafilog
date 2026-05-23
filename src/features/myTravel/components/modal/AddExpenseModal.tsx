/**
 * @file: AddExpenseModal.tsx
 * @author: chad
 * @since: 2026.05.06 ~
 * @description: AddExpenseModal 컴포넌트, 지출내역 추가 모달
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { cn, roundDecimal, getTravelDayList } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import {
  SPENDER_TYPE_LIST,
  PAYMENT_TYPE_LIST,
  EXPENSE_CATEGORY_LIST,
} from '@/features/myTravel/constants/expense.constant';
import { Input } from '@/shared/components/ui/Input';
import {
  EXPENSES_CATEGORY_TYPE,
  EXPENSES_SPENDER_TYPE,
  EXPENSES_PAYMENT_TYPE,
} from '@/shared/types/expenseEnum';
import ExpenseCategoryList from '@/features/myTravel/components/modal/addExpense/ExpenseCategoryList';
import TimePicker from '@/shared/components/ui/TimePicker';
import Selectbox from '@/shared/components/ui/Selectbox';
import { ILabelValue } from '@/shared/interfaces';
import { Textarea } from '@/shared/components/ui/Textarea';
import Calculator from '@/shared/components/ui/Calculator';
import { IExpenseList } from '@/features/myTravel/interfaces/expense.interface';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { toast } from 'sonner';
import SelectSpenderType from '@/features/myTravel/components/modal/addExpense/SelectSpenderType';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { useGetMyTravelDetail } from '@/features/myTravel/hooks/rquery/myTravel/useGetMyTravelDetail';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { useGetTravelExpenses } from '@/features/myTravel/hooks/rquery/expense/useGetTravelExpense';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';
import { useCreateTravelExpense } from '@/features/myTravel/hooks/rquery/expense/useCreateTravelExpense';

interface IAddExpenseModal {
  isModify?: boolean;
  isOpen: boolean;
  expense?: IExpenseList;
  handleClose: () => void;
}

export default function AddExpenseModal({
  isModify = false,
  isOpen,
  handleClose,
  expense,
}: IAddExpenseModal) {
  /** 지출 명 */
  const [expenseName, setExpenseName] = useState('');
  /** 지출 방식 */
  const [selectedSpenderType, setSelectedSpenderType] =
    useState<EXPENSES_SPENDER_TYPE>(SPENDER_TYPE_LIST[0].value);
  /** 결제 방식 */
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<EXPENSES_PAYMENT_TYPE>(PAYMENT_TYPE_LIST[0].value);
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
  /** 환율 코드 */
  const [currencyCode, setCurrencyCode] = useState<ILabelValue>({
    label: '',
    value: '',
  });
  /** 환율 원화 금액 */
  const [exchangeRateAmount, setExchangeRateAmount] = useState(0);
  /** 지출 금액 */
  const [expenseAmount, setExpenseAmount] = useState(0);
  /** 지출 환율 금액 */
  const [calcExchangeAmount, setCalcExchangeAmount] = useState(0);
  /** 계산 수식 */
  const [calcFormula, setCalcFormula] = useState('');

  const travelId = useGetTravelId();
  const { data: travelInfo } = useGetMyTravelDetail(travelId);
  const { data: expenseList } = useGetTravelExpenses(travelId);

  const { countryData } = useCountriesDataStore();

  const travelDayList = useMemo(() => {
    return getTravelDayList(expenseList).map((list) => {
      return list.value === 0 ? { label: '여행전', value: 0 } : list;
    });
  }, [expenseList]);

  const { mutateAsync: createExpense, isPending: isCreatePending } =
    useCreateTravelExpense(travelId);

  // const { setAddExpenseList, setUpdateExpense, setDeleteExpenseList } =
  //   useTravelExpenseStore();

  const { openDialog } = useDialogStore();

  /** 지출 추가 핸들링 */
  const handleExpense = async () => {
    if (isModify && !expense) return;
    if (!expenseName) return;

    /** 지출자 각자에게 지출 금액, 원화 금액,  */
    const withAmountSpender = selectedSepnder.map((spender) => ({
      ...spender,
      name: spender.label,
      memberId: spender.value as string,
      amount: roundDecimal(expenseAmount / selectedSepnder.length),
      calcExchangeAmount: roundDecimal(
        calcExchangeAmount / selectedSepnder.length,
      ),
      currencyCode: currencyCode.label,
      category: selectedCategory,
    }));

    const saveData = {
      // id: isModify ? expense!.id : '',
      name: expenseName,
      paymentType: selectedPaymentType,
      spenderType: selectedSpenderType,
      category: selectedCategory,
      day: selectedDay.value as number,
      time: selectedTime,
      memo: inputMemo,
      amount: expenseAmount,
      calcFormula: calcFormula,
      calcExchangeAmount: calcExchangeAmount,
      currencyCode: currencyCode.label,
      currencyCountry: currencyCode.value as string,
      exchangeRateAmount: exchangeRateAmount,
      spenders: withAmountSpender,
      payerId: selectedPayer.value as string,
    };

    // if (isModify) {
    //   setUpdateExpense(saveData);
    // } else {
    //   setAddExpenseList(saveData);
    // }

    await createExpense({ travelId, data: saveData });

    onClickCloseBtn();
    // toast.success(`지출을 ${isModify ? '수정' : '추가'}했어요`);
  };

  /** 지출 삭제 핸들러 */
  const handleDeleteExpense = () => {
    if (!isModify) return;

    if (expense?.day === undefined) return;

    openDialog({
      message: '지출을 삭제할까요?',
      type: 'confirm',
      okLabel: '삭제',
      onOk: () => {
        // setDeleteExpenseList({
        //   day: expense.day,
        //   id: expense?.id as string,
        // });
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
      setCurrencyCode({ label: '', value: '' });
      setExchangeRateAmount(0);
      setExpenseAmount(0);
      setCalcExchangeAmount(0);
      setCalcFormula('');
      setSelectedDay(travelDayList?.[0]);
      setSelectPayer({
        label: travelInfo.member[0].name,
        value: travelInfo.member[0].userId,
      });
      setSelectedSepnder([
        {
          label: travelInfo.member[0].name,
          value: travelInfo.member[0].userId,
        },
      ]);
    }
  }, [travelInfo, travelDayList]);

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
      setCurrencyCode(data.currencyCode);
      setExchangeRateAmount(data.exchangeRate);
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

  /** 계산기에 보낼 기본 값 */
  const calculatorDefaultValue = useMemo(() => {
    if (isModify && expense?.calcFormula) {
      return {
        inputNumber: expense.calcFormula,
        selectedCurrency: {
          label: expense.currencyCode,
          value: countryData[expense.currencyCode],
        },
      };
    }
    return undefined;
  }, [isModify, expense, countryData]);

  /** 초기값 대입 */
  useEffect(() => {
    if (!isOpen) return;

    if (isModify && expense) {
      setExpenseName(expense.name);
      setSelectedSpenderType(expense.spenderType);
      setSelectedPaymentType(expense.paymentType);
      setSelectedCategory(expense.category);
      // TODO: 지출 등록하면 초기값 작업할것
      // setSelectedDay(travelDayList, expense.day);
      setSelectedTime(expense.time || '');
      setInputMemo(expense.memo || '');
      // TODO: 지출 등록하면 초기값 작업할것
      // setSelectPayer(expense.payer);
      // setSelectedSepnder(expense.spender);
      setCurrencyCode({
        label: expense.currencyCode,
        value: countryData[expense.currencyCode],
      });
      setExchangeRateAmount(expense.exchangeRateAmount);
      setExpenseAmount(expense.amount);
      setCalcExchangeAmount(expense.calcExchangeAmount);
      setCalcFormula(expense.calcFormula);
    } else {
      resetData();
    }
  }, [isOpen, isModify, resetData, expense, countryData]);

  const getMembersOption = useMemo(() => {
    if (!travelInfo) return [];

    return travelInfo?.member.map((member) => ({
      label: member.name,
      value: member.userId,
    }));
  }, [travelInfo]);

  // TODO: 지출자 타입 누를때마다 초기화 되는 부분 어떻게할지? 각자 따로 저장소를 가질지 고민
  /** 지출 타입 핸들링 */
  const handleSelectedSpenderType = (type: string) => {
    if (!travelInfo) return;

    setSelectedSpenderType(type);

    if (type === EXPENSES_SPENDER_TYPE.SELF) {
      setSelectPayer({
        label: travelInfo.member[0].name,
        value: travelInfo.member[0].userId,
      });
      setSelectedSepnder([
        {
          label: travelInfo.member[0].name,
          value: travelInfo.member[0].userId,
        },
      ]);
    } else if (type === EXPENSES_SPENDER_TYPE.SPLIT) {
      setSelectedSepnder(getMembersOption);
    } else {
      setSelectedSepnder([
        {
          label: travelInfo.member[0].name,
          value: travelInfo.member[0].userId,
        },
      ]);
    }
  };

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
            <Button
              disabled={isDisabled || isCreatePending}
              isLoading={isCreatePending}
              onClick={handleExpense}
            >
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
                  onClick={() => handleSelectedSpenderType(type.value)}
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
              options={travelDayList}
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
