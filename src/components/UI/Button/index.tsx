interface ButtonProps {
  color?: 'primary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  state?: 'default' | 'disabled';
  fullWidth?: boolean;
  onClick?: () => void;
}

const COLOR = {
  primary: 'bg-primary-500 text-white',
  neutral: 'bg-white text-primary-500 border-1 border-neutral-200',
};

const SIZE = {
  sm: 'py-1.5 px-7 text-[15px]',
  md: 'p-2.5 text-lg',
  lg: 'p-3 text-lg',
};
export default function Button({
  color = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  state = 'default',
  fullWidth = false,
  onClick,
}: ButtonProps) {
  const base = 'flex items-center justify-center rounded-lg font-[Pretendard] shadow-subtle font-semibold';
  const colorClass = COLOR[color];
  const sizeClass = SIZE[size];
  const widthClass = fullWidth ? 'w-full' : '';

  const isDisabled = state === 'disabled';
  const disabledClass = 'bg-neutral-300 text-white cursor-not-allowed pointer-events-none';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${base} ${sizeClass} ${widthClass} ${isDisabled ? disabledClass : colorClass}`}
    >
      {leftIcon && <span className="mr-2 h-6 w-6">{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && <span className="ml-2 h-6 w-6">{rightIcon}</span>}
    </button>
  );
}
