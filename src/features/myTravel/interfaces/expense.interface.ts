import { EXPENSES_PAYMENT_TYPE } from '@/shared/types/Enum';

/** 가계부 정보 */
export interface IExpensesList {
  id: string;
  name: string; // 지출명;
  amount: number; // 지출 금액;
  currency: string; // 통화;
  paymentType: EXPENSES_PAYMENT_TYPE; // 결제 타입
  payer: string; // 결제자
  spender: string[]; // 지출자
}