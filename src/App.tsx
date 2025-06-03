import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailAddress from './pages/Delivery/Outside/DetailAddress';
import OrderFinish from './pages/OrderFinish/OrderFinish';
import PaymentLayout from '@/components/Layout/PaymentLayout';
import Payment from '@/pages/Payment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payment" element={<PaymentLayout />}>
          <Route index element={<Payment />} />
        </Route>
        <Route path="/add" element={<DetailAddress />} />
        <Route path="/order" element={<OrderFinish />} />
      </Routes>
    </BrowserRouter>
  );
}
