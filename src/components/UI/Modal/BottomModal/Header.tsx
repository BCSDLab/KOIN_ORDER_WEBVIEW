import React, { type HTMLAttributes } from 'react';
import { useBottomModal } from './BottomModal';
import CloseIcon from '@/assets/Main/close-icon.svg';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export default function Header({ children, showCloseButton = false, className }: HeaderProps) {
  const { onClose } = useBottomModal();

  return (
    <div className={className}>
      {children}
      {showCloseButton && (
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
