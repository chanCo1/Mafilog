/** 여행 리스트 */
export const myTravelListKeys = {
  all: ['myTravelList'] as const,
  detail: (travelId: string) => [...myTravelListKeys.all, travelId] as const,
};

/** 여행 상세 */
export const myTravelDetailKeys = {
  all: ['myTravelDetail'] as const,
  detail: (travelId: string) => [...myTravelDetailKeys.all, travelId] as const,
};

/** 체크리스트 */
export const travelChecklistKeys = {
  all: ['travelChecklist'] as const,
  detail: (travelId: string) => [...travelChecklistKeys.all, travelId] as const,
};

/** 스케줄 */
export const travelScheduleKeys = {
  all: ['travelSchedules'] as const,
  detail: (travelId: string) => [...travelScheduleKeys.all, travelId] as const,
};

/** 가계부 */
export const travelExpensesKeys = {
  all: ['travelExpenses'] as const,
  detail: (travelId: string) => [...travelExpensesKeys.all, travelId] as const,
};