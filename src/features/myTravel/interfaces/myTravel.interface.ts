import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { TRAVEL_STYLE, TRAVEL_TYPE, TRAVEL_PARTNER } from '@/shared/types/Enum';

/** 내 여행 기본 조회 */
export interface ITravelBase {
  createdAt: string;
  from: Date;
  id: number;
  imageUrl: string | null;
  title: string;
  to: Date;
  travelPartner: TRAVEL_PARTNER;
  travelPeriod: string;
  travelStyles: TRAVEL_STYLE[];
  travelType: TRAVEL_TYPE;
  userId: string;
}

/** 여행 도시 리스트 조회 */
export interface ITravelCity extends IPlaceList {
  travelId: string;
  createdAt: string;
}

/** 여행 멤버 리스트 조회 */
export interface ITravelMember {
  createdAt: string;
  expenseId: number | null;
  expenseSpenderId: number | null;
  id: string;
  name: string;
  travelId: number;
  userId: string;
}

/** 내 여행 리스트 조회 */
export interface IMyTravelListResponse extends ITravelBase {
  cities: ITravelCity[];
}

/** 내 여행 상세 조회 */
export interface IMyTravelDetailResponse extends ITravelBase {
  cities: ITravelCity[];
  member: ITravelMember[];
}
