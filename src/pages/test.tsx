import { useEffect, useState } from 'react';
import { useTokenStore } from '@/stores/auth';
import { isNative, requestTokensFromNative, setTokensFromNative } from '@/util/ts/bridge';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export default function TestPage() {
  const { token, refreshToken } = useTokenStore();
  const [fetchedTokens, setFetchedTokens] = useState<TokenPair | null>(null);

  // ✅ 초기 진입 시 브릿지에서 토큰 요청 후 상태 반영
  useEffect(() => {
    const initializeTokens = async () => {
      if (isNative()) {
        console.log('[TestPage] 브릿지를 통한 초기 토큰 요청 시작');
        const tokens = await requestTokensFromNative();
        console.log('[TestPage] 응답 받은 토큰:', tokens);
        setTokensFromNative(tokens.access, tokens.refresh);
      } else {
        console.log('[TestPage] Native 환경 아님 (웹)');
      }
    };

    initializeTokens();
  }, []);

  // ✅ 버튼 클릭 → 브릿지에서 직접 요청 후 결과 표시
  const handleRequestFromNative = async () => {
    const tokens = await requestTokensFromNative();
    setFetchedTokens({
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
    });

    alert(
      `✅ 브릿지로부터 토큰 직접 요청 결과\n\nAccess Token:\n${tokens.access}\n\nRefresh Token:\n${tokens.refresh}`,
    );
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧪 WebView 브릿지 테스트 페이지</h1>

      <button onClick={handleRequestFromNative} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
        브릿지로 토큰 직접 요청
      </button>

      {fetchedTokens && (
        <div style={{ marginTop: '2rem' }}>
          <strong>📦 직접 받아온 토큰:</strong>
          <div>Access Token: {fetchedTokens.accessToken}</div>
          <div>Refresh Token: {fetchedTokens.refreshToken}</div>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <strong>🗂 Zustand 기준 현재 토큰 상태:</strong>
        <div>Access Token: {token || '(없음)'}</div>
        <div>Refresh Token: {refreshToken || '(없음)'}</div>
      </div>
    </div>
  );
}
