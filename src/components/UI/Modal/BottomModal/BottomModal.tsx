import {
  createContext,
  type ReactNode,
  type HTMLAttributes,
  useRef,
  cloneElement,
  isValidElement,
  Children,
} from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal';
import useContextWrapper from '@/util/hooks/useContextWrapper';
import useScrollLock from '@/util/hooks/useScrollLock';
import useTouchOutside from '@/util/hooks/useTouchOutside';

interface BottomModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomModalContext = createContext<BottomModalContextType | null>(null);

export const useBottomModal = () => {
  return useContextWrapper(BottomModalContext, 'useModal', 'Modal');
};

interface BottomModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomModal({ isOpen, onClose, children, className }: BottomModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useTouchOutside(modalRef, onClose);
  useScrollLock(isOpen);

  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child);
    }
    return child;
  });

  return (
    <>
      {isOpen && (
        <Portal>
          <BottomModalContext.Provider value={{ isOpen, onClose }}>
            <div className="fixed inset-0 z-100 flex flex-col justify-end bg-black/70">
              <dialog ref={modalRef} className={twMerge('w-full max-w-none rounded-t-4xl bg-white', className)} open>
                {enhancedChildren}
              </dialog>
            </div>
          </BottomModalContext.Provider>
        </Portal>
      )}
    </>
  );
}
