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

const HeaderTw =
  'text-primary-500 flex items-center justify-between border-b-[0.5px] border-b-neutral-300 px-8 py-3 font-[Pretendard] text-lg font-semibold';
const ContentTw = 'flex flex-col gap-4 px-8 pt-4 pb-3 font-[Pretendard] text-sm text-neutral-600';
const FooterTw = 'border-t-[0.5px] border-t-neutral-300 px-8 py-3 font-[Pretendard] text-sm text-neutral-600';

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
  return <div className={twMerge(HeaderTw, className)}>{children}</div>;
}

export function BottomModalContent({ children, className }: BottomModalSectionProps) {
  return <div className={twMerge(ContentTw, className)}>{children}</div>;
}

export function BottomModalFooter({ children, className }: BottomModalSectionProps) {
  return <div className={twMerge(FooterTw, className)}>{children}</div>;
}
