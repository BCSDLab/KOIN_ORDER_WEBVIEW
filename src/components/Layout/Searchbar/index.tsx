import { Outlet } from 'react-router-dom';
import SearchBar from '@/pages/Home/components/SearchBar';

export default function Searchbar() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f8fa]">
      <div className="flex justify-center py-2">
        <SearchBar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
