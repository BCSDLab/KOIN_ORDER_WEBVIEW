import { useParams } from 'react-router-dom';
import OrderableShopDetail from './components/OrderableShopDetail';
import UnOrderableShopDetail from './components/UnOrderableShopDetail';

export default function ShopDetailView() {
  const { id, isOrderable } = useParams();

  if (!id) {
    throw new Error('Shop ID is required');
  }

  if (isOrderable !== 'true' && isOrderable !== 'false') {
    throw new Error('State is required');
  }

  const isOrderableBoolean = isOrderable === 'true';

  return isOrderableBoolean ? <OrderableShopDetail shopId={id} /> : <UnOrderableShopDetail shopId={id} />;
}
