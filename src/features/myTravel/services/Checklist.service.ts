/**
 * @file: Checklist.service.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: 체크리스트 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';

const API_URL = '/travels';

class _ChecklistService {
  /** 여행 체크리스트 조회 */
  async getTravelChecklist(travelId: string) {
    const response = await axiosInstanceWithAuth.get(
      `${API_URL}/${travelId}/checklist`,
    );
    return response.data.data;
  }
}

const ChecklistService = new _ChecklistService();
export default ChecklistService;
