import axios, { AxiosInstance } from 'axios';
import { setInterceptors } from '@/shared/lib/api/interceptor';

const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

/** 인증 불필요 기본 axios 인스턴스 */
export const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

/** Interceptor가 적용된 axios 인스턴스 */
export const axiosInstanceWithAuth = setInterceptors(
    axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  );
