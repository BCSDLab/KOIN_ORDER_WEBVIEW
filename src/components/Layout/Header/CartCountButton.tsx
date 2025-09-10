import { useNavigate } from 'react-router-dom';
import CartIcon from '@/assets/OrderFinish/shopping-cart-icon.svg';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';

export default function CartCountButton() {
  const navigate = useNavigate();

  const { orderType } = useOrderStore();
  const { data: cartInfo } = useCart(orderType);

  const cartItemCount = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="absolute top-1/2 right-6 -translate-y-1/2" onClick={() => navigate('/cart')}>
      <CartIcon fill="#1c1b1f" />
      {cartItemCount > 0 && (
        <div className="bg-primary-500 absolute -top-1/2 -right-1/2 flex h-4 w-4 items-center justify-center rounded-full text-[12px] font-medium text-white">
          {cartItemCount}
        </div>
      )}
    </button>
  );
}
