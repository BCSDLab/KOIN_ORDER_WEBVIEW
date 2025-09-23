import OrderCard from './OrderCard';
import { Order } from '@/api/order/entity';

interface OrderCardListProps {
  orders: Order[];
}

export default function OrderCardList({ orders }: OrderCardListProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 px-6">
      {orders.map((order) => (
        <OrderCard key={order.id} orderInfo={order} />
      ))}
    </div>
  );
}
