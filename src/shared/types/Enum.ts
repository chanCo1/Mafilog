/** 일정 타입 */
export const SCHEDULE_TYPE = {
  LOCATION: 'location',
  MEMO: 'memo',
};
export type SCHEDULE_TYPE = (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];
