import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/Layout';
import Campus from '@/pages/Delivery/Campus';
import DetailAddress from '@/pages/Delivery/Outside/DetailAddress';
import OrderFinish from '@/pages/OrderFinish';
import Payment from '@/pages/Payment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="delivery">
            <Route path="outside" element={<DetailAddress />} />
            <Route path="campus" element={<Campus />} />
          </Route>
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="result" element={<OrderFinish />} />
      </Routes>
    </BrowserRouter>
  );
}
