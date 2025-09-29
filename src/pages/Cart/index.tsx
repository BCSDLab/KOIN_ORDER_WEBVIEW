import { useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import useCart from '../Payment/hooks/useCart';
import useAddCart from '../Shop/hooks/useAddCart';
import BottomSheet from './components/BottomSheet';
import CartItem from './components/CartItem';
import PaymentAmount from './components/PaymentAmount';
import { AddCartRequest } from '@/api/cart/entity';
import EmptyCart from '@/assets/Cart/cart-icon.svg';
import Plus from '@/assets/Cart/plus-icon.svg';
import Info from '@/assets/Cart/primary-info-icon.svg';
import PrimaryPlus from '@/assets/Cart/primary-plus-icon.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Button from '@/components/UI/Button';
import { useOrderStore } from '@/stores/useOrderStore';
import { isNative } from '@/util/bridge/bridge';
import { backButtonTapped } from '@/util/bridge/nativeAction';

export default function Cart() {
  const navigate = useNavigate();
  const { orderType, setOrderType } = useOrderStore();

  const { data: cartInfo } = useCart(orderType);
  const { mutateAsync: addToCart } = useAddCart();

  let infoMessage = '';

  if (!cartInfo.is_delivery_available && cartInfo.is_takeout_available) {
    infoMessage = '이 가게는 포장주문만 가능해요';
  } else if (cartInfo.is_delivery_available && !cartInfo.is_takeout_available) {
    infoMessage = '이 가게는 배달주문만 가능해요';
  }

  const touchAddMenuButton = () => {
    if (isNative()) {
      backButtonTapped();
    } else {
      navigate('/home');
    }
  };

  useEffect(() => {
    const storedMenuOptions = localStorage.getItem('menuOptions');
    if (storedMenuOptions) {
      const request: AddCartRequest = JSON.parse(storedMenuOptions);
      addToCart(request);
      localStorage.removeItem('menuOptions');
    }
  }, []);

  if (cartInfo.items.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center">
        <EmptyCart />
        <div className="mt-1.5 text-[13px] leading-[160%] font-semibold text-neutral-700">장바구니가 비었어요</div>
        <Button
          startIcon={<Plus />}
          color="gray"
          className="mt-[14px] gap-2.5 border-0 py-[7px] pr-4 pl-[14px] text-[13px] font-bold"
          onClick={touchAddMenuButton}
        >
          메뉴 추가
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-6 px-6 pb-40">
      <div>
        <div className="shadow-1 flex w-full gap-1 rounded-[10px] bg-white p-1">
          <Button
            className={clsx(
              'border-0 py-2 text-sm leading-[160%] font-medium shadow-none',
              !cartInfo.is_delivery_available && 'bg-transparent text-neutral-300',
            )}
            fullWidth
            color={orderType === 'DELIVERY' ? 'primary' : 'gray'}
            state={cartInfo.is_delivery_available ? 'default' : 'disabled'}
            onClick={() => setOrderType('DELIVERY')}
          >
            배달
          </Button>
          <Button
            className={clsx(
              'border-0 py-2 text-sm leading-[160%] font-medium shadow-none',
              !cartInfo.is_takeout_available && 'bg-transparent text-neutral-300',
            )}
            fullWidth
            color={orderType === 'TAKE_OUT' ? 'primary' : 'gray'}
            state={cartInfo.is_takeout_available ? 'default' : 'disabled'}
            onClick={() => setOrderType('TAKE_OUT')}
          >
            포장
          </Button>
        </div>

        {infoMessage && (
          <div className="mt-1.5 flex items-center gap-2">
            <Info />
            <div className="text-primary-500 text-sm leading-[160%]">{infoMessage}</div>
          </div>
        )}
      </div>

      <button
        className="flex items-center gap-1.5"
        onClick={() => navigate(`/shop/true/${cartInfo.orderable_shop_id}`)}
      >
        <img src={cartInfo.shop_thumbnail_image_url} className="h-7.5 w-7.5 rounded-[5px]" />
        <div className="text-lg leading-[160%] font-semibold">{cartInfo.shop_name}</div>
        <RightArrow />
      </button>

      <div>
        <div className="shadow-1 rounded-3xl">
          {cartInfo.items.map((item, index) => (
            <div
              key={item.cart_menu_item_id}
              className={clsx(
                'bg-white px-6 py-3',
                index === 0 && 'rounded-t-3xl',
                index === cartInfo.items.length - 1 && 'rounded-b-3xl',
                index !== cartInfo.items.length - 1 && 'border-b border-neutral-300',
              )}
            >
              <CartItem shopId={cartInfo.orderable_shop_id} item={item} />
            </div>
          ))}
        </div>
        <Button
          fullWidth
          color="neutral"
          startIcon={<PrimaryPlus />}
          className="mt-3 gap-2.5 border-0 py-[11px] leading-[160%]"
          onClick={() => navigate(`/shop/true/${cartInfo.orderable_shop_id}`)}
        >
          더 담으러 가기
        </Button>
      </div>

      <PaymentAmount
        orderType={orderType}
        total_amount={cartInfo.total_amount}
        item_total_amount={cartInfo.items_amount}
        delivery_fee={cartInfo.delivery_fee}
        final_payment_amount={cartInfo.final_payment_amount}
      />
      <BottomSheet
        orderType={orderType}
        itemCount={cartInfo.items.reduce((total, item) => total + item.quantity, 0)}
        itemTotalAmount={cartInfo.items_amount}
        totalAmount={cartInfo.total_amount}
        minimumOrderAmount={cartInfo.shop_minimum_order_amount}
      />
    </div>
  );
}
