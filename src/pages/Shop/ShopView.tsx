import { useParams } from 'react-router-dom';
import OrderableComponent from './components/OrderableComponent';
import UnOrderableComponent from './components/UnOrderableComponent';

export default function ShopView() {
  const { isOrderable } = useParams();

  if (isOrderable !== 'true' && isOrderable !== 'false') {
    throw new Error('State is required');
  }

  const isOrderableBoolean = isOrderable === 'true';

  return isOrderableBoolean ? <OrderableComponent /> : <UnOrderableComponent />;
}
