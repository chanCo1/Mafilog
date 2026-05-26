'use client';

/**
 * @file: MapContainer.tsx
 * @author: chad
 * @since: 2026.04.22 ~
 * @description: MapContainer 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import AmchartMap from '@/shared/components/map/AmchartMap';
import Selectbox from '@/shared/components/ui/Selectbox';
import { MAP_TRAVEL_TYPE_LIST } from '@/shared/constants';
import { ILabelValue } from '@/shared/interfaces';
import { TRAVEL_TYPE } from '@/shared/types/Enum';
import { useSession } from 'next-auth/react';

// interface IMapContainer {}

export default function MapContainer() {
  const { data: userInfo } = useSession();

  const [selectedMap, setSelectedMap] = useState<ILabelValue>(
    MAP_TRAVEL_TYPE_LIST[0],
  );

  const isWorld = selectedMap.value === TRAVEL_TYPE.WORLD;
  const isDomestic = selectedMap.value === TRAVEL_TYPE.DOMESTIC;

  return (
    <div
      className={cn(
        'relative flex h-100 w-full flex-col gap-1 rounded-lg',
        isDomestic ? 'max-mobile:h-80' : 'max-mobile:h-60',
      )}
    >
      <p className="text-xl font-bold">채워진 추억들</p>
      <div className="w-25">
        <Selectbox
          variant="none"
          options={MAP_TRAVEL_TYPE_LIST}
          value={selectedMap}
          addValueText="지도"
          onChange={(value) => setSelectedMap(value)}
        />
      </div>
      {isWorld && <AmchartMap readonly setSelectedMap={setSelectedMap} />}
      {isDomestic && <AmchartMap isDomestic readonly />}
      {userInfo && (
        <div className="flex items-center justify-center font-bold">
          {isDomestic ? (
            <div>
              국내 <span className="text-primary">{0}개 도시</span>가 추억으로
              채워졌어요
            </div>
          ) : (
            <div>
              해외 <span className="text-primary">{0}개국</span>이 추억으로
              채워졌어요
            </div>
          )}
        </div>
      )}
    </div>
  );
}
