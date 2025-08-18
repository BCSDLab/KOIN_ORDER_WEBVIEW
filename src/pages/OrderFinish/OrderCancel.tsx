import { useState } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import useCancelPayment from './hooks/useCancelPayment';
import CheckIcon from '@/assets/OrderFinish/check-icon.svg';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';
import { backButtonTapped } from '@/util/bridge/nativeAction';
import useBooleanState from '@/util/hooks/useBooleanState';

const orderCancelReasons: string[] = [
  '단순 변심이에요',
  '주소를 잘못 입력했어요',
  '결제를 잘못했어요',
  '메뉴를 다시 고르고 싶어요',
  '기타',
];

export default function OrderCancel() {
  const { paymentId } = useParams();

  if (!paymentId) {
    // 잘못된 경로로 접근 시 메인 화면으로 이동(임시 처리)
    backButtonTapped();
  }

  const [isCancelModalOpen, openCancelModal, closeCancelModal] = useBooleanState(false);
  const { mutate: cancelPayment } = useCancelPayment(Number(paymentId));

  const [selectedCancelReason, setSelectedCancelReason] = useState<string>('');
  const [customCancelReason, setCustomCancelReason] = useState<string>('');

  const isSubmitButtonDisabled =
    selectedCancelReason === '' || (selectedCancelReason === '기타' && customCancelReason.length <= 1);

  const handleReason = (reason: string) => {
    if (reason === selectedCancelReason) return setSelectedCancelReason('');

    setSelectedCancelReason(reason);
  };

  const handleCustomCancelReason = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCancelReason !== '기타') return;
    if (e.target.value === '' && customCancelReason.length === 0) return setCustomCancelReason('');
    setCustomCancelReason(e.target.value);
  };

  const handleClickMoveMainPage = () => {
    cancelPayment({ cancel_reason: selectedCancelReason === '기타' ? customCancelReason : selectedCancelReason });
  };

  const handleClickSubmitReason = () => {
    openCancelModal();
  };

  return (
    <div>
      <div className="mx-[6.15%] flex flex-col">
        <div className="mt-6 text-lg font-semibold">주문을 취소하시겠어요?</div>
        <div className="mt-2 text-sm text-[#8E8E8E]">주문 취소 사유를 선택해 주세요.</div>
        <div className="flex min-h-[calc(100dvh-7.75rem)] flex-col justify-between">
          <div className="mt-6 w-full">
            {orderCancelReasons.map((orderCancelReason, index) => (
              <label
                htmlFor={orderCancelReason}
                key={orderCancelReason}
                className={`flex flex-col ${index === 0 ? '' : 'border-t border-neutral-300 pt-4'} ${index === 4 ? '' : 'pb-4'}`}
              >
                <div className="flex flex-row items-center gap-4">
                  <div className="relative ml-2">
                    <input
                      name="reason"
                      type="checkbox"
                      className={`peer sr-only`}
                      id={orderCancelReason}
                      checked={selectedCancelReason === orderCancelReason}
                      onChange={() => handleReason(orderCancelReason)}
                    />
                    <div className="h-4 w-4 rounded-full border border-[#8E8E8E]"></div>
                    <div className="absolute inset-0 justify-center opacity-0 peer-checked:opacity-100">
                      <CheckIcon />
                    </div>
                  </div>
                  <div className="flex flex-grow items-center justify-between font-medium">
                    <div>{orderCancelReason}</div>
                    <div className="mr-5 text-xs text-[#8E8E8E]">
                      {orderCancelReason === '기타' ? `${customCancelReason.length}/150` : ''}
                    </div>
                  </div>
                </div>
                {orderCancelReason === '기타' && (
                  <input
                    value={customCancelReason}
                    className="mt-2 ml-2 h-[2.875rem] w-[calc(100%-1rem)] rounded-lg border border-neutral-300 bg-white px-4 py-3 placeholder-neutral-400 outline-none placeholder:text-sm placeholder:font-normal"
                    placeholder="취소 사유를 최소 2자 이상 입력해주세요."
                    onChange={handleCustomCancelReason}
                    maxLength={150}
                    onClick={() => setSelectedCancelReason('기타')}
                  />
                )}
              </label>
            ))}
          </div>
          <Button
            className={clsx(
              `mb-8 py-[11px] text-[15px] font-medium text-white`,
              isSubmitButtonDisabled && 'cursor-not-allowed border-neutral-300 bg-neutral-300',
            )}
            onClick={handleClickSubmitReason}
            disabled={isSubmitButtonDisabled}
          >
            취소하기
          </Button>
        </div>
      </div>
      <Modal className="centerModal" isOpen={isCancelModalOpen} onClose={closeCancelModal}>
        <ModalContent>
          <div>주문 취소를 그만두시겠어요?</div>
          <div className="flex gap-2 text-[15px]">
            <Button
              onClick={closeCancelModal}
              className="border border-neutral-400 bg-white py-3 font-medium text-neutral-600"
            >
              그만하기
            </Button>
            <Button onClick={handleClickMoveMainPage} className="py-3 font-medium">
              계속하기
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
