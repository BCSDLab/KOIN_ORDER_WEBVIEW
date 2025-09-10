import { useEffect, useMemo, useRef } from 'react';

type MapInstance = naver.maps.Map | null;

export interface MarkerInput {
  id: string;
  position: naver.maps.LatLng | { lat: number; lng: number } | [number, number];
  iconUrl?: string;
  zIndex?: number;
}

export default function useMarkers(map: MapInstance, inputs: MarkerInput[]) {
  const markersRef = useRef<Map<string | number, naver.maps.Marker>>(new Map());

  const normalized = useMemo(
    () =>
      inputs.map((marker) => {
        const latlng =
          marker.position instanceof naver.maps.LatLng
            ? marker.position
            : Array.isArray(marker.position)
              ? new naver.maps.LatLng(marker.position[0], marker.position[1])
              : new naver.maps.LatLng(marker.position.lat, marker.position.lng);
        return { ...marker, latlng };
      }),
    [inputs],
  );

  useEffect(() => {
    if (!map) return;

    const store = markersRef.current;

    for (const data of normalized) {
      const created = new naver.maps.Marker({
        map,
        position: data.latlng,
        zIndex: data.zIndex,
        icon: data.iconUrl
          ? {
              url: data.iconUrl,
              size: new naver.maps.Size(48, 48),
              scaledSize: new naver.maps.Size(28, 28),
              anchor: new naver.maps.Point(14, 28),
            }
          : undefined,
      });

      store.set(data.id, created);
    }

    return () => {
      if (!map) {
        for (const [, marker] of markersRef.current) marker.setMap(null);
        markersRef.current.clear();
      }
    };
  }, [map, normalized]);

  return markersRef;
}
