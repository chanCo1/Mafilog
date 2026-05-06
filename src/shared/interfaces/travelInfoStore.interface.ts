import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import {
  TRAVEL_STATUS,
  TRAVEL_PARTNER,
  TRAVEL_STYLE,
} from '@/shared/types/Enum';

/** 여행 상세 전역 인터페이스 (state) */
export interface ITravelInfoState {
  travelInfo: {
    id: number;
    title: string;
    from: Date;
    to: Date;
    status: TRAVEL_STATUS;
    travelPeriod: number;
    travelStyles: TRAVEL_STYLE[];
    travelPartner: TRAVEL_PARTNER;
    cities: IPlaceList[];
  };
}

/** 여행 상세 전역 인터페이스 (actions) */
export interface ITravelInfoActions {
  setInitTravelInfo: (data: ITravelInfoState['travelInfo']) => void;
  reset: () => void;
}

/** 여행 상세 전역 인터페이스 (getters) */
export interface ITravelInfoGetters {
  getTravelInfo: () => ITravelInfoState['travelInfo'];
}
