import { useEffect, useState } from 'react';

function useNaverMap(latitude: number, longitude: number) {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    if (map) {
      map.destroy();
    }

    const newMap = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 17,
      maxZoom: 20,
      minZoom: 15,
      logoControl: false,
      scrollWheel: false,
      draggable: true,
    });
    setMap(newMap);

    return () => {
      newMap.destroy();
    };
  }, [latitude, longitude]);

  return map;
}

export default useNaverMap;
