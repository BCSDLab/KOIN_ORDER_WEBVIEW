import { type ReactNode, type HTMLAttributes, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal';
import useHandleOutside from '@/util/hooks/useHandleOutside';
import useScrollLock from '@/util/hooks/useScrollLock';

interface BottomModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomModal({ isOpen, onClose, children, className }: BottomModalProps) {
  const containerRef = useRef<HTMLDialogElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);

  useHandleOutside<HTMLDialogElement, HTMLDivElement>({
    containerRef,
    backgroundRef,
    onOutsideClick: (e) => {
      e.preventDefault?.();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <Portal>
      <div ref={backgroundRef} className="fixed inset-0 z-100 flex flex-col justify-end bg-black/70">
        <dialog
          ref={containerRef}
          className={twMerge('w-full max-w-none rounded-t-4xl bg-white', className)}
          open={isOpen}
        >
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
  return <div className={twMerge('bottom-modal-header', className)}>{children}</div>;
}

export function BottomModalContent({ children, className }: BottomModalSectionProps) {
  return <div className={twMerge('bottom-modal-content', className)}>{children}</div>;
}

export function BottomModalFooter({ children, className }: BottomModalSectionProps) {
  return <div className={twMerge('bottom-modal-footer', className)}>{children}</div>;
}
