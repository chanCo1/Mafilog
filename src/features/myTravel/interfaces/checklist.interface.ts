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
