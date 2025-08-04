import { useNavigate } from 'react-router-dom';
import { useGetCartSummary } from '../hooks/useGetCartSummary';
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

interface BottomCartModalProps {
  id: string;
  cartItemCount: number | undefined;
}

export default function BottomCartModal({ id, cartItemCount }: BottomCartModalProps) {
  const navigate = useNavigate();
  const { data } = useGetCartSummary(Number(id));

  if (!cartItemCount || !data) {
    return null;
  }

  const startIcon = cartItemCount > 9 ? <NinePlusIcon /> : icons[cartItemCount];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50">
      <div className="flex h-[72px] w-full items-center justify-between rounded-t-4xl bg-white px-8 py-3">
        <div>
          <p className="text-lg leading-[1.6] font-semibold">{data.cart_items_amount.toLocaleString()}원</p>
          <p className="text-[12px] leading-[1.6] font-medium text-neutral-500">
            {data.is_available ? '배달 가능' : '배달 불가'}
          </p>
        </div>
        <Button startIcon={startIcon} className="h-11" onClick={() => navigate('/cart')}>
          장바구니 보기
        </Button>
      </div>
      <div className="h-[34px] w-full border-t border-neutral-300 bg-white" />
    </div>
  );
}
