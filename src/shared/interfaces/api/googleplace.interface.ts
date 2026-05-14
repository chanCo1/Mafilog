/** google places 검색 응답 */
export interface IGetGooglePlacesResponse {
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