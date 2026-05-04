/** 날씨 api */

import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_VISUALCROSSING_API_KEY;

interface IGetWeatherByVisualCrossing {
  lat: number | undefined;
  lng: number | undefined;
  startDate: string;
  endDate: string;
}

export const getWeatherByVisualCrossing = async ({
  lat,
  lng,
  startDate,
  endDate,
}: IGetWeatherByVisualCrossing) => {
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
