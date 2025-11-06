import { apiClient } from '..';
import { LoginResponse, SmsSendResponse, StudentUserResponse } from './entity';
import { getAuthHeader } from '@/util/ts/auth';

export const Login = async (login_id: string, login_pw: string) => {
  return await apiClient.post<LoginResponse>('v2/users/login', {
    body: { login_id, login_pw },
  });
};

export const getStudentInfo = async () => {
  return await apiClient.get<StudentUserResponse>('user/student/me', {
    headers: getAuthHeader(),
  });
};

export const sendSmsVerificationCode = async (phone_number: string) => {
  return await apiClient.post<SmsSendResponse>('users/verification/sms/send', {
    body: { phone_number },
  });
};

export const verifySmsCode = async (phone_number: string, verification_code: string) => {
  return await apiClient.post<SmsSendResponse>('users/verification/sms/verify', {
    body: { phone_number, verification_code },
  });
};
