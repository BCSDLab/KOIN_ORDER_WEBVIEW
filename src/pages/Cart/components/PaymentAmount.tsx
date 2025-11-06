interface PaymentAmountProps {
  orderType?: 'DELIVERY' | 'TAKE_OUT';
  total_amount: number;
  item_total_amount: number;
  delivery_fee: number;
  final_payment_amount: number;
}

export default function PaymentAmount({
  orderType,
  total_amount,
  item_total_amount,
  delivery_fee,
  final_payment_amount,
}: PaymentAmountProps) {
  return (
    <div>
      <div className="mb-3 text-lg leading-[160%] font-semibold">결제금액을 확인해주세요</div>
      <div className="shadow-1 rounded-lg bg-white p-6">
        <div className="mb-3 border-b border-neutral-300 pb-3">
          <div className="flex justify-between text-[15px] leading-[160%] font-semibold">
            <div>총 금액</div>
            <div>{total_amount.toLocaleString()}원</div>
          </div>
          <div className="text-[13px] leading-[160%] text-neutral-500">
            <div className="flex justify-between">
              <div>메뉴 금액</div>
              <div>{item_total_amount.toLocaleString()}원</div>
            </div>
            {orderType === 'DELIVERY' && (
              <div className="flex justify-between">
                <div>배달 금액</div>
                <div>{delivery_fee.toLocaleString()}원</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between leading-[160%] font-semibold">
          <div>결제예정금액</div>
          <div>{final_payment_amount.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
}
