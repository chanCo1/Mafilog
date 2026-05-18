/**
 * @file: MyTravel.service.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 내 여행 관련 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';

const API_URL = '/travels';

class _MyTravelService {
  /** 새 여행 생성 요청 */
  async postCreateTravel(data: FormData) {
    const response = await axiosInstanceWithAuth.post(`${API_URL}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /** 내 여행 조회 */
  async getMyTravelList(): Promise<IMyTravelListResponse[]> {
    const response = await axiosInstanceWithAuth.get(`${API_URL}`);
    return response.data.data;
  }
}

const MyTravelService = new _MyTravelService();
export default MyTravelService;
