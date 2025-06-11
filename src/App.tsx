import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailAddress from './pages/Delivery/Outside/DetailAddress';
import OrderFinish from './pages/OrderFinish/OrderFinish';
import PaymentLayout from '@/components/Layout/PaymentLayout';
import CartPage from '@/pages/Cart/CartPage';
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
        </Route>
        <Route path="/add" element={<DetailAddress />} />
        <Route path="/order" element={<OrderFinish />} />
      </Routes>
    </BrowserRouter>
  );
}
