declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        [name: string]: { postMessage(body: unknown): void };
      };
    };
    Android?: {
      [method: string]: (...args: unknown[]) => unknown;
    };

    onNativeCallback?: (callbackId: string, result: unknown) => void;
    NativeBridge?: {
      call: (methodName: string, ...args: unknown[]) => Promise<unknown>;
      handleCallback: (callbackId: string, result: unknown) => void;
    };
    setTokens?: (access: string, refresh: string) => void;
  }
}

export {};
