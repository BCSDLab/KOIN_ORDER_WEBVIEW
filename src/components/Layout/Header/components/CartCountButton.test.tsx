import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EMPTY_CART, CART_WITH_ITEMS } from './cartMockData.mock';
import CartCountButton from '@/components/Layout/Header/components/CartCountButton';
import useCart from '@/pages/Payment/hooks/useCart';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@/stores/useOrderStore', () => ({
  useOrderStore: () => ({ orderType: 'DELIVERY' }),
}));

vi.mock('@/pages/Payment/hooks/useCart');

vi.mock('@/assets/OrderFinish/shopping-cart-icon.svg', () => ({
  default: () => <svg data-testid="cart-icon" />,
}));

describe('CartCountButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('렌더링이 올바르게 되어야 한다.', () => {
      vi.mocked(useCart).mockReturnValue({ data: CART_WITH_ITEMS });

      render(<CartCountButton />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    });
  });

  describe('조건부 렌더링', () => {
    it('장바구니가 비어있으면 배지가 표시되지 않아야한다.', () => {
      vi.mocked(useCart).mockReturnValue({ data: EMPTY_CART });

      render(<CartCountButton />);

      expect(screen.queryByText(/\d/)).not.toBeInTheDocument();
    });

    it('장바구니에 상품이 있다면 배지가 올바른 상품 수를 표시해야 한다.', () => {
      vi.mocked(useCart).mockReturnValue({ data: CART_WITH_ITEMS });

      render(<CartCountButton />);

      const expectedCount = CART_WITH_ITEMS.items.reduce((sum, item) => sum + item.quantity, 0);

      expect(screen.queryByText(expectedCount.toString())).toBeInTheDocument();
    });
  });

  describe('네비게이션', () => {
    it('버튼을 클릭하면 /cart 페이지로 이동해야 한다', () => {
      render(<CartCountButton />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
  });
});
