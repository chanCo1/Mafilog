/**
 * @file: MyTravel.service.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 내 여행 관련 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import {
  IMyTravelListResponse,
  IMyTravelDetailResponse,
} from '@/features/myTravel/interfaces/myTravel.interface';
import {
  IScheduleResponse,
  ISchedulePlaceRequest,
  IUpdateSchedulePlaceRequest,
} from '@/features/myTravel/interfaces/schedule.interface';

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

  /** 내 여행 리스트 조회 */
  async getMyTravelList(): Promise<IMyTravelListResponse[]> {
    const response = await axiosInstanceWithAuth.get(`${API_URL}`);
    return response.data.data;
  }

  /** 내 여행 상세 조회 */
  async getMyTravelDetail(travelId: string): Promise<IMyTravelDetailResponse> {
    const response = await axiosInstanceWithAuth.get(`${API_URL}/${travelId}`);
    return response.data.data;
  }

  /** 여행 일정 조회 */
  async getTravelSchedules(travelId: string): Promise<IScheduleResponse[]> {
    const response = await axiosInstanceWithAuth.get(
      `${API_URL}/${travelId}/schedules`,
    );
    return response.data.data;
  }

  /** 일정 등록 */
  async postTravelSchedulePlace(travelId: string, data: ISchedulePlaceRequest) {
    const response = await axiosInstanceWithAuth.post(
      `${API_URL}/${travelId}/schedules`,
      data,
    );
    return response.data.data;
  }

  /** 일정 수정 */
  async updateTravelSchedulePlace(
    travelId: string,
    data: IUpdateSchedulePlaceRequest,
  ) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${travelId}/schedules`,
      data,
    );
    return response.data.data;
  }
}

const MyTravelService = new _MyTravelService();
export default MyTravelService;
