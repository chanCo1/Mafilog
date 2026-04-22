'use client';

/**
 * @file: MapContainer.tsx
 * @author: chad
 * @since: 2026.04.22 ~
 * @description: MapContainer 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import KoreaMap from '@/shared/components/map/KoreaMap';
import WorldMap from '@/shared/components/map/WorldMap';
import { Selectbox } from '@/shared/components/ui/Selectbox';
import { TRAVEL_MAP_TYPE_LIST } from '@/shared/constants';
import { ILabelValue } from '@/shared/interfaces';
import { TRAVEL_TYPE } from '@/shared/types/Enum';

// interface IMapContainer {}

export default function MapContainer() {
  const [selectedMap, setSelectedMap] = useState<ILabelValue>(
    TRAVEL_MAP_TYPE_LIST[0],
  );

  return (
    <div className="max-mobile:h-50 relative flex h-100 w-full flex-col gap-1 rounded-lg">
      <div className="w-25">
        <Selectbox
          variant="none"
          options={TRAVEL_MAP_TYPE_LIST}
          value={selectedMap}
          onChange={(value) => setSelectedMap(value)}
        />
      </div>
      {selectedMap.value === TRAVEL_TYPE.INTERNATIONAL && (
        <WorldMap isWheel={false} />
      )}
      {selectedMap.value === TRAVEL_TYPE.LOCAL && <KoreaMap isWheel={false} />}
    </div>
  );
}
