'use client';

/**
 * @file: HomePage.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: HomePage 컴포넌트
 */

import React, { useEffect } from 'react';
import { cn, getTravelStatus } from '@/shared/lib/utils';
import { DEFAULT_LAYOUT_CLASSNAME } from '@/shared/constants';
import { LogoText } from '@/shared/components/ui/LogoText';
import LogoDescription from '@/features/home/components/LogoDescription';
import { Button } from '@/shared/components/ui/Button';
import BriefIntroduceTabs from '@/features/home/components/briefTab/BriefIntroduceTabs';
import MapContainer from '@/features/home/components/MapContainer';
import UpcomingContainer from '@/features/home/components/UpcomingContainer';
import { useRouter } from 'next/navigation';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';
import { useMyTravelListStore } from '@/shared/stores/useMyTravelListStrore';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { TRAVEL_STATUS } from '@/shared/types/Enum';
import ProgressTravelCard from '@/features/home/components/ProgressTravelCard';

export default function HomePage() {
  const router = useRouter();
  const { fetchCountires } = useCountriesDataStore();
  const { setProgressTravel, setUpcomingTravel, setLastTravel } =
    useMyTravelListStore();

  const getMyTravelList = async () => {
    try {
      const myTravelList = await MyTravelService.getMyTravelList();

      const progress = myTravelList.filter(
        (travel) =>
          getTravelStatus(travel.from, travel.to) === TRAVEL_STATUS.PROGRESS,
      );

      const upcoming = myTravelList.filter(
        (travel) =>
          getTravelStatus(travel.from, travel.to) === TRAVEL_STATUS.UPCOMING,
      );

      const last = myTravelList.filter(
        (travel) =>
          getTravelStatus(travel.from, travel.to) === TRAVEL_STATUS.LAST,
      );

      setProgressTravel(progress);
      setUpcomingTravel(upcoming);
      setLastTravel(last);
    } catch (error) {
      console.error(error);
    }
  };

  /** 마운트시 한번만 호출 */
  useEffect(() => {
    fetchCountires();
    getMyTravelList();
  }, []);

  return (
    <>
      <div className="h-auto">
        <div className="bg-gray-6 relative left-1/2 -mt-7 h-87.5 w-screen -translate-x-1/2">
          <div className={cn(DEFAULT_LAYOUT_CLASSNAME, 'px-3')}>
            {/* 로고 설명 */}
            <div className="flex flex-col items-center gap-7.5">
              <div className="flex flex-col items-center gap-3 pt-15">
                <div className="flex flex-col items-center">
                  <p className="text-lg text-white">
                    지도에 색칠하듯 기록하기 쉬운 여행
                  </p>
                  <LogoText size="logo" color="white" />
                  <div className="flex items-center gap-1">
                    <LogoDescription title="Map." subTitle="지도를" />
                    <LogoDescription title="Fill." subTitle="채우고" />
                    <LogoDescription title="Log." subTitle="기록하다" />
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <Button size="lg" onClick={() => router.push('/my-travel')}>
                    내 여행
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push('/my-map')}
                  >
                    추억 채우기
                  </Button>
                </div>
              </div>
              {/* 서비스 간략 소개 */}
              <BriefIntroduceTabs />
            </div>
          </div>
        </div>
      </div>
      <div className="max-mobile:pt-65 max-mobile:gap-10 flex flex-col gap-15 pt-72">
        <UpcomingContainer />
        <MapContainer />
      </div>
      <ProgressTravelCard />
    </>
  );
}
