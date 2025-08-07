import dayjs from 'dayjs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import DeliveryOutside from './pages/Delivery/Outside';
import OrderCancel from './pages/OrderFinish/OrderCancel';
import MenuDetail from './pages/Shop/MenuDetail';
import OrderableShopView from './pages/Shop/OrderableShopView';
import OrderableShopDetail from './pages/Shop/ShopDetail/components/OrderableShopDetail';
import UnOrderableShopDetail from './pages/Shop/ShopDetail/components/UnOrderableShopDetail';
import UnOrderableShopView from './pages/Shop/UnOrderableShopView';
import AppLayout from '@/components/Layout';
import Campus from '@/pages/Delivery/Campus';
import DetailAddress from '@/pages/Delivery/Outside/DetailAddress';
import OrderFinish from '@/pages/OrderFinish';
import Payment from '@/pages/Payment';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="shop/true/:shopId" element={<OrderableShopView />} />
        <Route path="shop/false/:shopId" element={<UnOrderableShopView />} />
        <Route path="shop/true/:shopId/menus/:menuId" element={<MenuDetail />} />

        <Route element={<AppLayout />}>
          <Route path="shop-detail/true/:shopId" element={<OrderableShopDetail />} />
          <Route path="shop-detail/false/:shopId" element={<UnOrderableShopDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="delivery">
            <Route path="outside/detail" element={<DetailAddress />} />
            <Route path="outside" element={<DeliveryOutside />} />
            <Route path="campus" element={<Campus />} />
          </Route>
          <Route path="payment" element={<Payment />} />
          <Route path="orderCancel" element={<OrderCancel />} />
          <Route path="result" element={<OrderFinish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
