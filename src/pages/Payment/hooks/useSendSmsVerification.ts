import { useMutation } from '@tanstack/react-query';
import { sendSmsVerificationCode, verifySmsCode } from '@/api/auth';

export default function useSmsVerification() {
  const sendSms = useMutation({
    mutationKey: ['sendSmsVerification'],
    mutationFn: (phone: string) => sendSmsVerificationCode(phone),
  });

  const verifySms = useMutation({
    mutationKey: ['verifySmsCode'],
    mutationFn: ({ phone, code }: { phone: string; code: string }) => verifySmsCode(phone, code),
  });

  return { sendSms, verifySms };
}
