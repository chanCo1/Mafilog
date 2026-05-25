/** 타임라인 */
export const myTimelineKeys = {
  all: ['myTimelineList'] as const,
  detail: (travelId: string) => [...myTimelineKeys.all, travelId] as const,
};