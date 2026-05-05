/** 강수 종류 */
export type TPrecipType = 'rain' | 'snow' | 'freezingrain' | 'ice';
/** 데이터 출처 종류 */
export type TSourceType = 'obs' | 'fcst' | 'stats' | 'comb';

export interface IWeatherDay {
  datetime: string; // "2026-05-10"
  datetimeEpoch: number;
  tempmax: number; // 최고 기온
  tempmin: number; // 최저 기온
  temp: number; // 평균 기온
  feelslike: number; // 체감 온도
  humidity: number; // 습도
  precip: number; // 강수량
  precipprob: number; // 강수 확률 (0~100)
  preciptype: TPrecipType[] | null; // 강수 종류
  snow: number;
  snowdepth: number;
  windspeed: number;
  conditions: string; // 날씨 요약 (맑음, 흐림 등)
  description: string; // 상세 설명
  icon: string; // 아이콘 키워드
  source: TSourceType;
  sunrise: string;
  sunset: string;
  uvindex: number;
}

export interface IWeatherResponse {
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description?: string;
  days: IWeatherDay[];
}
