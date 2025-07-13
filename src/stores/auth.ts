import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { deleteCookie, getCookie } from '@/util/ts/cookie';

export type UserType = 'STUDENT' | 'GENERAL' | null;

interface State {
  token: string;
  refreshToken: string;
  userType: UserType;
}

interface Actions {
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUserType: (userType: UserType) => void;
  clearToken: () => void;
}

export const useTokenStore = create(
  persist<State & Actions>(
    (set) => ({
      token: getCookie('AUTH_TOKEN_KEY') || '',
      refreshToken: '',
      userType: (getCookie('AUTH_USER_TYPE') || null) as UserType,
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setUserType: (userType) => set({ userType }),

      clearToken: () => {
        //테스트용 추후 삭제 예정
        set({ token: '', refreshToken: '', userType: null });
        deleteCookie('AUTH_TOKEN_KEY');
        deleteCookie('AUTH_USER_TYPE');
      },
    }),
    {
      name: 'refresh-token-storage',
      partialize: (state) =>
        ({
          refreshToken: state.refreshToken,
          userType: state.userType,
        }) as State & Actions,
    },
  ),
);
