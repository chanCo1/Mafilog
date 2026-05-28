export const memoryKeys = {
  all: ['memory'] as const,

  listAll: () => [...memoryKeys.all, 'list'] as const,
  list: (mapType: string) => [...memoryKeys.listAll(), mapType] as const,

  detailAll: () => [...memoryKeys.all, 'detail'] as const,
  detail: (memoryId: number) => [...memoryKeys.detailAll(), memoryId] as const,
};
