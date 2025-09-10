import { useEffect } from 'react';
import { ConfirmPaymentsResponse } from '@/api/payments/entity';
import useNaverGeocode from '@/pages/Delivery/hooks/useNaverGeocode';
import useNaverMap from '@/pages/Delivery/hooks/useNaverMap';
import useMarkers from '@/pages/OrderFinish/hooks/useMarkers';

interface OrderMapProps {
  paymentInfo: ConfirmPaymentsResponse;
  homeIconUrl?: string;
  shopIconUrl?: string;
}

export default function OrderMap({
  paymentInfo,
  homeIconUrl = '/home.svg',
  shopIconUrl = '/store.svg',
}: OrderMapProps) {
  const isDelivery = paymentInfo.order_type === 'DELIVERY';

  const shopCoords = useNaverGeocode(paymentInfo.shop_address);
  const initialCenter = { lat: shopCoords[0], lng: shopCoords[1] };

  const map = useNaverMap(initialCenter.lat, initialCenter.lng);

  const markersData = () => {
    const arr: Array<{
      id: string;
      position: { lat: number; lng: number };
      iconUrl: string;
      zIndex: number;
    }> = [];

    if (isDelivery) {
      arr.push({
        id: 'home',
        position: { lat: paymentInfo.latitude, lng: paymentInfo.longitude },
        iconUrl: homeIconUrl,
        zIndex: 20,
      });
    }

    if (shopCoords) {
      arr.push({
        id: 'shop',
        position: { lat: shopCoords[0], lng: shopCoords[1] },
        iconUrl: shopIconUrl,
        zIndex: 30,
      });
    }

    return arr;
  };

  useMarkers(map, markersData());

  useEffect(() => {
    if (!map) return;

    if (isDelivery) {
      const home = new naver.maps.LatLng(paymentInfo.latitude, paymentInfo.longitude);
      const shop = new naver.maps.LatLng(shopCoords[0], shopCoords[1]);
      const bounds = new naver.maps.LatLngBounds(home, home);
      bounds.extend(shop);
      map.fitBounds(bounds, { top: 10, right: 10, bottom: 10, left: 10 });
    } else {
      map.setCenter(new naver.maps.LatLng(shopCoords[0], shopCoords[1]));
      map.setZoom(16);
    }
  }, [map, isDelivery, paymentInfo.latitude, paymentInfo.longitude, shopCoords]);

  return <div id="map" className="border-primary-200 mb-2 h-65 w-full rounded-xl border" />;
}
