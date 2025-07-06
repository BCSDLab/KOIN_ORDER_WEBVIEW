import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import DeliveryOutside from './pages/Delivery/Outside';
import OrderCancel from './pages/OrderFinish/OrderCancel';
import ShopDetail from './pages/shop';
import { isNative, requestTokensFromNative, setTokensFromNative } from './util/ts/bridge';
import AppLayout from '@/components/Layout';
import Campus from '@/pages/Delivery/Campus';
import DetailAddress from '@/pages/Delivery/Outside/DetailAddress';
import OrderFinish from '@/pages/OrderFinish';
import Payment from '@/pages/Payment';

export default function App() {
  useEffect(() => {
    const initializeTokens = async () => {
      if (isNative()) {
        const tokens = await requestTokensFromNative();
        setTokensFromNative(tokens);
      }
    };

    initializeTokens();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="cart" element={<Cart />} />
          <Route path="delivery">
            <Route path="outside/detail" element={<DetailAddress />} />
            <Route path="outside" element={<DeliveryOutside />} />
            <Route path="campus" element={<Campus />} />
          </Route>
          <Route path="payment" element={<Payment />} />
          <Route path="shop-detail/:id" element={<ShopDetail />} />
          <Route path="orderCancel" element={<OrderCancel />} />
          <Route path="result" element={<OrderFinish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
