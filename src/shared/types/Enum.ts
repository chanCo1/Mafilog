/** 일정 타입 */
export const SCHEDULE_TYPE = {
  /** 장소 */
  PLACE: 'place',
  /** 메모 */
  MEMO: 'memo',
} as const;
export type SCHEDULE_TYPE = (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];

/** 여행 타입 */
export const TRAVEL_TYPE = {
  /** 세계 */
  WORLD: 'world',
  /** 국내 */
  DOMESTIC: 'domestic',
} as const;
export type TRAVEL_TYPE = (typeof TRAVEL_TYPE)[keyof typeof TRAVEL_TYPE];

/** google place api에서 카테고리 그룹별로 정리 */
export const PLACE_CATEGORY_TYPE = {
  /** 교통 */
  TRANSPORT: [
    'transportation_service',
    'airport',
    'transit_station',
    'subway_station',
    'bus_stop',
    'bus_station',
  ],
  /** 음식점 */
  FOOD: ['food', 'restaurant', 'cafe'],
  /** 쇼핑 */
  SHOPPING: ['store', 'shopping_mall', 'department_store'],
  /** 관광명소 */
  TOUR: ['tourist_attraction', 'park', 'garden'],
  /** 숙박시설 */
  HOUSE: ['lodging', 'hotel'],
  /** 기타 */
  ETC: [''],
} as const;
export type PLACE_CATEGORY_TYPE =
  (typeof PLACE_CATEGORY_TYPE)[keyof typeof PLACE_CATEGORY_TYPE];

/** 아이콘 타입 */
export const ICON_TYPE = {
  /** X */
  X: 'x',
  /** 체크 */
  CHECK: 'check',
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
} as const;
export type ICON_TYPE = (typeof ICON_TYPE)[keyof typeof ICON_TYPE];

/** 여행 상태 */
export const TRAVEL_STATUS = {
  PROGRESS: 'progress', // 여행중
  UPCOMING: 'upcoming', // 다가오는
  LAST: 'last', // 지난
} as const;
export type TRAVEL_STATUS = (typeof TRAVEL_STATUS)[keyof typeof TRAVEL_STATUS];

/** 여행 동반자 */
export const TRAVEL_PARTNER = {
  ALONE: 'alone', // 혼자
  FRIEND: 'friend', // 친구와
  LOVER: 'lover', // 연인과
  SPOUSE: 'spouse', // 배우자와
  CHILD: 'child', // 아이와
  COLLEAGUES: 'colleagues', // 직장동료와
  FAMILY: 'family', // 가족과
  PARENTS: 'parents', // 부모님과
  ETC: 'etc', // 기타
} as const;
export type TRAVEL_PARTNER =
  (typeof TRAVEL_PARTNER)[keyof typeof TRAVEL_PARTNER];

/** 여행 스타일 */
export const TRAVEL_STYLE = {
  HEAL: 'heal', // 힐링/휴식
  FOOD: 'food', // 먹방
  ACTIVITY: 'activity', // 액티비티
  CULTURE: 'culture', // 문화/예술
  EXPERIENCE: 'experience', // 이색/체험
  ETC: 'etc', // 기타
} as const;
export type TRAVEL_STYLE = (typeof TRAVEL_STYLE)[keyof typeof TRAVEL_STYLE];

/** 여행 상세 탭 */
export const TRAVEL_TAB = {
  SCHEDULE: 'schedule', // 일정
  EXPENSES: 'expenses', // 가계부(지출)
} as const;
export type TRAVEL_TAB = (typeof TRAVEL_TAB)[keyof typeof TRAVEL_TAB];
