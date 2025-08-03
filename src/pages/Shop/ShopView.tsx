import { useParams } from 'react-router-dom';
import useCart from '../Payment/hooks/useCart';
import OrderableComponent from './OrderableComponent';
import UnOrderableComponent from './UnOrderableComponent';
import { useOrderStore } from '@/stores/useOrderStore';

export default function ShopView() {
  const { isOrderable } = useParams();

  const { orderType } = useOrderStore();

  const { data: cartInfo } = useCart(orderType);
  const totalQuantity = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);

  return isOrderable ? (
    <OrderableComponent cartInfo={cartInfo} totalQuantity={totalQuantity} />
  ) : (
    <UnOrderableComponent totalQuantity={totalQuantity} />
  );
}
