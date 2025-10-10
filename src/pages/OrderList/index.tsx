import { useState, useEffect, useMemo } from 'react';
import EmptyCard from './components/EmptyCard';
import FilterModal from './components/FilteringModal';
import FilteringSearchBar from './components/FilteringSearchBar';
import OrderCardList from './components/OrderCardList';
import OrderHistoryTab from './components/OrderHistoryTab';
import PreparingCardList from './components/PreparingCardList';
import useInProgressOrder from './hooks/useInProgressOrder';
import { useOrderHistory } from './hooks/useOrderHistory';
import SleepingIcon from '@/assets/OrderHistory/sleeping-icon.svg';

type PeriodType = 'NONE' | 'LAST_3_MONTHS' | 'LAST_6_MONTHS' | 'LAST_1_YEAR';
type OrderType = 'NONE' | 'DELIVERY' | 'TAKE_OUT';
type OrderInfoType = 'NONE' | 'COMPLETED' | 'CANCELED';

function EmptyOrders() {
  return (
    <div className="text-primary-500 flex flex-col items-center justify-center gap-4 py-30 text-lg font-semibold">
      <SleepingIcon />
      <div>주문 내역이 없어요</div>
    </div>
  );
}

function useScrolled() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isScrolled;
}

function getPeriodLabel(period: PeriodType) {
  switch (period) {
    case 'LAST_3_MONTHS':
      return '최근 3개월';
    case 'LAST_6_MONTHS':
      return '최근 6개월';
    case 'LAST_1_YEAR':
      return '최근 1년';
    default:
      return '조회 기간';
  }
}

function getOrderLabel(order: OrderType, orderInfo: OrderInfoType) {
  const type = order === 'DELIVERY' ? '배달' : order === 'TAKE_OUT' ? '포장' : '';

  const info = orderInfo === 'COMPLETED' ? '완료' : orderInfo === 'CANCELED' ? '취소' : '';

  const combined = [type, info].filter(Boolean).join(' · ');
  return combined || '주문 상태 · 정보';
}

export default function OrderList() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'past' | 'preparing'>('past');
  const isPast = tab === 'past';

  const isScrolled = useScrolled();

  const [appliedPeriod, setAppliedPeriod] = useState<PeriodType>('NONE');
  const [appliedOrder, setAppliedOrder] = useState<OrderType>('NONE');
  const [appliedOrderInfo, setAppliedOrderInfo] = useState<OrderInfoType>('NONE');

  const isFiltered = appliedPeriod !== 'NONE' || appliedOrder !== 'NONE' || appliedOrderInfo !== 'NONE';

  const [confirmedKeyword, setConfirmedKeyword] = useState('');

  const { data: orders = [] } = useOrderHistory({
    page: 1,
    limit: 10,
    period: appliedPeriod,
    status: appliedOrderInfo,
    type: appliedOrder,
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

  const shownOrders = useMemo(() => {
    if (!orders) return [];
    if (!confirmedKeyword) return orders;
    return orders.filter(
      (o) => o.order_title.includes(confirmedKeyword) || o.orderable_shop_name.includes(confirmedKeyword),
    );
  }, [orders, confirmedKeyword]);

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
        <>
          <div className="pt-[50px]">
            <FilteringSearchBar
              isScrolled={isScrolled}
              openFilter={() => setIsOpen(true)}
              isFiltered={isFiltered}
              onReset={() => {
                setAppliedPeriod('NONE');
                setAppliedOrder('NONE');
                setAppliedOrderInfo('NONE');
              }}
              onSearchConfirm={(keyword) => setConfirmedKeyword(keyword)}
              periodLabel={getPeriodLabel(appliedPeriod)}
              orderLabel={getOrderLabel(appliedOrder, appliedOrderInfo)}
              isPeriod={appliedPeriod !== 'NONE'}
              isOrder={appliedOrder !== 'NONE' || appliedOrderInfo !== 'NONE'}
            />
            <div className="pt-[122px]">
              {tab === 'past' && (shownOrders.length === 0 ? <EmptyOrders /> : <OrderCardList orders={shownOrders} />)}
            </div>
          </div>
          {isOpen && (
            <FilterModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              defaultFilters={{ period: appliedPeriod, order: appliedOrder, orderInfo: appliedOrderInfo }}
              onApply={({ period, order, orderInfo }) => {
                setAppliedPeriod(period);
                setAppliedOrder(order);
                setAppliedOrderInfo(orderInfo);
                setIsOpen(false);
              }}
            />
          )}
        </>
      ) : (
        <PreparingCardList orders={PreparingOrders} />
      )}
    </>
  );
}
