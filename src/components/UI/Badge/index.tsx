import type { ReactElement, SVGProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof COLOR;
  color?: 'primary' | 'primaryLight' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  startIcon?: ReactElement<SVGProps<SVGSVGElement>>;
  endIcon?: ReactElement<SVGProps<SVGSVGElement>>;
}

const COLOR: Record<string, Record<string, string>> = {
  primary: {
    default: 'bg-primary-500 text-white border border-primary-500',
    outlined: 'bg-white text-primary-500 border border-primary-500',
  },
  primaryLight: {
    default: 'bg-primary-300 text-white border border-primary-300',
    outlined: 'bg-white text-primary-300 border border-primary-300',
  },
  neutral: {
    default: 'bg-white text-neutral-500 border border-neutral-300',
  },
};

const SIZE = {
  sm: 'px-2 py-1.5',
  md: 'px-3 py-1',
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
      'inline-flex items-center rounded-full py-1 font-[Pretendard] font-semibold text-sm gap-1.5 h-fit box-border',
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
