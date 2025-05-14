import type { ReactNode, ReactElement, SVGProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'neutral' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: ReactElement<SVGProps<SVGSVGElement>>;
  endIcon?: ReactElement<SVGProps<SVGSVGElement>>;
  children?: ReactNode;
  state?: 'default' | 'disabled';
  fullWidth?: boolean;
  className?: HTMLAttributes<HTMLButtonElement>['className'];
}

const COLOR = {
  primary: 'bg-primary-500 text-white',
  neutral: 'bg-white text-primary-500 border border-neutral-200',
  gray: 'bg-white text-neutral-500 border border-neutral-300',
};

const SIZE = {
  sm: 'py-1.5 px-3 text-sm rounded-full h-fit',
  md: 'py-1.5 px-7',
  lg: 'p-3',
};

const DISABLED_CLASS = 'bg-neutral-300 text-white cursor-not-allowed pointer-events-none';

export default function Button({
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
  state = 'default',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = state === 'disabled';

  const composedClass = twMerge(
    clsx(
      'flex items-center justify-center rounded-lg font-[Pretendard] font-[15px] font-semibold shadow-1',
      SIZE[size],
      fullWidth && 'w-full',
      isDisabled ? DISABLED_CLASS : COLOR[color],
      className,
    ),
  );

  return (
    <button disabled={isDisabled} className={composedClass} {...props}>
      {startIcon && <span className="mr-2 h-6 w-6">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2 h-6 w-6">{endIcon}</span>}
    </button>
  );
}
