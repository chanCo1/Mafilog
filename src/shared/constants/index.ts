import { ILabelValue } from '@/shared/interfaces';
import { TRAVEL_TYPE } from '@/shared/types/Enum';

/** 레이아웃 기본 클래스 */
export const DEFAULT_LAYOUT_CLASSNAME =
  'desktop:w-desktop tablet:w-tablet mx-auto';

/** 여행 지도 타입 */
export const TRAVEL_MAP_TYPE_LIST: ILabelValue[] = [
  { label: '해외지도', value: TRAVEL_TYPE.INTERNATIONAL },
  { label: '국내지도', value: TRAVEL_TYPE.LOCAL },
];
export type TRAVEL_MAP_TYPE_LIST =
  (typeof TRAVEL_MAP_TYPE_LIST)[keyof typeof TRAVEL_MAP_TYPE_LIST];
