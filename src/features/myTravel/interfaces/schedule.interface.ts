import { SCHEDULE_TYPE } from '@/shared/types/Enum';

/** 장소 정보 */
export interface IPlaceList {
  id: string;
  name: string;
  address: string;
  countryName: string;
  countryCode: string;
  lat: number;
  lng: number;
  types: string[];
  timezone?: string;
  placeId?: string;
}

/** 일정 리스트 조회 */
export interface IScheduleResponse {
  id: number;
  day: number;
  date: string;
  travelId: number;
  createAt: string;
  scheduleList: IScheduleListResponse[];
}

export interface IScheduleListResponse {
  id: number;
  type: SCHEDULE_TYPE;
  day: number;
  place: IPlaceList;
  time: string;
  memo: string;
  scheduleId: number;
  schedulePlaceId: string;
}

/** 일정(장소) 등록 요청 */
export interface ISchedulePlaceRequest {
  scheduleId: number;
  type: SCHEDULE_TYPE;
  day: number;
  time?: string;
  memo?: string;
  place?: IPlaceList[];
}

/** 일정 수정 요청 */
export interface IUpdateSchedulePlaceRequest extends Pick<
  ISchedulePlaceRequest,
  'memo' | 'day' | 'time'
> {
  scheduleListId: number;
}

export interface IScheduleListWithRating extends IScheduleListResponse {
  rating: number;
}
