/**
 * @file: LocalWeatherInfo.tsx
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: LocalWeatherInfo 컴포넌트, 현지 날씨 정보 컴포넌트
 */

import { useGetWeather } from '@/features/myTravel/hooks/useGetWeather';
import { IPlaceList } from '@/features/myTravel/interfaces';

interface ILocalWeatherInfo {
  selectedCity: IPlaceList | undefined;
}

export default function LocalWeatherInfo({ selectedCity }: ILocalWeatherInfo) {
  const getWeather = useGetWeather({
    lat: selectedCity?.location.lat,
    lng: selectedCity?.location.lng,
  });

  console.log('getWeather >>> ', getWeather);

  return (
    <div className="flex flex-col gap-2">
      <div>
        여행기간 중{' '}
        <span className="text-primary text-lg font-bold">
          {selectedCity?.name}
        </span>{' '}
        날씨는
      </div>
      <div className="scrollbar-hide flex gap-1 overflow-auto">
        {getWeather?.map((weather) => (
          <div className="flex shrink-0 justify-center p-1 text-center">
            <div className="flex flex-col">
              <span className="text-text-secondary text-sm font-bold">
                {weather.datetime}
              </span>
              <span className="font-bold">{weather.conditions}</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-state-error text-sm font-bold">최저</span>
                <span className="text-sm font-bold">
                  {weather.tempmin}&deg;C
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-state-success text-sm font-bold">
                  최고
                </span>
                <span className="text-sm font-bold">
                  {weather.tempmax}&deg;C
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
