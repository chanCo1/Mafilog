import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { TRAVEL_STYLE, TRAVEL_TYPE } from '@/shared/types/Enum';

export interface IMyTravelListResponse {
  cities: ({
    travelId: string;
    createdAt: string;
  } & IPlaceList)[];
  createdAt: string;
  from: Date;
  id: string;
  imageUrl: string | null;
  title: string;
  to: Date;
  travelPartner: string;
  travelPeriod: string;
  travelStyles: TRAVEL_STYLE[];
  travelType: TRAVEL_TYPE;
  userId: string;
}
