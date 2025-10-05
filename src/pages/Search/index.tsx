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
    <div className="relative flex w-full flex-col gap-4 bg-[#f8f8fa] px-4 pb-2">
      <SearchBar onChange={onChange} />
      {keyword && (
        <div className="absolute top-full right-4 left-4 z-30 bg-[#f8f8fa]">
          <SearchResultList keyword={keyword} />
        </div>
      )}
    </div>
  );
}
