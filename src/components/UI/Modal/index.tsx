import { type ReactNode, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal/index';
import useClickTouchOutside from '@/util/hooks/useClickTouchOutside';
import useEscapeKeyDown from '@/util/hooks/useEscapeKeyDown';
import useScrollLock from '@/util/hooks/useScrollLock';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useClickTouchOutside(modalRef, onClose);
  useEscapeKeyDown(onClose);
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
        <dialog ref={modalRef} className={twMerge('min-w-4/5 rounded-lg bg-white', className)} open={isOpen}>
          {children}
        </dialog>
      </div>
    </Portal>
  );
}
interface ModalSectionProps {
  children: ReactNode;
  className?: React.HTMLAttributes<HTMLDialogElement>['className'];
}

export const ModalHeader = ({ children, className }: ModalSectionProps) => (
  <div className={twMerge('px-8 py-3 text-lg font-semibold', className)}>{children}</div>
);

export const ModalContent = ({ children, className }: ModalSectionProps) => (
  <div
    className={twMerge(
      'flex flex-col items-center justify-center gap-6 px-8 py-6 font-[Pretendard] text-[15px] font-medium text-neutral-600',
      className,
    )}
  >
    {children}
  </div>
);

export const ModalFooter = ({ children, className }: ModalSectionProps) => (
  <div className={twMerge('px-8 py-3', className)}>{children}</div>
);
