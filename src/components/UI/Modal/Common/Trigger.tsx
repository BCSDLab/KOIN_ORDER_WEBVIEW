import React, { type ReactElement, type MouseEvent, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TriggerChildProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

interface TriggerProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: (event?: MouseEvent<HTMLElement>) => void;
  children: ReactElement<TriggerChildProps>;
  asChild?: boolean;
}

export default function Trigger({ onClick, children, className, asChild = false, ...rest }: TriggerProps) {
  if (asChild) {
    return React.cloneElement(children, {
      ...children.props,
      onClick: (e: MouseEvent<HTMLElement>) => {
        onClick(e);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge('inline-flex items-center justify-center', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
