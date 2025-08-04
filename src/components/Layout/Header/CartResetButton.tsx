import clsx from 'clsx';
import ResetModal from '@/pages/Cart/components/ResetModal';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function CartResetButton() {
  const { orderType } = useOrderStore();
  const [isResetModalOpen, openResetModal, closeResetModal] = useBooleanState(false);
  const { data: cartInfo } = useCart(orderType);

  const isDisabled = cartInfo?.items.length === 0;
  return (
    <>
      <button
        type="button"
        onClick={openResetModal}
        disabled={isDisabled}
        className={clsx(
          'absolute top-1/2 right-6 -translate-y-1/2 text-sm font-semibold',
          isDisabled ? 'text-primary-300' : 'text-primary-500',
        )}
      >
        전체삭제
      </button>
      <ResetModal isOpen={isResetModalOpen} onClose={closeResetModal} />
    </>
  );
}
