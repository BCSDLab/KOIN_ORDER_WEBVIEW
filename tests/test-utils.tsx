import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }, // 테스트 속도/안정성 향상된다고 함
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

export * from '@testing-library/react';
export function render(ui: ReactElement, options?: Parameters<typeof rtlRender>[1]) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}
