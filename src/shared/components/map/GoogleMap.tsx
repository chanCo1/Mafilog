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
        mapId="YOUR_MAP_ID" // 구글 클라우드 콘솔에서 발급받은 ID
        gestureHandling={'greedy'} // 스크롤 시 바로 지도 조작 가능하게
        disableDefaultUI={true} // 기본 UI 버튼들 제거 (깔끔하게)
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
