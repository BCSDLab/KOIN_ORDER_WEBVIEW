import SearchBarModal from './SearchBarModal';
import SearchBox from './SearchBox';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function SearchBar() {
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);

  return (
    <>
      <SearchBox mode="button" text="검색어를 입력해주세요." onClick={openModal} />
      {isModalOpen && <SearchBarModal onClose={closeModal} />}
    </>
  );
}
