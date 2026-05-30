/**
 * @file: Checklist.service.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: 체크리스트 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import { IChecklistResponse } from '@/features/myTravel/interfaces/checklist.interface';
import { IChecklistRequest } from '@/features/myTravel/interfaces/checklist.interface';

const API_URL = '/travels';

class _ChecklistService {
  /** 여행 체크리스트 조회 */
  async getTravelChecklist(travelId: string): Promise<IChecklistResponse[]> {
    const response = await axiosInstanceWithAuth.get(
      `${API_URL}/${travelId}/checklist`,
    );
    return response.data.data;
  }

  /** 체크리스트 (카테고리/아이템) 등록 */
  async createChecklist(travelId: string, data: IChecklistRequest) {
    const response = await axiosInstanceWithAuth.post(
      `${API_URL}/${travelId}/checklist`,
      data,
    );
    return response.data.data;
  }

  /** 체크리스트 (카테고리/아이템) 수정 */
  async updateChecklist(travelId: string, data: IChecklistRequest) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${travelId}/checklist`,
      data,
    );
    return response.data.data;
  }

  /** 체크리스트 (카테고리/아이템) 삭제 */
  async deleteChecklist(travelId: string, data: IChecklistRequest) {
    const response = await axiosInstanceWithAuth.delete(
      `${API_URL}/${travelId}/checklist`,
      { data },
    );
    return response.data.data;
  }
}

const ChecklistService = new _ChecklistService();
export default ChecklistService;
