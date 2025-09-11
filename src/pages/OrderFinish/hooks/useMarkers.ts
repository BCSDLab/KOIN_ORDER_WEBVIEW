import { useEffect, useMemo, useRef } from 'react';

type MapInstance = naver.maps.Map | null;
type PositionType = naver.maps.LatLng | { latitude: number; longitude: number } | [number, number];

export interface MarkerInput {
  id: string;
  position: PositionType;
  iconUrl?: string;
  zIndex?: number;
}

export default function useMarkers(map: MapInstance, inputs: MarkerInput[]) {
  const markersRef = useRef<Map<string | number, naver.maps.Marker>>(new Map());

  const normalizeLatLng = (position: PositionType) => {
    if (position instanceof naver.maps.LatLng) {
      return position;
    }

    if (Array.isArray(position)) {
      return new naver.maps.LatLng(position[0], position[1]);
    }

    return new naver.maps.LatLng(position.latitude, position.longitude);
  };

  const normalized = useMemo(
    () =>
      inputs.map((marker) => ({
        ...marker,
        latlng: normalizeLatLng(marker.position),
      })),
    [inputs],
  );

  useEffect(() => {
    if (!map) return;

    const store = markersRef.current;

    normalized.forEach((data) => {
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
        animation: naver.maps.Animation.DROP,
      });
      store.set(data.id, created);
    });

    return () => {
      if (!map) {
        markersRef.current.forEach((marker) => {
          marker.setMap(null);
        });
        markersRef.current.clear();
      }
    };
  }, [map, normalized]);

  return markersRef;
}
