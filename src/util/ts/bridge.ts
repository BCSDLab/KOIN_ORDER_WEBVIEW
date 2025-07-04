import { useTokenStore } from '@/stores/auth';
import { setCookie } from '@/util/ts/cookie';

class Bridge {
  private callbackMap: { [key: string]: (result: unknown) => void } = {};

  private callbackIdCounter: number = 0;

  private generateCallbackId(): string {
    this.callbackIdCounter++;
    return `callback_${Date.now()}_${this.callbackIdCounter}`;
  }

  private isIOS() {
    return !!window.webkit?.messageHandlers;
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
        } else if (this.isAndroid()) {
          const result = window.Android?.[method](...args);
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

function isAndroid() {
  return !!window.Android;
}

function isIOS() {
  return !!window.webkit?.messageHandlers;
}

export function isNative() {
  return isAndroid() || isIOS();
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

function applyAccessToken(token: string) {
  useTokenStore.getState().setToken(token);
  setCookie('AUTH_TOKEN_KEY', token);
}

export function setTokensFromNative(tokens: TokenPair) {
  const { accessToken, refreshToken } = tokens;
  if (accessToken) applyAccessToken(accessToken);
  if (refreshToken) useTokenStore.getState().setRefreshToken(refreshToken);
}

export async function requestTokensFromNative(): Promise<TokenPair> {
  const existingAccessToken = useTokenStore.getState().token;
  const existingRefreshToken = useTokenStore.getState().refreshToken;

  if (existingAccessToken && existingRefreshToken) {
    return {
      accessToken: existingAccessToken,
      refreshToken: existingRefreshToken,
    };
  }

  try {
    const tokens = JSON.parse((await window.NativeBridge?.call('getUserTokens')) as string);
    return {
      accessToken: tokens?.accessToken || '',
      refreshToken: tokens?.refreshToken || '',
    };
  } catch {
    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}

export async function saveTokensToNative(tokens: TokenPair): Promise<boolean> {
  try {
    await window.NativeBridge?.call('saveUserTokens', tokens);
    return true;
  } catch {
    return false;
  }
}

export async function deleteTokensFromNative(): Promise<boolean> {
  try {
    await window.NativeBridge?.call('deleteUserTokens');
    return true;
  } catch {
    return false;
  }
}

export async function backButtonTapped(): Promise<void> {
  await window.NativeBridge?.call('navigateBack');
}

export async function closeWebviewPage(): Promise<void> {
  await window.NativeBridge?.call('finish');
}
