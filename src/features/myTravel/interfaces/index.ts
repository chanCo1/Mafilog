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
  }[];
}

/** 도시 정보 */
export interface ICityList {
  id: string;
  name: string;
  location: ILocation;
  address: string;
  country: {
    code: string;
    name: string;
  };
}

interface ILocation {
  latitude: number;
  longitude: number;
}
