/**
 * @file: ProgressTravelCard.tsx
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 홈에 여행중일 경우 노출 시키는 여행 카드
 */

import {
  getTravelStatus,
  convertTravelStatus,
  getTravelCurrentDay,
  truncateText,
  convertTravelDateRange,
} from '@/shared/lib/utils';
import Separator from '@/shared/components/ui/Separator';
import AddExpenseModal from '@/features/myTravel/components/modal/AddExpenseModal';
import { useState } from 'react';
import { useGetMyTravelList } from '@/features/myTravel/hooks/rquery/myTravel/useGetMyTravelList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProgressTravelCard() {
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);

  const router = useRouter();

  const { data: userInfo } = useSession();
  const { data: travelList } = useGetMyTravelList(userInfo?.user?.id);
  if (!travelList?.progress.length) return;

  const prgressTravel = travelList?.progress[0];

  const _from = prgressTravel.from;
  const _to = prgressTravel.to;

  const goProgressTravel = () => {
    router.push(`/my-travel/${prgressTravel.id}`);
  };

  return (
    <>
      {travelList?.progress.length ? (
        <div className="max-mobile:bottom-6 max-mobile:left-0 max-mobile:flex max-mobile:w-full max-mobile:justify-center max-mobile:px-2 fixed right-10 bottom-10 z-2">
          <div className="from-secondary to-primary flex gap-2 rounded-lg bg-linear-to-r p-3 text-white shadow-md">
            <div
              className="flex cursor-pointer flex-col gap-1 font-bold min-w-50"
              onClick={goProgressTravel}
            >
              <div className="font-lg pb-1">
                지금은 {convertTravelStatus(getTravelStatus(_from, _to))}
                !&nbsp;
                <span>({getTravelCurrentDay(_from, _to)}일차)</span>
              </div>
              <span>{truncateText(prgressTravel.title)}</span>
              <span className="text-xs">
                {convertTravelDateRange(_from, _to)}
              </span>
            </div>
            <Separator />
            <div
              className="flex cursor-pointer flex-col items-center justify-center gap-1"
              onClick={() => setIsOpenExpenseModal(true)}
            >
              <span className="text-xl">💸</span>
              <span className="text-sm font-bold">지출 추가</span>
            </div>
          </div>
        </div>
      ) : null}
      <AddExpenseModal
        isOpen={isOpenExpenseModal}
        handleClose={() => setIsOpenExpenseModal(false)}
        travelId={String(prgressTravel.id)}
      />
    </>
  );
}
