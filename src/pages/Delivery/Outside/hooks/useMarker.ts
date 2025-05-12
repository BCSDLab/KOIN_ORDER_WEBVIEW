import { useEffect, useState } from 'react';

interface MarkerProps {
  map: naver.maps.Map | null;
}

function useMarker({ map }: MarkerProps) {
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const center = map.getCenter();
    const newMarker = new naver.maps.Marker({
      position: center,
      map,
    });

    setMarker(newMarker);

    return () => {
      newMarker.setMap(null);
    };
  }, [map]);

  return { marker };
}

export default useMarker;
