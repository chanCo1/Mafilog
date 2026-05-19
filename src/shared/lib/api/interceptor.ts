import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { getSession, signOut } from 'next-auth/react';

/** 요청 인터셉터 */
const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  // NextAuth 세션에서 토큰 가져오기
  if (typeof window !== 'undefined') {
    try {
      const session = await getSession();
      const token = (session as any)?.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('세션 실패:', error);
    }
  }
  return config;
};

/** 요청 에러 인터셉터 */
const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

/** 응답 인터셉터 */
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

/** 응답 에러 인터셉터 */
const responseErrorInterceptor = async (error: AxiosError) => {
  // 전역 에러 처리
  if (error.response?.status === 401) {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

export function setInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor,
  );

  axiosInstance.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor,
  );

  return axiosInstance;
}
