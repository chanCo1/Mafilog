export const memoryKeys = {
  all: ['memory'] as const,
  list: (mapType: string) => [...memoryKeys.all, mapType] as const,
  detail: (mapId: number) => [...memoryKeys.all, mapId] as const,
};
