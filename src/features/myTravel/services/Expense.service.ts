/**
 * @file: Expense.service.ts
 * @author: chad
 * @since: 2026.05.22 ~
 * @description: 여행 가계부 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';
import { IExpenseResponse, IExpenseRequest } from '@/features/myTravel/interfaces/expense.interface';

const API_URL = '/travels';

class _ExpenseService {
  /** 가계부 조회 */
  async getTravelExpenses(travelId: string): Promise<IExpenseResponse[]> {
    const response = await axiosInstanceWithAuth.get(
      `${API_URL}/${travelId}/expenses`,
    );
    return response.data.data;
  }

  /** 가계부 지출 등록 */
  async createTravelExpense(travelId: string, data: IExpenseRequest) {
    const response = await axiosInstanceWithAuth.post(
      `${API_URL}/${travelId}/expenses`,
      data,
    );
    return response.data.data;
  }

  // /** 가계부 지출 수정 */
  async updateTravelExpense(
    travelId: string,
    data: IExpenseRequest,
  ) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${travelId}/expenses`,
      data,
    );
    return response.data.data;
  }

  /** 가계부 지출 삭제 */
  async deleteTravelExpense(travelId: string, deleteIds: number[]) {
    const response = await axiosInstanceWithAuth.delete(
      `${API_URL}/${travelId}/expenses`,
      {
        data: {
          deleteIds,
        },
      },
    );
    return response.data.data;
  }

  /** 지출 선택 이동 */
  async updateBulkTravelExpenseDate(
    travelId: string,
    data: { moveIds: number[]; targetDay: number },
  ) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${travelId}/expenses/bulk-move`,
      data,
    );
    return response.data.data;
  }

  /** 지출 순서 이동 */
  async updateMoveTravelExpenseList(
    travelId: string,
    orderedItems: { id: number; order: number }[],
  ) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${travelId}/expenses/order`,
      { orderedItems },
    );
    return response.data.data;
  }
}

const ExpenseService = new _ExpenseService();
export default ExpenseService;
