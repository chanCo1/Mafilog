/**
 * @file: LocalWeatherInfo.tsx
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: LocalWeatherInfo 컴포넌트, 현지 날씨 정보 컴포넌트
 */

import { useGetWeather } from '@/shared/hooks/useGetWeather';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { Loading } from '@/shared/components/ui/Loading';

interface ILocalWeatherInfo {
  selectedCity: IPlaceList;
}

export default function LocalWeatherInfo({ selectedCity }: ILocalWeatherInfo) {
  const {getWeather, isLoading} = useGetWeather({
    lat: selectedCity.lat,
    lng: selectedCity.lng,
  });

  if (isLoading) return <div className='flex justify-center'><Loading /></div>

  return (
    <div className="flex flex-col">
      <div>
        여행기간 중{' '}
        <span className="text-primary text-lg font-bold">
          {selectedCity?.name}
        </span>{' '}
        날씨는
      </div>
      {getWeather?.length ? (
        <div className="scrollbar-hide flex gap-1 overflow-auto">
          {getWeather?.map((weather, index) => (
            <div
              key={`${weather.datetime}-${weather.temp}-${index}`}
              className="flex shrink-0 justify-center p-1 text-center"
            >
              <div className="flex flex-col">
                <span className="text-text-secondary text-sm font-bold">
                  {weather.datetime}
                </span>
                <span className="font-bold">{weather.conditions}</span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-state-success text-sm font-bold">
                    최저
                  </span>
                  <span className="text-sm font-bold">
                    {weather.tempmin}&deg;C
                  </span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-state-error text-sm font-bold">
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
      ) : (
        <p className="text-state-error">날씨를 불러오지 못했습니다.</p>
      )}
    </div>
  );
}
