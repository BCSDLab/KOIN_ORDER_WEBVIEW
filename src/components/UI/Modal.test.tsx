import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BottomModal, { BottomModalHeader, BottomModalContent, BottomModalFooter } from './BottomModal/BottomModal';
import Modal, { ModalHeader, ModalContent, ModalFooter } from './CenterModal/Modal';
import useScrollLock from '@/util/hooks/useScrollLock';

vi.mock('@/util/hooks/useScrollLock', () => ({
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
  it('모달 외부를 클릭하면 onClose가 호출되어야 한다', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>모달 내용</div>
      </Modal>,
    );

    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      fireEvent.mouseDown(overlay);
      fireEvent.mouseUp(overlay);
    }
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('모달 내부를 클릭하면 onClose가 호출되지 않아야 한다', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>모달 내용</div>
      </Modal>,
    );

    const content = screen.getByText('모달 내용');
    fireEvent.mouseDown(content);
    fireEvent.mouseUp(content);
    expect(onClose).not.toHaveBeenCalled();
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
  it('모달 외부를 클릭하면 onClose가 호출되어야 한다', () => {
    const onClose = vi.fn();
    render(
      <BottomModal isOpen={true} onClose={onClose}>
        <div>모달 내용</div>
      </BottomModal>,
    );
    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      fireEvent.mouseDown(overlay);
      fireEvent.mouseUp(overlay);
    }
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
