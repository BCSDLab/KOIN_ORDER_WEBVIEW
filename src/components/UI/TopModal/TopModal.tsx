import { type ReactNode, type HTMLAttributes, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal';
import useEscapeKeyDown from '@/util/hooks/useEscapeKeyDown';
import useHandleOutside from '@/util/hooks/useHandleOutside';
import useScrollLock from '@/util/hooks/useScrollLock';

interface TopModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  outSideClose?: boolean;
}

export default function TopModal({ isOpen, onClose, children, className, outSideClose }: TopModalProps) {
  const containerRef = useRef<HTMLDialogElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useEscapeKeyDown(onClose);

  useHandleOutside<HTMLDialogElement, HTMLDivElement>({
    containerRef,
    backgroundRef,
    onOutsideClick: (e) => {
      e.preventDefault?.();
      onClose();
    },
    enabled: outSideClose,
  });

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        ref={backgroundRef}
        className={twMerge('fixed inset-0 z-120 mt-30 flex items-start justify-center', className)}
      >
        <dialog ref={containerRef} open={isOpen} className="m-0 h-auto w-full border-0 bg-transparent p-0 outline-none">
          {children}
        </dialog>
      </div>
    </Portal>
  );
}
