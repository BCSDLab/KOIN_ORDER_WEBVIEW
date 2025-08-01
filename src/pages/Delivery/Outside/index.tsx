import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useOffCampusDeliveryValidate } from '../hooks/useOffCampusDeliveryValidate';
import { Juso } from '@/api/delivery/entity';
import InfoIcon from '@/assets/Common/info-icon.svg';
import SearchIcon from '@/assets/Common/search-icon.svg';
import BCSDLogoWithMagnifyIcon from '@/assets/Payment/bcsd-logo-with-magnify.svg';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/CenterModal/Modal';
import useRoadNameAddress from '@/pages/Delivery/hooks/useRoadNameAddress';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function DeliveryOutside() {
  const { setOutsideAddress } = useOrderStore();

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<Juso | null>(null);
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);

  const { data, refetch, isSuccess, isFetched } = useRoadNameAddress(searchKeyword);
  const { mutate } = useOffCampusDeliveryValidate();

  const roadAddress = selectedAddress?.road_address;

  const handleAddressSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchKeyword(e.currentTarget.value);
      refetch();
    }
  };

  const handleAddressSelect = (address: Juso) => {
    if (address) {
      mutate(
        {
          si_do: address.si_nm,
          si_gun_gu: address.sgg_nm,
          eup_myeon_dong: address.emd_nm,
        },
        {
          onSuccess: () => {
            setOutsideAddress({
              zip_number: address.zip_no,
              si_do: address.si_nm,
              si_gun_gu: address.sgg_nm,
              eup_myeon_dong: address.emd_nm,
              road: address.rn,
              building: address.bd_nm,
              detail_address: '',
              full_address: '',
            });
            navigate('/delivery/outside/detail', { state: { roadAddress } });
          },
          onError: () => {
            openModal();
          },
        },
      );
    }
  };

  return (
    <div className="mx-6 mt-4 flex min-h-[calc(100dvh-4.75rem)] flex-col items-center justify-between">
      <div className="mb-[1.813rem] w-full">
        <div className="sticky top-[3.75rem] -mx-6 bg-[#f8f8fa] px-6 pb-2">
          <span className="text-primary-500 text-[16px] font-semibold">배달주소</span>
          <div className="sticky top-[3.75rem] my-2 flex h-10 items-center gap-2 rounded-xl border-[1px] border-neutral-400 px-3 py-2">
            <SearchIcon />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="주소를 입력해주세요."
              onKeyDown={(e) => handleAddressSearch(e)}
              className="w-full focus:border-transparent focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex gap-1">
            <InfoIcon />
            <span className="text-[10px] leading-[1.6] text-neutral-500">주소지는 병천으로만 설정 가능해요</span>
          </div>
        </div>
        {!isSuccess && !isFetched && (
          <div className="mt-2 text-[13px] leading-[1.6] font-normal text-neutral-600">
            <p className="mb-2 text-sm font-medium">이렇게 검색해보세요!</p>
            <ul className="space-y-2">
              <li className="relative pl-4">
                <span className="absolute top-0 left-0 text-neutral-500">•</span>
                <div>
                  <span className="text-neutral-500">도로명 + 건물번호</span>
                  <br />
                  <span className="text-primary-300">예) 가전8길 + 102</span>
                </div>
              </li>
              <li className="relative pl-4">
                <span className="absolute top-0 left-0 text-neutral-500">•</span>
                <div>
                  <span className="text-neutral-500">병천면 + 건물명</span>
                  <br />
                  <span className="text-primary-300">예) 병천면 + 라이프원룸</span>
                </div>
              </li>
            </ul>
          </div>
        )}
        {isSuccess && data && data.addresses.length > 0 && (
          <div className="shadow-1 mt-2 flex flex-col divide-y divide-neutral-300 overflow-y-auto rounded-xl border-[1px] border-neutral-300">
            {data.addresses.map((address, index) => {
              const isFirst = index === 0;
              const isLast = index === data.addresses.length - 1;
              const isSelected = selectedAddress?.eng_address === address.eng_address;

              const className = twMerge(
                clsx('flex flex-col items-start p-4 bg-white', {
                  'bg-neutral-200': isSelected,
                  'rounded-t-xl': isFirst,
                  'rounded-b-xl': isLast,
                }),
              );
              return (
                <button key={address.eng_address} className={className} onClick={() => setSelectedAddress(address)}>
                  <div className="text-start text-sm leading-[1.6] font-medium text-neutral-800">
                    {address.bd_nm === '' ? address.road_address : address.bd_nm}
                  </div>
                  <div className="text-start text-[12px] leading-[1.6] font-normal text-neutral-500">
                    {address.road_address}
                  </div>
                </button>
              );
            })}
          </div>
        )}
        {((!isSuccess && isFetched) || (isSuccess && data.addresses.length === 0)) && (
          <div className="mt-20 flex flex-col items-center gap-3">
            <BCSDLogoWithMagnifyIcon />
            <div>
              <div className="text-primary-500 text-lg leading-[1.6] font-semibold">검색결과가 없어요</div>
              <div className="text-sm leading-[1.6] font-medium text-neutral-600">
                검색어를 확인하고 다시 검색해주세요
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        fullWidth
        className="mt-auto mb-5 h-[2.875rem] disabled:border-neutral-300 disabled:bg-neutral-300"
        onClick={() => handleAddressSelect(selectedAddress!)}
        disabled={!selectedAddress}
      >
        주소 선택
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex h-36 w-full flex-col items-center gap-6 px-8 py-6">
          <p className="text-[15px] leading-[1.6] text-neutral-600">배달이 불가능한 지역이에요.</p>
          <Button className="h-12 w-[230px]" color="primary" onClick={closeModal}>
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
}
