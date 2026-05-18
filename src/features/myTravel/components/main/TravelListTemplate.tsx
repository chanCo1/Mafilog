/**
 * @file: TravelListTemplate.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: TravelListTemplate 컴포넌트, 내 여행 리스트 템플릿
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import TravelListCard from '@/features/myTravel/components/main/TravelListCard';
import { useRouter } from 'next/navigation';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';

interface ITravelListTemplate {
  title: '진행중인' | '다가오는' | '지난';
  list: IMyTravelListResponse[];
}

export default function TravelListTemplate({
  title,
  list,
}: ITravelListTemplate) {
  const router = useRouter();

  const isPrgess = title === '진행중인';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <p className={cn(isPrgess && 'text-lg font-bold')}>{title} 여행</p>
        <span className="font-bold">{list.length}</span>
      </div>
      <div className="mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 grid gap-4">
        {list.map((travel) => (
          <TravelListCard
            key={`${travel.id}`}
            name={travel.title}
            from={travel.from}
            to={travel.to}
            cities={travel.cities}
            onClick={() => router.push(`/my-travel/${travel.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
