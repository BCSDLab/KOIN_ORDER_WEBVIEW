import { useState, useEffect, useMemo } from 'react';
import FilterModal from './components/FilteringModal';
import FilteringSearchBar from './components/FilteringSearchBar';
import OrderCardList from './components/OrderCardList';
import OrderHistoryTab from './components/OrderHistoryTab';
import PreparingCardList from './components/PreparingCardList';
import useInProgressOrder from './hooks/useInProgressOrder';
import { useOrderHistory } from './hooks/useOrderHistory';
import SleepingIcon from '@/assets/OrderHistory/sleeping-icon.svg';
import useBooleanState from '@/util/hooks/useBooleanState';

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
  const [isScrolled, setTrue, setFalse] = useBooleanState(false);

  useEffect(() => {
    const onScroll = () => (window.scrollY > 0 ? setTrue() : setFalse());
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

  const [appliedPeriod, setAppliedPeriod] = useState<PeriodType>('NONE');
  const [appliedOrder, setAppliedOrder] = useState<OrderType>('NONE');
  const [appliedOrderInfo, setAppliedOrderInfo] = useState<OrderInfoType>('NONE');
  const isFiltered = appliedPeriod !== 'NONE' || appliedOrder !== 'NONE' || appliedOrderInfo !== 'NONE';
  const [confirmedKeyword, setConfirmedKeyword] = useState('');

  const isPast = tab === 'past';
  const isScrolled = useScrolled();

  const resetFilters = () => {
    setAppliedPeriod('NONE');
    setAppliedOrder('NONE');
    setAppliedOrderInfo('NONE');
  };

  const applyFilters = (period: PeriodType, order: OrderType, orderInfo: OrderInfoType) => {
    setAppliedPeriod(period);
    setAppliedOrder(order);
    setAppliedOrderInfo(orderInfo);
    setIsOpen(false);
  };

  const {
    data: orders = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOrderHistory({
    page: 1,
    limit: 10,
    period: appliedPeriod,
    status: appliedOrderInfo,
    type: appliedOrder,
    query: confirmedKeyword,
  });
  const { data: PreparingOrders } = useInProgressOrder();

  const shownOrders = useMemo(() => {
    if (!orders) return [];
    return orders;
  }, [orders]);

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
              onReset={resetFilters}
              onSearchConfirm={(keyword) => setConfirmedKeyword(keyword)}
              periodLabel={getPeriodLabel(appliedPeriod)}
              orderLabel={getOrderLabel(appliedOrder, appliedOrderInfo)}
              isPeriod={appliedPeriod !== 'NONE'}
              isOrder={appliedOrder !== 'NONE' || appliedOrderInfo !== 'NONE'}
            />
            <div className="pt-[123px]">
              {tab === 'past' &&
                (shownOrders.length === 0 ? (
                  <EmptyOrders />
                ) : (
                  <OrderCardList
                    orders={shownOrders}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    onLoadMore={() => fetchNextPage()}
                  />
                ))}
            </div>
          </div>
          {isOpen && (
            <FilterModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              defaultFilters={{ period: appliedPeriod, order: appliedOrder, orderInfo: appliedOrderInfo }}
              onApply={({ period, order, orderInfo }) => {
                applyFilters(period, order, orderInfo);
              }}
            />
          )}
        </>
      ) : (
        <div className="pt-[50px]">
          <PreparingCardList orders={PreparingOrders} />
        </div>
      )}
    </>
  );
}
