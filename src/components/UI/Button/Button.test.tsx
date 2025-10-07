import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './index';

describe('Button', () => {
  it('children이 올바르게 렌더링되어야 한다', () => {
    render(<Button>확인</Button>);
    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  describe('color prop', () => {
    it('primary 색상 클래스가 적용되어야 한다', () => {
      render(<Button color="primary">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-primary-500');
    });

    it('neutral 색상 클래스가 적용되어야 한다', () => {
      render(<Button color="neutral">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-neutral-200');
    });

    it('gray 색상 클래스가 적용되어야 한다', () => {
      render(<Button color="gray">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-neutral-500');
    });
  });

  describe('size prop', () => {
    it('sm 크기 클래스가 적용되어야 한다', () => {
      render(<Button size="sm">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-sm');
    });

    it('md 크기 클래스가 적용되어야 한다', () => {
      render(<Button size="md">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('py-1.5');
    });

    it('lg 크기 클래스가 적용되어야 한다', () => {
      render(<Button size="lg">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('p-3');
    });
  });

  describe('state prop', () => {
    it('"disabled"일 경우 버튼이 비활성화되어야 한다', () => {
      render(<Button state="disabled">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button.className).toContain('cursor-not-allowed');
    });

    it('"default"일 경우 버튼이 활성화되어야 한다', () => {
      render(<Button state="default">버튼</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
      expect(button.className).not.toContain('cursor-not-allowed');
    });
  });

  it('fullWidth prop이 true이면 w-full 클래스가 적용되어야 한다', () => {
    render(<Button fullWidth>버튼</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('w-full');
  });

  it('startIcon prop이 전달되면 아이콘이 함께 렌더링되어야 한다', () => {
    const startIcon = <svg data-testid="start-icon" />;
    render(<Button startIcon={startIcon}>버튼</Button>);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('endIcon prop이 전달되면 아이콘이 함께 렌더링되어야 한다', () => {
    const endIcon = <svg data-testid="end-icon" />;
    render(<Button endIcon={endIcon}>버튼</Button>);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('onClick prop이 전달되면 클릭 시 해당 핸들러가 호출되어야 한다', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>버튼</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
