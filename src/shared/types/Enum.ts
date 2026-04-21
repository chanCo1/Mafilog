/** 일정 타입 */
export const SCHEDULE_TYPE = {
  /** 장소 */
  LOCATION: 'location',
  /** 메모 */
  MEMO: 'memo',
};
export type SCHEDULE_TYPE = (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];

/** 가계부 지출 타입 */
export const EXPENSES_TYPE = {
  /** 교통 */
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
export type EXPENSES_TYPE = (typeof EXPENSES_TYPE)[keyof typeof EXPENSES_TYPE];

/** 여행 타입 */
export const TRAVEL_TYPE = {
  /** 해외 */
  INTERNATIONAL: 'international',
  /** 국내 */
  LOCAL: 'local',
};
export type TRAVEL_TYPE = (typeof TRAVEL_TYPE)[keyof typeof TRAVEL_TYPE];