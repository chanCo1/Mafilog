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
} from '@/shared/lib/utils';
import { useMyTravelListStore } from '@/shared/stores/useMyTravelListStrore';
import Separator from '@/shared/components/ui/Separator';
import { HandCoins } from 'lucide-react';
import useTravelDateRange from '@/features/myTravel/hooks/useTravelDateRange';

export default function ProgressTravelCard() {
  const { progressTravel } = useMyTravelListStore();
  const _from = progressTravel[0].from;
  const _to = progressTravel[0].to;

  const travelDateRange = useTravelDateRange({ from: _from, to: _to });

  return (
    <>
      {progressTravel.length ? (
        <div className="max-mobile:bottom-6 max-mobile:left-0 max-mobile:flex max-mobile:w-full max-mobile:justify-center max-mobile:px-2 fixed right-10 bottom-10">
          <div className="from-secondary to-primary flex gap-2 rounded-lg bg-linear-to-r p-3 text-white">
            <div className="flex flex-col gap-1 font-bold">
              <div className="font-lg pb-1">
                지금은 {convertTravelStatus(getTravelStatus(_from, _to))}
                !&nbsp;
                <span>({getTravelCurrentDay(_from, _to)}일차)</span>
              </div>
              <span>{truncateText(progressTravel[0].title)}</span>
              <span className="text-xs">{travelDateRange}</span>
            </div>
            <Separator />
            <div className="flex cursor-pointer flex-col items-center justify-center gap-1">
              <HandCoins />
              <span className="text-sm font-bold">지출 추가</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
