/**
 * @file: useGetWeather.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 날씨 정보 조회 후 데이터 커스텀 훅
 */

import { useMemo } from 'react';
import { useTravelStore } from '@/shared/stores/useTravelStore';
import { useFetchWeather } from '@/features/myTravel/hooks/rquery/useFetchWeather';

interface IGetWeather {
  lat: number | undefined;
  lng: number | undefined;
}

type PrecipType = 'rain' | 'snow' | 'freezingrain' | 'ice';

export const useGetWeather = ({ lat, lng }: IGetWeather) => {
  const travelInfo = useTravelStore((state) => state.travelInfo);
  const { data } = useFetchWeather({
    lat,
    lng,
    startDate: travelInfo.from,
    endDate: travelInfo.to,
  });

  const getWeather = useMemo(() => {
    const pickedItems = data?.days?.map((day) => {
      const getPrecipDisplay = (types: PrecipType[], prob: number) => {
        if (!types || types.length === 0 || prob === 0) return null;

        if (types.includes('rain') && types.includes('snow')) {
          return `진눈깨비 확률 ${prob}%`;
        }

        if (types.includes('freezingrain') || types.includes('ice')) {
          return `우박/빙판 확률 ${prob}%`;
        }

        if (types.includes('snow')) {
          return `눈 확률 ${prob}%`;
        }

        return `비 확률 ${prob}%`;
      };

      return {
        datetime: day.datetime, // 날짜
        conditions: `${day.conditions} 날씨`, // 날씨 설명
        icon: day.icon, // 아이콘
        tempmax: day.tempmax, // 최고 기온
        tempmin: day.tempmin, // 최저 기온
        temp: day.temp, // 평균 기온
        precip: getPrecipDisplay(day.preciptype, day.precipprob), // 내릴 확률(%)
        precipprob: day.precipprob,
        preciptype: day.preciptype,
      };
    });

    return pickedItems;
  }, [data]);

  return getWeather;
};
