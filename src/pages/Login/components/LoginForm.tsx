import { useState, FormEvent } from 'react';
import useLogin from '../hooks/useLogin';
import Button from '@/components/UI/Button';

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ login_id: loginId, login_pw: loginPw });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-neutral-300 bg-white p-6 shadow"
    >
      <div className="text-center text-xl font-semibold">임시 로그인 페이지</div>
      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        className="w-full rounded-lg border border-neutral-400 px-3 py-2 text-sm text-neutral-600 placeholder-neutral-400"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={loginPw}
        onChange={(e) => setLoginPw(e.target.value)}
        className="w-full rounded-lg border border-neutral-400 px-3 py-2 text-sm text-neutral-600 placeholder-neutral-400"
      />

      <Button fullWidth disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
