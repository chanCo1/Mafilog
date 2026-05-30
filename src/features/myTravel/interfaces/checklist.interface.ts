import { TChecklistType } from "@/features/myTravel/types/checklist.type";

/** 체크리스트 조회 */
export interface IChecklistResponse {
  id: number;
  travelId: number;
  items: IChecklistItem[];
  label: string;
  createdAt: string;
}

export interface IChecklistItem {
  categoryId: number;
  createdAt: string;
  id: number;
  isChecked: boolean;
  label: string;
}

/** 체크리스트 수정 요청 */
export interface IChecklistRequest {
  type: TChecklistType;
  label?: string;
  categoryId?: number;
  itemId?: number;
  isChecked?: boolean;
}