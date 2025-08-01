import { useParams } from 'react-router-dom';
import OrderableShopDetail from './components/OrderableShopDetail';
import UnOrderableShopDetail from './components/UnOrderableShopDetail';

export default function ShopDetailView() {
  const { id, isOrderable } = useParams();

  const isOrderableBoolean = isOrderable === 'true';

  if (!id) {
    throw new Error('Shop ID is required');
  }

  if (!location) {
    throw new Error('State is required');
  }

  return <>{isOrderableBoolean ? <OrderableShopDetail /> : <UnOrderableShopDetail />}</>;
}
