import { useState } from 'react';
import OrderCardList from './components/OrderCardList';
import OrderHistoryTab from './components/OrderHistoryTab';
import { useOrderHistory } from './hooks/useOrderHistory';
import SleepingIcon from '@/assets/OrderHistory/sleeping-icon.svg';

function EmptyOrders() {
  return (
    <div className="text-primary-500 flex flex-col items-center justify-center gap-4 py-30 text-lg font-semibold">
      <SleepingIcon />
      <div>주문 내역이 없어요</div>
    </div>
  );
}

export default function OrderList() {
  const [tab, setTab] = useState<'past' | 'preparing'>('past');

  const { data: orders } = useOrderHistory({
    page: 1,
    limit: 10,
    period: 'NONE',
    status: 'NONE',
    type: 'NONE',
    query: '',
  });

  if (!orders) return null;

  return (
    <>
      <OrderHistoryTab activeTab={tab} onTabChange={setTab} />
      {tab === 'past' && (orders.length === 0 ? <EmptyOrders /> : <OrderCardList orders={orders} />)}
    </>
  );
}
