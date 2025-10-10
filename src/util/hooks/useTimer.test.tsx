import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useTimer from '@/util/hooks/useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-10-06T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('초기 상태에서 seconds는 0이다', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.seconds).toBe(0);
  });

  it('start(duration) 호출 시 seconds가 설정되고 1초마다 감소한다', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start(10);
    });
    expect(result.current.seconds).toBe(10);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.seconds).toBe(9);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.seconds).toBe(7);

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(result.current.seconds).toBe(0);

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.seconds).toBe(0);
  });

  it('reset() 호출 시 seconds가 0으로 초기화되고 이후 시간 경과에도 변하지 않는다', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start(5);
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.seconds).toBe(3);

    act(() => {
      result.current.reset();
    });
    expect(result.current.seconds).toBe(0);

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.seconds).toBe(0);
  });

  it('start()가 동작 중 다시 호출되어도 중복 감소가 발생하지 않는다', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start(5);
    });
    act(() => {
      result.current.start(3);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.seconds).toBe(2);
  });

  it('언마운트 후 상태 업데이트 경고가 발생하지 않는다', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result, unmount } = renderHook(() => useTimer());
    act(() => {
      result.current.start(5);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
