import { ReactNode, useRef, useEffect } from 'react';
import Portal from '@/components/Portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function BottomModal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
        <div ref={modalRef} className={'mt-auto w-full max-w-none rounded-t-4xl bg-white'}>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export const BottomModalHeader = ({ children }: { children: ReactNode }) => (
  <div className="text-primary-500 flex items-center justify-between border-b border-b-neutral-300 px-8 py-3 text-lg font-semibold">
    {children}
  </div>
);

export const BottomModalContent = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-4 px-8 py-4 font-[Pretendard] text-sm text-neutral-600">{children}</div>
);

export const BottomModalFooter = ({ children }: { children?: ReactNode }) => (
  <div className="border-t border-t-neutral-300 px-8 py-3">{children}</div>
);
