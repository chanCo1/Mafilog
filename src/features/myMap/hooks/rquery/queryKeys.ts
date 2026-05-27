export const memoryKeys = {
  all: ['memory'] as const,
  list: (mapType: string) => [...memoryKeys.all, mapType] as const,
  detail: (mapId: string) => [...memoryKeys.all, mapId] as const,
};
