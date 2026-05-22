import {
  EXPENSES_SPENDER_TYPE,
  EXPENSES_CATEGORY_TYPE,
  EXPENSES_PAYMENT_TYPE,
} from '@/shared/types/expenseEnum';

/** 가계부 리스트 조회 */
export interface IExpenseResponse {
  id: number;
  day: number;
  date: string;
  travelId: number;
  expenseList: IExpenseList[];
  dailyExpense: number;
  createAt: string;
  updatedAt: string;
}

export interface IExpenseList {
  id: number;
  name: string;
  paymentType: EXPENSES_PAYMENT_TYPE;
  spenderType: EXPENSES_SPENDER_TYPE;
  category: EXPENSES_CATEGORY_TYPE;
  day: number;
  time: string;
  memo: string;
  amount: number;
  calcFormula: string;
  calcExchangeAmount: number;
  currencyCode: string;
  exchangeRateAmount: number;
  payerId: string;
  payer: IPayer;
  spender: ISpender[];
  travelExpenseId: number;
}

export interface IPayer {
  id: number;
}

export interface ISpender {
  id: number;
  amount: number;
  calcExchangeAmount: number;
  category: EXPENSES_CATEGORY_TYPE
  currencyCode: string;
  currencyCountry: string;
}

export interface IExpenseRequest {
  name: string;
  paymentType: string;
  spenderType: string;
  category: string;
  day: number;
  time?: string;
  memo?: string;
  amount: number;
  calcFormula: string;
  calcExchangeAmount: number;
  currencyCode: string;
  currencyCountry: string;
  exchangeRateAmount: number;
  payerId: string;
  spenders: ISpenderRequest[]; // 지출 참여자 목록
}

interface ISpenderRequest {
  memberId: string;
  amount: number;
  calcExchangeAmount: number;
  currencyCode: string;
  category: string;
}
