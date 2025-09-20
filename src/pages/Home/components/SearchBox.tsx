import React from 'react';
import SearchIconGray from '@/assets/Main/search-icon-gray.svg';

export interface SearchBoxProps {
  mode: 'button' | 'input';
  text?: string;
  onClick?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  defaultValue?: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  onSubmit?: () => void;
}

export default function SearchBox({
  mode,
  text = '검색어를 입력해주세요.',
  onClick,
  inputRef,
  defaultValue,
  autoFocus,
  onChange,
  onEnter,
  onSubmit,
}: SearchBoxProps) {
  const base =
    'shadow-1 mt-2 flex h-10 w-[342px] items-center gap-2 rounded-2xl px-3 py-2 max-[341px]:w-full lg:w-[936px]';
  const iconBox = 'flex h-6 w-6 items-center justify-center p-1';
  const textBase = 'text-[14px] leading-[160%]';
  const icon = <SearchIconGray />;

  if (mode === 'button') {
    return (
      <button type="button" onClick={onClick} className={`${base} bg-[#F8F8FA]`}>
        <div className={iconBox}>{icon}</div>
        <div className={`${textBase} text-neutral-400`}>{text}</div>
      </button>
    );
  }

  return (
    <div className={`${base} bg-white`}>
      <button type="button" onClick={onSubmit} className={iconBox}>
        {icon}
      </button>
      <input
        ref={inputRef}
        type="text"
        className={` ${textBase} placeholder-[#727272] focus:outline-none`}
        placeholder={text}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        autoComplete="off"
        onChange={onChange}
        onKeyUp={(e) => e.key === 'Enter' && onEnter?.()}
      />
    </div>
  );
}
