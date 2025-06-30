import { useEffect } from 'react';
import useValidateCart from '../hooks/useValidateCart';
import ValidateModal from './ValidateModal';
import EightIcon from '@/assets/Common/eight-icon.svg';
import FiveIcon from '@/assets/Common/five-icon.svg';
import FourIcon from '@/assets/Common/four-icon.svg';
import NineIcon from '@/assets/Common/nine-icon.svg';
import NinePlusIcon from '@/assets/Common/nine-plus-icon.svg';
import OneIcon from '@/assets/Common/one-icon.svg';
import SevenIcon from '@/assets/Common/seven-icon.svg';
import SixIcon from '@/assets/Common/six-icon.svg';
import ThreeIcon from '@/assets/Common/three-icon.svg';
import TwoIcon from '@/assets/Common/two-icon.svg';
import ZeroIcon from '@/assets/Common/zero-icon.svg';
import Button from '@/components/UI/Button';
import useBooleanState from '@/util/hooks/useBooleanState';

const icons = [
  <ZeroIcon />,
  <OneIcon />,
  <TwoIcon />,
  <ThreeIcon />,
  <FourIcon />,
  <FiveIcon />,
  <SixIcon />,
  <SevenIcon />,
  <EightIcon />,
  <NineIcon />,
];

interface BottomSheetProps {
  orderType?: 'delivery' | 'takeout';
  itemCount: number;
  totalAmount: number;
  minimumOrderAmount: number;
}

export default function BottomSheet({ orderType, itemCount, totalAmount, minimumOrderAmount }: BottomSheetProps) {
  const { mutate: validateCart, errorCode } = useValidateCart();
  const [isValidateModalOpen, openValidateModal, closeValidateModal] = useBooleanState(false);

  useEffect(() => {
    if (errorCode) {
      openValidateModal();
    }
  }, [errorCode]);

  const startIcon = itemCount > 9 ? <NinePlusIcon /> : icons[itemCount];

  const remainAmount = minimumOrderAmount - totalAmount;
  const isOrderAvailable = remainAmount <= 0;

  let statusMessage = '';
  if (orderType === 'delivery') {
    statusMessage = isOrderAvailable ? '배달 가능' : `${remainAmount.toLocaleString()}원 더 담으면 배달 가능`;
  } else if (orderType === 'takeout') {
    statusMessage = '주문 가능';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-90 flex flex-col justify-end">
      <div className="shadow-4 pointer-events-auto flex justify-between rounded-t-4xl border-b-[0.5px] border-neutral-300 bg-white px-6 py-3">
        <div>
          <div className="text-lg leading-[160%] font-semibold">{totalAmount.toLocaleString()}원</div>
          <div className="text-xs leading-[160%] font-medium text-neutral-500">{statusMessage}</div>
        </div>
        <Button
          state={isOrderAvailable ? 'default' : 'disabled'}
          startIcon={startIcon}
          className="gap-2.5 px-12.5 py-2.5"
          onClick={() => {
            validateCart();
          }}
        >
          <div>주문하기</div>
        </Button>
      </div>
      <div className="h-8 bg-white"></div>

      <ValidateModal isOpen={isValidateModalOpen} onClose={closeValidateModal} errorCode={errorCode} />
    </div>
  );
}
