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

  it('초기 상태 seconds=0인지 확인', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.seconds).toBe(0);
  });

  it('start(duration) 호출 시 즉시 seconds가 설정되고 1초마다 감소', () => {
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

  it('reset()은 seconds를 0으로 만들고 타이머를 정리한다', () => {
    const clearSpy = vi.spyOn(global, 'clearInterval');

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
    expect(clearSpy).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.seconds).toBe(0);
  });

  it('이미 동작 중일 때 start()를 다시 호출해도 setInterval은 1회만 등록', () => {
    const setSpy = vi.spyOn(global, 'setInterval');

    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start(5);
    });
    act(() => {
      result.current.start(3);
    });

    expect(setSpy).toHaveBeenCalledTimes(1);
    expect(result.current.seconds).toBe(3);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.seconds).toBe(2);
  });

  it('언마운트 시 interval 정리', () => {
    const clearSpy = vi.spyOn(global, 'clearInterval');

    const { result, unmount } = renderHook(() => useTimer());
    act(() => {
      result.current.start(5);
    });

    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
