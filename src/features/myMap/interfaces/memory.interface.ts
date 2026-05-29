import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { TRAVEL_TYPE, SCHEDULE_TYPE } from '@/shared/types/Enum';

export interface IHandleUpdateSchedule {
  day: number;
  listId: number;
  key: 'rating' | 'memo';
  value: string | number;
}

/** 추억 리스트 조회 */
export interface IMemoryListResponse {
  createdAt: string;
  from: string;
  hexCode: string;
  id: number;
  imageUrl: string[];
  mapId: string;
  mapType: TRAVEL_TYPE;
  memo: string;
  scheduleId: string;
  scheduleTitle: string;
  title: string;
  to: string;
  updatedAt: string;
  userId: string;
}

export interface IMemoryScheduleList {
  id: number;
  type: SCHEDULE_TYPE;
  day: number;
  time: string;
  memo: string;
  place: IPlaceList;
  order?: number;
  rating?: number;
  memoryId?: number;
  scheduleId?: number;
  scheduleListId?: number;
}

export interface IMemoryScheduleResponse {
  id: number;
  day: number;
  date: string;
  scheduleList: IMemoryScheduleList[];
  travelId?: number;
  createdAt?: string;
  updatedAt?: string;
}

/** 추억 상세 조회 */
export interface IMemoryDetailResponse {
  id: number;
  userId: string;
  title: string;
  scheduleTitle: string;
  memo: string;
  hexCode: string;
  mapId: string;
  mapType: TRAVEL_TYPE;
  from: string;
  to: string;
  imageUrl: string[];
  schedules: IMemoryScheduleResponse[];
  scheduleId?: string;
  createdAt?: string;
  updatedAt?: string;
}
