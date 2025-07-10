import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import Portal from '@/components/Portal';

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast는 ToastProvider 내부에서만 사용할 수 있습니다.');
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string, duration = 1500) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Portal>
        {message && (
          <div className="pointer-events-none fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/90 px-4 py-2 text-sm text-white transition-opacity">
            {message}
          </div>
        )}
      </Portal>
    </ToastContext.Provider>
  );
}
