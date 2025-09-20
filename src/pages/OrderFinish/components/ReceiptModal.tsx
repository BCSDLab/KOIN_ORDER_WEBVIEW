import { ConfirmPaymentsResponse } from '@/api/payments/entity';
import CloseIcon from '@/assets/Main/close-icon.svg';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentInfo: ConfirmPaymentsResponse;
}

const formatKRW = (number: number) => `${number.toLocaleString()}원`;

export default function ReceiptModal({ isOpen, onClose, paymentInfo }: ReceiptModalProps) {
  const menusSubtotal = paymentInfo.menus.reduce((sum, menu) => {
    const optionSumPerItem = (menu.options ?? []).reduce((sum, options) => sum + (options.option_price ?? 0), 0);
    return sum + (menu.price + optionSumPerItem) * menu.quantity;
  }, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="px-4 py-6 text-center text-sm text-black">
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex items-center justify-center">
            <div className="font-semibold">영수증</div>
            <button onClick={onClose} className="absolute right-0" aria-label="닫기">
              <CloseIcon />
            </button>
          </div>

          <div className="h-[1px] border-b border-neutral-200" />

          <div>
            <div className="font-semibold">{paymentInfo.shop_name}</div>
            <div className="text-xs text-neutral-600">
              <div>주문번호 :{paymentInfo.id}</div>
              <div>주문일시 : {paymentInfo.requested_at.split(' ')[0]}</div>
            </div>
          </div>
          <div className="h-[1px] border-b border-neutral-200" />
          <div className="space-y-3.5">
            {paymentInfo.menus.flatMap((menu, menuIndex) => {
              const optionSum = (menu.options ?? []).reduce((sum, option) => sum + (option.option_price ?? 0), 0);
              const unitTotal = menu.price + optionSum;

              return Array.from({ length: menu.quantity }).map((_, quantityIndex) => (
                <div key={`${menuIndex}-${quantityIndex}`} className="flex justify-between">
                  <div className="font-semibold">{menu.name}</div>
                  <div>{formatKRW(unitTotal)}</div>
                </div>
              ));
            })}
          </div>
          <div className="h-[1px] border-b border-neutral-200" />
          <div>
            <div className="flex justify-between">
              <div className="font-semibold">주문 금액</div>
              <div>{formatKRW(menusSubtotal)}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">배달비</div>
              <div>{formatKRW(paymentInfo.amount - menusSubtotal)}</div>
            </div>
          </div>
          <div className="h-[1px] border-b border-neutral-200" />
          <div className="flex justify-between">
            <div className="font-semibold">결제 정보(카드사)</div>
            <div>{paymentInfo.easy_pay_company}</div>
          </div>
          <div className="h-[1px] border-b border-neutral-200" />
          <div>
            <div className="flex justify-between">
              <div className="font-semibold">총 결제 금액</div>
              <div>{formatKRW(paymentInfo.amount)}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">결제 수단</div>
              <div>{paymentInfo.easy_pay_company}</div>
            </div>
          </div>
          {paymentInfo.order_type === 'DELIVERY' && (
            <>
              <div className="h-[1px] border-b border-neutral-200" />
              <div className="space-y-2 text-left">
                <div className="font-semibold">배달 주소</div>
                <div className="text-sm break-words text-black">
                  {paymentInfo.delivery_address} {paymentInfo.delivery_address_details}
                </div>
              </div>
            </>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
}
