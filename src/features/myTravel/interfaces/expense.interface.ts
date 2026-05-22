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
  payer: any;
  spender: any;
  travelExpenseId: number;
}




// id: string;
//   name: string; // 지출명
//   spenderType: EXPENSES_SPENDER_TYPE;
//   category: EXPENSES_CATEGORY_TYPE;
//   paymentType: EXPENSES_PAYMENT_TYPE; // 결제 타입
//   payer: ILabelValue; // 결제자
//   spender: ISpenderWithAmount[]; // 지출자
//   time?: string;
//   memo?: string;
//   day: number;
//   amount: number; // 지출 금액
//   calcExchangeAmount: number; // 한화 금액
//   exchangeRate: {
//     currencyCode: ILabelValue; // 통화 코드
//     amount: number; // 환율금액
//   };
//   calcFormula: string;