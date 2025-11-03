import { describe, it, expect, vi, type Mock } from 'vitest';
import BottomModal, { BottomModalHeader, BottomModalContent, BottomModalFooter } from './BottomModal/BottomModal';
import Modal, { ModalHeader, ModalContent, ModalFooter } from './CenterModal/Modal';
import { render, screen } from '@/../tests/test-utils';
import useScrollLock from '@/util/hooks/useScrollLock';
import useTouchOutside from '@/util/hooks/useTouchOutside';

vi.mock('@/util/hooks/useScrollLock', () => ({
  default: vi.fn(),
}));
vi.mock('@/util/hooks/useTouchOutside', () => ({
  default: vi.fn(),
}));
vi.mock('@/util/hooks/useHandleOutside', () => ({
  default: vi.fn(),
}));
vi.mock('@/components/Portal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// =====================================================
// CENTER MODAL
// =====================================================
describe('CenterModal', () => {
  it('isOpen=false일 때 렌더링되지 않아야 한다', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        내용
      </Modal>,
    );
    expect(screen.queryByText('내용')).not.toBeInTheDocument();
  });

  it('isOpen=true일 때 children이 렌더링되어야 한다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        내용
      </Modal>,
    );
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('className이 전달되면 병합되어야 한다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        내용
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('custom-modal');
  });

  it('useTouchOutside에 ref와 handler가 전달되고, handler 실행 시 onClose가 호출된다', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        내용
      </Modal>,
    );

    const calls = (useTouchOutside as unknown as Mock).mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    const [ref, handler] = calls[calls.length - 1] as [React.RefObject<HTMLElement>, (e: Event) => void];
    expect(ref && typeof handler).toBeTruthy();
    expect(typeof handler).toBe('function');

    const dialog = screen.getByRole('dialog');
    expect(ref?.current).toBe(dialog);

    handler(new Event('test'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('useScrollLock 훅이 isOpen 값으로 호출되어야 한다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        내용
      </Modal>,
    );
    expect(useScrollLock).toHaveBeenCalledWith(true);
  });
});

// =====================================================
// BOTTOM MODAL
// =====================================================
describe('BottomModal', () => {
  it('isOpen=false일 때 렌더링되지 않아야 한다', () => {
    render(
      <BottomModal isOpen={false} onClose={() => {}}>
        내용
      </BottomModal>,
    );
    expect(screen.queryByText('내용')).not.toBeInTheDocument();
  });

  it('isOpen=true일 때 children이 렌더링되어야 한다', () => {
    render(
      <BottomModal isOpen={true} onClose={() => {}}>
        내용
      </BottomModal>,
    );
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('className이 전달되면 병합되어야 한다', () => {
    render(
      <BottomModal isOpen={true} onClose={() => {}} className="custom-bottom">
        내용
      </BottomModal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('custom-bottom');
  });

  it('useHandleOutside에 ref와 handler가 전달되고, handler 실행 시 onClose가 호출된다', () => {
    const onClose = vi.fn();
    render(
      <BottomModal isOpen={true} onClose={onClose}>
        내용
      </BottomModal>,
    );

    const calls = (useTouchOutside as unknown as Mock).mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    const [ref, handler] = calls[calls.length - 1] as [React.RefObject<HTMLElement>, (e: Event) => void];
    expect(ref && typeof handler).toBeTruthy();
    expect(typeof handler).toBe('function');

    const dialog = screen.getByRole('dialog');
    expect(ref?.current).toBe(dialog);

    handler(new Event('test'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('useScrollLock 훅이 isOpen 값으로 호출되어야 한다', () => {
    render(
      <BottomModal isOpen={true} onClose={() => {}}>
        내용
      </BottomModal>,
    );
    expect(useScrollLock).toHaveBeenCalledWith(true);
  });
});

// =====================================================
// SECTION COMPONENTS
// =====================================================
describe('Modal Section Components', () => {
  it('ModalHeader / Content / Footer가 children을 렌더링해야 한다', () => {
    render(
      <>
        <ModalHeader>헤더</ModalHeader>
        <ModalContent>본문</ModalContent>
        <ModalFooter>푸터</ModalFooter>
      </>,
    );
    expect(screen.getByText('헤더')).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('푸터')).toBeInTheDocument();
  });

  it('BottomModalHeader / Content / Footer가 children을 렌더링해야 한다', () => {
    render(
      <>
        <BottomModalHeader>헤더</BottomModalHeader>
        <BottomModalContent>본문</BottomModalContent>
        <BottomModalFooter>푸터</BottomModalFooter>
      </>,
    );
    expect(screen.getByText('헤더')).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('푸터')).toBeInTheDocument();
  });
});
