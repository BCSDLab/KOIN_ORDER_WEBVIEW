//해당 페이지는 개발 편의를 위해 구현된 페이지입니다. 추후 프로덕션 배포 시 정리 혹은 논의 후 배포하여 주세요.

import LoginForm from './components/LoginForm';
import Button from '@/components/UI/Button';
import { deleteCookie, getCookie } from '@/util/ts/cookie';

export default function Login() {
  const isLogin = getCookie('AUTH_TOKEN_KEY');

  const handleLogoutButton = () => {
    deleteCookie('AUTH_TOKEN_KEY');
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {isLogin ? (
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl border border-neutral-300 bg-white p-6">
          <div className="text-neutral-600">이미 로그인되어 있습니다.</div>
          <Button
            onClick={handleLogoutButton}
            fullWidth
            className="border-0 bg-neutral-600 text-white hover:bg-neutral-400"
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
