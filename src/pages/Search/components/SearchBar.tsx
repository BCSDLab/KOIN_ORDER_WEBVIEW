import SearchIconGray from '@/assets/Main/search-icon-gray.svg';

interface SearchBarProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div className={'shadow-1 mx-2 mt-2 flex h-10 items-center gap-2 rounded-2xl bg-white px-4 py-2'}>
      <SearchIconGray className="h-6 w-6 shrink-0" />
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        autoComplete="off"
        className="w-full text-[14px] leading-[160%] placeholder-neutral-500 focus:outline-none"
        onChange={onChange}
      />
    </div>
  );
}
