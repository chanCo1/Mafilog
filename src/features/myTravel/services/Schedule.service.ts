/**
 * @file: Schedule.service.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 여행 스케줄 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import {
  IScheduleResponse,
  ISchedulePlaceRequest,
  IUpdateSchedulePlaceRequest,
} from '@/features/myTravel/interfaces/schedule.interface';

const API_URL = '/travels';

class _ScheduleService {
  /** 여행 일정 조회 */
  async getTravelSchedules(travelId: string): Promise<IScheduleResponse[]> {
    const response = await axiosInstanceWithAuth.get(
      `${API_URL}/${travelId}/schedules`,
    );
    return response.data.data;
  }

  /** 일정 등록 */
  async createTravelSchedulePlace(travelId: string, data: ISchedulePlaceRequest) {
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

  /** 일정 삭제 */
  async deleteTravelSchedulePlace(travelId: string, deleteIds: number[]) {
    const response = await axiosInstanceWithAuth.delete(
      `${API_URL}/${travelId}/schedules`,
      {
        data: {
          deleteIds,
        },
      },
    );
    return response.data.data;
  }

  /** 일정 선택 이동 */
  async updateBulkTravelScheduleDate(
    travelId: string,
    data: { moveIds: number[]; targetDay: number },
  ) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${travelId}/schedules/bulk-move`,
      data,
    );
    return response.data.data;
  }
}

const ScheduleService = new _ScheduleService();
export default ScheduleService;
