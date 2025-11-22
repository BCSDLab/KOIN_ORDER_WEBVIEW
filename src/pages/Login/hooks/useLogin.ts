// src/features/auth/hooks/useLoginMutation.ts
import { sha256 } from '@bcsdlab/utils';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import type { LoginRequest } from '@/api/auth/entity';
import { Login } from '@/api/auth';
import { useToast } from '@/util/hooks/useToast';
import { setCookie } from '@/util/ts/cookie';

const useLogin = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect');

  return useMutation({
    mutationFn: async ({ login_id, login_pw }: LoginRequest) => {
      const hashedPassword = await sha256(login_pw);
      return Login(login_id, hashedPassword);
    },
    onSuccess: (response) => {
      setCookie('AUTH_TOKEN_KEY', response.token);

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else {
        // navigate('/home'); // 메인화면으로 이동
        navigate('/shops', { replace: true }); // 주변 상점 배포를 위해 임시 변경
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      showToast('로그인을 실패했습니다.');
    },
  });
};

export default useLogin;
