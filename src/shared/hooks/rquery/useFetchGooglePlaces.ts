/**
 * @file: useFetchGooglePlaces.ts
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: 구글 장소 검색 react query
 */

import { useQuery } from '@tanstack/react-query';
import { getGooglePlaces } from '@/shared/services/googlePlacesService';

interface IUseFetchGooglePlaces {
  search: string;
}

/** 구글 장소 검색 react query */
export const useFetchGooglePlaces = ({ search }: IUseFetchGooglePlaces) => {
  const query = useQuery({
    queryKey: ['googlePlaces', search],
    queryFn: async () =>
      await getGooglePlaces({
        searchPlace: search,
      }),
    enabled: !!search,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 3,
  });

  return {
    ...query,
    data: query.data,
  };
};
