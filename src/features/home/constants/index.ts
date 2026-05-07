import { ILabelValue } from '@/shared/interfaces';
import { TTabTypes } from '@/features/home/types';
import { TRAVEL_TYPE } from '@/shared/types/Enum';
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/expenseEnum';

/** 서비스 간략 소개 탭 리스트 */
export const TABLIST: ILabelValue<TTabTypes>[] = [
  { label: '일정', value: 'schedule' },
  { label: '가계부', value: 'expenses' },
  { label: '추억', value: 'memory' },
  { label: '타임라인', value: 'timeline' },
];
/** TABLIST 타입 추출 */
export type TABLIST = (typeof TABLIST)[keyof typeof TABLIST];

/** 일정 소개 리스트 */
export const SCHEDULE_INTRODUCE_LIST: string[] = [
  '지구 곳곳에 있는 장소 검색',
  '여행 기간에 맞는 일정 추가/변경',
  '여행 스타일에 맞는 체크리스트',
  '환율 · 날씨 등 현지 정보 확인',
];

/** 일정 목업 데이터 */
export const SCHEDULE_MOCK_DATA = [
  {
    name: '아사쿠사 규카츠',
    type: 'place',
    category: '음식점',
    country: '일본',
    city: '아사쿠사',
  },
  {
    name: '중간에 약국 들려서 약 사기!',
    type: 'memo',
    category: '',
    country: '',
    city: '',
  },
  {
    name: '센소지',
    type: 'place',
    category: '관광명소',
    country: '일본',
    city: '아사쿠사',
  },
];
export type SCHEDULE_MOCK_DATA =
  (typeof SCHEDULE_MOCK_DATA)[keyof typeof SCHEDULE_MOCK_DATA];

/** 가계부 소개 리스트 */
export const EXPNESES_INTRODUCE_LIST: string[] = [
  '상황에 맞는 지출 내역 기록',
  '환율 자동 계산으로 편안하게 사용 내역 확인',
  '한 눈에 보이는 통계',
  '지출에 따라 정산 내역 자동 계산',
  // '현지 환율 정보 확인',
];

/** 가계부 목업 데이터 */
export const EXPENSES_MOCK_DATA = [
  {
    type: EXPENSES_CATEGORY_TYPE.BUS,
    name: '비행기 예약',
    payer: '나',
    spender: '나',
    paymentMethod: '카드',
    currency: 'KRW',
  },
  {
    type: EXPENSES_CATEGORY_TYPE.FOOD,
    name: '점심값 지출',
    payer: '나',
    spender: '1/N',
    paymentMethod: '현금',
    currency: 'USD',
  },
];

/** 추억 채우기 소개 리스트 */
export const MEMORY_INTRODUCE_LIST: string[] = [
  '국내 지도와 해외 지도 어디든 원하는 곳에 기록',
  '지도에 원하는 사진 업로드',
  '다녀온 여행 일정을 연동해서 추억 채우기',
];

/** 타임라인 소개 리스트 */
export const TIMELINE_INTRODUCE_LIST: string[] = [
  '국·내외 / 연도별 타임라인 필터링',
  '지금까지 여행에 대한 통계',
  '시간대별 여행 정보 확인',
  '각 여행에 대해 카테고리별 지출 내역 확인',
];

/** 타임라인 목업 데이터 */
export const TIMELINE_MOCK_DATA = [
  {
    type: TRAVEL_TYPE.WORLD,
    name: '도쿄 먹방 여행',
    partner: '연인과',
    style: ['먹방'],
  },
  {
    type: TRAVEL_TYPE.DOMESTIC,
    name: '속초 겨울 바다',
    partner: '친구와',
    style: ['먹방', '힐링/휴식'],
  },
  {
    type: TRAVEL_TYPE.DOMESTIC,
    name: '부산 당일치기',
    partner: '친구와',
    style: ['먹방'],
  },
];
