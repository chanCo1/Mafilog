/** 가계부 지출 카테고리 타입 */
export const EXPENSES_CATEGORY_TYPE = {
  /** 교통 */
  TRANSPORT: 'transport',
  /** 음식 */
  FOOD: 'food',
  /** 쇼핑 */
  SHOPPING: 'shopping',
  /** 관광 */
  TOUR: 'tour',
  /** 숙소 */
  HOUSE: 'house',
  /** 기타 */
  ETC: 'etc',
} as const;
export type EXPENSES_CATEGORY_TYPE =
  (typeof EXPENSES_CATEGORY_TYPE)[keyof typeof EXPENSES_CATEGORY_TYPE];

/** 가계부 지출 타입 */
export const EXPENSES_PAYMENT_TYPE = {
  /** 카드 */
  CARD: 'card',
  /** 현금 */
  CASH: 'cash',
} as const;
export type EXPENSES_PAYMENT_TYPE =
  (typeof EXPENSES_PAYMENT_TYPE)[keyof typeof EXPENSES_PAYMENT_TYPE];

/** 지출자 방식 타입 */
export const EXPENSES_SPENDER_TYPE = {
  /** 나만 */
  SELF: 'self',
  /** 1/N */
  SPLIT: 'split',
  /** 지정 */
  ASSIGN: 'assign',
};
export type EXPENSES_SPENDER_TYPE =
  (typeof EXPENSES_SPENDER_TYPE)[keyof typeof EXPENSES_SPENDER_TYPE];
