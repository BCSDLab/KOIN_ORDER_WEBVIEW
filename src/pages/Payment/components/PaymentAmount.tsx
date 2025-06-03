export default function PaymentAmount() {
  // 샘플 데이터. 추후 api 연결 후 변경 예정
  const expectedAmount = 32500;
  const deliveryAmount = 3000;
  const menuAmount = 29500;
  const totalAmount = deliveryAmount + menuAmount;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex justify-between text-[16px] font-semibold">
        <div>결제예정금액</div>
        <div>{expectedAmount.toLocaleString()}원</div>
      </div>
      <div className="mt-3 border-t-1 border-neutral-300 pt-3">
        <div className="flex justify-between pb-2 text-[15px] font-semibold">
          <div>총 금액</div>
          <div>{totalAmount.toLocaleString()}원</div>
        </div>
        <div className="flex justify-between text-[13px] text-neutral-500">
          <div>메뉴 금액</div>
          <div>{menuAmount.toLocaleString()}원</div>
        </div>
        <div className="flex justify-between text-[13px] text-neutral-500">
          <div>배달 금액</div>
          <div>{deliveryAmount.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
}
