import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentLayout from '@/components/Layout/PaymentLayout';
import Payment from '@/pages/Payment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payment" element={<PaymentLayout />}>
          <Route index element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
