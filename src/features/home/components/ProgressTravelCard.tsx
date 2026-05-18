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
  convertTravelDateRange
} from '@/shared/lib/utils';
import Separator from '@/shared/components/ui/Separator';
import AddExpenseModal from '@/features/myTravel/components/modal/AddExpenseModal';
import { useState } from 'react';
import { useFetchMyTravelList } from '@/features/myTravel/hooks/rquery/useFetchMyTravelList';

export default function ProgressTravelCard() {
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);

  const { data: travelList } = useFetchMyTravelList();
  if (!travelList?.progress.length) return;

  const _from = travelList?.progress[0]?.from;
  const _to = travelList?.progress[0]?.to;


  return (
    <>
      {travelList?.progress.length ? (
        <div className="max-mobile:bottom-6 max-mobile:left-0 max-mobile:flex max-mobile:w-full max-mobile:justify-center max-mobile:px-2 fixed right-10 bottom-10">
          <div className="from-secondary to-primary flex gap-2 rounded-lg bg-linear-to-r p-3 text-white">
            <div className="flex flex-col gap-1 font-bold">
              <div className="font-lg pb-1">
                지금은 {convertTravelStatus(getTravelStatus(_from, _to))}
                !&nbsp;
                <span>({getTravelCurrentDay(_from, _to)}일차)</span>
              </div>
              <span>{truncateText(travelList?.progress[0].title)}</span>
              <span className="text-xs">{convertTravelDateRange(_from, _to)}</span>
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
      {/* TODO: 진행중인 여행 특정한 후 작업 진행 */}
      {/* <AddExpenseModal
        isOpen={isOpenExpenseModal}
        handleClose={() => setIsOpenExpenseModal(false)}
      /> */}
    </>
  );
}
