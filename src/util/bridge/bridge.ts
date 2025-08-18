type Resolver = (value: unknown) => void;
type Rejecter = (error: unknown) => void;

export const isIOS = () => !!window.webkit?.messageHandlers.tokenBridge;
export const isAndroid = () => !!window.Android;

const createBridge = () => {
  const callbacks = new Map<string, { resolve: Resolver; reject: Rejecter; timer?: number }>();

  let callbackIdCounter: number = 0;
  const generateCallbackId = (): string => `cb_${Date.now()}_${++callbackIdCounter}`;

  const post = (payload: { method: string; args: unknown[]; callbackId: string }) => {
    if (isIOS()) {
      window.webkit!.messageHandlers.tokenBridge.postMessage(JSON.stringify(payload));
      return;
    }

    if (window.Android?.postMessage) {
      window.Android.postMessage(payload.method, JSON.stringify(payload.args ?? []), payload.callbackId);
      return;
    }

    if (typeof window.Android?.[payload.method] === 'function') {
      const result = window.Android[payload.method](...(payload.args ?? []));
      queueMicrotask(() => window.onNativeCallback?.(payload.callbackId, result));
      return;
    }

    throw new Error('네이티브 브릿지를 사용할 수 없는 환경입니다. (웹 환경)');
  };

  const call = (method: string, ...args: unknown[]) => {
    const callbackId = generateCallbackId();
    return new Promise<unknown>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        callbacks.delete(callbackId);
        reject(new Error(`네이티브 브릿지 타임아웃: ${method}`));
      }, 15000);

      callbacks.set(callbackId, { resolve, reject, timer });
      try {
        post({ method, args, callbackId });
      } catch (e) {
        window.clearTimeout(timer);
        callbacks.delete(callbackId);
        reject(e);
      }
    });
  };

  const handleCallback = (id: string, result: unknown, error?: unknown) => {
    const entry = callbacks.get(id);
    if (!entry) return;
    if (entry.timer) window.clearTimeout(entry.timer);
    callbacks.delete(id);
    if (error) {
      entry.reject(error);
    } else {
      entry.resolve(result);
    }
  };

  return { call, handleCallback };
};

export const NativeBridge = createBridge();

window.NativeBridge = NativeBridge;
window.onNativeCallback = (callbackId: string, result: unknown) => {
  NativeBridge.handleCallback(callbackId, result);
};
