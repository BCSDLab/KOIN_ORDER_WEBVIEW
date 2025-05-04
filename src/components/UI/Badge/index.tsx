interface BadgeProps {
  variant?: 'default' | 'outlined';
  color?: 'primary' | 'primaryLight' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  leftIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
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
  neutral: {
    default: 'bg-neutral text-white',
    outlined: 'bg-white text-neutral-500 border border-neutral-300',
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
  leftIcon,
  rightIcon,
  onClick,
}: BadgeProps) {
  const base = 'inline-flex items-center rounded-full py-1 font-[Pretendard] font-semibold text-sm gap-1.5 ';
  const colorClass = COLOR[color][variant];
  const sizeClass = SIZE[size];

  const content = (
    <>
      {leftIcon && <span className="h-4 w-4">{leftIcon}</span>}
      {label && <span>{label}</span>}
      {rightIcon && <span className="h-4 w-4">{rightIcon}</span>}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${base} ${sizeClass} ${colorClass}`}>
        {content}
      </button>
    );
  }

  return <div className={`${base} ${sizeClass} ${colorClass}`}>{content}</div>;
}
