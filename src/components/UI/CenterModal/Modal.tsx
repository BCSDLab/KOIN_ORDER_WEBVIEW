import { type HTMLAttributes, type ReactNode, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal';
import useScrollLock from '@/util/hooks/useScrollLock';
import useTouchOutside from '@/util/hooks/useTouchOutside';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useTouchOutside(modalRef, onClose);
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <>
      <Portal>
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
          <dialog
            ref={modalRef}
            className={twMerge(
              'fixed top-1/2 left-1/2 min-w-4/5 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white',
              className,
            )}
            open={isOpen}
          >
            {children}
          </dialog>
        </div>
      </Portal>
    </>
  );
}

interface ModalSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function ModalHeader({ children, className }: ModalSectionProps) {
  return <div className={twMerge('modal-header', className)}>{children}</div>;
}

export function ModalContent({ children, className }: ModalSectionProps) {
  return <div className={twMerge('modal-content', className)}>{children}</div>;
}

export function ModalFooter({ children, className }: ModalSectionProps) {
  return <div className={twMerge('modal-footer', className)}>{children}</div>;
}
