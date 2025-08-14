import { useEffect } from 'react';
import { loadTossPayments, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';

// 테스트 키
const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'RIjiDf_DbIaGaFMTcj3_v';

type Amount = {
  currency: string;
  value: number;
};

export default function TossWidget({
  widgets,
  setWidgets,
  setReady,
  amount,
  setAgreement,
}: {
  widgets: TossPaymentsWidgets | null;
  setWidgets: React.Dispatch<React.SetStateAction<TossPaymentsWidgets | null>>;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  amount: Amount;
  setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------ 결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({ customerKey });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }
    void fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function renderPaymentWidgets() {
      if (widgets == null) return;
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      const [paymentWidget, agreementWidget] = await Promise.all([
        // ------ 결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------ 이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      const handler = (status: { agreedRequiredTerms: boolean }) => {
        setAgreement(status.agreedRequiredTerms);
      };
      agreementWidget.on?.('agreementStatusChange', handler);

      cleanup = () => {
        paymentWidget.destroy?.();
        agreementWidget.destroy?.();
      };

      setReady(true);
    }

    void renderPaymentWidgets();

    return () => {
      cleanup?.();
    };
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) return;
    void widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full">
        {/* 결제 UI */}
        <div id="payment-method" className="w-full" />
        {/* 이용약관 UI */}
        <div id="agreement" className="w-full" />
      </div>
    </div>
  );
}
