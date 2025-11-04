import { X, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import type { ReactNode, ComponentType, CSSProperties } from "react";
import "./toast.css";

// Color Map & Utils
export type ToastType = "neutral" | "info" | "positive" | "negative";

export type IconComponent = ComponentType<{
  size?: number;
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}> | null;

const colorMap: Record<
  ToastType,
  {
    bgVar: string;
    iconColorVar: string;
    textColorVar: string;
    Icon: IconComponent;
    showIcon: boolean;
  }
> = {
  neutral: {
    bgVar: "--serok-gray-600",
    iconColorVar: "--serok-gray-0",
    textColorVar: "--serok-gray-0",
    Icon: null,
    showIcon: false,
  },
  info: {
    bgVar: "--serok-gray-600",
    iconColorVar: "--serok-yellow-700",
    textColorVar: "--serok-gray-0",
    Icon: Info,
    showIcon: true,
  },
  positive: {
    bgVar: "--serok-gray-600",
    iconColorVar: "--serok-green-700",
    textColorVar: "--serok-gray-0",
    Icon: CheckCircle2,
    showIcon: true,
  },
  negative: {
    bgVar: "--serok-gray-600",
    iconColorVar: "--serok-red-700",
    textColorVar: "--serok-gray-0",
    Icon: AlertTriangle,
    showIcon: true,
  },
};

function getColorProps(type: ToastType) {
  return colorMap[type];
}

// Layout 
function ToastLayout({
  text,
  bgVar,
  iconColorVar,
  textColorVar,
  Icon,
  showIcon,
  right,
}: {
  text: string;
  bgVar: string;
  iconColorVar: string;
  textColorVar: string;
  Icon?: ComponentType<{
    size?: number;
    className?: string;
    style?: CSSProperties;
    strokeWidth?: number;
  }> | null;
  showIcon?: boolean;
  right?: ReactNode;
}) {
  const cssVars = {
    "--toast-bg": `var(${bgVar})`,
    "--toast-text": `var(${textColorVar})`,
    "--toast-icon": `var(${iconColorVar})`,
    opacity: 1,
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="toast-root"
      style={cssVars}
    >
      <div className="toast-content">
        {showIcon && Icon && <Icon size={20} className="toast-icon" />}
        <span className="toast-text">{text}</span>
      </div>
  <div className="toast-actions">{right}</div>
    </div>
  );
}

// Action Button
function ActionButton({ label, onClick }: { label?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="toast-action">
      {label}
    </button>
  );
}

// Close Button
function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="toast-close" aria-label="close">
      <X size={18} strokeWidth={2.5} className="text-[#FFFFFF]" />
    </button>
  );
}

// Standard Toast
export type ToastProps = {
  text: string;
  type?: ToastType;
  onClose?: () => void;
};

export function Toast({ text, type = "neutral", onClose }: ToastProps) {
  const { bgVar, iconColorVar, textColorVar, Icon, showIcon } = getColorProps(type);

  return (
    <ToastLayout
      text={text}
      bgVar={bgVar}
      iconColorVar={iconColorVar}
      textColorVar={textColorVar}
      Icon={Icon}
      showIcon={showIcon}
      right={<CloseButton onClick={onClose} />}
    />
  );
}

// Action Toast
type ActionToastProps = {
  text: string;
  type?: ToastType;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
};

function ActionToastComponent({
  text,
  type = "neutral",
  actionLabel = "버튼",
  onAction,
  onClose,
}: ActionToastProps) {
  const { bgVar, iconColorVar, textColorVar, Icon, showIcon } = getColorProps(type);

  return (
    <ToastLayout
      text={text}
      bgVar={bgVar}
      iconColorVar={iconColorVar}
      textColorVar={textColorVar}
      Icon={Icon}
      showIcon={showIcon}
      right={
        <>
          <ActionButton label={actionLabel} onClick={onAction} />
          <CloseButton onClick={onClose} />
        </>
      }
    />
  );
}

export { Toast as default, ActionToastComponent as ActionToast };