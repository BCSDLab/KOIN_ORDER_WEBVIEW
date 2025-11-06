import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import BottomNav from '@/pages/Home/components/BottomNav';

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

export function HomeLayout() {
  return (
    <>
      <Header />
      <div className="pt-15 pb-30">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      {/* TODO: 배달 배포 시 사용 */}
      {/* <BottomNav /> */}
    </>
  );
}
