import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { validateCart } from '@/api/cart';

interface ApiError extends Error {
  status?: number;
  statusText?: string;
  url?: string;
  message: string;
}

interface CartValidationErrorResponse {
  code: string;
  message: string;
  errorTraceId?: string;
}

export default function useValidateCart({ orderType }: { orderType: 'DELIVERY' | 'TAKE_OUT' }) {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => validateCart(orderType),
    onSuccess: () => {
      setErrorCode(null);
      navigate(`/payment?orderType=${orderType}`);
    },

    onError: async (error: unknown) => {
      if (error instanceof Error) {
        const e = error as ApiError;
        let parsed: CartValidationErrorResponse | null = null;

        try {
          parsed = JSON.parse(e.message);
        } catch {}

        const code = parsed?.code || null;

        setErrorCode(code);
      }
    },
  });

  return {
    ...mutation,
    errorCode,
  };
}
