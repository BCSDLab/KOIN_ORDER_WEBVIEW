import { fireEvent, render, screen } from '@testing-library/react';
import { describe, vi, expect, beforeEach, it } from 'vitest';
import { EMPTY_CART, CART_WITH_ITEMS } from './cartMockData.mock';
import CartResetButton from '@/components/Layout/Header/components/CartResetButton';
import useCart from '@/pages/Payment/hooks/useCart';

vi.mock('@/stores/useOrderStore', () => ({
  useOrderStore: () => ({ orderType: 'DELIVERY' }),
}));

vi.mock('@/pages/Payment/hooks/useCart');

describe('CartResetButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('버튼이 잘 렌더링되어야 한다', () => {
      vi.mocked(useCart).mockReturnValue({ data: EMPTY_CART });

      render(<CartResetButton />);

      const button = screen.getByRole('button', { name: '전체삭제' });

      expect(button).toBeInTheDocument();
    });
  });
  describe('버튼 조건부 활성화', () => {
    it('카트의 상품 개수가 0이면 버튼이 비활성화된다.', () => {
      vi.mocked(useCart).mockReturnValue({ data: EMPTY_CART });

      render(<CartResetButton />);

      const button = screen.getByRole('button', { name: '전체삭제' });

      expect(button).toBeDisabled();
    });
    it('카트에 상품이 있다면 버튼을 활성화된다.', () => {
      vi.mocked(useCart).mockReturnValue({ data: CART_WITH_ITEMS });

      render(<CartResetButton />);

      const button = screen.getByRole('button', { name: '전체삭제' });

      expect(button).toBeEnabled();
    });
  });
  describe('버튼 클릭', () => {
    it('버튼 클릭 시 modal이 뜬다', () => {
      vi.mocked(useCart).mockReturnValue({ data: CART_WITH_ITEMS });

      render(<CartResetButton />);

      const button = screen.getByRole('button', { name: '전체삭제' });
      fireEvent.click(button);

      expect(screen.getByText('정말로 담았던 메뉴들을')).toBeInTheDocument();
      expect(screen.getByText('전체 삭제하시겠어요?')).toBeInTheDocument();
    });
  });
});
