import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart'; // 실제 경로에 맞게 수정!
import { CartResponse } from '@/api/cart/entity';
import { UserType, useTokenStore } from '@/stores/auth';
import { isNative, requestTokensFromNative, setTokensFromNative } from '@/util/ts/bridge';
import { getCookie } from '@/util/ts/cookie';

// 👇 useCart 훅 (실제로는 별도 파일에서 import하는게 best)
function useCart(orderType: 'DELIVERY' | 'TAKE_OUT') {
  // orderType이 바뀌었을 때 바꿔주는 코드 샘플용 포함
  // 실제로 orderType 관리는 필요에 따라 커스텀
  // const { setOrderType } = useOrderStore();
  // (테스트 코드에선 setOrderType 부분은 빼도 무방)

  const { data } = useSuspenseQuery<CartResponse>({
    queryKey: ['cart', orderType],
    queryFn: async () => {
      // try-catch 및 setOrderType은 실사용에 맞게 필요시 추가
      return await getCart(orderType);
    },
  });
  return { data };
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  userType: UserType;
}

export default function TestPage() {
  // 타입 확정: string ("" 초기값이라면 string), UserType
  const { token, refreshToken, userType } = useTokenStore();
  const [fetchedTokens, setFetchedTokens] = useState<TokenPair | null>(null);

  // CartResponse | undefined
  const [cartResult, setCartResult] = useState<CartResponse | undefined>(undefined);
  const [cartError, setCartError] = useState<string | null>(null);

  // 쿼리 방식 테스트: orderType 스위칭 가능하게 state로 관리
  const [queryOrderType, setQueryOrderType] = useState<'DELIVERY' | 'TAKE_OUT'>('TAKE_OUT');
  let queryCartResult: CartResponse | undefined = undefined;
  let queryCartError: string | null = null;

  // suspenseQuery로 오류 캐치
  try {
    ({ data: queryCartResult } = useCart(queryOrderType));
  } catch (e: unknown) {
    queryCartError = e instanceof Error ? e.message : String(e);
  }

  // ✅ 브릿지에서 토큰 받아오기 (초기)
  useEffect(() => {
    const initializeTokens = async (): Promise<void> => {
      if (isNative()) {
        console.log('[TestPage] 브릿지를 통한 초기 토큰 요청 시작');
        const tokens = await requestTokensFromNative();
        console.log('[TestPage] 응답 받은 토큰:', tokens);
        setTokensFromNative(tokens.access, tokens.refresh, tokens.userType);
      } else {
        console.log('[TestPage] Native 환경 아님 (웹)');
      }
    };
    initializeTokens();
  }, []);

  // ✅ 브릿지에서 토큰 직접 요청
  const handleRequestFromNative = async (): Promise<void> => {
    const tokens = await requestTokensFromNative();
    setFetchedTokens({
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
      userType: tokens.userType,
    });

    alert(
      `✅ 브릿지로부터 토큰 직접 요청 결과\n\nAccess Token:\n${tokens.access}\n\nRefresh Token:\n${tokens.refresh}`,
    );
  };

  // ✅ getCart API 직접 호출
  const handleGetCart = async (): Promise<void> => {
    setCartError(null);
    setCartResult(undefined);
    try {
      const res = await getCart('TAKE_OUT'); // 'TAKE_OUT'으로 바꿔도 됨
      setCartResult(res);
      alert('장바구니 API 호출 성공! 콘솔도 확인');
      console.log('장바구니 API 결과', res);
    } catch (err: unknown) {
      setCartError((err as Error)?.message || String(err));
      alert('장바구니 API 호출 실패: ' + ((err as Error)?.message || String(err)));
      console.error('장바구니 API 에러', err);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧪 WebView 브릿지 테스트 페이지</h1>

      <button onClick={handleRequestFromNative} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
        브릿지로 토큰 직접 요청
      </button>

      <button onClick={handleGetCart} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
        🚚 getCart('TAKE_OUT') API (버튼 클릭)
      </button>

      {cartError && <div style={{ color: 'red', marginTop: '1rem' }}>❌ 직접 호출 에러: {cartError}</div>}

      {cartResult && (
        <div style={{ marginTop: '1rem', textAlign: 'left', maxWidth: 600, marginInline: 'auto' }}>
          <strong>🛒 getCart('TAKE_OUT') 직접 호출 결과:</strong>
          <pre>{JSON.stringify(cartResult, null, 2)}</pre>
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <div>
        <h3>
          🧩 <code>useCart</code> 훅 (react-query) 테스트
        </h3>
        <div>
          <button
            onClick={() => setQueryOrderType('DELIVERY')}
            style={{ margin: 4, background: queryOrderType === 'DELIVERY' ? '#cce' : undefined }}
          >
            DELIVERY
          </button>
          <button
            onClick={() => setQueryOrderType('TAKE_OUT')}
            style={{ margin: 4, background: queryOrderType === 'TAKE_OUT' ? '#cce' : undefined }}
          >
            TAKE_OUT
          </button>
        </div>
        {queryCartError && <div style={{ color: 'red', marginTop: '1rem' }}>❌ 쿼리 에러: {queryCartError}</div>}
        {queryCartResult && (
          <div style={{ marginTop: '1rem', textAlign: 'left', maxWidth: 600, marginInline: 'auto' }}>
            <strong>🛒 useCart("{queryOrderType}") 결과:</strong>
            <pre>{JSON.stringify(queryCartResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {fetchedTokens && (
        <div style={{ marginTop: '2rem' }}>
          <strong>📦 직접 받아온 토큰:</strong>
          <div>Access Token: {fetchedTokens.accessToken}</div>
          <div>Refresh Token: {fetchedTokens.refreshToken}</div>
          <div>User Type: {fetchedTokens.userType}</div>
        </div>
      )}

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
