/**
 * @file: Auth.service.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: 로그인, 회원가입 관련 api service
 */

import {
  IRegisterRequest,
  ILoginRequest,
  ISocialLoginRequest,
} from '@/features/auth/interfaces/register.interface';
import { axiosInstance, axiosInstanceWithAuth } from '@/shared/lib/api';

const API_URL = '/auth';

class _AuthService {
  /** 회원가입 요청 */
  async postRegister(data: IRegisterRequest) {
    const response = await axiosInstance.post(`${API_URL}/register`, data);
    return response.data;
  }

  /** 로그인 요청 */
  async postLogin(data: ILoginRequest) {
    const response = await axiosInstance.post(`${API_URL}/login`, data);
    return response.data.data;
  }

  /** 소셜 로그인 요청 */
  async postSocialLogin(data: ISocialLoginRequest) {
    const response = await axiosInstance.post(`${API_URL}/socialLogin`, data);
    // TODO: 로그인 에러가 난다면 여길 확인해볼것
    return response.data.data;
  }
}

const AuthService = new _AuthService();
export default AuthService;
