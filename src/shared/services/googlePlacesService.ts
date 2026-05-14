/**
 * @file: getGooglePlaces.ts
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: 장소 정보 api - googleplaces
 */

import axios from 'axios';
import { IGetGooglePlacesResponse } from '@/shared/interfaces/api/googleplace.interface';

interface IGetGooglePlaces {
  searchPlace: string;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const getGooglePlaces = async ({ searchPlace }: IGetGooglePlaces): Promise<IGetGooglePlacesResponse> => {
  const url = 'https://places.googleapis.com/v1/places:searchText';

  const response = await axios.post(
    url,
    {
      textQuery: `${searchPlace}`,
      languageCode: 'ko',
      regionCode: 'KR',
      maxResultCount: 20,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY as string,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.addressComponents,places.formattedAddress,places.location,places.types',
      },
    },
  );

  return response.data;
};
