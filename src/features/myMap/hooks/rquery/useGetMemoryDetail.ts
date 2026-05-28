/**
 * @file: useGetMemoryDetail.ts
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 추억 상세 조회 react-query
 */

import { useQuery } from '@tanstack/react-query';
import { memoryKeys } from '@/features/myMap/hooks/rquery/queryKeys';
import MemoryService from '@/features/myMap/services/Memory.service';

export const useGetMemoryDetail = (memoryId: number) => {
  const queryKey = memoryKeys.detail(memoryId);

  const query = useQuery({
    queryKey,
    queryFn: async () => await MemoryService.getMemoryDetail(memoryId),
    enabled: !!memoryId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
