import { useEffect, useState } from 'react';

function useNaverMap(latitude: number, longitude: number) {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    if (!map) {
      const newMaps = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 17,
        maxZoom: 20,
        minZoom: 15,
        logoControl: false,
        scrollWheel: false,
        draggable: true,
      });
      setMap(newMaps);

      return () => {
        newMaps.destroy();
      };
    } else {
      map.setCenter(new naver.maps.LatLng(latitude, longitude));
    }

    return () => {};
  }, [latitude, longitude]);

  return map;
}

export default useNaverMap;
