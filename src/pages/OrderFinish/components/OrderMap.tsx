import { useEffect } from 'react';
import ShopMarker from './ShopMarker';
import { ConfirmPaymentsResponse } from '@/api/payments/entity';
import useNaverGeocode from '@/pages/Delivery/hooks/useNaverGeocode';
import useNaverMap from '@/pages/Delivery/hooks/useNaverMap';
import useMarkers from '@/pages/OrderFinish/hooks/useMarkers';

interface OrderMapProps {
  paymentInfo: ConfirmPaymentsResponse;
}

const HOME_MARKER = '/home.svg';

export default function OrderMap({ paymentInfo }: OrderMapProps) {
  const isDelivery = paymentInfo.order_type === 'DELIVERY';

  const [shopLatitude, shopLongitude] = useNaverGeocode(paymentInfo.shop_address);

  const { latitude, longitude } = isDelivery
    ? { latitude: paymentInfo.latitude, longitude: paymentInfo.longitude }
    : { latitude: shopLatitude, longitude: shopLongitude };

  const map = useNaverMap(latitude, longitude);

  const homeMarkers = isDelivery
    ? [
        {
          id: 'home',
          position: {
            latitude: paymentInfo.latitude,
            longitude: paymentInfo.longitude,
          },
          iconUrl: HOME_MARKER,
          zIndex: 20,
        },
      ]
    : [];

  useMarkers(map, homeMarkers);

  useEffect(() => {
    if (!map) return;

    const { remove } = ShopMarker({
      map,
      latitude: shopLatitude,
      longitude: shopLongitude,
      name: paymentInfo.shop_name,
    });

    return remove;
  }, [map, shopLatitude, shopLongitude, paymentInfo.shop_name]);

  useEffect(() => {
    if (!map) return;
    map.setOptions({ minZoom: 0, maxZoom: 21 });

    if (isDelivery) {
      const home = new naver.maps.LatLng(paymentInfo.latitude, paymentInfo.longitude);
      const shop = new naver.maps.LatLng(shopLatitude, shopLongitude);
      const bounds = new naver.maps.LatLngBounds(home, home);
      bounds.extend(shop);
      map.fitBounds(bounds, { top: 10, right: 10, bottom: 10, left: 10 });
    } else {
      map.setCenter(new naver.maps.LatLng(shopLatitude, shopLongitude));
      map.setZoom(16);
    }
  }, [map, isDelivery, paymentInfo.latitude, paymentInfo.longitude, shopLatitude, shopLongitude]);

  return <div id="map" className="border-primary-200 mb-2 h-65 w-full rounded-xl border" />;
}
