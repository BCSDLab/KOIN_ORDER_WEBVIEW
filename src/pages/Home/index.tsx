import BottomNav from './components/BottomNav';
import OrderList from './components/OrderList';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <div className="flex w-screen flex-col bg-[#f2f2f2]">
      <div className="flex justify-center">
        <SearchBar />
      </div>

      <div className="flex justify-center pt-15 pb-30">
        <OrderList />
      </div>

      <BottomNav />
    </div>
  );
}
