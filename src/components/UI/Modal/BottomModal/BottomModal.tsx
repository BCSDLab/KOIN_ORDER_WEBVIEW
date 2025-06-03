import { createContext, useContext, type ReactNode, useRef, cloneElement, isValidElement, Children } from 'react';
import { twMerge } from 'tailwind-merge';
import Portal from '@/components/Portal';
import useEscapeKeyDown from '@/util/hooks/useEscapeKeyDown';
import useScrollLock from '@/util/hooks/useScrollLock';
import useTouchOutside from '@/util/hooks/useTouchOutside';

interface BottomModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomModalContext = createContext<BottomModalContextType | null>(null);

export const useBottomModal = () => {
  const context = useContext(BottomModalContext);
  if (!context) {
    throw new Error('useBottomModal은 BottomModal 컴포넌트 내에서만 사용할 수 있습니다.');
  }
  return context;
};

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function BottomModal({ isOpen, onClose, children, className }: BottomModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useTouchOutside(modalRef, onClose);
  useEscapeKeyDown(onClose);
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
