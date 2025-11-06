import CopyIcon from '@/assets/Payment/copy.svg';
import useMarker from '@/pages/Delivery/hooks/useMarker';
import useNaverGeocode from '@/pages/Delivery/hooks/useNaverGeocode';
import useNaverMap from '@/pages/Delivery/hooks/useNaverMap';
import { useGetShopDetail } from '@/pages/Shop/hooks/useGetShopDetail';
import { useToast } from '@/util/hooks/useToast';

interface ShopLocationMapProps {
  orderableShopId: number;
}

export default function ShopLocationMap({ orderableShopId }: ShopLocationMapProps) {
  const { showToast } = useToast();
  const { data } = useGetShopDetail(orderableShopId);
  const coords = useNaverGeocode(data.address);
  const map = useNaverMap(...coords);

  const handleCopyAddress = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('전화번호가 복사되었습니다.');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast('전화번호가 복사되었습니다.');
    }
  };

  useMarker(map);
  return (
    <div>
      <p className="text-primary-500 mb-2 text-lg font-semibold">가게주소</p>
      <div className="shadow-1 w-full rounded-xl">
        <div id="map" className="h-40 w-full rounded-t-xl border border-neutral-300"></div>
        <div className="flex min-h-[3.5rem] w-full items-center justify-between rounded-b-xl px-6 py-4 text-[0.813rem] text-neutral-600">
          {data.address}
          <button onClick={() => handleCopyAddress(data.address)}>
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
