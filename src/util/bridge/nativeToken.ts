import { NativeBridge } from './bridge';
import { getCookie, setCookie } from '@/util/ts/cookie';

/* 
  토큰 관리 함수(미사용)
  현재는 네이티브에서 자체적으로 쿠키에 담아 넘겨주도록 구현되어 있습니다.
  추후 AccessToken 만료 시 네이티브에서 토큰을 갱신하는 로직 구현이 필요하여 제거하지 않고 유지하고 있습니다.
 */

type UserType = 'STUDENT' | 'GENERAL';

export const applyAccessToken = (token: string) => setCookie('AUTH_TOKEN_KEY', token);
export const applyRefreshToken = (token: string) => localStorage.setItem('refresh-token-storage', token);
export const applyUserType = (userType: UserType) => setCookie('AUTH_USER_TYPE', userType);

export function setTokensFromNative(access: string, refresh: string, userType: UserType) {
  if (access) applyAccessToken(access);
  if (refresh) applyRefreshToken(refresh);
  if (userType) applyUserType(userType);
}

export async function requestTokensFromNative(): Promise<{ access: string; refresh: string; userType: UserType }> {
  const access = getCookie('AUTH_TOKEN_KEY') ?? '';
  const refresh = localStorage.getItem('refresh-token-storage') ?? '';
  const userType = (getCookie('AUTH_USER_TYPE') ?? 'STUDENT') as UserType;

  if (access && refresh) return { access, refresh, userType };

  try {
    const tokens = JSON.parse((await NativeBridge.call('getUserTokens')) as string);
    return {
      access: tokens?.access || '',
      refresh: tokens?.refresh || '',
      userType: tokens?.userType,
    };
  } catch {
    return { access: '', refresh: '', userType: 'STUDENT' };
  }
}

export async function saveTokensToNative(access: string, refresh: string, userType: UserType): Promise<boolean> {
  try {
    await NativeBridge.call('putUserTokens', { access, refresh, userType });
    return true;
  } catch {
    return false;
  }
}

export async function deleteTokensFromNative(): Promise<boolean> {
  try {
    await NativeBridge.call('deleteUserTokens');
    return true;
  } catch {
    return false;
  }
}
