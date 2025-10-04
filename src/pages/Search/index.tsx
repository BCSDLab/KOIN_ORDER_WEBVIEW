import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResultList from './components/SearchResultList';
import useDebouncedCallback from '@/util/hooks/useDebounce';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const onChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, 200);

  return (
    <div className="flex w-full flex-col gap-4 bg-[#f8f8fa] px-4 pb-2">
      <SearchBar onChange={onChange} />
      <SearchResultList keyword={keyword} />
    </div>
  );
}
