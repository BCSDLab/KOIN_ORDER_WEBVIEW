// src/features/auth/hooks/useLoginMutation.ts
import { sha256 } from '@bcsdlab/utils';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Login } from '@/api/auth';
import { LoginRequest } from '@/api/auth/entity';
import { useToast } from '@/util/hooks/useToast';
import { setCookie } from '@/util/ts/cookie';

const useLogin = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ login_id, login_pw }: LoginRequest) => {
      const hashedPassword = await sha256(login_pw);
      return Login(login_id, hashedPassword);
    },
    onSuccess: (response) => {
      setCookie('AUTH_TOKEN_KEY', response.token);
      navigate('/shop/true/1'); //메인화면 구현 시 변경
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      showToast('로그인을 실패했습니다.');
    },
  });
};

export default useLogin;
