import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useBooleanState from '@/util/hooks/useBooleanState';

describe('useBooleanState', () => {
  describe('초기 값이 true일 때 ', () => {
    it('value는 초기 값과 같다', () => {
      const { result } = renderHook(() => useBooleanState(true));

      expect(result.current[0]).toBe(true);
    });
    it('setTrue는 값을 true로 만든다', () => {
      const { result } = renderHook(() => useBooleanState(true));

      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toBe(true);
    });
    it('setFalse는 값을 false로 만든다.', () => {
      const { result } = renderHook(() => useBooleanState(true));

      act(() => {
        result.current[2]();
      });

      expect(result.current[0]).toBe(false);
    });
    it('toggle은 초기값을 반전시다', () => {
      const { result } = renderHook(() => useBooleanState(true));

      act(() => {
        result.current[3]();
      });

      expect(result.current[0]).toBe(false);
    });
  });
  describe('초기값이 false일 때', () => {
    it('value는 초기값을 가진다', () => {
      const { result } = renderHook(() => useBooleanState(false));

      expect(result.current[0]).toBe(false);
    });
    it('setTrue는 value를 true로 만든다', () => {
      const { result } = renderHook(() => useBooleanState(false));

      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toBe(true);
    });
    it('setFalse는 value를 false로 만든다.', () => {
      const { result } = renderHook(() => useBooleanState(false));

      act(() => {
        result.current[2]();
      });

      expect(result.current[0]).toBe(false);
    });
    it('toggle은 초기값을 반전시킨다', () => {
      const { result } = renderHook(() => useBooleanState(false));

      act(() => {
        result.current[3]();
      });

      expect(result.current[0]).toBe(true);
    });
  });
});
