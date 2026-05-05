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
  isSingle?: boolean;
}

const GoogleMap = memo(({ places, id, isSingle }: IGoogleMap) => {
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

  useEffect(() => {
    if (!map || !places || places.length === 0) return;

    const path = places.map((place) => place.location);

    const polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#FF9692',
      strokeOpacity: 1,
      strokeWeight: 3,
      map: map,
    });

    return () => {
      polyline.setMap(null);
    };
  }, [map, places]);

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
                onClick={() => {
                  if (map) {
                    map.panTo(place.location);
                    map.setZoom(17);
                  }
                }}
              >
                {isSingle ? (
                  <Pin
                    background={'#FF9692'}
                    glyphColor={'#fff'}
                    borderColor={'#fff'}
                  />
                ) : (
                  <div className="relative flex items-center justify-center">
                    <div className="bg-state-error flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white shadow-md transition-transform hover:scale-110">
                      {index + 1}
                    </div>
                  </div>
                )}
              </AdvancedMarker>
            ))
          : null}
      </Map>
    </div>
  );
});

GoogleMap.displayName = 'GoogleMap';

export default GoogleMap;
