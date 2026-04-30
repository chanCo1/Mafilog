/**
 * @file: GoogleMap.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: GoogleMap 컴포넌트
 */

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useState, memo, useMemo } from 'react';
import { cn } from '@/shared/lib/utils';

interface IGoogleMap {}

const GoogleMap = () => {
  const position = { lat: 35.6812, lng: 139.7671 }; // 도쿄 예시
  console.log('랜더링!');
  return (
    <div className="h-full w-full">
      <Map
        defaultCenter={position}
        defaultZoom={13}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        keyboardShortcuts={false}
      >
        {/* 기본 핀 마커 */}
        <AdvancedMarker position={position}>
          <Pin
            background={'#6f9dd3'}
            glyphColor={'#fff'}
            borderColor={'#fff'}
          />
        </AdvancedMarker>
      </Map>
    </div>
  );
};

GoogleMap.displayName = 'GoogleMap';

export default memo(GoogleMap);
