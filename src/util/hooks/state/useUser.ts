import { useSuspenseQuery } from '@tanstack/react-query';
import { GeneralUserResponse, StudentUserResponse } from 'api/auth/entity';
import { getGeneralInfo, getStudentInfo } from '@/api/auth';

type UserType = 'STUDENT' | 'GENERAL';
export type UnionUserResponse = StudentUserResponse | GeneralUserResponse;

const getUserInfo = async (userType: UserType): Promise<UnionUserResponse> => {
  if (userType === 'STUDENT') {
    return getStudentInfo();
  }
  return getGeneralInfo();
};

export const useUser = () => {
  const token = localStorage.getItem('AUTH_TOKEN_KEY') || null;
  const userType = localStorage.getItem('AUTH_USER_TYPE') as UserType;

  const { data, isError } = useSuspenseQuery({
    queryKey: ['userInfo', token, userType],
    queryFn: () => {
      if (!token) return null;
      return getUserInfo(userType);
    },

    select: (rawData) => {
      if (!rawData) return null;

      if (rawData.user_type === 'STUDENT') {
        return rawData;
      }

      const timeStamp = Date.now();
      const anonymousNickname = `익명${rawData.id}${timeStamp.toString().slice(-4)}`;

      return {
        ...rawData,
        anonymous_nickname: anonymousNickname,
      };
    },
  });

  return {
    data: isError ? null : data,
  };
};
