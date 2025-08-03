import { useParams } from 'react-router-dom';
import OrderableComponent from './components/OrderableComponent';
import UnOrderableComponent from './components/UnOrderableComponent';

export default function ShopView() {
  const { isOrderable } = useParams();

  return isOrderable ? <OrderableComponent /> : <UnOrderableComponent />;
}
