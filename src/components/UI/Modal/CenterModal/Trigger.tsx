import React, { ReactElement, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface TriggerProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export default function Trigger({ onClick, children, className, asChild = false }: TriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as ReactElement<{
        onClick?: (event: MouseEvent<HTMLElement>) => void;
      }>,
      {
        onClick: (e: MouseEvent<HTMLElement>) => {
          onClick();

          const childOnClick = (
            children as ReactElement<{
              onClick?: (event: MouseEvent<HTMLElement>) => void;
            }>
          ).props.onClick;

          if (childOnClick) {
            childOnClick(e);
          }
        },
      },
    );
  }

  return (
    <button type="button" onClick={onClick} className={twMerge('inline-flex items-center justify-center', className)}>
      {children}
    </button>
  );
}
