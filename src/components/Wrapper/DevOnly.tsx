import { type ReactNode } from 'react';

interface DevOnlyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function DevOnlyWrapper({ children, fallback = null }: DevOnlyWrapperProps) {
  return import.meta.env.DEV ? <>{children}</> : <>{fallback}</>;
}
