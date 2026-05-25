/**
 * @file: MyTimelinePage.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 내 타임라인 페이지
 */

'use client';

import { useEffect, useState } from 'react';
import TravelAccDataCard from '@/features/myPage/components/timeline/TravelAccDataCard';
import TravelTimelineWrap from '@/features/myPage/components/timeline/TravelTimelineWrap';
import TimelineStatistic from '@/features/myPage/components/timeline/TimelineStatistic';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';
import { useGetMyTimelineList } from '@/features/myPage/hooks/rquery/timeline/useGetMyTimelineList';
import { useGetTimelineDashboard } from '@/features/myPage/hooks/rquery/timeline/useGetTimelineDashboard';
import { convertComma } from '@/shared/lib/utils';

export default function MyTimelinePage() {
  const [selectedTimeline, setSelectedTimeline] =
    useState<IMyTravelListResponse | null>(null);

  const { data: myTimelineList } = useGetMyTimelineList();
  const { data: timelineDashboard } = useGetTimelineDashboard();

  useEffect(() => {
    if (window.innerWidth >= 639) {
      if (myTimelineList) {
        setSelectedTimeline(myTimelineList[0]);
      }
    }
  }, [myTimelineList]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="max-desktop:grid-cols-2 grid grid-cols-4 gap-2 bg-white pt-4 pb-3">
        <TravelAccDataCard name="여행한 해외 국가/도시">
          <TravelAccDataCard.Content
            count={timelineDashboard?.worldCountryCount ?? 0}
            unit="개 국/"
          />
          <TravelAccDataCard.Content
            count={timelineDashboard?.worldCityCount ?? 0}
            unit="개 도시"
          />
        </TravelAccDataCard>

        <TravelAccDataCard name="여행한 국내 도시">
          <TravelAccDataCard.Content
            count={timelineDashboard?.domesticCityCount ?? 0}
            unit="개 도시"
          />
        </TravelAccDataCard>

        <TravelAccDataCard name="지금까지 여행 일수">
          <TravelAccDataCard.Content
            count={timelineDashboard?.totalTravelDays ?? 0}
            unit="일"
          />
        </TravelAccDataCard>

        <TravelAccDataCard name="누적 지출">
          <TravelAccDataCard.Content
            count={convertComma(timelineDashboard?.totalMyExpense ?? 0)}
            unit="원"
            className="text-state-error"
          />
        </TravelAccDataCard>
      </div>

      {myTimelineList?.length ? (
        <div className="max-desktop:grid-cols-1 grid grid-cols-2 gap-2">
          <TravelTimelineWrap
            selectedTimeline={selectedTimeline}
            setSelectedTimeline={setSelectedTimeline}
          />
          {selectedTimeline && (
            <div className="max-desktop:hidden">
              <TimelineStatistic selectedTimeline={selectedTimeline} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center pt-6">
          <span className="text-text-secondary">
            아직 다녀온 여행 없어요. 타임라인을 완성해 보세요!
          </span>
        </div>
      )}
    </div>
  );
}
