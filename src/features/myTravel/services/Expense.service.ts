/**
 * @file: Expense.service.ts
 * @author: chad
 * @since: 2026.05.22 ~
 * @description: 여행 가계부 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import { IExpenseResponse } from '@/features/myTravel/interfaces/expense.interface';

const API_URL = '/travels';

class _ExpenseService {
  /** 가계부 조회 */
  async getTravelExpenses(travelId: string): Promise<IExpenseResponse[]> {
    const response = await axiosInstanceWithAuth.get(
      `${API_URL}/${travelId}/expenses`,
    );
    return response.data.data;
  }

  // /** 일정 등록 */
  // async createTravelSchedulePlace(travelId: string, data: ISchedulePlaceRequest) {
  //   const response = await axiosInstanceWithAuth.post(
  //     `${API_URL}/${travelId}/schedules`,
  //     data,
  //   );
  //   return response.data.data;
  // }

  // /** 일정 수정 */
  // async updateTravelSchedulePlace(
  //   travelId: string,
  //   data: IUpdateSchedulePlaceRequest,
  // ) {
  //   const response = await axiosInstanceWithAuth.patch(
  //     `${API_URL}/${travelId}/schedules`,
  //     data,
  //   );
  //   return response.data.data;
  // }

  // /** 일정 삭제 */
  // async deleteTravelSchedulePlace(travelId: string, deleteIds: number[]) {
  //   const response = await axiosInstanceWithAuth.delete(
  //     `${API_URL}/${travelId}/schedules`,
  //     {
  //       data: {
  //         deleteIds,
  //       },
  //     },
  //   );
  //   return response.data.data;
  // }

  // /** 일정 선택 이동 */
  // async updateBulkTravelScheduleDate(
  //   travelId: string,
  //   data: { moveIds: number[]; targetDay: number },
  // ) {
  //   const response = await axiosInstanceWithAuth.patch(
  //     `${API_URL}/${travelId}/schedules/bulk-move`,
  //     data,
  //   );
  //   return response.data.data;
  // }
}

const ExpenseService = new _ExpenseService();
export default ExpenseService;
