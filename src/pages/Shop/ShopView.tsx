import { useParams } from 'react-router-dom';
import OrderableComponent from './components/OrderableComponent';
import UnOrderableComponent from './components/UnOrderableComponent';

export default function ShopView() {
  const { isOrderable } = useParams();

  const isOrderableBoolean = isOrderable === 'true';

  return <>{isOrderableBoolean ? <OrderableComponent /> : <UnOrderableComponent />}</>;
}
