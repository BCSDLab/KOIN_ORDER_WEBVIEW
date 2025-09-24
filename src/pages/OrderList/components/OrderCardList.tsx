import { useEffect, useRef } from 'react';
import OrderCard from './OrderCard';
import type { Order } from '@/api/order/entity';

interface OrderCardListProps {
  orders: Order[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function OrderCardList({ orders, onLoadMore, hasNextPage, isFetchingNextPage }: OrderCardListProps) {
  const endOfListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !onLoadMore) return;

    const element = endOfListRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { root: null, threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasNextPage, onLoadMore, isFetchingNextPage]);

  return (
    <div className="mt-4 flex flex-col gap-4 px-6">
      {orders.map((order) => (
        <OrderCard key={order.id} orderInfo={order} />
      ))}

      {hasNextPage && <div ref={endOfListRef} className="h-1 w-full" />}
    </div>
  );
}
