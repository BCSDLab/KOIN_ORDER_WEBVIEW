import React, { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBottomModal } from './BottomModal';
import CloseIcon from '@/assets/Main/close-icon.svg';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export default function Header({ children, className, showCloseButton = false }: HeaderProps) {
  const { onClose } = useBottomModal();

  return (
    <div
      className={twMerge(
        'text-primary-500 flex items-center justify-between border-b-[0.5px] border-b-neutral-300 px-8 py-3 text-lg font-semibold',
        className,
      )}
    >
      {children}
      {showCloseButton && (
        <button type="button" onClick={onClose} className="ml-auto text-neutral-500 hover:text-neutral-800">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
