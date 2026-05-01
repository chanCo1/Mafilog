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

/** 도시 정보 */
// export interface ICityList {
//   id: string;
//   name: string;
//   location: ILocation;
//   address: string;
//   country: {
//     code: string | undefined;
//     name: string | undefined;
//   };
//   types: string[];
// }

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
