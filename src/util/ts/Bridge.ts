class Bridge {
  private callbackMap: { [key: string]: (result: unknown) => void } = {};

  private callbackIdCounter: number = 0;

  private generateCallbackId(): string {
    this.callbackIdCounter++;
    return `callback_${Date.now()}_${this.callbackIdCounter}`;
  }

  private isIOS() {
    return !!window.webkit?.messageHandlers?.tokenBridge;
  }

  private isAndroid() {
    return !!window.Android;
  }

  call(method: string, ...args: unknown[]): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const callbackId = this.generateCallbackId();
      this.callbackMap[callbackId] = resolve;

      const payload = {
        method,
        args,
        callbackId,
      };

      try {
        if (this.isIOS()) {
          window.webkit?.messageHandlers.tokenBridge.postMessage(JSON.stringify(payload));
        } else if (this.isAndroid() && window.Android) {
          const result = window.Android[method](...args);
          resolve(result);
          delete this.callbackMap[callbackId];
        }
      } catch (error) {
        delete this.callbackMap[callbackId];
        reject(error);
      }
    });
  }

  handleCallback(callbackId: string, result: unknown) {
    const callback = this.callbackMap[callbackId];
    if (callback) {
      callback(result);
      delete this.callbackMap[callbackId];
    }
  }
}

window.NativeBridge = new Bridge();

window.onNativeCallback = (callbackId: string, result: unknown) => {
  window.NativeBridge?.handleCallback(callbackId, result);
};

window.onAndroidCallback = window.onNativeCallback; // 추후 안드로이드와 함수 이름 협의 후 제거 가능
