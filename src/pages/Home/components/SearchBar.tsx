import SearchBarModal from './SearchBarModal';
import SearchBox from './SearchBox';
import useBooleanState from '@/util/hooks/useBooleanState';
import useParamsHandler from '@/util/hooks/useParamsHandler';

export default function SearchBar() {
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);
  const { searchParams } = useParamsHandler();

  return (
    <>
      <SearchBox mode="button" text={searchParams.get('storeName') || '검색어를 입력해주세요.'} onClick={openModal} />
      {isModalOpen && <SearchBarModal onClose={closeModal} />}
    </>
  );
}
