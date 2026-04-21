/**
 * 일정 관련
 */
/** 일정 타입 */
export const SCHEDULE_TYPE = {
  /** 장소 */
  LOCATION: 'location',
  /** 메모 */
  MEMO: 'memo',
};
export type SCHEDULE_TYPE = (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];

/** 여행 타입 */
export const TRAVEL_TYPE = {
  /** 해외 */
  INTERNATIONAL: 'international',
  /** 국내 */
  LOCAL: 'local',
};
export type TRAVEL_TYPE = (typeof TRAVEL_TYPE)[keyof typeof TRAVEL_TYPE];

/**
 * 가계부 관련
 */
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
};
export type EXPENSES_CATEGORY_TYPE =
  (typeof EXPENSES_CATEGORY_TYPE)[keyof typeof EXPENSES_CATEGORY_TYPE];

/** 가계부 지출 타입 */
export const EXPENSES_PAYMENT_TYPE = {
  /** 카드 */
  CARD: 'card',
  /** 현금 */
  CASH: 'cash',
};
export type EXPENSES_PAYMENT_TYPE =
  (typeof EXPENSES_PAYMENT_TYPE)[keyof typeof EXPENSES_PAYMENT_TYPE];

/** 아이콘 타입 */
export const ICON_TYPE = {
  /** 메모 */
  MEMO: 'memo',
  /** 추가 */
  PLUS: 'plus',
  /** 항공 */
  PLANE: 'plane',
  /** 버스 */
  BUS: 'bus',
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
};
export type ICON_TYPE =
  (typeof ICON_TYPE)[keyof typeof ICON_TYPE];