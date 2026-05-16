import axios, { AxiosInstance } from 'axios';
import { setInterceptors } from '@/shared/lib/api/interceptor';

const baseurl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

/** 인증 불필요 기본 axios 인스턴스 */
export const axiosInstance = (url?: string): AxiosInstance => {
  return axios.create({
    baseURL: `${baseurl}${url}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

/** Interceptor가 적용된 axios 인스턴스 */
export const axiosInstanceWithAuth = (url?: string): AxiosInstance => {
  return setInterceptors(
    axios.create({
      baseURL: `${baseurl}${url}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  );
};
