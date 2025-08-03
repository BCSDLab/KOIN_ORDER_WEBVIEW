import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import OrderableShopDetail from './OrderableShopDetail';
import UnOrderableShopDetail from './UnOrderableShopDetail';

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
