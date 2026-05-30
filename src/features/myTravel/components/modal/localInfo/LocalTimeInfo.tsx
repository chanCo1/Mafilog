/**
 * @file: LocalTimeInfo.tsx
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: LocalTimeInfo 컴포넌트, 현지 시차 정보
 */

import { useMemo } from 'react';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { useGetDiffTime } from '@/features/myTravel/hooks/useGetDiffTime';

interface ILocalTimeInfo {
  selectedCity: IPlaceList | undefined;
}

export default function LocalTimeInfo({ selectedCity }: ILocalTimeInfo) {
  const getTime = useGetDiffTime({ targetTimeZone: selectedCity?.timezone });
  if (!getTime) return null;

  const diffTimeMsg = useMemo(() => {
    if (getTime?.diffHours === undefined) return '';

    if (getTime.diffHours > 0) {
      return (
        <div>
          보다&nbsp;
          <span className="text-state-success text-lg font-bold">
            {`${getTime.diffHours}시간 빨라요`}
          </span>
        </div>
      );
    } else if (getTime.diffHours < 0) {
      return (
        <div>
          보다&nbsp;
          <span className="text-state-error text-lg font-bold">
            {`${getTime.diffHours}시간 느려요`}
          </span>
        </div>
      );
    } else {
      // return '과 같아요';
      return (
        <div>
          과&nbsp;
          <span className="text-lg font-bold">같아요</span>
        </div>
      );
    }
  }, [getTime?.diffHours]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline">
        <span className="text-primary text-lg font-bold">
          {selectedCity?.name}
        </span>
        의 시차는 한국(서울)<span>{diffTimeMsg}</span>
      </div>
      <div className="flex gap-3">
        <LocalCityTime
          city={selectedCity?.name}
          time={getTime?.targetTime}
          date={getTime?.targetDate}
        />
        {/* <Separator /> */}
        <LocalCityTime
          city="서울"
          time={getTime?.seoulTime}
          date={getTime?.seoulDate}
        />
      </div>
    </div>
  );
}

interface ILocalCityTime {
  date: string | undefined;
  time: string | undefined;
  city: string | undefined;
}
const LocalCityTime = ({ city, date, time }: ILocalCityTime) => (
  <div className="flex w-full justify-center text-center p-1 rounded-lg">
    <div className="flex flex-col">
      <span className="text-text-secondary text-sm font-bold">{date}</span>
      <span className="text-xl font-bold">{time}</span>
      <span className="text-sm font-bold">{city}</span>
    </div>
  </div>
);
