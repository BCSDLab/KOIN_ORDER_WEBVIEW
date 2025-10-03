import OrderList from './components/OrderList';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f8fa]">
      <div className="flex w-full gap-4 px-4 pb-2">
        <SearchBar />
      </div>

      <div className="flex flex-1 justify-center pt-15">
        <OrderList />
      </div>
    </div>
  );
}
