import { useEffect, useState } from 'react';

export default function Test() {
  const [cookies, setCookies] = useState<string>('');

  useEffect(() => {
    // document.cookie는 "key=value; key2=value2" 형태의 문자열 반환
    setCookies(document.cookie);
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <h1>🍪 현재 쿠키 값</h1>
      <pre>{cookies || '쿠키 없음'}</pre>
    </div>
  );
}
