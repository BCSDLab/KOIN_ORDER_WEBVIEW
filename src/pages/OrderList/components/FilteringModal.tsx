import { useState, useEffect } from 'react';
import clsx from 'clsx';
import CloseIcon from '@/assets/Main/close-icon.svg';
import RefreshIcon from '@/assets/OrderHistory/refresh-icon.svg';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';

type PeriodType = 'NONE' | 'LAST_3_MONTHS' | 'LAST_6_MONTHS' | 'LAST_1_YEAR';
type OrderType = 'NONE' | 'DELIVERY' | 'TAKE_OUT';
type OrderInfoType = 'NONE' | 'COMPLETED' | 'CANCELED';

interface PeriodOption {
  id: PeriodType;
  label: string;
}

interface OrderOption {
  id: OrderType;
  label: string;
}

interface OrderInfoOption {
  id: OrderInfoType;
  label: string;
}

const periodOptions: PeriodOption[] = [
  { id: 'LAST_3_MONTHS', label: '최근 3개월' },
  { id: 'LAST_6_MONTHS', label: '최근 6개월' },
  { id: 'LAST_1_YEAR', label: '최근 1년' },
];

const orderOptions: OrderOption[] = [
  { id: 'DELIVERY', label: '배달' },
  { id: 'TAKE_OUT', label: '포장' },
];

const orderInfoOptions: OrderInfoOption[] = [
  { id: 'COMPLETED', label: '완료' },
  { id: 'CANCELED', label: '취소' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { period: PeriodType; order: OrderType; orderInfo: OrderInfoType }) => void;
  defaultFilters: { period: PeriodType; order: OrderType; orderInfo: OrderInfoType };
}

export default function FilterModal({ isOpen, onClose, onApply, defaultFilters }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('NONE');
  const [selectedOrder, setSelectedOrder] = useState<OrderType>('NONE');
  const [selectedOrderInfo, setSelectedOrderInfo] = useState<OrderInfoType>('NONE');

  const handleReset = () => {
    setSelectedPeriod('NONE');
    setSelectedOrder('NONE');
    setSelectedOrderInfo('NONE');
  };

  const handleApply = () => {
    onApply({
      period: selectedPeriod,
      order: selectedOrder,
      orderInfo: selectedOrderInfo,
    });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedPeriod(defaultFilters.period);
      setSelectedOrder(defaultFilters.order);
      setSelectedOrderInfo(defaultFilters.orderInfo);
    }
  }, [isOpen, defaultFilters]);

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <BottomModalHeader className="flex items-center justify-center gap-[10px] pr-6 pl-8">
        <div className="w-full">필터</div>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </BottomModalHeader>
      <BottomModalContent>
        <div className="text-base font-semibold">조회 기간</div>
        <div className="flex gap-3">
          {periodOptions.map((periodOption) => (
            <button
              key={periodOption.id}
              type="button"
              onClick={() => setSelectedPeriod(periodOption.id)}
              className={clsx(
                'shadow-1 rounded-2xl border border-[0.5px] border-neutral-300 px-3 py-[6px]',
                selectedPeriod === periodOption.id ? 'bg-primary-500 border-primary-500 text-[#F8F8FA]' : '',
              )}
            >
              {periodOption.label}
            </button>
          ))}
        </div>
        <div className="my-3 mt-3 border-[1px] border-[#EEE]" />
        <div className="text-base font-semibold">주문 상태</div>
        <div className="flex gap-3">
          {orderOptions.map((orderOption) => (
            <button
              key={orderOption.id}
              type="button"
              onClick={() => setSelectedOrder(orderOption.id)}
              className={clsx(
                'shadow-1 rounded-2xl border border-[0.5px] border-neutral-300 px-3 py-[6px]',
                selectedOrder === orderOption.id ? 'bg-primary-500 border-primary-500 text-[#F8F8FA]' : '',
              )}
            >
              {orderOption.label}
            </button>
          ))}
        </div>
        <div className="mt-1 flex text-base font-semibold">주문 정보</div>
        <div className="flex gap-3">
          {orderInfoOptions.map((orderInfoOption) => (
            <button
              key={orderInfoOption.id}
              type="button"
              onClick={() => setSelectedOrderInfo(orderInfoOption.id)}
              className={clsx(
                'shadow-1 rounded-2xl border border-[0.5px] border-neutral-300 px-3 py-[6px]',
                selectedOrderInfo === orderInfoOption.id ? 'bg-primary-500 border-primary-500 text-[#F8F8FA]' : '',
              )}
            >
              {orderInfoOption.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button
            className="flex items-center gap-2 rounded-xl border border-neutral-400 px-4 py-[11px]"
            onClick={handleReset}
          >
            <span className="flex text-base font-semibold">초기화</span>
            <RefreshIcon />
          </button>
          <button className="bg-primary-500 flex items-center rounded-xl px-[92px] py-[10px]" onClick={handleApply}>
            <span className="text-base font-semibold text-white">적용하기</span>
          </button>
        </div>
      </BottomModalContent>

      <BottomModalFooter />
    </BottomModal>
  );
}
