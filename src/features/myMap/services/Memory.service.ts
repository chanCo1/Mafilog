/**
 * @file: Memory.service.ts
 * @author: chad
 * @since: 2026.05.26 ~
 * @description: 추억 채우기 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import {
  IMemoryListResponse,
  IMemoryDetailResponse,
} from '@/features/myMap/interfaces/memory.interface';

const API_URL = '/memories';

class _MemoryService {
  /** 새 여행 생성 요청 */
  async createMemory(data: FormData) {
    const response = await axiosInstanceWithAuth.post(`${API_URL}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /** 추억 리스트 조회 */
  async getMemoryList({
    mapType,
    mapId,
  }: {
    mapType?: string;
    mapId?: string;
  }): Promise<IMemoryListResponse[]> {
    const params = { mapType, mapId };
    const response = await axiosInstanceWithAuth.get(`${API_URL}`, { params });

    return response.data.data;
  }

  /** 추억 상세 조회 */
  async getMemoryDetail(memoryId: number): Promise<IMemoryDetailResponse> {
    const response = await axiosInstanceWithAuth.get(
      `${API_URL}/${memoryId}/detail`,
    );
    return response.data.data;
  }

  /** 추억 상세 수정 */
  async updateMemory(memoryId: number, data: FormData) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${memoryId}/detail`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  }

  /** 추억 삭제 */
  async deleteMemory(memoryId: number) {
    const response = await axiosInstanceWithAuth.delete(
      `${API_URL}/${memoryId}/detail`,
      { data: { memoryId } },
    );
    return response.data.data;
  }
}

const MemoryService = new _MemoryService();
export default MemoryService;
