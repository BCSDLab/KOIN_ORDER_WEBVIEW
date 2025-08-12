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
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }
    void fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    let unbind: (() => void) | undefined;

    async function renderPaymentWidgets() {
      if (widgets == null) return;

      await widgets.setAmount(amount);

      const [, agreementWidget] = await Promise.all([
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      const anyAgreement = agreementWidget as unknown as {
        on?: (event: 'agreementStatusChange', callback: (s: { agreedRequiredTerms: boolean }) => void) => void;
        off?: (event: 'agreementStatusChange', callback: (s: { agreedRequiredTerms: boolean }) => void) => void;
      };

      const handler = (status: { agreedRequiredTerms: boolean }) => {
        setAgreement(!!status.agreedRequiredTerms);
      };
      anyAgreement.on?.('agreementStatusChange', handler);

      unbind = () => anyAgreement.off?.('agreementStatusChange', handler);

      setReady(true);
    }

    void renderPaymentWidgets();

    return () => {
      unbind?.();
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
