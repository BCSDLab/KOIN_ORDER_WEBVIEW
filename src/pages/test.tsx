import { useTokenStore } from '@/stores/auth';
import { getCookie } from '@/util/ts/cookie';

export default function TestPage() {
  const { token, refreshToken, userType } = useTokenStore();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧪 WebView 브릿지 테스트 페이지</h1>

      <hr style={{ margin: '2rem 0' }} />

      <div></div>

      <div style={{ marginTop: '2rem' }}>
        <strong>쿠키 토큰:</strong>
        <div>Access Token: {getCookie('AUTH_TOKEN_KEY') ?? '(없음)'}</div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <strong>🗂 Zustand 기준 현재 토큰 상태:</strong>
        <div>Access Token: {token || '(없음)'}</div>
        <div>Refresh Token: {refreshToken || '(없음)'}</div>
        <div>User Type: {userType || '(없음)'}</div>
      </div>
    </div>
  );
}
