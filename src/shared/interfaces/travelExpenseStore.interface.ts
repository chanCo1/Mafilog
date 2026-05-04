import { IExpensesList } from '@/features/myTravel/interfaces/expense.interface';
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/Enum';

/** 여행 상세 전역 인터페이스 (state) */
export interface ITravelExpenseState {
  expense: IExpense[];
}

/** 가계부 리스트 */
export interface IExpense {
  day: number;
  date: Date;
  list: {
    id: string;
    type: EXPENSES_CATEGORY_TYPE; // 지출 타입;
    expense: IExpensesList;
    time?: string;
    memo?: string;
  }[];
  dailyExpense: number; // 일일 총 지출;
}

export interface IDateFromTo {
  from: Date;
  to: Date;
}

/** 여행 가계부 전역 인터페이스 (actions) */
export interface ITravelExpenseActions {
  setInitExpense: (date: IDateFromTo) => void;
  reset: () => void;
}

/** 여행 가계부 전역 인터페이스 (getters) */
export interface ITravelExpenseGetters {
  getTravelExpense: () => any[];
}
