import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DevOnlyWrapper from './components/Wrapper/DevOnly';
import Wrapper from './components/Wrapper/PageWrapper';
import Cart from './pages/Cart';
import DeliveryOutside from './pages/Delivery/Outside';
import Home from './pages/Home';
import Login from './pages/Login';
import NearbyShops from './pages/NearbyShops';
import OrderCancel from './pages/OrderFinish/OrderCancel';
import OrderList from './pages/OrderList';
import PaymentConfirm from './pages/PaymentConfirm';
import Search from './pages/Search';
import MenuDetail from './pages/Shop/MenuDetail';
import OrderableShopView from './pages/Shop/OrderableShopView';
import OrderableShopDetail from './pages/Shop/ShopDetail/components/OrderableShopDetail';
import ReviewCreateForm from './pages/Shop/shopReview/components/ReviewCreateForm';
import ReviewEditForm from './pages/Shop/shopReview/components/ReviewEditForm';
import ReviewReport from './pages/Shop/shopReview/components/ReviewReport';
import UnorderableShopView from './pages/Shop/UnorderableShopView';
import AppLayout, { HomeLayout } from '@/components/Layout';
import Campus from '@/pages/Delivery/Campus';
import DetailAddress from '@/pages/Delivery/Outside/DetailAddress';
import OrderFinish from '@/pages/OrderFinish';
import Payment from '@/pages/Payment';
import UnorderableShopDetail from '@/pages/Shop/ShopDetail/components/UnorderableShopDetail';
import OrderableShopReview from '@/pages/Shop/shopReview/components/OrderableShopReview';
import UnorderableShopReview from '@/pages/Shop/shopReview/components/UnorderableShopReview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DevOnlyWrapper>
              <Login />
            </DevOnlyWrapper>
          }
        />
        <Route path="shop/true/:shopId" element={<OrderableShopView />} />
        <Route path="shop/false/:shopId" element={<Wrapper title="상점 상세" element={<UnorderableShopView />} />} />
        <Route path="shop/true/:shopId/menus/:menuId" element={<MenuDetail />} />
        <Route path="payment/return" element={<PaymentConfirm />} />

        <Route element={<HomeLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="shops" element={<Wrapper title="상점" element={<NearbyShops />} />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="shop-detail/true/:shopId" element={<OrderableShopDetail />} />
          <Route path="shop-detail/false/:shopId" element={<UnorderableShopDetail />} />
          <Route path="review/true/:shopId" element={<OrderableShopReview />} />
          <Route path="review/false/:shopId" element={<UnorderableShopReview />} />
          <Route path="review/report/:shopId" element={<ReviewReport />} />
          <Route path="review/new/:shopId" element={<ReviewCreateForm />} />
          <Route path="review/edit/:shopId/:reviewId" element={<ReviewEditForm />} />
          <Route path="cart" element={<Cart />} />
          <Route path="delivery">
            <Route path="outside/detail" element={<DetailAddress />} />
            <Route path="outside" element={<DeliveryOutside />} />
            <Route path="campus" element={<Campus />} />
          </Route>
          <Route path="payment" element={<Payment />} />
          <Route path="orderCancel/:paymentId" element={<OrderCancel />} />
          <Route path="result/:paymentId" element={<OrderFinish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
