import { useState } from 'react';
import { useTokenStore } from '@/stores/auth';

export default function TestPage() {
  const { token, refreshToken } = useTokenStore();
  const [tokens, setTokens] = useState<{ accessToken: string; refreshToken: string } | null>(null);

  const handleGetTokens = () => {
    setTokens({ accessToken: token, refreshToken });
    alert(`Access Token: ${token || '(없음)'}\nRefresh Token: ${refreshToken || '(없음)'}`);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>test 페이지</h1>
      <button onClick={handleGetTokens}>토큰 출력</button>

      {tokens && (
        <div style={{ marginTop: '1rem' }}>
          <div>Access Token: {tokens.accessToken}</div>
          <div>Refresh Token: {tokens.refreshToken}</div>
        </div>
      )}
    </div>
  );
}
