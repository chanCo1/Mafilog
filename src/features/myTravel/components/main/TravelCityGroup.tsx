/**
 * @file: TravelCityGroup.tsx
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 여행 도시를 국가별로 그룹화 하는 컴포넌트
 */

import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';
import { cn } from '@/shared/lib/utils';

interface ITravelCityGroupProps {
  cities: IPlaceList[];
  className?: string;
}

export default function TravelCityGroup({
  cities,
  className,
}: ITravelCityGroupProps) {
  const { countryData } = useCountriesDataStore();

  // 그룹화
  const groupedTravelCity = cities.reduce(
    (acc, cur) => {
      const _countryCode = cur.countryCode;

      if (!acc[_countryCode]) {
        acc[_countryCode] = [];
      }

      acc[_countryCode].push(cur);

      return acc;
    },
    {} as Record<string, IPlaceList[]>,
  );

  return (
    <div className={cn('flex flex-col', className)}>
      {Object.entries(groupedTravelCity).map(([code, groupedCities]) => (
        <div key={code} className="flex items-center gap-1">
          <span>{countryData[code].flagEmoji}</span>
          {groupedCities.map((city, index) => (
            <span key={`${city.name}-${index}`} className="text-sm">
              {city.name}
              {index !== groupedCities.length - 1 && ','}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
