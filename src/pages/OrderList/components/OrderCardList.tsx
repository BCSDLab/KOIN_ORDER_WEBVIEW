import OrderCard from './OrderCard';
import type { Order } from '@/api/order/entity';

interface OrderCardListProps {
  orders: Order[];
}

export default function OrderCardList({ orders }: OrderCardListProps) {
  return (
    <div className="flex flex-col gap-4 px-6">
      {orders.map((order) => (
        <OrderCard key={order.id} orderInfo={order} />
      ))}
    </div>
  );
}
