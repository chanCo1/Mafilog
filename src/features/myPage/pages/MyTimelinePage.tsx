/**
 * @file: MyTimelinePage.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 내 타임라인 페이지
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import TravelAccDataCard from '@/features/myPage/components/timeline/TravelAccDataCard';

interface IMyTimelinePage {}

export default function MyTimelinePage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="max-desktop:grid-cols-2 grid grid-cols-4 gap-2">
        <TravelAccDataCard name="여행한 해외 국가/도시">
          <TravelAccDataCard.Content count={0} unit="국/" />
          <TravelAccDataCard.Content count={0} unit="도시" />
        </TravelAccDataCard>

        <TravelAccDataCard name="여행한 국내 도시">
          <TravelAccDataCard.Content count={0} unit="도시" />
        </TravelAccDataCard>

        <TravelAccDataCard name="여행 일수">
          <TravelAccDataCard.Content count={0} unit="일" />
        </TravelAccDataCard>

        <TravelAccDataCard name="누적 지출">
          <TravelAccDataCard.Content
            count={0}
            unit="원"
            className="text-state-error"
          />
        </TravelAccDataCard>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <div>1</div>
        <div>2</div>
      </div>
    </div>
  );
}
