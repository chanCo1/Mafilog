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
    location: ILocation;
    types: string[];
    primaryTypeDisplayName: {
      languageCode: string;
      text: string;
    };
    rating: number;
    userRatingCount: number;
  }[];
}

/** 도시 정보 */
export interface ICityList {
  id: string;
  name: string;
  location: ILocation;
  address: string;
  country: {
    code: string | undefined;
    name: string | undefined;
  };
}

interface ILocation {
  latitude: number | null;
  longitude: number | null;
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
  // displayName: string;
  // rating: number;
  // userRatingCount: number;
  types: string[];
}
