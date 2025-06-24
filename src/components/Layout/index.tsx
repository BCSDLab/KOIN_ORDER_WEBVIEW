import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="pt-15">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
