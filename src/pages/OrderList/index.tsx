import { useState } from 'react';
import EmptyCard from './components/EmptyCard';
import OrderCardList from './components/OrderCardList';
import OrderHistoryTab from './components/OrderHistoryTab';
import PreparingCardList from './components/PreparingCardList';
import useInProgressOrder from './hooks/useInProgressOrder';
import { useOrderHistory } from './hooks/useOrderHistory';

export default function OrderList() {
  const [tab, setTab] = useState<'past' | 'preparing'>('past');
  const isPast = tab === 'past';

  const {
    data: orders = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOrderHistory({
    page: 1,
    limit: 10,
    period: 'NONE' as const,
    status: 'NONE' as const,
    type: 'NONE' as const,
    query: '',
  });
  const { data: PreparingOrders } = useInProgressOrder();

  if (isPast && orders.length === 0) {
    return (
      <>
        <OrderHistoryTab activeTab={tab} onTabChange={setTab} />
        <EmptyCard activeTab="past" setActiveTab={setTab} />
      </>
    );
  }

  if (!isPast && PreparingOrders.length === 0) {
    return (
      <>
        <OrderHistoryTab activeTab={tab} onTabChange={setTab} />
        <EmptyCard activeTab="preparing" setActiveTab={setTab} />
      </>
    );
  }

  return (
    <>
      <OrderHistoryTab activeTab={tab} onTabChange={setTab} />

      {isPast ? (
        <OrderCardList
          orders={orders}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => fetchNextPage()}
        />
      ) : (
        <PreparingCardList orders={PreparingOrders} />
      )}
    </>
  );
}
