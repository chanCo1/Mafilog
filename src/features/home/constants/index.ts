import { ILabelValue } from '@/shared/interfaces';
import { TTabTypes } from '@/features/home/types';

/** 서비스 간략 소개 탭 리스트 */
export const TABLIST: ILabelValue<TTabTypes>[] = [
  {label: '일정', value: 'schedule'},
  {label: '가계부', value: 'household'},
  {label: '추억', value: 'memory'},
  {label: '타임라인', value: 'timeline'}
]
/** TABLIST 타입 추출 */
export type TABLIST = (typeof TABLIST)[keyof typeof TABLIST];