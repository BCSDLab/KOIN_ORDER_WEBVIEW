import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentLayout from '@/components/Layout/PaymentLayout';
import CartPage from '@/pages/Cart/CartPage';
import DeliveryOutside from '@/pages/Delivery/Outside';
import MainPage from '@/pages/Main/MainPage';
import MenuPage from '@/pages/Menu/MenuPage';
import Payment from '@/pages/Payment/index';
import StoreDetailPage from '@/pages/StoreDetail/StoreDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/store/:storeId" element={<StoreDetailPage />} />
        <Route path="/store/:storeId/menu/:menuId" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentLayout />}>
          <Route index element={<Payment />} />
          <Route path="delivery/outside" element={<DeliveryOutside />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
