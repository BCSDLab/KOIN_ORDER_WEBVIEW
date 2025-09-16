import BottomNav from './components/BottomNav';
import OrderList from './components/OrderList';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f2f2f2]">
      <div className="flex justify-center">
        <SearchBar />
      </div>

      <div className="flex flex-1 justify-center pt-15 pb-30">
        <OrderList />
      </div>

      <BottomNav />
    </div>
  );
}
