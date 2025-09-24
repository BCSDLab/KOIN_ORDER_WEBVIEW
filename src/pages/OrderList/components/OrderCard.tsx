import { useNavigate } from 'react-router-dom';
import { Order } from '@/api/order/entity';
import LeftArrowIcon from '@/assets/Common/left-arrow-icon.svg';
import Button from '@/components/UI/Button';

interface OrderCardProps {
  orderInfo: Order;
}

function formatOrderDate(dateStr: string) {
  const date = new Date(dateStr);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayNames[date.getDay()];

  return `${month}월 ${day}일 (${dayOfWeek})`;
}

const getOrderStatusText = (status: Order['order_status']): string => {
  switch (status) {
    case 'PICKED_UP':
      return '포장완료';
    case 'DELIVERED':
      return '배달완료';
    case 'CANCELED':
      return '주문취소';
    default:
      return '진행중';
  }
};

export default function OrderCard({ orderInfo }: OrderCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border-[0.5px] border-neutral-200 bg-white px-4 py-6">
      <div className="flex justify-between">
        <div className="text-primary-500 flex items-center gap-1">
          <div className="font-semibold">{getOrderStatusText(orderInfo.order_status)}</div>
          <div className="text-xs">{formatOrderDate(orderInfo.order_date)}</div>
        </div>
        <button
          className="flex items-center gap-0.5 text-xs text-neutral-500"
          onClick={() => navigate(`/result/${orderInfo.payment_id}`)}
        >
          <div>주문상세</div>
          <LeftArrowIcon />
        </button>
      </div>
      <div className="my-3 h-[1px] bg-neutral-200" />
      <div className="flex gap-3">
        <img
          src={orderInfo.orderable_shop_thumbnail}
          alt="상점 메인 썸네일"
          className="h-22 w-22 rounded-sm border-[0.5px] border-neutral-200 object-cover"
        />
        <div className="my-1">
          <div className="font-semibold">{orderInfo.orderable_shop_name}</div>
          <div className="my-1.5 text-sm font-medium">{orderInfo.order_title}</div>
          <div className="text-sm font-semibold">{orderInfo.total_amount.toLocaleString()}원</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <Button color="gray" className="py-3 text-sm text-neutral-600" fullWidth>
          리뷰 쓰기
        </Button>
        <Button color="primary" className="py-3 text-sm" fullWidth disabled={orderInfo.open_status}>
          같은 메뉴 담기
        </Button>
      </div>
    </div>
  );
}
