import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from '@/pages/Cart/CartPage';
import MainPage from '@/pages/Main/MainPage';
import MenuPage from '@/pages/Menu/MenuPage';
import StoreDetailPage from '@/pages/StoreDetail/StoreDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/store/:storeId" element={<StoreDetailPage />} />
        <Route path="/store/:storeId/menu/:menuId" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
