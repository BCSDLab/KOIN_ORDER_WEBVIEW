import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function PaymentLayout() {
  return (
    <>
      <Header />
      <div className="pt-15 pb-7">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
