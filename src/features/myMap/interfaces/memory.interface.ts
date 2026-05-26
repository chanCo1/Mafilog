export interface IHandleUpdateSchedule {
  day: number;
  listId: number;
  key: 'rating' | 'memo';
  value: string | number;
}
