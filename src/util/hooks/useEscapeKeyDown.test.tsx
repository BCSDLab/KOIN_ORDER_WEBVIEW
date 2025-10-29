import { renderHook, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useEscapeKeyDown from '@/util/hooks/useEscapeKeyDown';

describe('useEscapeKeyDown', () => {
  it('Escape 키를 누르면 handler가 호출된다', () => {
    const handler = vi.fn();
    renderHook(() => useEscapeKeyDown(handler));

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'Escape',
      }),
    );
  });

  it('Escape가 아닌 다른 키를 누르면 handler가 호출되지 않는다', () => {
    const handler = vi.fn();
    renderHook(() => useEscapeKeyDown(handler));

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });

    expect(handler).not.toHaveBeenCalled();
  });

  it('unmount 시 이벤트 리스너가 제거된다', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useEscapeKeyDown(handler));

    unmount();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(handler).not.toHaveBeenCalled();
  });
});
