import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeliveryLayout from './components/Layout/DeliveryLayout';
import PaymentLayout from '@/components/Layout/PaymentLayout';
import Campus from '@/pages/Delivery/Campus';
import DetailAddress from '@/pages/Delivery/Outside/DetailAddress';
import OrderFinish from '@/pages/OrderFinish';
import Payment from '@/pages/Payment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route path="/delivery/outside/detail-address" element={<DetailAddress />} />
          <Route path="/delivery/campus" element={<Campus />} />
        </Route>
        <Route path="/payment" element={<PaymentLayout />}>
          <Route index element={<Payment />} />
        </Route>
        <Route path="/address" element={<DetailAddress />} />
        <Route path="/order" element={<OrderFinish />} />
      </Routes>
    </BrowserRouter>
  );
}
