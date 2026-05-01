/**
 * @file: GoogleMap.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: GoogleMap 컴포넌트
 */

import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useState, memo, useEffect } from 'react';
import { IPlaceList } from '@/features/myTravel/interfaces';

interface IGoogleMap {
  places?: IPlaceList[];
}

const GoogleMap = ({ places }: IGoogleMap) => {
  const map = useMap();

  const [currentPos, setCurrentPos] = useState({ lat: 37.5665, lng: 126.978 }); // 서울 기본

  /** 현재 위치 받아오기 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    );
  }, []);

  useEffect(() => {
    if (!map || !places?.length) return;

    /** 단일 장소일 경우 */
    if (places.length === 1) {
      map.panTo(places[0].location);
      map.setZoom(15);

      return;
    }

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (place.location) bounds.extend(place.location);
    });

    map.fitBounds(bounds);
  }, [map, places]);

  console.log('랜더링!');
  return (
    <div className="h-full w-full">
      <Map
        defaultCenter={currentPos}
        defaultZoom={15}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        keyboardShortcuts={false}
      >
        {/* 여러장소 마커 */}
        {places?.length
          ? places.map((place) => (
              <AdvancedMarker
                key={place.id}
                position={place.location}
                title={place.name}
              >
                <Pin
                  background={'#6f9dd3'}
                  glyphColor={'#fff'}
                  borderColor={'#fff'}
                />
              </AdvancedMarker>
            ))
          : null}
      </Map>
    </div>
  );
};

GoogleMap.displayName = 'GoogleMap';

export default memo(GoogleMap);
