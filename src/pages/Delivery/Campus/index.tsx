import { useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import useMarker from '../hooks/useMarker';
import useNaverMap from '../hooks/useNaverMap';
import Building from '@/assets/Delivery/building.svg';
import ChevronDown from '@/assets/Delivery/chevron-down.svg';
import NightShelter from '@/assets/Delivery/night-shelter.svg';
import CloseIcon from '@/assets/Main/close-icon.svg';
import ArrowDown from '@/assets/Payment/arrow-down-icon.svg';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import BottomModal, {
  BottomModalHeader,
  BottomModalContent,
  BottomModalFooter,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';
import Modal, { ModalContent, ModalFooter } from '@/components/UI/CenterModal/Modal';
import useBooleanState from '@/util/hooks/useBooleanState';

const campusList = [
  {
    name: '기숙사',
    icon: NightShelter,
    building: ['101동(해울)', '103동(예솔)', '104동(다솔)'],
  },
  {
    name: '공학관',
    icon: Building,
    building: [
      '1공학관',
      '2공학관',
      '3공학관',
      '4공학관',
      '학생회관',
      '미래학관',
      '담헌실학관',
      '다산정보관',
      'R&D돔',
      '복지관',
    ],
  },
  {
    name: '그 외',
    icon: '',
    building: ['기타'],
  },
] as const;

const sample: [number, number] = [36.762, 127.2835];
const DetailRequest: string[] = [
  '문 앞에 놔주세요 (벨 눌러주세요)',
  '문 앞에 놔주세요 (노크해주세요)',
  '문 앞에 놔주세요 (벨X, 노크 X)',
  '직접 받을게요',
  '전화주시면 마중 나갈게요',
];

type CampusCategory = {
  name: '기숙사' | '공학관' | '그 외';
  icon: React.ReactNode | null;
  building: string[];
};

export default function Campus() {
  const [bottomModalIsOpen, openBottomModal, closeBottomModal] = useBooleanState(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [selectedRequest, setSelectedRequest] = useState<string>('');
  const [customInputValue, setCustomInputValue] = useState<string>('');

  const map = useNaverMap(...sample);
  useMarker(map);

  const [selectedCampusCategory, setSelectedCampusCategory] = useState<CampusCategory['name'] | null>(null);
  const [selectedCampusBuilding, setSelectedCampusBuilding] = useState<string>('');

  const requestLabel = () => {
    if (!selectedRequest) {
      return '상세 요청사항을 입력해주세요.';
    }
    if (selectedRequest === 'customRequest') {
      return customInputValue || '상세 요청사항을 입력해주세요.';
    }
    return selectedRequest;
  };

  const handleOpenBottomModal = () => openBottomModal();
  const handleCloseBottomModal = () => closeBottomModal();

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleSelectRequest = (detail: string) => setSelectedRequest(detail);
  const getCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInputValue(e.target.value.trimStart());
  };

  const handleSubmitRequest = () => handleCloseBottomModal();

  return (
    <div className="flex flex-col items-center">
      <div className="shadow-1 w-[21.375rem] rounded-xl">
        <div id="map" className="h-40 w-full rounded-t-xl border border-neutral-300"></div>
        <div className="flex h-[3.5rem] w-full items-center justify-between rounded-b-xl bg-white px-6 text-[0.813rem] text-neutral-600">
          {selectedCampusBuilding ? (
            <div className="flex w-full items-center justify-center gap-2">
              <Badge label={selectedCampusBuilding} color="primary" size="sm" className="text-sm" />
              <span>앞으로 배달돼요!</span>
            </div>
          ) : (
            <span>배달 받을 위치를 선택해주세요!</span>
          )}
          <div>
            <ArrowGo />
          </div>
        </div>
      </div>

      <div className="mt-[1.813rem]">
        <div className="text-primary-500 leading-[160%] font-semibold">배달주소</div>
        <div className="pb-3 text-xs leading-[160%]">배달 받을 위치를 선택해주세요!</div>
        <div className="flex w-[342px] flex-col gap-3">
          {campusList.map((campus) => {
            const isSelected = selectedCampusCategory === campus.name;
            return (
              <div
                key={campus.name}
                className={twMerge(
                  clsx(
                    'box-content flex flex-col items-center bg-white',
                    isSelected && 'w-full overflow-hidden rounded-lg border border-neutral-300',
                    !isSelected && 'rounded-lg border border-neutral-300',
                  ),
                )}
              >
                <div className="flex w-full flex-col items-center gap-2">
                  <button
                    type="button"
                    className="flex h-14 w-full items-center justify-between p-4 font-semibold transition-colors"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCampusCategory(null);
                        return;
                      }
                      setSelectedCampusCategory(campus.name);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary-500 text-sm">{campus.name}</span>
                      {campus.icon && <campus.icon />}
                    </div>
                    <span className={clsx('transition-transform', isSelected && 'rotate-180')}>
                      <ChevronDown />
                    </span>
                  </button>
                </div>
                {isSelected && (
                  <>
                    <div className="h-[1px] w-[310px] bg-[#eee]" />
                    <div className="mx-auto flex w-full flex-wrap justify-center gap-x-3 gap-y-2 bg-white px-4 py-4 break-all">
                      {campus.building.map((building) => (
                        <Button
                          key={building}
                          color={selectedCampusBuilding === building ? 'primary' : 'gray'}
                          size="sm"
                          onClick={() => setSelectedCampusBuilding(building)}
                        >
                          {building}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[1.813rem]">
        <div className="text-primary-500 pb-2 font-semibold">배달기사님에게</div>
        <button
          type="button"
          onClick={handleOpenBottomModal}
          className="flex w-[21.375rem] items-center justify-between rounded-sm border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-400"
        >
          {requestLabel()}
          <div className="pointer-events-none">
            <ArrowDown />
          </div>
        </button>
      </div>
      <Button className="mt-[18.188rem] h-[2.875rem] w-[21.375rem]" onClick={handleOpenModal}>
        주소 선택
      </Button>
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <ModalContent>정확한 상세 주소를 입력해주세요.</ModalContent>
        <ModalFooter>
          <Button onClick={handleCloseModal} className="h-12 w-[16rem]">
            확인
          </Button>
        </ModalFooter>
      </Modal>
      <BottomModal isOpen={bottomModalIsOpen} onClose={handleCloseBottomModal}>
        <BottomModalHeader>
          <div className="text-primary-500 font-semibold">배달기사님에게</div>
          <button onClick={handleCloseBottomModal}>
            <CloseIcon />
          </button>
        </BottomModalHeader>
        <BottomModalContent className="px-6">
          <form className="flex w-[20.375rem] flex-col gap-2">
            {DetailRequest.map((detail, index) => (
              <label
                key={index}
                htmlFor={detail}
                className={`request-label ${selectedRequest === detail && 'request-label-checked'}`}
              >
                <div className="relative h-5 w-5">
                  <input
                    name="request"
                    id={detail}
                    type="radio"
                    checked={selectedRequest === detail}
                    onChange={() => handleSelectRequest(detail)}
                    className="peer border-primary-500 absolute h-5 w-5 appearance-none rounded-full border-2 bg-white"
                  />
                  <div className="bg-primary-500 pointer-events-none absolute inset-1 rounded-full opacity-0 peer-checked:opacity-100" />
                </div>
                <div className="text-base">{detail}</div>
              </label>
            ))}
            <label
              htmlFor="customRequest"
              className="has-[input[type=radio]:checked]:border-primary-500 has-[input[type=radio]:checked]:bg-primary-100 shadow-1 flex h-[3.125rem] items-center gap-2 rounded-lg border border-neutral-300 p-2 has-[input[type=radio]:checked]:border-2"
            >
              <div className="relative h-5 w-5">
                <input
                  name="request"
                  id="customRequest"
                  type="radio"
                  checked={selectedRequest === 'customRequest'}
                  onChange={() => handleSelectRequest('customRequest')}
                  className="peer border-primary-500 absolute h-5 w-5 appearance-none rounded-full border-2 bg-white"
                />
                <div className="bg-primary-500 pointer-events-none absolute inset-1 rounded-full opacity-0 peer-checked:opacity-100" />
              </div>
              <div className="text-base">직접 입력</div>
            </label>
            {selectedRequest === 'customRequest' && (
              <input
                type="text"
                value={customInputValue}
                placeholder="상세 요청사항을 입력해주세요."
                onChange={getCustomInput}
                className="h-[3.125rem] rounded-lg border border-neutral-300 bg-white p-2 placeholder-neutral-400 placeholder:text-sm placeholder:font-normal"
              />
            )}
          </form>
          <Button onClick={handleSubmitRequest} className="h-[2.875rem] w-[20.375rem]">
            선택하기
          </Button>
        </BottomModalContent>
        <BottomModalFooter></BottomModalFooter>
      </BottomModal>
    </div>
  );
}
