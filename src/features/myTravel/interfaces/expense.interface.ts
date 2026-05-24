import {
  EXPENSES_SPENDER_TYPE,
  EXPENSES_CATEGORY_TYPE,
  EXPENSES_PAYMENT_TYPE,
} from '@/shared/types/expenseEnum';
import { IMemberList } from '@/shared/interfaces';

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
  currencyCountry: string;
  exchangeRateAmount: number;
  payerId: string;
  payer: IPayer;
  spender: ISpender[];
  travelExpenseId: number;
}

export interface IPayer {
  id: string;
  createdAt: string;
  expenseId: null;
  expenseSpenderId: null;
  name: string;
  travelId: number;
  userId: string;
}

export interface ISpender {
  id: number;
  memberId: string;
  amount: number;
  name: string;
  calcExchangeAmount: number;
  category: EXPENSES_CATEGORY_TYPE;
  currencyCode: string;
  currencyCountry: string;
  createdAt: string;
  expenseListId: number;
  member: IMemberList;
}

export interface IExpenseRequest {
  id?: number;
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
  name: string;
  amount: number;
  calcExchangeAmount: number;
  currencyCode: string;
  category: string;
}
