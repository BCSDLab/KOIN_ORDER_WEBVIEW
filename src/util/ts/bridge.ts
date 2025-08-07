import { getCookie, setCookie } from '@/util/ts/cookie';

type UserType = 'STUDENT' | 'GENERAL';

class Bridge {
  private callbackMap: { [key: string]: (result: unknown) => void } = {};

  private callbackIdCounter: number = 0;

  private generateCallbackId(): string {
    this.callbackIdCounter++;
    return `cb_${Date.now()}_${this.callbackIdCounter}`;
  }

  private isIOS() {
    return !!window.webkit?.messageHandlers.tokenBridge;
  }

  private isAndroid() {
    return !!window.Android;
  }

  call(methodName: string, ...args: unknown[]): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const callbackId = this.generateCallbackId();
      this.callbackMap[callbackId] = resolve;

      const payload = {
        method: methodName,
        args,
        callbackId,
      };

      try {
        if (this.isIOS()) {
          window.webkit?.messageHandlers.tokenBridge.postMessage(JSON.stringify(payload));
        } else if (this.isAndroid()) {
          const result = window.Android?.[methodName](...args);
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

function applyAccessToken(token: string) {
  setCookie('AUTH_TOKEN_KEY', token);
}

export function applyRefreshToken(token: string) {
  localStorage.setItem('refresh-token-storage', token);
}

function applyUserType(userType: UserType) {
  setCookie('AUTH_USER_TYPE', userType);
}

export function setTokensFromNative(access: string, refresh: string, userType: UserType) {
  if (access) applyAccessToken(access);
  if (refresh) applyRefreshToken(refresh);
  if (userType) applyUserType(userType);
}

export async function requestTokensFromNative(): Promise<{ access: string; refresh: string; userType: UserType }> {
  const access = getCookie('AUTH_TOKEN_KEY') ?? '';
  const refresh = localStorage.getItem('refresh-token-storage') ?? '';
  const userType = (getCookie('AUTH_USER_TYPE') ?? 'STUDENT') as UserType;

  if (access && refresh) {
    return { access, refresh, userType };
  }

  try {
    const tokens = JSON.parse((await window.NativeBridge?.call('getUserTokens')) as string);
    return {
      access: tokens?.access || '',
      refresh: tokens?.refresh || '',
      userType: tokens?.userType,
    };
  } catch {
    return {
      access: '',
      refresh: '',
      userType: 'STUDENT',
    };
  }
}

export async function saveTokensToNative(access: string, refresh: string, userType: UserType): Promise<boolean> {
  try {
    await window.NativeBridge?.call('putUserTokens', { access, refresh, userType });
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

export async function redirectToLogin(): Promise<void> {
  await window.NativeBridge?.call('redirectToLogin');
}
