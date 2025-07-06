import CopyIcon from '@/assets/Payment/copy.svg';
import useMarker from '@/pages/Delivery/hooks/useMarker';
import useNaverGeocode from '@/pages/Delivery/hooks/useNaverGeocode';
import useNaverMap from '@/pages/Delivery/hooks/useNaverMap';
import { useGetShopDetail } from '@/pages/shop/hooks/useGetShopDetail';

interface ShopLocationMapProps {
  orderableShopId: number;
}

export default function ShopLocationMap({ orderableShopId }: ShopLocationMapProps) {
  const { data } = useGetShopDetail(orderableShopId);
  const coords = useNaverGeocode(data.address);
  const map = useNaverMap(...coords);

  const handleCopyAddress = () => {
    // 클립보드 복사 브릿지 함수 호출 필요
  };

  useMarker(map);
  return (
    <div>
      <p className="text-primary-500 mb-2 text-lg font-semibold">가게주소</p>
      <div className="shadow-1 w-full rounded-xl">
        <div id="map" className="h-40 w-full rounded-t-xl border border-neutral-300"></div>
        <div className="flex min-h-[3.5rem] w-full items-center justify-between rounded-b-xl px-6 py-4 text-[0.813rem] text-neutral-600">
          {data.address}
          <button onClick={handleCopyAddress}>
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
