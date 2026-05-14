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
  spender: ISpenderWithAmount[]; // 지출자
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

export interface ISpendByCurrency {
  currency: string;
  spend: number;
  calcSpend: number;
  category?: string;
}

export interface ISpenderWithAmount extends ILabelValue {
  amount: number;
  calcExchangeAmount: number;
  currencyCode: ILabelValue;
  category: EXPENSES_CATEGORY_TYPE;
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

  /** 모든날 총 지출 */
  getAllTotalSpend: () => number;
  /** 모든날 총 내 지출 */
  getAllTotalMySpend: () => number;
  /** 모든날 통화 별 지출 */
  getAllTotalSpendByCurrency: () => ISpendByCurrency[];
  getAllTotalMySpendByCurrency: () => ISpendByCurrency[];

  /** 일정 별 지출 총액 */
  getDailyAllSpend: (day: number) => number;
  /** 일정 별 내 지출 */
  getDailyMySpend: (day: number) => number;
  /** 일정 별, 통화 별 총 지출 */
  getDailyAllSpendByCurrency: (day: number) => ISpendByCurrency[];
  /** 일정 별, 통화 별 내 지출 */
  getDailyMySpendByCurrency: (day: number) => ISpendByCurrency[];

  /** 카테고리별 지출 총액 */
  getCategorySpend: (category: EXPENSES_CATEGORY_TYPE) => number;
  /** 카테고리별 내 지출 총액 */
  getCategoryMySpend: (category: EXPENSES_CATEGORY_TYPE) => number;
  /** 카테고리별, 통화 별 총 지출 */
  getCategorySpendByCurrency: (
    category: EXPENSES_CATEGORY_TYPE,
  ) => ISpendByCurrency[];
  /** 카테고리별, 통화별 내 지출 */
  getCategoryMySpendByCurrency: (
    category: EXPENSES_CATEGORY_TYPE,
  ) => ISpendByCurrency[];

  /** 멤버별 총 결제 금액 */
  getTotalPaymentAmountByMember: (id: string) => number;
  /** 멤버별 총 지출 금액 */
  getTotalSpendAmountByMember: (id: string) => number;
  /** 결제자, 지출자 리스트 */
  getSettlementList: () => { fromId: string; toId: string; amount: number }[];
  /** 최종 정산 내역 */
  getFinalSettlement: () => {
    sendId: string;
    receiveId: string;
    amount: number;
  }[];
  /** 내가 받을 금액 구하기 */
  getMyReceiveAmount: (id: string) => number;
  /** 내 순수 지출 구하기 */
  getMyNetExpense: (id: string) => number;
}
