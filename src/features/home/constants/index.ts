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

/** 일정 소개 리스트 */
export const SCHEDULE_INTRODUCE_LIST: string[] = [
  '지구 곳곳에 있는 장소 검색',
  '여행 기간에 맞는 일정 추가/변경',
  '여행 스타일에 맞는 체크리스트',
  '환율 · 날씨 등 현지 정보 확인',
]

/** 가계부 소개 리스트 */
export const HOUSEHOLD_INTRODUCE_LIST: string[] = [
  '상황에 맞는 지출 내역 기록',
  '환율 자동 계산으로 편안하게 사용 내역 확인',
  '한 눈에 보이는 통계',
  '지출에 따라 정산 내역 자동 계산',
  '매일 업데이트 되는 현지 환율 정보',
]

/** 추억 채우기 소개 리스트 */
export const MEMORY_INTRODUCE_LIST: string[] = [
  '국내 지도와 해외 지도 어디든 원하는 곳에 기록',
  '지도에 원하는 사진 업로드',
  '다녀온 여행 일정 연동으로 정확한 추억 회상',
]

/** 타임라인 소개 리스트 */
export const TIMELINE_INTRODUCE_LIST: string[] = [
  '국 · 내외 / 연도별 타임라인 필터링',
  '지금까지 여행에 대한 통계',
  '시간대별 여행 정보 확인',
  '각 여행에 대해 카테고리별 지출 내역',
]