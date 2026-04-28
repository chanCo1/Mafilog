'use client';

/**
 * @file: MainPage.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: MainPage 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import PageHeader from '@/shared/components/ui/PageHeader';
import { Button } from '@/shared/components/ui/Button';
import CreateNewTravelModal from '@/features/myTravel/components/modal/CreateNewTravelModal';
import { useMyTravelListStore } from '@/shared/stores/useMyTravelListStrore';
import TravelListCard from '@/features/myTravel/components/main/TravelListCard';
import TravelListTemplate from '@/features/myTravel/components/main/TravelListTemplate';

export default function MyTravelMainPage() {
  const { upcomingTravel, lastTravel, progressTravel } = useMyTravelListStore();

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5">
        <PageHeader
          title="내 여행"
          description="내 모든 여행을 한 곳에서 확인해보세요"
        />
        <div
          className={cn(
            'flex flex-col items-center gap-1',
            !upcomingTravel?.length && 'pt-20',
          )}
        >
          {upcomingTravel?.length ? (
            <div>
              지금까지 <span className="text-primary font-bold">N번</span>의
              여행을 다녀왔어요!
            </div>
          ) : (
            <p className="text-text-secondary text-center text-lg break-keep">
              아직 다녀온 여행이 없어요. 첫 번째 여행지는 어디인가요?
            </p>
          )}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setIsOpenModal(true)}
          >
            새 여행 만들기
          </Button>
        </div>
        {progressTravel.length ? (
          <TravelListTemplate title="진행중인" list={progressTravel} />
        ) : null}
        {upcomingTravel.length ? (
          <TravelListTemplate title="다가오는" list={upcomingTravel} />
        ) : null}
        {lastTravel.length ? (
          <TravelListTemplate title="지난" list={lastTravel} />
        ) : null}
      </div>
      <CreateNewTravelModal
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
