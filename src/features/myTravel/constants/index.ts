import {
  TRAVEL_STATUS,
  TRAVEL_PARTNER,
  TRAVEL_STYLE,
  TRAVEL_TAB,
} from '@/shared/types/Enum';

/** 여행 생성 스텝 리스트 */
export const CREATE_TRAVEL_STEP_LIST = [
  { id: 1, label: '여행지 선택', isComplete: false },
  { id: 2, label: '날짜 선택', isComplete: false },
  { id: 3, label: '여행 정보', isComplete: false },
];

/** 여행 동반자 리스트 */
export const TRAVEL_PARTNER_LIST = [
  { label: '혼자', value: TRAVEL_PARTNER.ALONE },
  { label: '친구와', value: TRAVEL_PARTNER.FRIEND },
  { label: '연인과', value: TRAVEL_PARTNER.LOVER },
  { label: '배우자와', value: TRAVEL_PARTNER.SPOUSE },
  { label: '아이와', value: TRAVEL_PARTNER.CHILD },
  { label: '직장동료와', value: TRAVEL_PARTNER.COLLEAGUES },
  { label: '가족과', value: TRAVEL_PARTNER.FAMILY },
  { label: '부모님과', value: TRAVEL_PARTNER.PARENTS },
  { label: '기타', value: TRAVEL_PARTNER.ETC },
];

/** 여행 스타일 리스트 */
export const TRAVEL_STYLE_LIST = [
  { label: '힐링/휴식', value: TRAVEL_STYLE.HEAL },
  { label: '먹방', value: TRAVEL_STYLE.FOOD },
  { label: '액티비티', value: TRAVEL_STYLE.ACTIVITY },
  { label: '문화/예술', value: TRAVEL_STYLE.CULTURE },
  { label: '이색/체험', value: TRAVEL_STYLE.EXPERIENCE },
  { label: '기타', value: TRAVEL_STYLE.ETC },
];

/** 여행 상태 리스트 */
export const TRAVEL_STATUS_LIST = [
  { label: '여행중', value: TRAVEL_STATUS.PROGRESS },
  { label: '다가오는', value: TRAVEL_STATUS.UPCOMING },
  { label: '지난', value: TRAVEL_STATUS.LAST },
];

/** 여행 상세 탭 */
export const TRAVEL_TAB_LIST = [
  { label: '일정', value: TRAVEL_TAB.SCHEDULE },
  { label: '가계부', value: TRAVEL_TAB.EXPENSES },
];

/** 환율 기준 금액 */
export const CURRENCY_STANDARD_AMOUNT = 1000;