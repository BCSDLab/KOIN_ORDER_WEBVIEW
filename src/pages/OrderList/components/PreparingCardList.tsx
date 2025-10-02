import PreparingCard from './PreparingCard';
import { InProgressOrder } from '@/api/order/entity';

interface PreparingCardListProps {
  orders: InProgressOrder[];
}

export default function PreparingCardList({ orders }: PreparingCardListProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 px-6">
      {orders.map((order) => (
        <PreparingCard key={order.id} orderInfo={order} />
      ))}
    </div>
  );
}
