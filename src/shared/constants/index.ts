import { ILabelValue } from '@/shared/interfaces';
import { TRAVEL_TYPE } from '@/shared/types/Enum';

/** 레이아웃 기본 클래스 */
export const DEFAULT_LAYOUT_CLASSNAME =
  'desktop:w-desktop tablet:w-tablet mx-auto';

/** 여행 지도 타입 */
export const MAP_TRAVEL_TYPE_LIST: ILabelValue[] = [
  { label: '해외', value: TRAVEL_TYPE.WORLD },
  { label: '국내', value: TRAVEL_TYPE.DOMESTIC },
];
export type MAP_TRAVEL_TYPE_LIST =
  (typeof MAP_TRAVEL_TYPE_LIST)[keyof typeof MAP_TRAVEL_TYPE_LIST];

/** 사진 업로드 수 */
export const SINGLE_COUNT = 1;
export const MULTIPLE_COUNT = 10;

/** 사이드바 마이페이지 리스트 */
export const MYPAGE_LIST = [
  {
    name: '계정 정보',
    path: '/my-page/user-info',
  },
  {
    name: '내 타임라인',
    path: '/my-page/my-timeline',
  },
];
