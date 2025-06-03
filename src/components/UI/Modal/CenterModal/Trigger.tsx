import React, { ReactElement, type MouseEvent, type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TriggerChildProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

interface TriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  onClick: (event?: MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export default function Trigger({ onClick, children, className, asChild = false, ...rest }: TriggerProps) {
  if (asChild && React.isValidElement(children)) {
    const childElement = children as ReactElement<TriggerChildProps>;

    return React.cloneElement(childElement, {
      onClick: (e: MouseEvent<HTMLElement>) => {
        onClick(e);
        if (childElement.props.onClick) {
          childElement.props.onClick(e);
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
