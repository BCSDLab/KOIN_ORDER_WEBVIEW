import ShopEvent from './ShopEvent';
import type { Events } from '@/api/shop/entity';

export default function ShopEventsList({ events }: { events: Events[] }) {
  return (
    <div>
      {events.map((event) => (
        <ShopEvent key={event.event_id} event={event} />
      ))}
    </div>
  );
}
