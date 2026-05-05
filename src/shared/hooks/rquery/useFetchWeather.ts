/**
 * @file: useFetchWeather.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 날씨 정보 호출 react query
 */

import { useQuery } from '@tanstack/react-query';
import { convertFormattedDate } from '@/shared/lib/utils';
import { getWeatherByVisualCrossing } from '@/shared/services/weatherService';

interface IUseFetchWeather {
  lat: number | undefined;
  lng: number | undefined;
  startDate: Date;
  endDate: Date;
}

export const useFetchWeather = ({
  lat,
  lng,
  startDate,
  endDate,
}: IUseFetchWeather) => {
  const _startDate = convertFormattedDate(startDate);
  const _endDate = convertFormattedDate(endDate);

  const query = useQuery({
    queryKey: ['weather', lat, lng, _startDate, _endDate],
    queryFn: async () =>
      await getWeatherByVisualCrossing({
        lat,
        lng,
        startDate: _startDate,
        endDate: _endDate,
      }),
    enabled: !!lat && !!lng && !!startDate && !!endDate,
    staleTime: 1000 * 60 * 60 * 12,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return {
    ...query,
    data: query.data,
  };
};
