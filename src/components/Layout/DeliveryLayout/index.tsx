import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function DeliveryLayout() {
  return (
    <>
      <Header title="주소 상세" />
      <div className="pt-15">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
