import useResetCart from '../hooks/useResetCart';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';

interface ValidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorCode?: string | null;
}

export default function ValidateModal({ isOpen, onClose, errorCode }: ValidateModalProps) {
  const { mutate: resetCart } = useResetCart();

  const renderContent = () => {
    switch (errorCode) {
      case 'SHOP_CLOSED':
        return (
          <ModalContent>
            <div className="flex flex-col items-center leading-[160%] font-normal">
              <div>영업시간이 아니라서 주문할 수 없어요.</div>
              <div>담았던 메뉴는 삭제할까요?</div>
            </div>
            <div className="flex w-full gap-2">
              <Button
                size="lg"
                color="gray"
                className="border-neutral-400 font-medium shadow-none"
                fullWidth
                onClick={onClose}
              >
                아니오
              </Button>
              <Button
                size="lg"
                color="primary"
                className="font-medium shadow-none"
                fullWidth
                onClick={() => {
                  resetCart();
                  onClose();
                }}
              >
                네
              </Button>
            </div>
          </ModalContent>
        );

      case 'ORDER_AMOUNT_BELOW_MINIMUM':
        return (
          <>
            <ModalContent>
              <div className="text-center leading-[160%] font-normal">
                <div>최소 주문 금액을 충족하지 않아</div>
                <div>주문할 수 없어요.</div>
              </div>
              <Button size="lg" color="primary" className="w-full" onClick={onClose}>
                확인
              </Button>
            </ModalContent>
          </>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderContent()}
    </Modal>
  );
}
