import { ILabelValue } from '@/shared/interfaces';
import {
  EXPENSES_CATEGORY_TYPE,
  EXPENSES_PAYMENT_TYPE,
  EXPENSES_SPENDER_TYPE,
} from '@/shared/types/expenseEnum';

/** 여행 상세 전역 인터페이스 (state) */
export interface ITravelExpenseState {
  expenses: IExpense[];
}

/** 가계부 리스트 */
export interface IExpense {
  day: number;
  date: Date | undefined;
  list: IExpenseList[];
  dailyExpense: number; // 일일 총 지출;
}

/** 지출 정보 */
export interface IExpenseList {
  id: string;
  name: string; // 지출명
  spenderType: EXPENSES_SPENDER_TYPE;
  category: EXPENSES_CATEGORY_TYPE;
  paymentType: EXPENSES_PAYMENT_TYPE; // 결제 타입
  payer: ILabelValue; // 결제자
  spender: ILabelValue[]; // 지출자
  time?: string;
  memo?: string;
  day: number;
  amount: number; // 지출 금액
  calcExchangeAmount: number; // 한화 금액
  exchangeRate: {
    currencyCode: ILabelValue; // 통화 코드
    amount: number; // 환율금액
  };
  calcFormula: string;
}

export interface IDateFromTo {
  from: Date;
  to: Date;
}

/** 여행 가계부 전역 인터페이스 (actions) */
export interface ITravelExpenseActions {
  setInitExpense: (date: IDateFromTo) => void;
  setAddExpenseList: (data: IExpenseList & { day: number }) => void;
  setDeleteExpenseList: (data: { day: number; id: string | number }) => void;
  setUpdateExpense: (data: IExpenseList & { day: number }) => void;
  setMoveSelectedExpense: (data: { day: number; id: string[] }) => void;
  setDeleteSelectedExpense: (data: { id: string[] }) => void;
  reset: () => void;
}

/** 여행 가계부 전역 인터페이스 (getters) */
export interface ITravelExpenseGetters {
  getTravelExpense: () => IExpense[];
  getDailyTotalAmount: (day: number) => number;
  getAllTotalAmount: () => number;
}
