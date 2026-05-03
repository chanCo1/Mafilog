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
import { TRAVEL_TYPE_LIST } from '@/shared/constants';
import { ILabelValue } from '@/shared/interfaces';
import { TRAVEL_TYPE } from '@/shared/types/Enum';

// interface IMapContainer {}

export default function MapContainer() {
  const [selectedMap, setSelectedMap] = useState<ILabelValue>(
    TRAVEL_TYPE_LIST[0],
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
      <div className="w-25">
        <Selectbox
          variant="none"
          options={TRAVEL_TYPE_LIST}
          value={selectedMap}
          addValueText='지도'
          onChange={(value) => setSelectedMap(value)}
        />
      </div>
      {isWorld && <AmchartMap />}
      {isDomestic && <AmchartMap isDomestic />}
    </div>
  );
}
