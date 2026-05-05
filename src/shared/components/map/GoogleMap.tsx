/**
 * @file: GoogleMap.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: GoogleMap 컴포넌트
 */

import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useState, memo, useEffect } from 'react';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';

interface IGoogleMap {
  places?: IPlaceList[];
  id: string;
}

const GoogleMap = memo(({ places, id }: IGoogleMap) => {
  const map = useMap(id);

  const [currentPos, setCurrentPos] = useState({ lat: 37.5665, lng: 126.978 }); // 서울 기본

  /** 현재 위치 받아오기 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    );
  }, []);

  useEffect(() => {
    if (!map || !places || places.length === 0) return;

    /** 단일 장소일 경우 */
    if (places.length === 1) {
      const targetPos = places[0].location;

      map.panTo(targetPos);
      map.setZoom(15);

      return;
    }

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (place.location) bounds.extend(place.location);
    });

    map.fitBounds(bounds, 80);
  }, [map, places]);

  console.log('랜더링!');
  return (
    <div className="h-full w-full">
      <Map
        id={id}
        defaultCenter={currentPos}
        defaultZoom={15}
        mapId={id}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        keyboardShortcuts={false}
      >
        {/* 여러장소 마커 */}
        {places?.length
          ? places.map((place, index) => (
              <AdvancedMarker
                key={`${place.id}-${index}`}
                position={place.location}
                title={place.name}
              >
                <Pin
                  background={'#FF9692'}
                  glyphColor={'#fff'}
                  borderColor={'#222'}
                />
              </AdvancedMarker>
            ))
          : null}
      </Map>
    </div>
  );
});

GoogleMap.displayName = 'GoogleMap';

export default GoogleMap;
