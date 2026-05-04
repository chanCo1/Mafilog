
/**
 * @file: getWeatherByVisualCrossing.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 날씨 정보 api
 */

import { IWeatherResponse } from '@/features/myTravel/interfaces/api/weather.interface';
import axios from 'axios';


interface IGetWeatherByVisualCrossing {
  lat: number | undefined;
  lng: number | undefined;
  startDate: string;
  endDate: string;
}

const API_KEY = process.env.NEXT_PUBLIC_VISUALCROSSING_API_KEY;

export const getWeatherByVisualCrossing = async ({
  lat,
  lng,
  startDate,
  endDate,
}: IGetWeatherByVisualCrossing): Promise<IWeatherResponse> => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}/${startDate}/${endDate}`;

  const response = await axios.get(url, {
    params: {
      unitGroup: 'metric', // 섭씨
      key: API_KEY,
      contentType: 'json',
      include: 'days', // 시간별 데이터가 필요 없다면 days만 포함해서 용량 최적화
      lang: 'ko', // 한국어 설명
    },
  });

  return response.data;
};
