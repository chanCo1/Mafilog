/**
 * @file: TravelDetailTimeline.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelDetailTimeline 컴포넌트, 여행 일정/지출 타임라인
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

interface ITravelDetailTimeline {
  type: SCHEDULE_TYPE;
}

export default function TravelDetailTimeline({ type }: ITravelDetailTimeline) {
  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {/* {type === SCHEDULE_TYPE.LOCATION ? (
                            <CircledNumber number={getDisplayCount!} />
                          ) : (
                            <CategoryIcon variant="memo" />
                          )} */}
          <CategoryIcon variant="plus" className="" />
        </div>
        <div className="border-border-primary w-px flex-1 border" />
      </div>
      <div className="w-full pb-2.5">
        <Card
          variant="dashed"
          className="flex flex-col items-start justify-center"
          disabled
        >
          <div className="text-text-primary w-full text-center text-sm">
            일정이 없습니다.
            <br />
            장소를 추가하고 멋진 여행을 해보세요!
          </div>
        </Card>
      </div>
    </div>
  );
}
