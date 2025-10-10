import { useNavigate } from 'react-router-dom';
import { InProgressOrder } from '@/api/order/entity';
import PickupIcon from '@/assets/Delivery/bucket.svg';
import BikeIcon from '@/assets/Main/agriculture.svg';
import Button from '@/components/UI/Button';

interface PreparingCardProps {
  orderInfo: InProgressOrder;
}

const getOrderStatusText = (status: InProgressOrder['order_status']): string | null => {
  switch (status) {
    case 'COOKING':
      return '조리 중';
    case 'CONFIRMING':
      return '주문 확인 중';
    case 'DELIVERING':
      return '배달 출발';
    case 'DELIVERED':
      return '배달 완료';
    case 'PACKAGED':
      return '수령 가능';
    default:
      return null;
  }
};

const getStatusDescription = (status: InProgressOrder['order_status']): string | null => {
  switch (status) {
    case 'CONFIRMING':
      return '사장님이 주문을 확인하고 있어요!';
    case 'COOKING':
      return '가게에서 열심히 음식을 조리하고 있어요!';
    case 'DELIVERING':
      return '열심히 달려가는 중이에요!';
    case 'DELIVERED':
      return '배달이 완료되었어요. 감사합니다!';
    case 'PACKAGED':
      return '준비가 완료되었어요!';
    default:
      return null;
  }
};

export const formatKoreanTime = (hhmm: string): string => {
  const [hour, minute] = hhmm.split(':');
  const numHour = Number(hour);
  const meridiem = numHour < 12 ? '오전' : '오후';
  const h12 = numHour % 12 || 12;
  return `${meridiem} ${h12}:${minute}`;
};

const getEtaText = (order: InProgressOrder): string | null => {
  if (!order.estimated_at) return null;
  const time = formatKoreanTime(order.estimated_at);

  if (order.order_type === 'DELIVERY' && (order.order_status === 'COOKING' || order.order_status === 'DELIVERING')) {
    return `${time} 도착 예정`;
  }

  if (order.order_type === 'TAKE_OUT' && order.order_status === 'COOKING') {
    return `${time} 수령 가능`;
  }

  return null;
};

export default function PreparingCard({ orderInfo }: PreparingCardProps) {
  const navigate = useNavigate();
  const orderStatusText = getOrderStatusText(orderInfo.order_status);
  const etaText = getEtaText(orderInfo);
  const statusDescription = getStatusDescription(orderInfo.order_status);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/shop/true/${orderInfo.orderable_shop_id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/shop/true/${orderInfo.orderable_shop_id}`);
        }
      }}
      className="rounded-xl border-[0.5px] border-neutral-200 bg-white px-6 py-4"
    >
      <div className="bg-primary-100 inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5">
        {orderInfo.order_type === 'DELIVERY' ? <BikeIcon /> : <PickupIcon />}
        <div className="text-primary-500 text-xs font-medium">
          {orderInfo.order_type === 'DELIVERY' ? '배달' : '포장'}
        </div>
      </div>
      <div className="leading-[160%]">
        <div className="text-xl font-bold">
          <div className="text-primary-500 mt-3">{orderStatusText}</div>
          {etaText && <div className="text-primary-700">{etaText}</div>}
        </div>
        <div className="text-xs text-neutral-500">{statusDescription}</div>
      </div>
      <div className="my-4 h-[1px] bg-neutral-200" />
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
      <Button
        color="neutral"
        fullWidth
        className="border-primary-500 mt-4 py-2 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/result/${orderInfo.payment_id}`);
        }}
      >
        주문 상세 보기
      </Button>
    </div>
  );
}
