import { EXPENSES_PAYMENT_TYPE } from '@/shared/types/Enum';

/** google places 검색 */
export interface IGetGooglePlaces {
  places: {
    addressComponents: {
      languageCode: string;
      longText: string;
      shortText: string;
      types: string[];
    }[];
    displayName: {
      languageCode: string;
      text: string;
    };
    formattedAddress: string;
    id: string;
    location: {
      latitude: number;
      longitude: number;
    };
    types: string[];
    primaryTypeDisplayName: {
      languageCode: string;
      text: string;
    };
    rating: number;
    userRatingCount: number;
  }[];
}

interface ILocation {
  lat: number;
  lng: number;
}

/** 장소 정보 */
export interface IPlaceList {
  id: string;
  name: string;
  location: ILocation;
  address: string;
  country: {
    code: string | undefined;
    name: string | undefined;
  };
  types: string[];
}

/** 가계부 정보 */
export interface IExpensesList {
  id: string;
  name: string; // 지출명;
  amount: number; // 지출 금액;
  currency: string; // 통화;
  paymentType: EXPENSES_PAYMENT_TYPE; // 결제 타입
  payer: string; // 결제자
  spender: string[]; // 지출자
}
