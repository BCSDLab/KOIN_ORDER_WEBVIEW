import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import OrderableShopDetail from './components/OrderableShopDetail';
import UnOrderableShopDetail from './components/UnOrderableShopDetail';

export default function ShopDetailView() {
  const { state } = useLocation();
  const { id } = useParams();
  if (!id) {
    throw new Error('Shop ID is required');
  }

  if (!state) {
    throw new Error('State is required');
  }

  return state.isOrderable ? <OrderableShopDetail shopId={id} /> : <UnOrderableShopDetail shopId={id} />;
}
