import { createContext, type HTMLAttributes, type ReactNode, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal';
import useContextWrapper from '@/util/hooks/useContextWrapper';
import useScrollLock from '@/util/hooks/useScrollLock';
import useTouchOutside from '@/util/hooks/useTouchOutside';

interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  return useContextWrapper(ModalContext, 'useModal', 'Modal');
};

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useTouchOutside(modalRef, onClose);
  useScrollLock(isOpen);

  return (
    <>
      {isOpen && (
        <Portal>
          <ModalContext.Provider value={{ isOpen, onClose }}>
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
              <dialog ref={modalRef} className={twMerge('min-w-4/5 rounded-lg bg-white', className)} open>
                {children}
              </dialog>
            </div>
          </ModalContext.Provider>
        </Portal>
      )}
    </>
  );
}
