import { UnionUserResponse } from 'util/hooks/state/useUser';
import { GeneralUserResponse, StudentUserResponse } from 'api/auth/entity';

export function isStudentUser(user: UnionUserResponse | null): user is StudentUserResponse {
  return (user as StudentUserResponse).user_type === 'STUDENT';
}

export function isGeneralUser(user: UnionUserResponse | null): user is StudentUserResponse {
  return (user as GeneralUserResponse).user_type === 'GENERAL';
}
