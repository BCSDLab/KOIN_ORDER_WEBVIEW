import { useParams } from 'react-router-dom';
import { useGetShopEvents } from '../../hooks/useGetShopEvents';
import ShopEventsList from './ShopEventsList';
import SleepLottie from '@/assets/Shop/sleeep-lottie.svg';

export default function ShopEvents() {
  const { shopId } = useParams();
  const { data: shopEvents } = useGetShopEvents(Number(shopId));

  return (
    <div className="flex flex-col gap-4">
      {shopEvents.events.length > 0 ? (
        <ShopEventsList events={shopEvents.events} />
      ) : (
        <div className="flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-center">
          <SleepLottie className="h-[75px] w-[98px]" />
          <div className="text-center text-[18px] font-semibold text-[#B611F5]">아직 이벤트/공지가 없어요</div>
        </div>
      )}
    </div>
  );
}
