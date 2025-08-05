import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Shop from '.';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 text-red-600">
      <h1 className="font-bold">⚠️ 페이지 로딩 중 오류가 발생했어요.</h1>
      <p>{error.message}</p>
      <pre className="whitespace-pre-wrap">{error.stack}</pre>
    </div>
  );
}

export default function ShopRouteWrapper() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div className="p-4">로딩 중...</div>}>
        <Shop />
      </Suspense>
    </ErrorBoundary>
  );
}
