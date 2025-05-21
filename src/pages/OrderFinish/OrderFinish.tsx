import { useState } from 'react';
import CloseIcon from '@/assets/Main/close-icon.svg';
import CallIcon from '@/assets/OrderFinish/call-icon.svg';
import Motorcycle from '@/assets/OrderFinish/motorcycle-icon.svg';
import Receipt from '@/assets/OrderFinish/receipt-icon.svg';
import ShoppingCart from '@/assets/OrderFinish/shopping-cart-icon.svg';
import Skillet from '@/assets/OrderFinish/skillet-icon.svg';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/Modal';
import BottomModal, {
  BottomModalHeader,
  BottomModalContent,
  BottomModalFooter,
} from '@/components/UI/Modal/BottomModal';

export default function OrderFinish() {
  type OrderKind = 'order' | 'preparation' | 'delivery';

  const [orderKind, setOrderKind] = useState<OrderKind>('order');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBottomModalOpen, setIsBottomModalOpen] = useState<boolean>(false);
  const [isCallBottomModalOpen, setIsCallBottomModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenBottomModal = () => setIsBottomModalOpen(true);
  const handleCloseBottomModal = () => setIsBottomModalOpen(false);

  const handleOpenCallBottomModal = () => {
    setIsBottomModalOpen(false);
    setIsCallBottomModalOpen(true);
  };
  const handleCloseCallBottomModal = () => setIsCallBottomModalOpen(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between px-6 py-4">
        <div className="text-primary-500 flex h-[3.188rem] flex-col justify-center text-xl leading-[160%] font-bold">
          주문 확인중
          <div className="text-xs leading-[160%] font-normal text-neutral-500">사장님이 주문을 확인하고 있어요!</div>
        </div>
        <Button
          onClick={handleOpenBottomModal}
          className="h-[1.938rem] w-[4.125rem] self-end rounded-3xl px-3 text-xs leading-[160%]"
        >
          취소하기
        </Button>
      </div>
      <div>
        <div className="flex flex-row justify-between px-6 pt-[16px] pb-[6px]">
          <div className="isTextPurple">주문확인</div>
          <div className={orderKind === 'order' ? 'isTextGray' : 'isTextPurple'}>준비중</div>
          <div className={orderKind !== 'delivery' ? 'isTextGray' : 'isTextPurple'}>배달완료</div>
        </div>
        <div className="flex flex-row px-8">
          <div className="isIconPurple">
            <ShoppingCart />
          </div>
          <div className="bg-primary-300 h-[5px] w-5 self-center"></div>
          <div
            className={`h-[5px] w-19 self-center ${orderKind === 'order' ? 'bg-neutral-400' : 'bg-primary-300'}`}
          ></div>
          <div className={orderKind === 'order' ? 'isIconGray' : 'isIconPurple'}>
            <Skillet />
          </div>
          <div
            className={`h-[5px] w-5 self-center ${orderKind === 'order' ? 'bg-neutral-400' : 'bg-primary-300'}`}
          ></div>
          <div
            className={`h-[5px] w-19 self-center ${orderKind !== 'delivery' ? 'bg-neutral-400' : 'bg-primary-300'}`}
          ></div>
          <div className={orderKind !== 'delivery' ? 'isIconGray' : 'isIconPurple'}>
            <Motorcycle />
          </div>
        </div>
      </div>
      <div className="mt-10 px-6">
        <div className="text-primary-500 mb-5 text-lg font-semibold">배달정보</div>
        <div className="shadow-1 flex flex-col gap-3 rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-sm leading-[160%] font-semibold text-black">
          <div>
            배달주소
            <div className="border-b border-neutral-200 pb-3 font-normal text-neutral-500">
              충청남도 천안시 동남구 병천면 충절로 1600 은솔관 422호
            </div>
          </div>
          <div>
            사장님에게
            <div className="border-b border-neutral-200 pb-3 font-normal text-neutral-500">리뷰 이벤트 감사합니다</div>
          </div>
          <div>
            배달기사님에게<div className="font-normal text-neutral-500">문앞에 놔주세요</div>
          </div>
        </div>
        <div className="text-primary-500 my-5 text-lg font-semibold">주문정보</div>
        <div className="shadow-1 flex flex-col gap-3 rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-sm leading-[160%] font-semibold text-black">
          <div className="flex flex-row border-b border-neutral-200 pt-1 pb-4 pl-1">
            맛있는 족발 - 병천점 <ArrowGo />
          </div>
          <div className="border-b border-neutral-200 pb-3 text-[13px] font-normal text-neutral-500">
            메뉴 족발 막국수 저녁 set
          </div>
          <div className="flex flex-row justify-between pb-2">
            총 결제 금액 <div>32,500원</div>
          </div>
          <Button className="h-[2.75rem] w-[14.75rem] gap-3 self-center">
            <Receipt />
            상세내역 보기
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <div>정말 주문을 취소하시겠어요?</div>
          <div className="flex h-12 flex-row gap-2 text-[15px]">
            <Button
              onClick={handleCloseModal}
              className="w-[7.125rem] border border-neutral-400 bg-white leading-[160%] font-medium text-neutral-600"
            >
              아니오
            </Button>
            <Button onClick={handleCloseModal} className="w-[7.125rem] font-medium">
              예
            </Button>
          </div>
        </ModalContent>
      </Modal>
      <div>
        <BottomModal isOpen={isBottomModalOpen} onClose={handleCloseBottomModal}>
          <BottomModalHeader>
            <div className="text-primary-500 font-semibold"> 배달이 완료 되었나요?</div>
            <button onClick={handleCloseBottomModal}>
              <CloseIcon />
            </button>
          </BottomModalHeader>
          <BottomModalContent>
            <div className="text-neutral-600">음식을 수령하셨다면 완료를 눌러주세요</div>
            <Button onClick={handleCloseBottomModal} className="h-[3.063rem] rounded-xl text-lg">
              완료
            </Button>
            <Button
              onClick={handleOpenCallBottomModal}
              className="h-[3.063rem] rounded-xl border border-neutral-400 bg-white text-lg text-black text-neutral-600"
            >
              아직 못받았어요
            </Button>
          </BottomModalContent>
          <BottomModalFooter></BottomModalFooter>
        </BottomModal>

        <BottomModal isOpen={isCallBottomModalOpen} onClose={handleCloseCallBottomModal}>
          <BottomModalHeader>
            아직 못받으셨나요?
            <button onClick={handleCloseCallBottomModal}>
              <CloseIcon />
            </button>
          </BottomModalHeader>
          <BottomModalContent>
            <div>빠른 해결을 위해 매장에 전화해 보시겠어요?</div>
            <Button className="h-[3.063rem] gap-3 rounded-xl text-lg">
              <CallIcon />
              전화하기
            </Button>
          </BottomModalContent>
          <BottomModalFooter></BottomModalFooter>
        </BottomModal>
      </div>
    </div>
  );
}
