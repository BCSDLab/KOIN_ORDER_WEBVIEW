import { useState, useEffect } from 'react';
import CloseIcon from '@/assets/Main/close-icon.svg';
import RefreshIcon from '@/assets/OrderHistory/refresh-icon.svg';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';

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

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { period: PeriodType; order: OrderType; orderInfo: OrderInfoType }) => void;
  defaultFilters: { period: PeriodType; order: OrderType; orderInfo: OrderInfoType };
}

export default function FilterModal({ isOpen, onClose, onApply, defaultFilters }: FilterModalProps) {
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
            <Button
              key={periodOption.id}
              type="button"
              size="sm"
              color={selectedPeriod === periodOption.id ? 'primary' : 'white'}
              className="shadow-1 grow-0 border-[0.5px] sm:grow"
              onClick={() => setSelectedPeriod(periodOption.id)}
            >
              {periodOption.label}
            </Button>
          ))}
        </div>
        <div className="my-3 mt-3 border-[1px] border-[#EEE]" />
        <div className="text-base font-semibold">주문 상태</div>
        <div className="flex gap-3">
          {orderOptions.map((orderOption) => (
            <Button
              key={orderOption.id}
              type="button"
              size="sm"
              color={selectedOrder === orderOption.id ? 'primary' : 'white'}
              className="shadow-1 grow-0 border-[0.5px] sm:grow"
              onClick={() => setSelectedOrder(orderOption.id)}
            >
              {orderOption.label}
            </Button>
          ))}
        </div>
        <div className="mt-1 flex text-base font-semibold">주문 정보</div>
        <div className="flex gap-3">
          {orderInfoOptions.map((orderInfoOption) => (
            <Button
              key={orderInfoOption.id}
              type="button"
              size="sm"
              color={selectedOrderInfo === orderInfoOption.id ? 'primary' : 'white'}
              className="shadow-1 grow-0 border-[0.5px] sm:grow"
              onClick={() => setSelectedOrderInfo(orderInfoOption.id)}
            >
              {orderInfoOption.label}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            color="neutral"
            className="grow-0 rounded-xl border border-neutral-400 px-4 py-[10px] text-neutral-800 shadow-none sm:grow"
            onClick={handleReset}
            endIcon={<RefreshIcon />}
          >
            초기화
          </Button>

          <Button
            type="button"
            color="primary"
            className="flex-1 rounded-xl py-[10px] shadow-none"
            onClick={handleApply}
          >
            적용하기
          </Button>
        </div>
      </BottomModalContent>

      <BottomModalFooter />
    </BottomModal>
  );
}
