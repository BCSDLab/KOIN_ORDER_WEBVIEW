import { type ReactNode, type HTMLAttributes, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal';
import useScrollLock from '@/util/hooks/useScrollLock';
import useTouchOutside from '@/util/hooks/useTouchOutside';

interface BottomModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomModal({ isOpen, onClose, children, className }: BottomModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useTouchOutside(modalRef, onClose);
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-100 flex flex-col justify-end bg-black/70">
        <dialog ref={modalRef} className={twMerge('w-full max-w-none rounded-t-4xl bg-white', className)} open={isOpen}>
          {children}
        </dialog>
      </div>
    </Portal>
  );
}

interface BottomModalSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function BottomModalHeader({ children, className }: BottomModalSectionProps) {
  return <div className={twMerge('bottomModalHeader', className)}>{children}</div>;
}

export function BottomModalContent({ children, className }: BottomModalSectionProps) {
  return <div className={twMerge('bottomModalContent', className)}>{children}</div>;
}

export function BottomModalFooter({ children, className }: BottomModalSectionProps) {
  return <div className={twMerge('bottomModalFooter', className)}>{children}</div>;
}
