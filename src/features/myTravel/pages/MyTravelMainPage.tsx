'use client';

/**
 * @file: MyTravelMainPage.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: 내 여행 메인 페이지 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import PageHeader from '@/shared/components/ui/PageHeader';
import { Button } from '@/shared/components/ui/Button';
import CreateNewTravelModal from '@/features/myTravel/components/modal/CreateNewTravelModal';
import TravelListTemplate from '@/features/myTravel/components/main/TravelListTemplate';
import { useGetMyTravelList } from '@/features/myTravel/hooks/rquery/myTravel/useGetMyTravelList';
import { useSession } from 'next-auth/react';
import CardSkeleton from '@/shared/components/skeleton/CardSkeleton';

export default function MyTravelMainPage() {
  const { data: userInfo } = useSession();
  const { data: travelList, isLoading } = useGetMyTravelList(
    userInfo?.user?.id,
  );
  const [isOpenModal, setIsOpenModal] = useState(false);

  const progressTravel = travelList?.progress;
  const upcomingTravel = travelList?.upcoming;
  const lastTravel = travelList?.last;

  const isTravelList =
    progressTravel?.length || upcomingTravel?.length || lastTravel?.length;

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
            !isTravelList && 'pt-20',
          )}
        >
          {isLoading && <CardSkeleton cardCount={6} />}

          {!isLoading && (
            <>
              {isTravelList ? (
                <div>
                  지금까지{' '}
                  <span className="text-primary font-bold">
                    {travelList?.last.length}번
                  </span>{' '}
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
            </>
          )}
        </div>

        {!isLoading && progressTravel && progressTravel.length > 0 && (
          <TravelListTemplate title="진행중인" list={progressTravel} />
        )}
        {!isLoading && upcomingTravel && upcomingTravel.length > 0 && (
          <TravelListTemplate title="다가오는" list={upcomingTravel} />
        )}
        {!isLoading && lastTravel && lastTravel.length > 0 && (
          <TravelListTemplate title="지난" list={lastTravel} />
        )}
      </div>
      <CreateNewTravelModal
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
