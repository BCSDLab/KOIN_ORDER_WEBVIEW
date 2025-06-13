import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function PaymentLayout() {
  return (
    <>
      <Header title="주문" />
      <div className="pt-11">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
