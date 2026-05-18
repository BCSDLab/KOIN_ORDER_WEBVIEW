import { useParams } from 'react-router-dom';
import { useGetShopEvents } from '../../hooks/useGetShopEvents';
import ShopEvent from './ShopEvent';
import SleepIcon from '@/assets/Shop/sleeep-icon.svg';

export default function ShopEvents() {
  const { shopId } = useParams();
  const { data: shopEvents } = useGetShopEvents(Number(shopId));
  const events = shopEvents?.events ?? [];

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col bg-white">
      {events.length > 0 ? (
        <div>
          {events.map((event) => (
            <ShopEvent key={event.event_id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-center">
          <SleepIcon className="h-[75px] w-[98px]" />
          <div className="text-primary-500 text-center text-[18px] font-semibold">아직 이벤트/공지가 없어요</div>
        </div>
      )}
    </div>
  );
}
