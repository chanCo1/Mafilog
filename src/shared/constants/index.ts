import { ILabelValue } from '@/shared/interfaces';
import { TRAVEL_TYPE } from '@/shared/types/Enum';

/** 레이아웃 기본 클래스 */
export const DEFAULT_LAYOUT_CLASSNAME =
  'desktop:w-desktop tablet:w-tablet mx-auto';

/** 여행 지도 타입 */
export const TRAVEL_TYPE_LIST: ILabelValue[] = [
  { label: '세계', value: TRAVEL_TYPE.WORLD },
  { label: '국내', value: TRAVEL_TYPE.DOMESTIC },
];
export type TRAVEL_TYPE_LIST =
  (typeof TRAVEL_TYPE_LIST)[keyof typeof TRAVEL_TYPE_LIST];
