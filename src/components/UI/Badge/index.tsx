import { ReactElement, SVGProps } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  variant?: 'default' | 'outlined';
  color?: 'primary' | 'primaryLight';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  startIcon?: ReactElement<SVGProps<SVGSVGElement>>;
  endIcon?: ReactElement<SVGProps<SVGSVGElement>>;
  className?: string;
}

const COLOR = {
  primary: {
    default: 'bg-primary-500 text-white',
    outlined: 'bg-white text-primary-500 border border-primary-500',
  },
  primaryLight: {
    default: 'bg-primary-300 text-white',
    outlined: 'bg-white text-primary-300 border border-primary-300',
  },
};

const SIZE = {
  sm: 'px-2 py-0.5',
  md: 'px-2 py-1.5',
  lg: 'px-3 py-1.5',
};

export default function Badge({
  variant = 'default',
  color = 'primary',
  size = 'lg',
  label,
  startIcon: startIcon,
  endIcon: endIcon,
  className,
}: BadgeProps) {
  const composedClass = twMerge(
    clsx(
      'inline-flex items-center rounded-full py-1 font-[Pretendard] font-semibold text-sm gap-1.5 h-fit',
      SIZE[size],
      COLOR[color][variant],
      className,
    ),
  );

  return (
    <div className={composedClass}>
      {startIcon && <span className="h-4 w-4">{startIcon}</span>}
      {label && <span>{label}</span>}
      {endIcon && <span className="h-4 w-4">{endIcon}</span>}
    </div>
  );
}
