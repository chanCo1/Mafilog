/** 여행 생성 스텝 리스트 */
export const CREATE_TRAVEL_STEP_LIST = [
  { id: 1, label: '여행지 선택', isComplete: false },
  { id: 2, label: '날짜 선택', isComplete: false },
  { id: 3, label: '여행 정보', isComplete: false },
];

/** 여행 동반자 리스트 */
export const TRAVEL_COMPANION_LIST = [
  { label: '혼자', value: 'alone' },
  { label: '친구와', value: 'friend' },
  { label: '연인과', value: 'lover' },
  { label: '배우자와', value: 'spouse' },
  { label: '아이와', value: 'child' },
  { label: '직장동료와', value: 'colleagues' },
  { label: '가족과', value: 'family' },
  { label: '부모님과', value: 'parents' },
  { label: '기타', value: 'etc' },
];
export type TRAVEL_COMPANION_LIST =
  (typeof TRAVEL_COMPANION_LIST)[keyof typeof TRAVEL_COMPANION_LIST];

/** 여행 스타일 리스트 */
export const TRAVEL_STYLE_LIST = [
  { label: '힐링/휴식', value: 'heal' },
  { label: '먹방', value: 'food' },
  { label: '액티비티', value: 'activity' },
  { label: '문화/예술', value: 'culture' },
  { label: '이색/체험', value: 'experience' },
  { label: '기타', value: 'etc' },
];
export type TRAVEL_STYLE_LIST =
  (typeof TRAVEL_STYLE_LIST)[keyof typeof TRAVEL_STYLE_LIST];

/** 여행 상태 */
export const TRAVEL_STATUS = [
  { lavel: '진행중인', value: 'progress' },
  { lavel: '다가오는', value: 'upcoming' },
  { lavel: '지난', value: 'last' },
];
export type TRAVEL_STATUS =
  (typeof TRAVEL_STATUS)[keyof typeof TRAVEL_STATUS];