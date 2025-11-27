export interface LoginRequest {
  login_id: string;
  login_pw: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user_type: string;
}

export interface GeneralUserResponse {
  id: number;
  login_id: string;
  email: string;
  gender: 0 | 1;
  name: string;
  nickname: string;
  phone_number: string;
  user_type: 'GENERAL';
}

export interface StudentUserResponse {
  id: number;
  login_id: string;
  anonymous_nickname: string;
  email: string;
  gender: 0 | 1;
  major: string;
  name: string;
  nickname: string;
  phone_number: string;
  student_number: string;
  user_type: 'STUDENT';
}

export interface SmsSendResponse {
  target: string;
  total_count: number;
  remaining_count: number;
  current_count: number;
}

export interface SmsSendRequest {
  phone_number: string;
}

export interface SmsSendResponse {
  target: string;
  total_count: number;
  remaining_count: number;
  current_count: number;
}

export interface SmsVerifyRequest {
  phone_number: string;
  verification_code: string;
}
