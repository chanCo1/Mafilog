/**
 * @file: MyTravel.service.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 내 여행 관련 api service
 */

import { axiosInstance, axiosInstanceWithAuth } from '@/shared/lib/api';

const API_URL = '/travels';

class _MyTravelService {
  /** 회원가입 요청 */
  async postCreateTravel(data: FormData) {
    const response = await axiosInstanceWithAuth.post(`${API_URL}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

const MyTravelService = new _MyTravelService();
export default MyTravelService;
