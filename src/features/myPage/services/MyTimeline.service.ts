/**
 * @file: Timeline.service.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 내 타임라인 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';
import { ITimelineDashboardResponse } from '@/features/myPage/interfaces/timeline.interface';

const API_URL = '/timelines';

class _MyTimelineService {
  /** 내 타임라인 리스트 조회 */
  async getMyTimelineList(): Promise<IMyTravelListResponse[]> {
    const response = await axiosInstanceWithAuth.get(`${API_URL}`);
    return response.data.data;
  }

  /** 타임라인 대시보드 조회 */
  async getMyTimelineDashboard(): Promise<ITimelineDashboardResponse> {
    const response = await axiosInstanceWithAuth.get(`${API_URL}/dashboard`);
    return response.data.data;
  }
}

const MyTimelineService = new _MyTimelineService();
export default MyTimelineService;
