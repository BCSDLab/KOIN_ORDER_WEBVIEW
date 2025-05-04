import { ReactNode, useRef, useEffect } from 'react';
import Portal from '@/components/Portal/index';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div ref={modalRef} className={'min-w-4/5 rounded-lg bg-white'}>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export const ModalHeader = ({ children }: { children: ReactNode }) => (
  <div className="px-8 py-3 text-lg font-semibold">{children}</div>
);

export const ModalContent = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center justify-center gap-6 px-8 py-6 font-[Pretendard] text-[15px] font-medium text-neutral-600">
    {children}
  </div>
);

export const ModalFooter = ({ children }: { children: ReactNode }) => <div className="px-8 py-3">{children}</div>;
