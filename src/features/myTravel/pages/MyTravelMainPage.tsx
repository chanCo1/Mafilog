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
import TravelListTemplate from '@/features/myTravel/components/main/TravelListTemplate';
import { useFetchMyTravelList } from '@/features/myTravel/hooks/rquery/useFetchMyTravelList';

export default function MyTravelMainPage() {
  const { data: travelList } = useFetchMyTravelList();
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
            !travelList?.upcoming.length && 'pt-20',
          )}
        >
          {travelList?.upcoming?.length ? (
            <div>
              벌써{' '}
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
        </div>
        {travelList?.progress.length ? (
          <TravelListTemplate title="진행중인" list={travelList?.progress} />
        ) : null}
        {travelList?.upcoming.length ? (
          <TravelListTemplate title="다가오는" list={travelList?.upcoming} />
        ) : null}
        {travelList?.last.length ? (
          <TravelListTemplate title="지난" list={travelList?.last} />
        ) : null}
      </div>
      <CreateNewTravelModal
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
