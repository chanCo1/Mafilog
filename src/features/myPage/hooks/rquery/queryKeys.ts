/** 타임라인 */
export const myTimelineKeys = {
  all: ['myTimelineList'] as const,
  detail: (travelId: string) => [...myTimelineKeys.all, travelId] as const,
};

/** 타임라인 대시보드 */
export const timelineDashboardKeys = {
  all: ['timelineDashboard'] as const,
};