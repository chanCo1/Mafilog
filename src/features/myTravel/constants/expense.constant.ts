import {
  EXPENSES_SPENDER_TYPE,
  EXPENSES_PAYMENT_TYPE,
  EXPENSES_CATEGORY_TYPE,
} from '@/shared/types/expenseEnum';

/** 지출자 방식 리스트 */
export const SPENDER_TYPE_LIST = [
  { label: '나만', value: EXPENSES_SPENDER_TYPE.SELF },
  { label: '1/N', value: EXPENSES_SPENDER_TYPE.SPLIT },
  { label: '지정', value: EXPENSES_SPENDER_TYPE.ASSIGN },
];

/** 지출 방식 리스트 */
export const PAYMENT_TYPE_LIST = [
  { label: '현금', value: EXPENSES_PAYMENT_TYPE.CASH },
  { label: '카드', value: EXPENSES_PAYMENT_TYPE.CARD },
];

/** 지출 카테고리 리스트 */
export const EXPENSE_CATEGORY_LIST = [
  { label: '교통', value: EXPENSES_CATEGORY_TYPE.BUS },
  { label: '숙소', value: EXPENSES_CATEGORY_TYPE.HOUSE },
  { label: '음식', value: EXPENSES_CATEGORY_TYPE.FOOD },
  { label: '쇼핑', value: EXPENSES_CATEGORY_TYPE.SHOPPING },
  { label: '관광', value: EXPENSES_CATEGORY_TYPE.TOUR },
  { label: '기타', value: EXPENSES_CATEGORY_TYPE.ETC },
];

export const TRAVEL_EXPENSE_BEFORE = {
  label: '여행전',
  value: 0,
};

/** 지출 기본 일정 (모든날, 여행전) */
export const TRAVEL_EXPENSES_BEFORE_LIST = [
  { label: '모든날', value: 'all' },
  TRAVEL_EXPENSE_BEFORE,
];

/** 통계 리스트 */
export const EXPENSE_STATISTIC_LIST = [
  { label: '일정별', value: 'schedule' },
  { label: '카테고리별', value: 'category' },
];
