import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { TRAVEL_TYPE } from '@/shared/types/Enum';

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

/** 추억 상세 조회 */
export interface IMemoryDetailResponse extends IMemoryListResponse {
  schedules: IMemoryScheduleList[];
}

export interface IMemoryScheduleList {
  day: number;
  id: number;
  memo: string;
  memoryId: number;
  order: number;
  rating: number;
  time: string;
  type: string;
  place: IPlaceList[];
}
